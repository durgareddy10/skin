import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/check-skin`;

      const { data, error: authError } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: {
            name: form.name.trim(),
          },
          emailRedirectTo: redirectUrl,
        },
      });

      if (authError) {
        setError(authError.message || "Registration failed.");
        setLoading(false);
        return;
      }

      // If Supabase has "Confirm email" enabled, data.session is null
      if (data.user && !data.session) {
        setSuccess(true);
        // Automatically attempt to open Gmail in a new tab for seamless user experience
        try {
          window.open("https://mail.google.com", "_blank");
        } catch {
          // If popup blocker stops it, the visible button is ready
        }
        return;
      }

      // If email confirmation is disabled, user is immediately logged in
      const user = {
        id: data.user?.id || form.email.trim(),
        name: form.name.trim(),
        email: form.email.trim(),
      };
      localStorage.setItem("dermascan_user", JSON.stringify(user));
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("authUser", JSON.stringify(user));
      localStorage.setItem("dermascan_logged_in", "true");
      localStorage.setItem("isLoggedIn", "true");
      if (data.session?.access_token) {
        localStorage.setItem("token", data.session.access_token);
        localStorage.setItem("dermascan_token", data.session.access_token);
      }

      window.dispatchEvent(new Event("authChanged"));
      window.dispatchEvent(new Event("auth-change"));

      navigate("/check-skin");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Cannot connect to Supabase.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setResendMessage("");
    try {
      const { error: resendErr } = await supabase.auth.resend({
        type: "signup",
        email: form.email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/check-skin`,
        },
      });

      if (resendErr) {
        setResendMessage(`Error: ${resendErr.message}`);
      } else {
        setResendMessage("Confirmation email resent successfully! Please check your inbox.");
      }
    } catch {
      setResendMessage("Could not resend confirmation email.");
    } finally {
      setResending(false);
    }
  };

  // =====================================================
  // EMAIL CONFIRMATION SCREEN ("Directly go to Gmail")
  // =====================================================
  if (success) {
    const isGmail = form.email.toLowerCase().includes("@gmail.com");
    const mailUrl = isGmail ? "https://mail.google.com" : `https://${form.email.split("@")[1] || "mail.google.com"}`;

    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.eyebrow}>DERMASCAN ACCOUNT</div>
            <h1 style={styles.title}>Check your email.</h1>
            <p style={styles.subtitle}>
              We have sent an activation link to <strong>{form.email}</strong>.
            </p>
          </div>

          <div style={{ ...styles.card, textAlign: "center", padding: "50px 35px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "#fdf2ed",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "38px",
                marginBottom: "24px",
                border: "1px solid #f2c7b5",
              }}
            >
              ✉️
            </div>

            <h2 style={{ fontSize: "28px", color: "#28241f", margin: "0 0 14px", fontFamily: "Georgia, serif" }}>
              Confirm your email address
            </h2>

            <p style={{ color: "#746d64", fontSize: "16px", lineHeight: "1.6", maxWidth: "480px", margin: "0 auto 28px" }}>
              We've sent a verification email to <strong>{form.email}</strong>. Click the confirmation link inside the email to activate your account.
            </p>

            <div
              style={{
                background: "#f9f6f0",
                border: "1px dashed #dcd3c7",
                borderRadius: "14px",
                padding: "16px 20px",
                maxWidth: "460px",
                margin: "0 auto 28px",
                fontSize: "14px",
                color: "#6b6257",
              }}
            >
              💡 <strong>What happens next:</strong> Clicking the confirmation link in your email will immediately open the DermaScan website and automatically log you in without any extra steps!
            </div>

            {/* DIRECT GO TO GMAIL BUTTON */}
            <div>
              <a
                href={mailUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  width: "100%",
                  maxWidth: "340px",
                  padding: "16px 28px",
                  background: "#bd522c",
                  color: "#ffffff",
                  textDecoration: "none",
                  borderRadius: "12px",
                  fontSize: "16px",
                  fontWeight: "700",
                  boxShadow: "0 4px 14px rgba(189, 82, 44, 0.3)",
                  marginBottom: "18px",
                  boxSizing: "border-box",
                }}
              >
                {isGmail ? "Open Gmail ↗" : "Open Email Provider ↗"}
              </a>
            </div>

            {/* RESEND LINK */}
            <div style={{ marginTop: "10px" }}>
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                style={{
                  background: "none",
                  border: "none",
                  color: "#635a51",
                  fontSize: "14px",
                  cursor: resending ? "not-allowed" : "pointer",
                  textDecoration: "underline",
                }}
              >
                {resending ? "Resending link..." : "Didn't receive the email? Resend"}
              </button>
            </div>

            {resendMessage && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  background: resendMessage.startsWith("Error") ? "#fce9e5" : "#e8f5e9",
                  color: resendMessage.startsWith("Error") ? "#b23e25" : "#2e7d32",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {resendMessage}
              </div>
            )}

            <div style={{ borderTop: "1px solid #eee5d9", marginTop: "35px", paddingTop: "25px" }}>
              <Link to="/login" style={{ color: "#bd522c", textDecoration: "none", fontSize: "14px", fontWeight: "700" }}>
                ← Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // REGISTRATION FORM
  // =====================================================
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.eyebrow}>YOUR DERMASCAN</div>
          <h1 style={styles.title}>Create your account.</h1>
          <p style={styles.subtitle}>
            Create your DermaScan account to analyze skin images and keep your clinical prediction history.
          </p>
        </div>

        <div style={styles.card}>
          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>FULL NAME</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              style={styles.input}
              autoComplete="name"
            />

            <label style={styles.label}>EMAIL ADDRESS</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              style={styles.input}
              autoComplete="email"
            />

            <label style={styles.label}>PASSWORD</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password (min. 6 characters)"
              style={styles.input}
              autoComplete="new-password"
            />

            <label style={styles.label}>CONFIRM PASSWORD</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              style={styles.input}
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Creating your account..." : "Create your account →"}
            </button>
          </form>

          <div style={styles.divider}></div>

          <div style={styles.loginText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.loginLink}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f4ee",
    padding: "70px 20px 100px",
    boxSizing: "border-box",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  container: {
    width: "100%",
    maxWidth: "680px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  eyebrow: {
    fontSize: "12px",
    letterSpacing: "3px",
    color: "#bd522c",
    fontWeight: "700",
    marginBottom: "12px",
  },
  title: {
    margin: "0",
    fontSize: "clamp(30px, 6vw, 48px)",
    lineHeight: "1.1",
    color: "#28241f",
    fontWeight: "700",
  },
  subtitle: {
    maxWidth: "540px",
    margin: "14px auto 0",
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#746d64",
  },
  card: {
    background: "#fffdfa",
    border: "1px solid #ddd3c5",
    borderRadius: "22px",
    padding: "clamp(20px, 5vw, 40px)",
    boxSizing: "border-box",
    boxShadow: "0 15px 40px rgba(50,40,30,0.04)",
  },
  error: {
    background: "#fce9e5",
    border: "1px solid #efc1b5",
    color: "#b23e25",
    padding: "15px 18px",
    borderRadius: "12px",
    marginBottom: "24px",
    fontSize: "14px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    letterSpacing: "2.5px",
    fontWeight: "700",
    color: "#635a51",
    marginBottom: "9px",
    marginTop: "20px",
  },
  input: {
    width: "100%",
    height: "56px",
    boxSizing: "border-box",
    border: "1px solid #ddd3c5",
    borderRadius: "12px",
    background: "#fffdfa",
    padding: "0 17px",
    fontSize: "15px",
    outline: "none",
    color: "#28241f",
  },
  button: {
    width: "100%",
    height: "58px",
    marginTop: "30px",
    border: "none",
    borderRadius: "12px",
    background: "#bd522c",
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(189, 82, 44, 0.25)",
  },
  divider: {
    height: "1px",
    background: "#ddd3c5",
    margin: "30px 0",
  },
  loginText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#746d64",
  },
  loginLink: {
    color: "#bd522c",
    fontWeight: "700",
    textDecoration: "none",
  },
};
