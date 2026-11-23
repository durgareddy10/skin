import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

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

function readHistory(user) {
  const email = getUserEmail(user);

  console.log("================================");
  console.log("READING DERMASCAN HISTORY");
  console.log("USER:", user);
  console.log("EMAIL:", email);
  console.log("================================");

  let history = [];

  /*
   * First try account-specific history.
   */
  if (email) {
    const userKey =
      `dermascan_history_${email}`;

    console.log(
      "Checking user history key:",
      userKey
    );

    const userHistory =
      localStorage.getItem(userKey);

    if (userHistory) {
      try {
        const parsed =
          JSON.parse(userHistory);

        if (Array.isArray(parsed)) {
          history = parsed;
        }
      } catch (error) {
        console.error(
          "Could not read user history:",
          error
        );
      }
    }
  }

  /*
   * If account history is empty,
   * check common history key.
   */
  if (history.length === 0) {
    console.log(
      "Checking common history key..."
    );

    const commonHistory =
      localStorage.getItem(
        "dermascan_history"
      );

    if (commonHistory) {
      try {
        const parsed =
          JSON.parse(commonHistory);

        if (Array.isArray(parsed)) {
          history = parsed;

          /*
           * If logged in, keep only this
           * user's records.
           */
          if (email) {
            history =
              history.filter(
                (item) =>
                  item?.user?.email ===
                  email
              );
          }
        }
      } catch (error) {
        console.error(
          "Could not read common history:",
          error
        );
      }
    }
  }

  /*
   * Old compatibility keys.
   */
  if (history.length === 0) {
    const oldKeys = [
      "history",
      "analysisHistory",
      "predictionHistory",
    ];

    for (const key of oldKeys) {
      const value =
        localStorage.getItem(key);

      if (!value) continue;

      try {
        const parsed =
          JSON.parse(value);

        if (Array.isArray(parsed)) {
          history = parsed;

          if (email) {
            history =
              history.filter(
                (item) =>
                  !item?.user?.email ||
                  item?.user?.email ===
                    email
              );
          }

          if (history.length > 0) {
            break;
          }
        }
      } catch {
        // Ignore invalid old history
      }
    }
  }

  console.log(
    "FINAL HISTORY:",
    history
  );

  return history;
}

