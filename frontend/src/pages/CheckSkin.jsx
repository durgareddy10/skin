import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

// In local/tunnel mode, use relative URL so Vite proxies directly to Flask backend without mixed-content errors
const API_URL = (
  import.meta.env.VITE_API_URL &&
  !import.meta.env.VITE_API_URL.includes("127.0.0.1") &&
  !import.meta.env.VITE_API_URL.includes("localhost")
    ? import.meta.env.VITE_API_URL
    : ""
).replace(/\/+$/, "");

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

function getCurrentUser() {
  const possibleKeys = [
    "currentUser",
    "loggedInUser",
    "user",
    "dermascan_user",
    "authUser",
  ];

  for (const key of possibleKeys) {
    const value = localStorage.getItem(key);
    if (!value) continue;
    try {
      const parsed = JSON.parse(value);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    } catch {
      if (value.includes("@")) {
        return { email: value };
      }
    }
  }
  return null;
}

function getUserEmail(user) {
  if (!user) return null;
  return user.email || user.emailAddress || user.username || null;
}

function getUserName(user) {
  if (!user) return "User";
  return user.name || user.fullName || user.username || "User";
}

function saveHistory(result, user) {
  const email = getUserEmail(user);
  if (!email) return;

  const historyKey = `dermascan_history_${email}`;
  let history = [];

  try {
    const existing = localStorage.getItem(historyKey);
    if (existing) {
      history = JSON.parse(existing);
      if (!Array.isArray(history)) history = [];
    }
  } catch {
    history = [];
  }

  const historyItem = {
    id: Date.now(),
    user: {
      name: getUserName(user),
      email: email,
    },
    disease: result.disease || result.predicted_class || result.prediction || "Unknown",
    confidence: Number(result.confidence || 0),
    probabilities: Array.isArray(result.probabilities) ? result.probabilities : [],
    image: result.imagePreview || null,
    filename: result.filename || "skin-image",
    date: new Date().toISOString(),
  };

  history.unshift(historyItem);
  history = history.slice(0, 50);
  localStorage.setItem(historyKey, JSON.stringify(history));
  localStorage.setItem("dermascan_history", JSON.stringify(history));
}

// Compress and resize large phone camera images (12MB -> ~150KB) to ensure sub-second uploads on mobile
function compressImage(file, maxWidth = 1024, quality = 0.82) {
  if (!file || !file.type.startsWith("image/") || file.type === "image/svg+xml") {
    return Promise.resolve(file);
  }
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const cleanName = (file.name || "image").replace(/\.[^/.]+$/, "") + ".jpg";
            const compressed = new File([blob], cleanName, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressed);
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}

