import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
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
        return {
          email: value,
        };
      }
    }
  }

  return null;
}

function getUserEmail(user) {
  if (!user) return null;

  return (
    user.email ||
    user.emailAddress ||
    user.username ||
    null
  );
}

function getUserName(user) {
  if (!user) return "User";

  return (
    user.name ||
    user.fullName ||
    user.username ||
    "User"
  );
}

/*
|--------------------------------------------------------------------------
| SAVE HISTORY
|--------------------------------------------------------------------------
*/

function saveHistory(result, user) {
  const email = getUserEmail(user);

  if (!email) {
    console.warn(
      "No user email found. History cannot be linked to account."
    );
    return;
  }

  const historyKey =
    `dermascan_history_${email}`;

  let history = [];

  try {
    const existing =
      localStorage.getItem(historyKey);

    if (existing) {
      history = JSON.parse(existing);

      if (!Array.isArray(history)) {
        history = [];
      }
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

    disease:
      result.disease ||
      result.predicted_class ||
      result.prediction ||
      "Unknown",

    confidence:
      Number(result.confidence || 0),

    probabilities:
      Array.isArray(result.probabilities)
        ? result.probabilities
        : [],

    image:
      result.imagePreview || null,

    filename:
      result.filename ||
      selectedFileName(result) ||
      "skin-image",

    date:
      new Date().toISOString(),
  };

  history.unshift(historyItem);

  history = history.slice(0, 50);

  localStorage.setItem(
    historyKey,
    JSON.stringify(history)
  );

  /*
   * Compatibility key
   */
  localStorage.setItem(
    "dermascan_history",
    JSON.stringify(history)
  );

  console.log(
    "HISTORY SAVED:",
    historyItem
  );
}

function selectedFileName(result) {
  return (
    result.uploadedFileName ||
    result.fileName ||
    null
  );
}

/*
|--------------------------------------------------------------------------
| CHECK SKIN PAGE
|--------------------------------------------------------------------------
*/

export default function CheckSkin() {
  const navigate = useNavigate();

  const fileInputRef =
    useRef(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [user, setUser] =
    useState(null);

  /*
  |--------------------------------------------------------------------------
  | LOAD LOGGED-IN USER
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const currentUser =
      getCurrentUser();

    setUser(currentUser);

    console.log(
      "DERMASCAN USER:",
      currentUser
    );

    const token =
      localStorage.getItem("token");

    console.log(
      "TOKEN EXISTS:",
      !!token
    );

    if (token) {
      console.log(
        "AUTH TOKEN FOUND"
      );
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | SELECT IMAGE
  |--------------------------------------------------------------------------
  */

  const handleFileChange = (event) => {
    setError("");
    setSuccess("");

    const file =
      event.target.files &&
      event.target.files[0];

    if (!file) {
      return;
    }

    console.log(
      "SELECTED IMAGE:",
      file.name
    );

    console.log(
      "IMAGE TYPE:",
      file.type
    );

    console.log(
      "IMAGE SIZE:",
      file.size
    );

    /*
     * Validate type
     */

    if (
      !ALLOWED_TYPES.includes(
        file.type.toLowerCase()
      )
    ) {
      setError(
        "Please select a JPG, JPEG, PNG or WEBP image."
      );

      event.target.value = "";

      return;
    }

    /*
     * Validate size
     */

    if (
      file.size > MAX_FILE_SIZE
    ) {
      setError(
        "Image size must be less than 10 MB."
      );

      event.target.value = "";

      return;
    }

    setSelectedFile(file);

    /*
     * Create image preview
     */

    const reader =
      new FileReader();

    reader.onload = (e) => {
      setPreview(
        e.target.result
      );
    };

    reader.onerror = () => {
      setError(
        "Could not preview the selected image."
      );
    };

    reader.readAsDataURL(file);
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN FILE SELECTOR
  |--------------------------------------------------------------------------
  */

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /*
  |--------------------------------------------------------------------------
  | ANALYZE IMAGE
  |--------------------------------------------------------------------------
  */

  const handleAnalyze = async () => {
    setError("");
    setSuccess("");

    /*
     * Check image
     */

    if (!selectedFile) {
      setError(
        "Please select a skin image first."
      );

      return;
    }

    /*
     * Get latest user
     */

    const currentUser =
      getCurrentUser();

    if (currentUser) {
      setUser(currentUser);
    }

    /*
     * Check login token
     */

    const token =
      localStorage.getItem("token");

    console.log(
      "========================================"
    );

    console.log(
      "DERMASCAN ANALYSIS"
    );

    console.log(
      "User:",
      currentUser
    );

    console.log(
      "Token exists:",
      !!token
    );

    console.log(
      "Image:",
      selectedFile.name
    );

    console.log(
      "========================================"
    );

    /*
     * Do not stop here if token exists.
     */

    if (!token) {
      setError(
        "Please login before analysing an image."
      );

      return;
    }

    setLoading(true);

    try {
      /*
       * ---------------------------------------
       * FORM DATA
       * ---------------------------------------
       */

      const formData =
        new FormData();

      formData.append(
        "image",
        selectedFile
      );

      /*
       * ---------------------------------------
       * SEND TO BACKEND
       *
       * IMPORTANT:
       * The URL is still used internally.
       * It is simply NOT displayed on screen.
       * ---------------------------------------
       */

      console.log(
        "Sending image to backend..."
      );

      const response =
        await fetch(
          `${API_URL}/api/predict`,
          {
            method: "POST",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            body: formData,
          }
        );

      console.log(
        "HTTP STATUS:",
        response.status
      );

      /*
       * Read response
       */

      const responseText =
        await response.text();

      console.log(
        "BACKEND RESPONSE:",
        responseText
      );

      let data;

      try {
        data =
          JSON.parse(
            responseText
          );
      } catch {
        throw new Error(
          `Backend returned an invalid response. HTTP ${response.status}`
        );
      }

      /*
       * ---------------------------------------
       * ERROR FROM BACKEND
       * ---------------------------------------
       */

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Backend error: HTTP ${response.status}`
        );
      }

      if (
        data.success === false
      ) {
        throw new Error(
          data.message ||
            "The backend could not analyse this image."
        );
      }

      /*
       * ---------------------------------------
       * GET PREDICTION
       * ---------------------------------------
       */

      const disease =
        data.disease ||
        data.predicted_class ||
        data.prediction ||
        data.class_name ||
        "Unknown";

      const confidence =
        Number(
          data.confidence ?? 0
        );

      let probabilities =
        data.probabilities ||
        data.predictions ||
        [];

      /*
       * Make sure probabilities
       * are numbers.
       */

      if (
        Array.isArray(
          probabilities
        )
      ) {
        probabilities =
          probabilities.map(
            (value) =>
              Number(value)
          );
      } else {
        probabilities = [];
      }

      /*
       * ---------------------------------------
       * PREPARE RESULT
       * ---------------------------------------
       */

      const result = {
        ...data,

        success: true,

        disease:
          disease,

        confidence:
          Number.isFinite(
            confidence
          )
            ? confidence
            : 0,

        probabilities:
          probabilities,

        filename:
          selectedFile.name,

        uploadedFileName:
          selectedFile.name,

        imagePreview:
          preview,

        user: currentUser
          ? {
              name:
                getUserName(
                  currentUser
                ),

              email:
                getUserEmail(
                  currentUser
                ),
            }
          : null,

        analyzedAt:
          new Date().toISOString(),
      };

      console.log(
        "========================================"
      );

      console.log(
        "PREDICTION SUCCESS"
      );

      console.log(
        "Disease:",
        result.disease
      );

      console.log(
        "Confidence:",
        result.confidence
      );

      console.log(
        "Probabilities:",
        result.probabilities
      );

      console.log(
        "========================================"
      );

      /*
       * ---------------------------------------
       * SAVE RESULT
       * ---------------------------------------
       */

      localStorage.setItem(
        "dermascan_result",
        JSON.stringify(result)
      );

      localStorage.setItem(
        "analysisResult",
        JSON.stringify(result)
      );

      localStorage.setItem(
        "predictionResult",
        JSON.stringify(result)
      );

      /*
       * ---------------------------------------
       * SAVE HISTORY
       * ---------------------------------------
       */

      if (currentUser) {
        saveHistory(
          result,
          currentUser
        );
      }

      setSuccess(
        "Image analyzed successfully."
      );

      /*
       * ---------------------------------------
       * GO TO RESULT PAGE
       * ---------------------------------------
       */

      navigate(
        "/result",
        {
          state: {
            result: result,
          },
        }
      );

    } catch (err) {
      console.error(
        "========================================"
      );

      console.error(
        "DERMASCAN ERROR:",
        err
      );

      console.error(
        "========================================"
      );

      if (
        err instanceof TypeError
      ) {
        setError(
          "Cannot connect to DermaScan backend. Please make sure the Flask server is running."
        );
      } else {
        setError(
          err.message ||
            "Image analysis failed."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | REMOVE IMAGE
  |--------------------------------------------------------------------------
  */

  const handleRemoveImage = () => {
    setSelectedFile(null);

    setPreview("");

    setError("");

    setSuccess("");

    if (fileInputRef.current) {
      fileInputRef.current.value =
        "";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | STYLES
  |--------------------------------------------------------------------------
  */

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f8f5ef",
      color: "#2b2721",
      paddingBottom: "80px",
      fontFamily:
        "Georgia, 'Times New Roman', serif",
    },

    container: {
      width:
        "min(1400px, 94%)",
      margin: "0 auto",
      paddingTop: "45px",
    },

    intro: {
      textAlign: "center",
      fontSize: "20px",
      color: "#625a51",
      marginBottom: "35px",
    },

    error: {
      background: "#fde8e5",
      border:
        "1px solid #efb5aa",
      color: "#b42318",
      padding:
        "16px 20px",
      borderRadius: "14px",
      marginBottom: "25px",
      fontSize: "17px",
    },

    success: {
      background: "#e8f5e9",
      border:
        "1px solid #a5d6a7",
      color: "#256029",
      padding:
        "16px 20px",
      borderRadius: "14px",
      marginBottom: "25px",
      fontSize: "17px",
    },

    grid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(420px, 1fr))",
      gap: "30px",
      alignItems: "stretch",
    },

    card: {
      background: "#fffdfa",
      border:
        "1px solid #ded5c8",
      borderRadius: "22px",
      padding: "40px",
      boxSizing: "border-box",
    },

    step: {
      color: "#c5542e",
      fontSize: "13px",
      fontWeight: "700",
      letterSpacing: "4px",
      marginBottom: "18px",
    },

    heading: {
      fontSize: "42px",
      lineHeight: "1.1",
      margin:
        "0 0 30px 0",
      color: "#29251f",
    },

    uploadBox: {
      minHeight: "430px",
      border:
        "2px dashed #cdbfae",
      borderRadius: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      cursor: "pointer",
      overflow: "hidden",
      background: "#faf7f1",
    },

    preview: {
      width: "100%",
      height: "430px",
      objectFit: "contain",
      background: "#eee5d7",
      borderRadius: "14px",
    },

    fileName: {
      marginTop: "18px",
      fontSize: "14px",
      color: "#655c53",
      wordBreak:
        "break-word",
      textAlign: "center",
    },

    advice: {
      background: "#eee5d7",
      borderRadius: "18px",
      padding: "25px",
      marginBottom: "25px",
      color: "#5c554d",
      fontSize: "17px",
      lineHeight: "1.7",
    },

    button: {
      width: "100%",
      border: "none",
      borderRadius: "13px",
      padding:
        "18px 20px",
      background: "#29251f",
      color: "#ffffff",
      fontSize: "17px",
      fontWeight: "700",
      cursor: "pointer",
    },

    secondaryButton: {
      width: "100%",
      border:
        "1px solid #cfc3b3",
      borderRadius: "13px",
      padding:
        "15px 20px",
      background:
        "transparent",
      color: "#2b2721",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "12px",
    },

    disabledButton: {
      opacity: 0.55,
      cursor:
        "not-allowed",
    },

    footerNote: {
      marginTop: "35px",
      padding: "20px",
      background: "#eee5d7",
      borderRadius: "15px",
      textAlign: "center",
      color: "#655c53",
      fontSize: "14px",
    },
  };

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div
      style={styles.page}
    >
      <div
        style={
          styles.container
        }
      >

        {/* INTRO */}

        <div
          style={styles.intro}
        >
          Upload a clear image
          of the affected skin
          area and let DermaScan
          analyze it.
        </div>

        {/* ERROR */}

        {error && (
          <div
            style={styles.error}
          >
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div
            style={
              styles.success
            }
          >
            {success}
          </div>
        )}

        {/* MAIN GRID */}

        <div
          style={styles.grid}
        >

          {/* =================================
              STEP 01
              ================================= */}

          <div
            style={styles.card}
          >

            <div
              style={styles.step}
            >
              STEP 01
            </div>

            <h1
              style={
                styles.heading
              }
            >
              Upload an image
            </h1>

            <input
              ref={fileInputRef}
              type="file"
              accept="
                .jpg,
                .jpeg,
                .png,
                .webp,
                image/jpeg,
                image/png,
                image/webp
              "
              onChange={
                handleFileChange
              }
              style={{
                display: "none",
              }}
            />

            <div
              onClick={
                openFileSelector
              }
              style={
                styles.uploadBox
              }
            >

              {preview ? (
                <img
                  src={preview}
                  alt="Selected skin"
                  style={
                    styles.preview
                  }
                />
              ) : (
                <>
                  <div
                    style={{
                      fontSize:
                        "58px",
                      marginBottom:
                        "18px",
                    }}
                  >
                    📷
                  </div>

                  <div
                    style={{
                      fontSize:
                        "22px",
                      fontWeight:
                        "700",
                      marginBottom:
                        "10px",
                    }}
                  >
                    Choose a skin
                    image
                  </div>

                  <div
                    style={{
                      color:
                        "#766d63",
                      fontSize:
                        "15px",
                    }}
                  >
                    JPG, JPEG,
                    PNG or WEBP
                  </div>

                  <div
                    style={{
                      color:
                        "#766d63",
                      fontSize:
                        "14px",
                      marginTop:
                        "6px",
                    }}
                  >
                    Maximum size:
                    10 MB
                  </div>
                </>
              )}

            </div>

            {selectedFile && (
              <>
                <div
                  style={
                    styles.fileName
                  }
                >
                  Selected file:{" "}
                  <strong>
                    {
                      selectedFile.name
                    }
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={
                    handleRemoveImage
                  }
                  style={
                    styles.secondaryButton
                  }
                >
                  Remove Image
                </button>
              </>
            )}

          </div>

          {/* =================================
              STEP 02
              ================================= */}

          <div
            style={styles.card}
          >

            <div
              style={styles.step}
            >
              STEP 02
            </div>

            <h1
              style={
                styles.heading
              }
            >
              Analyze image
            </h1>

            <div
              style={styles.advice}
            >

              <strong>
                For better results:
              </strong>

              <ul>
                <li>
                  Use a clear image.
                </li>

                <li>
                  Keep the affected
                  area visible.
                </li>

                <li>
                  Avoid blurry
                  images.
                </li>

                <li>
                  Use good lighting.
                </li>
              </ul>

            </div>

            {/* 
              BACKEND BOX REMOVED
              
              The backend URL is still used internally
              when handleAnalyze() sends the image.
            */}

            <button
              type="button"
              onClick={
                handleAnalyze
              }
              disabled={
                !selectedFile ||
                loading
              }
              style={{
                ...styles.button,

                ...(
                  !selectedFile ||
                  loading
                    ? styles.disabledButton
                    : {}
                ),
              }}
            >
              {loading
                ? "Analyzing Image..."
                : "Analyze Image →"}
            </button>

            {loading && (
              <div
                style={{
                  textAlign:
                    "center",
                  marginTop:
                    "20px",
                  color:
                    "#b9542f",
                  fontSize:
                    "15px",
                }}
              >
                DermaScan is
                processing your
                image. Please wait...
              </div>
            )}

          </div>

        </div>

        {/* FOOTER NOTE */}

        <div
          style={
            styles.footerNote
          }
        >
          DermaScan provides an
          AI-assisted classification
          result and is not a medical
          diagnosis. If you have
          concerning, worsening, or
          persistent symptoms,
          consult a qualified
          healthcare professional.
        </div>

      </div>
    </div>
  );
}