export default function History() {
  const navigate = useNavigate();

  const [user, setUser] =
    useState(null);

  const [history, setHistory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadHistory();

    /*
     * Re-check when user comes back
     * to this page.
     */
    const handleStorage = () => {
      loadHistory();
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  const loadHistory = async () => {
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    const currentUser = session?.user
      ? {
          name:
            session.user.user_metadata?.name ||
            session.user.email.split("@")[0],
          email: session.user.email,
        }
      : getCurrentUser();

    setUser(currentUser);

    // Try fetching from Supabase history table
    if (session?.user) {
      try {
        const { data, error } = await supabase
          .from("history")
          .select("*")
          .order("created_at", { ascending: false });

        if (data && data.length > 0) {
          setHistory(
            data.map((item) => ({
              id: item.id,
              disease: item.disease,
              confidence: Number(item.confidence || 0),
              probabilities: item.probabilities || [],
              image: item.image_url,
              filename: item.filename,
              date: item.created_at,
              user: currentUser,
            }))
          );
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Could not load from Supabase history:", err);
      }
    }

    const savedHistory =
      readHistory(currentUser);

    setHistory(savedHistory);

    setLoading(false);
  };

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    try {
      return new Date(date).toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    } catch {
      return date;
    }
  };

  const getConfidence = (item) => {
    const value =
      Number(item?.confidence || 0);

    if (!Number.isFinite(value)) {
      return 0;
    }

    return value;
  };

  const clearHistory = () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your analysis history?"
      )
    ) {
      return;
    }

    const email =
      getUserEmail(user);

    if (email) {
      localStorage.removeItem(
        `dermascan_history_${email}`
      );
    }

    /*
     * Remove common key too.
     */
    localStorage.removeItem(
      "dermascan_history"
    );

    /*
     * Remove old keys.
     */
    localStorage.removeItem(
      "history"
    );

    localStorage.removeItem(
      "analysisHistory"
    );

    localStorage.removeItem(
      "predictionHistory"
    );

    setHistory([]);
  };

  /*
   * ------------------------------------------------
   * STYLES
   * ------------------------------------------------
   */

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f8f5ef",
      color: "#2b2721",
      fontFamily:
        "Georgia, 'Times New Roman', serif",
      paddingBottom: "80px",
    },

    container: {
      width: "min(1240px, 92%)",
      margin: "0 auto",
      paddingTop: "45px",
    },

    eyebrow: {
      color: "#c5542e",
      fontSize: "13px",
      fontWeight: "700",
      letterSpacing: "4px",
      marginBottom: "15px",
    },

    title: {
      fontSize: "clamp(30px, 6vw, 54px)",
      lineHeight: "1.08",
      margin: "0 0 14px",
      color: "#29251f",
    },

    subtitle: {
      fontSize: "16px",
      color: "#625a51",
      marginBottom: "32px",
    },

    card: {
      background: "#fffdfa",
      border:
        "1px solid #ded5c8",
      borderRadius: "22px",
      padding: "clamp(18px, 4vw, 36px)",
      marginBottom: "25px",
    },

    empty: {
      minHeight: "400px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
    },

    icon: {
      width: "74px",
      height: "74px",
      borderRadius: "50%",
      background: "#eee5d7",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "28px",
      marginBottom: "25px",
    },

    emptyTitle: {
      fontSize: "38px",
      margin: "0 0 15px",
    },

    emptyText: {
      color: "#70675e",
      fontSize: "17px",
      marginBottom: "28px",
    },

    button: {
      border: "none",
      borderRadius: "12px",
      background: "#29251f",
      color: "#fff",
      padding: "15px 25px",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
    },

    topRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
      marginBottom: "25px",
    },

    historyCount: {
      color: "#6c6259",
      fontSize: "16px",
    },

    clearButton: {
      border:
        "1px solid #d5c9bb",
      borderRadius: "10px",
      background: "transparent",
      color: "#7b3d29",
      padding: "10px 18px",
      cursor: "pointer",
      fontSize: "14px",
    },

    item: {
      border:
        "1px solid #ded5c8",
      borderRadius: "18px",
      padding: "25px",
      marginBottom: "18px",
      background: "#fffdfa",
    },

    itemTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "20px",
      flexWrap: "wrap",
    },

    disease: {
      fontSize: "25px",
      fontWeight: "700",
      marginBottom: "8px",
    },

    date: {
      color: "#776e65",
      fontSize: "14px",
    },

    confidence: {
      color: "#c5542e",
      fontSize: "22px",
      fontWeight: "700",
    },

    file: {
      marginTop: "15px",
      color: "#665d54",
      fontSize: "14px",
    },

    image: {
      width: "130px",
      height: "100px",
      objectFit: "cover",
      borderRadius: "12px",
      border:
        "1px solid #ded5c8",
      marginTop: "18px",
    },
  };

  /*
   * ------------------------------------------------
   * UI
   * ------------------------------------------------
   */

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <div style={styles.eyebrow}>
          YOUR DERMASCAN
        </div>

        <h1 style={styles.title}>
          Analysis History
        </h1>

        <div style={styles.subtitle}>
          Your previous skin analysis
          results.
        </div>

        {loading ? (
          <div style={styles.card}>
            <div style={styles.empty}>
              <h2 style={styles.emptyTitle}>
                Loading history...
              </h2>
            </div>
          </div>
        ) : history.length === 0 ? (

          /*
           * EMPTY HISTORY
           */

          <div style={styles.card}>
            <div style={styles.empty}>

              <div style={styles.icon}>
                ✦
              </div>

              <h2
                style={styles.emptyTitle}
              >
                No analysis yet.
              </h2>

              <p
                style={styles.emptyText}
              >
                Once you analyze a skin
                image, your prediction
                will appear here.
              </p>

              <button
                type="button"
                style={styles.button}
                onClick={() =>
                  navigate(
                    "/check-skin"
                  )
                }
              >
                Analyze My Skin →
              </button>

            </div>
          </div>

        ) : (

          /*
           * HISTORY LIST
           */

          <div>

            <div style={styles.topRow}>
              <div
                style={styles.historyCount}
              >
                {history.length}{" "}
                {history.length === 1
                  ? "analysis"
                  : "analyses"}{" "}
                saved
              </div>

              <button
                type="button"
                style={
                  styles.clearButton
                }
                onClick={
                  clearHistory
                }
              >
                Clear History
              </button>
            </div>

            {history.map(
              (item, index) => (
                <div
                  key={
                    item.id ||
                    `${item.date}-${index}`
                  }
                  style={styles.item}
                >

                  <div
                    style={
                      styles.itemTop
                    }
                  >

                    <div>
                      <div
                        style={
                          styles.disease
                        }
                      >
                        {item.disease ||
                          "Unknown"}
                      </div>

                      <div
                        style={
                          styles.date
                        }
                      >
                        {formatDate(
                          item.date ||
                            item.analyzedAt
                        )}
                      </div>
                    </div>

                    <div
                      style={
                        styles.confidence
                      }
                    >
                      {getConfidence(
                        item
                      ).toFixed(2)}
                      %
                    </div>

                  </div>

                  {item.filename && (
                    <div
                      style={
                        styles.file
                      }
                    >
                      Image:{" "}
                      {item.filename}
                    </div>
                  )}

                  {item.image && (
                    <img
                      src={item.image}
                      alt="Analyzed skin"
                      style={
                        styles.image
                      }
                    />
                  )}

                </div>
              )
            )}

          </div>
        )}

      </div>
    </div>
  );
}