export default function CheckSkin() {
  const navigate = useNavigate();
  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Analyzing with AI Model...");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const [emailConfirmedBanner, setEmailConfirmedBanner] = useState(false);

  useEffect(() => {
    // 1. Check if user just verified email from Gmail redirect
    if (
      sessionStorage.getItem("just_confirmed_email") === "true" ||
      window.location.hash.includes("type=signup") ||
      window.location.hash.includes("access_token=")
    ) {
      setEmailConfirmedBanner(true);
      sessionStorage.removeItem("just_confirmed_email");
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }

    // 2. Load current user from session or local storage
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const u = {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email.split("@")[0],
          email: session.user.email,
        };
        setUser(u);
      } else {
        const local = getCurrentUser();
        setUser(local);
      }
    };
    loadUser();

    // 3. Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const u = {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email.split("@")[0],
          email: session.user.email,
        };
        setUser(u);
        if (event === "SIGNED_IN") {
          setEmailConfirmedBanner(true);
        }
      } else {
        setUser(null);
      }
    });

    const handleAuthCustom = () => {
      loadUser();
    };
    window.addEventListener("authChanged", handleAuthCustom);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("authChanged", handleAuthCustom);
    };
  }, []);

  const handleFileChange = (event) => {
    setError("");
    setSuccess("");

    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
      setError("Please select a JPG, JPEG, PNG, or WEBP image.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("Image size must be less than 10 MB.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);

    // Pre-warm Render backend while user inspects preview (wakes sleeping free tier container)
    if (API_URL) {
      fetch(`${API_URL}/api/health`, { method: "GET" }).catch(() => {});
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.onerror = () => {
      setError("Could not preview the selected image.");
    };
    reader.readAsDataURL(file);
  };

  const openGallery = (e) => {
    e?.stopPropagation?.();
    galleryInputRef.current?.click();
  };

  const openCamera = (e) => {
    e?.stopPropagation?.();
    cameraInputRef.current?.click();
  };

  const handleRemoveImage = (e) => {
    e?.stopPropagation?.();
    setSelectedFile(null);
    setPreview("");
    setError("");
    setSuccess("");
    if (galleryInputRef.current) {
      galleryInputRef.current.value = "";
    }
    if (cameraInputRef.current) {
      cameraInputRef.current.value = "";
    }
  };

  const handleAnalyze = async () => {
    setError("");
    setSuccess("");

    if (!selectedFile) {
      setError("Please select a skin image first.");
      return;
    }

    const currentUser = getCurrentUser();
    if (currentUser) setUser(currentUser);

    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token || localStorage.getItem("token") || "";

    setLoading(true);
    setLoadingStatus("Optimizing photo for fast screening...");

    try {
      // 1. Client-side compress large smartphone photos (down from 12MB to ~150KB)
      const optimizedFile = await compressImage(selectedFile, 1024, 0.82);

      setLoadingStatus("Connecting to clinical AI screening model...");

      // 2. Parallel upload: Supabase Storage + AI Prediction simultaneously
      const storageUploadTask = (async () => {
        if (!session?.user) return null;
        try {
          const filePath = `${session.user.id}/${Date.now()}.jpg`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("skin-images")
            .upload(filePath, optimizedFile);

          if (!uploadError && uploadData) {
            const { data: urlData } = supabase.storage
              .from("skin-images")
              .getPublicUrl(filePath);
            return urlData?.publicUrl || null;
          }
        } catch (storageErr) {
          console.warn("Storage upload skipped:", storageErr);
        }
        return null;
      })();

      const formData = new FormData();
      formData.append("image", optimizedFile);

      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      setLoadingStatus("Running AI dermatological analysis...");

      // Execute Supabase upload and backend inference in parallel
      const [uploadedImageUrl, response] = await Promise.all([
        storageUploadTask,
        fetch(`${API_URL}/api/predict`, {
          method: "POST",
          headers: headers,
          body: formData,
        }),
      ]);

      if (!response.ok) {
        let msg = `Backend error: HTTP ${response.status}`;
        try {
          const errData = await response.json();
          if (errData?.message) msg = errData.message;
        } catch {}
        throw new Error(msg);
      }

      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.message || "The model could not analyze this image.");
      }

      const disease =
        data.disease ||
        data.predicted_class ||
        data.prediction ||
        data.class_name ||
        "Unknown";

      const confidence = Number(data.confidence ?? 0);

      let probabilities = data.probabilities || data.predictions || [];
      if (Array.isArray(probabilities)) {
        probabilities = probabilities.map((v) => Number(v));
      } else {
        probabilities = [];
      }

      const result = {
        ...data,
        success: true,
        disease: disease,
        confidence: Number.isFinite(confidence) ? confidence : 0,
        probabilities: probabilities,
        imagePreview: preview,
        uploadedFileName: selectedFile.name,
        user: session?.user || currentUser,
        analyzedAt: new Date().toISOString(),
      };

      localStorage.setItem("dermascan_result", JSON.stringify(result));
      localStorage.setItem("analysisResult", JSON.stringify(result));

      // Save to Supabase history table
      if (session?.user) {
        try {
          await supabase.from("history").insert({
            user_id: session.user.id,
            image_url: uploadedImageUrl || preview,
            filename: selectedFile.name,
            disease: result.disease,
            confidence: result.confidence,
            probabilities: result.probabilities,
          });
        } catch (dbErr) {
          console.warn("Could not insert to Supabase history:", dbErr);
        }
      }

      if (currentUser || session?.user) {
        saveHistory(result, session?.user || currentUser);
      }

      setSuccess("Image analyzed successfully.");

      navigate("/result", {
        state: { result: result },
      });
    } catch (err) {
      console.error("DERMASCAN ERROR:", err);
      if (err instanceof TypeError) {
        setError(
          "Unable to connect to the analysis service. Please refresh your browser or check your network connection."
        );
      } else {
        setError(err.message || "Image analysis failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* TOP HEADER */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={styles.eyebrow}>
            ✦ AI DERMATOLOGICAL SCANNER
          </div>
          <h1 style={styles.mainTitle}>
            Check Your Skin
          </h1>
          <p style={styles.mainSubtitle}>
            Upload a clear close-up photo of the skin lesion to get an AI-assisted condition prediction and tailored diet guide.
          </p>
        </div>

        {/* EMAIL CONFIRMED CELEBRATION BANNER */}
        {emailConfirmedBanner && (
          <div style={styles.confirmedBanner}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "22px" }}>🎉</span>
              <div>
                <div style={{ fontWeight: "700", fontSize: "14.5px", color: "#1c5d29" }}>
                  Email Confirmed Successfully!
                </div>
                <div style={{ fontSize: "13px", color: "#2d753b" }}>
                  Welcome, <strong>{user?.name || user?.email || "User"}</strong>! Your account is active. You are now logged in and ready to scan.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEmailConfirmedBanner(false)}
              style={styles.bannerCloseBtn}
            >
              ✕
            </button>
          </div>
        )}

        {/* NOT LOGGED IN PROMPT BANNER */}
        {!user && (
          <div style={styles.notLoggedBanner}>
            <div>
              <div style={{ fontWeight: "700", color: "#29251f", fontSize: "14px", marginBottom: "3px" }}>
                Sign in to save your clinical history
              </div>
              <div style={{ color: "#746d64", fontSize: "12.5px" }}>
                You can create a free account to track your skin over time.
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <button
                type="button"
                onClick={() => navigate("/register")}
                style={styles.bannerRegisterBtn}
              >
                Create your account →
              </button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                style={styles.bannerLoginBtn}
              >
                Login
              </button>
            </div>
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && <div style={styles.error}>{error}</div>}

        {/* SUCCESS MESSAGE */}
        {success && <div style={styles.success}>{success}</div>}

        {/* MOBILE-RESPONSIVE TWO CARDS */}
        <div style={styles.cardsGrid}>
          {/* =========================================
              CARD 1: PHOTO CAPTURE / UPLOAD
              ========================================= */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.stepBadge}>STEP 01</span>
              <h2 style={styles.cardHeading}>Select Skin Image</h2>
            </div>

            {/* Gallery input: without capture, allows selecting from photos/gallery/files */}
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            {/* Live camera input: opens rear camera directly */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            {!preview ? (
              <div style={styles.dropZone} onClick={openGallery}>
                <div style={styles.uploadIconCircle}>🩺</div>
                <div style={styles.uploadActionText}>Select Skin Photo</div>
                <div style={styles.uploadFormatText}>Choose from your phone's gallery or take a new photo</div>
                
                <div style={styles.uploadButtonsRow}>
                  <button
                    type="button"
                    onClick={openGallery}
                    style={styles.galleryButton}
                  >
                    📁 Choose from Gallery / Files
                  </button>
                  <button
                    type="button"
                    onClick={openCamera}
                    style={styles.cameraButton}
                  >
                    📸 Take Photo with Camera
                  </button>
                </div>
              </div>
            ) : (
              <div style={styles.previewContainer}>
                <img src={preview} alt="Selected skin lesion" style={styles.previewImage} />
                <div style={styles.previewMeta}>
                  <div style={styles.previewFileName}>
                    📄 {selectedFile?.name || "skin-photo.jpg"}
                  </div>
                  <div style={styles.previewActions}>
                    <button
                      type="button"
                      onClick={openGallery}
                      style={styles.changePhotoButton}
                    >
                      📁 Gallery
                    </button>
                    <button
                      type="button"
                      onClick={openCamera}
                      style={styles.changePhotoButton}
                    >
                      📸 Retake
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      style={styles.removePhotoButton}
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =========================================
              CARD 2: CLINICAL TIPS & ANALYZE ACTION
              ========================================= */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.stepBadge}>STEP 02</span>
              <h2 style={styles.cardHeading}>Analyze & Predict</h2>
            </div>

            {/* QUALITY TIPS CHIPS */}
            <div style={styles.tipsBox}>
              <div style={styles.tipsTitle}>💡 For Highest AI Accuracy:</div>
              <div style={styles.tipsGrid}>
                <div style={styles.tipChip}>
                  <span style={{ fontSize: "16px" }}>☀️</span>
                  <span>Good, natural lighting (no dark shadows)</span>
                </div>
                <div style={styles.tipChip}>
                  <span style={{ fontSize: "16px" }}>🎯</span>
                  <span>Keep camera sharp & close to lesion</span>
                </div>
                <div style={styles.tipChip}>
                  <span style={{ fontSize: "16px" }}>✨</span>
                  <span>Unfiltered photo without flash glare</span>
                </div>
              </div>
            </div>

            {/* ANALYZE BUTTON */}
            <div style={{ marginTop: "20px" }}>
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!selectedFile || loading}
                style={{
                  ...styles.analyzeButton,
                  opacity: !selectedFile || loading ? 0.6 : 1,
                  cursor: !selectedFile || loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Analyzing with AI Model..." : "Analyze Skin Image →"}
              </button>

              {loading && (
                <div style={styles.loadingNotice}>
                  <div style={{ fontSize: "18px", marginBottom: "4px" }}>⏳</div>
                  <div>{loadingStatus || "DermaScan deep learning model is analyzing your photo. Please wait..."}</div>
                </div>
              )}

              {!selectedFile && !loading && (
                <div style={styles.hintNotice}>
                  Select or take a skin photo above to enable analysis
                </div>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM MEDICAL DISCLAIMER */}
        <div style={styles.disclaimer}>
          ⓘ <strong>Educational Tool:</strong> DermaScan uses AI pattern recognition for educational purposes. It is not a clinical medical diagnosis. If symptoms persist or cause discomfort, always consult a licensed doctor.
        </div>
      </div>
    </div>
  );
}

// ========================================================
// MOBILE-FIRST RESPONSIVE STYLES
// ========================================================
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f4ee",
    color: "#29251f",
    padding: "24px 14px 70px",
    fontFamily: "Georgia, 'Times New Roman', serif",
    boxSizing: "border-box",
  },
  container: {
    width: "100%",
    maxWidth: "1020px",
    margin: "0 auto",
  },
  eyebrow: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "2px",
    color: "#b95731",
    marginBottom: "8px",
  },
  mainTitle: {
    margin: "0 0 8px",
    fontSize: "clamp(26px, 5vw, 40px)",
    lineHeight: "1.15",
    color: "#29251f",
    fontWeight: "700",
  },
  mainSubtitle: {
    maxWidth: "560px",
    margin: "0 auto",
    fontSize: "14.5px",
    lineHeight: "1.55",
    color: "#625a51",
  },

  // BANNERS
  confirmedBanner: {
    background: "#eef8f0",
    border: "1px solid #b7dfbc",
    padding: "14px 18px",
    borderRadius: "14px",
    marginBottom: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 3px 10px rgba(29, 96, 41, 0.06)",
  },
  bannerCloseBtn: {
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    color: "#1d6029",
    fontWeight: "700",
    padding: "4px 8px",
  },
  notLoggedBanner: {
    background: "#fff9ee",
    border: "1px solid #ebd9c3",
    padding: "14px 16px",
    borderRadius: "14px",
    marginBottom: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  bannerRegisterBtn: {
    background: "#b95731",
    color: "#ffffff",
    border: "none",
    padding: "9px 16px",
    borderRadius: "9px",
    fontWeight: "700",
    fontSize: "12.5px",
    cursor: "pointer",
  },
  bannerLoginBtn: {
    background: "#29251f",
    color: "#ffffff",
    border: "none",
    padding: "9px 14px",
    borderRadius: "9px",
    fontWeight: "600",
    fontSize: "12.5px",
    cursor: "pointer",
  },
  error: {
    background: "#fde8e5",
    border: "1px solid #efb5aa",
    color: "#b42318",
    padding: "14px 16px",
    borderRadius: "12px",
    marginBottom: "18px",
    fontSize: "14px",
    lineHeight: "1.5",
  },
  success: {
    background: "#e8f5e9",
    border: "1px solid #a5d6a7",
    color: "#256029",
    padding: "14px 16px",
    borderRadius: "12px",
    marginBottom: "18px",
    fontSize: "14px",
    lineHeight: "1.5",
  },

  // CARDS GRID (STACKS CLEANLY ON MOBILE)
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    alignItems: "stretch",
  },
  card: {
    background: "#fffdfa",
    border: "1px solid #ded5c8",
    borderRadius: "20px",
    padding: "clamp(18px, 4vw, 30px)",
    boxSizing: "border-box",
    boxShadow: "0 6px 20px rgba(41, 37, 31, 0.04)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardHeader: {
    marginBottom: "16px",
  },
  stepBadge: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "2px",
    color: "#b95731",
    display: "block",
    marginBottom: "4px",
  },
  cardHeading: {
    margin: 0,
    fontSize: "clamp(20px, 3.5vw, 24px)",
    color: "#29251f",
    fontWeight: "700",
  },

  // UPLOAD DROP ZONE
  dropZone: {
    minHeight: "220px",
    border: "2px dashed #cdbfae",
    borderRadius: "16px",
    background: "#faf7f1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background 0.2s, border-color 0.2s",
  },
  uploadIconCircle: {
    fontSize: "42px",
    marginBottom: "12px",
  },
  uploadActionText: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#29251f",
    marginBottom: "4px",
  },
  uploadFormatText: {
    fontSize: "12.5px",
    color: "#756c61",
    marginBottom: "16px",
  },
  uploadButtonsRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    marginTop: "8px",
  },
  galleryButton: {
    background: "#29251f",
    color: "#ffffff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "11px",
    fontSize: "13.5px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(41, 37, 31, 0.2)",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  cameraButton: {
    background: "#b95731",
    color: "#ffffff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "11px",
    fontSize: "13.5px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(185, 87, 49, 0.25)",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  uploadButtonVisual: {
    background: "#29251f",
    color: "#ffffff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "700",
    pointerEvents: "none",
  },

  // PREVIEW CONTAINER
  previewContainer: {
    background: "#faf7f1",
    border: "1px solid #ded5c8",
    borderRadius: "16px",
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    maxHeight: "260px",
    objectFit: "contain",
    borderRadius: "12px",
    background: "#eee5d9",
  },
  previewMeta: {
    width: "100%",
    marginTop: "12px",
    textAlign: "center",
  },
  previewFileName: {
    fontSize: "13px",
    color: "#625a51",
    fontWeight: "600",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    marginBottom: "10px",
  },
  previewActions: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
  },
  changePhotoButton: {
    background: "#eee5d9",
    border: "none",
    color: "#29251f",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "12.5px",
    fontWeight: "700",
    cursor: "pointer",
  },
  removePhotoButton: {
    background: "#fde8e5",
    border: "none",
    color: "#b42318",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "12.5px",
    fontWeight: "700",
    cursor: "pointer",
  },

  // CARD 2: TIPS & BUTTON
  tipsBox: {
    background: "#f7f2ea",
    border: "1px solid #e5d9ca",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "18px",
  },
  tipsTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#29251f",
    marginBottom: "10px",
  },
  tipsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  tipChip: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#524a41",
    lineHeight: "1.4",
  },
  analyzeButton: {
    width: "100%",
    height: "52px",
    background: "#b95731",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    fontSize: "16px",
    fontWeight: "700",
    boxShadow: "0 4px 14px rgba(185, 87, 49, 0.25)",
    transition: "0.2s",
  },
  loadingNotice: {
    textAlign: "center",
    marginTop: "14px",
    color: "#b95731",
    fontSize: "13.5px",
    fontWeight: "600",
    lineHeight: "1.5",
  },
  hintNotice: {
    textAlign: "center",
    marginTop: "10px",
    color: "#91877b",
    fontSize: "12px",
  },
  disclaimer: {
    marginTop: "30px",
    padding: "16px 20px",
    background: "#eee5d9",
    borderRadius: "14px",
    color: "#655c53",
    fontSize: "12px",
    lineHeight: "1.6",
    textAlign: "center",
  },
};
