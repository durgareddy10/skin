import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isUnconfirmed, setIsUnconfirmed] = useState(false);
  const [isInvalidCreds, setIsInvalidCreds] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setIsUnconfirmed(false);
    setIsInvalidCreds(false);
    setResendMsg("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) {
        const msg = authError.message || "";
        if (msg.toLowerCase().includes("email not confirmed") || authError.code === "email_not_confirmed") {
          setIsUnconfirmed(true);
          return;
        }
        if (msg.toLowerCase().includes("invalid login credentials")) {
          setIsInvalidCreds(true);
          setError("Invalid email or password.");
          return;
        }
        throw new Error(msg || "Invalid email or password.");
      }

      const session = data.session;
      const authUser = data.user;

      const user = {
        id: authUser?.id || email.trim(),
        name: authUser?.user_metadata?.name || email.split("@")[0].trim(),
        email: authUser?.email || email.trim(),
      };

      // Compatibility cache
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("dermascan_user", JSON.stringify(user));
      localStorage.setItem("authUser", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("dermascan_logged_in", "true");
      if (session?.access_token) {
        localStorage.setItem("token", session.access_token);
        localStorage.setItem("dermascan_token", session.access_token);
      }

      window.dispatchEvent(new Event("authChanged"));
      window.dispatchEvent(new Event("auth-change"));

      navigate("/check-skin");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!email.trim()) {
      setResendMsg("Please enter your email above first.");
      return;
    }
    setResending(true);
    setResendMsg("");
    try {
      const { error: resendErr } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/check-skin`,
        },
      });
      if (resendErr) {
        setResendMsg(`Error: ${resendErr.message}`);
      } else {
        setResendMsg("Confirmation link resent! Please check your Gmail.");
      }
    } catch {
      setResendMsg("Could not resend email right now.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f5ef",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "550px",
          background: "#fffdfa",
          border: "1px solid #ded5c8",
          borderRadius: "22px",
          padding: "clamp(22px, 5vw, 42px)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "#c5542e",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "3px",
            marginBottom: "12px",
          }}
        >
          YOUR DERMASCAN
        </div>

        <h1
          style={{
            textAlign: "center",
            fontSize: "clamp(30px, 6vw, 46px)",
            margin: "0 0 10px",
            color: "#29251f",
          }}
        >
          Welcome back.
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#625a51",
            fontSize: "16px",
            marginBottom: "32px",
          }}
        >
          Login to continue using DermaScan.
        </p>

        {/* UNCONFIRMED EMAIL BANNER */}
        {isUnconfirmed && (
          <div
            style={{
              background: "#fff8ec",
              border: "1px solid #f0cd8d",
              borderRadius: "14px",
              padding: "20px",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "20px" }}>✉️</span>
              <strong style={{ color: "#8a5800", fontSize: "16px" }}>Email Not Confirmed Yet</strong>
            </div>
            <p style={{ margin: "0 0 16px", color: "#6e4600", fontSize: "14px", lineHeight: "1.5" }}>
              Your account has been created, but your email address has not been verified yet. Please check your inbox or open Gmail directly to activate your account.
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href="https://mail.google.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "10px 18px",
                  background: "#bd522c",
                  color: "#ffffff",
                  textDecoration: "none",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "700",
                  boxShadow: "0 2px 8px rgba(189, 82, 44, 0.25)",
                }}
              >
                Open Gmail ↗
              </a>
              <button
                type="button"
                onClick={handleResendConfirmation}
                disabled={resending}
                style={{
                  padding: "10px 16px",
                  background: "#ffffff",
                  border: "1px solid #d4c5b3",
                  borderRadius: "10px",
                  color: "#463d35",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: resending ? "not-allowed" : "pointer",
                }}
              >
                {resending ? "Resending..." : "Resend Confirmation"}
              </button>
            </div>
            {resendMsg && (
              <div style={{ marginTop: "12px", fontSize: "13px", color: resendMsg.startsWith("Error") ? "#b42318" : "#2e7d32", fontWeight: "600" }}>
                {resendMsg}
              </div>
            )}
          </div>
        )}

        {/* INVALID CREDENTIALS / NOT REGISTERED BANNER */}
        {isInvalidCreds && (
          <div
            style={{
              background: "#fde8e5",
              border: "1px solid #efb5aa",
              color: "#b42318",
              padding: "18px",
              borderRadius: "14px",
              marginBottom: "24px",
            }}
          >
            <div style={{ fontWeight: "700", marginBottom: "6px" }}>Invalid email or password.</div>
            <div style={{ fontSize: "14px", color: "#7a1a10", marginBottom: "12px" }}>
              If you do not have an account yet, please create one first.
            </div>
            <button
              type="button"
              onClick={() => navigate("/register")}
              style={{
                background: "#bd522c",
                color: "#ffffff",
                border: "none",
                borderRadius: "9px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Create your account →
            </button>
          </div>
        )}

        {error && !isInvalidCreds && !isUnconfirmed && (
          <div
            style={{
              background: "#fde8e5",
              border: "1px solid #efb5aa",
              color: "#b42318",
              padding: "15px 18px",
              borderRadius: "12px",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label
            style={{
              display: "block",
              marginBottom: "9px",
              fontSize: "12px",
              letterSpacing: "2.5px",
              fontWeight: "700",
              color: "#524a41",
            }}
          >
            EMAIL ADDRESS
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            style={{
              width: "100%",
              padding: "16px",
              border: "1px solid #d8cdbc",
              borderRadius: "13px",
              boxSizing: "border-box",
              marginBottom: "22px",
              fontSize: "16px",
              background: "#fffdfa",
              color: "#29251f",
              outline: "none",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "9px",
              fontSize: "12px",
              letterSpacing: "2.5px",
              fontWeight: "700",
              color: "#524a41",
            }}
          >
            PASSWORD
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            style={{
              width: "100%",
              padding: "16px",
              border: "1px solid #d8cdbc",
              borderRadius: "13px",
              boxSizing: "border-box",
              marginBottom: "25px",
              fontSize: "16px",
              background: "#fffdfa",
              color: "#29251f",
              outline: "none",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "18px",
              border: "none",
              borderRadius: "13px",
              background: "#29251f",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              transition: "0.2s",
            }}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>

        {/* DON'T HAVE AN ACCOUNT PROMINENT BOX */}
        <div
          style={{
            textAlign: "center",
            marginTop: "32px",
            padding: "22px 20px",
            background: "#f6f1e8",
            border: "1px dashed #d8cdbc",
            borderRadius: "16px",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              color: "#6b6257",
              marginBottom: "12px",
            }}
          >
            Don't have an account?
          </div>
          <button
            type="button"
            onClick={() => navigate("/register")}
            style={{
              border: "none",
              background: "#bd522c",
              color: "#ffffff",
              padding: "12px 26px",
              borderRadius: "10px",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "14px",
              boxShadow: "0 3px 10px rgba(189, 82, 44, 0.25)",
            }}
          >
            Create your account →
          </button>
        </div>
      </div>
    </div>
  );
}
