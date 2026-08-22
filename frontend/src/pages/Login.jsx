import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      console.log("LOGIN STARTED");
      console.log("Email:", email);

      /*
       * Try Flask login endpoint.
       */
      const response = await fetch(
        `${API_URL}/api/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

      const text = await response.text();

      console.log("LOGIN RESPONSE:", text);

      let data = {};

      try {
        data = JSON.parse(text);
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Invalid email or password."
        );
      }

      /*
       * Create ONE standard user object.
       */
      const user = {
        id:
          data.user?.id ||
          data.id ||
          email.trim(),

        name:
          data.user?.name ||
          data.name ||
          data.user?.fullName ||
          email
            .split("@")[0]
            .trim(),

        email:
          data.user?.email ||
          data.email ||
          email.trim(),
      };

      console.log("LOGGED-IN USER:", user);

      /*
       * IMPORTANT
       *
       * Save the SAME user under all keys
       * used by the existing frontend.
       */
      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "dermascan_user",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "authUser",
        JSON.stringify(user)
      );

      /*
       * Simple login flag.
       */
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "dermascan_logged_in",
        "true"
      );

      /*
       * Save token if backend gives one.
       */
      if (data.token) {
        localStorage.setItem(
          "token",
          data.token
        );
      }

      /*
       * Tell other components that login changed.
       */
      window.dispatchEvent(
        new Event("auth-change")
      );

      console.log(
        "LOGIN SAVED SUCCESSFULLY"
      );

      /*
       * Go to Check Skin.
       */
      navigate("/check-skin");

    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err
      );

      setError(
        err.message ||
          "Login failed."
      );

    } finally {
      setLoading(false);
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
        fontFamily:
          "Georgia, 'Times New Roman', serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "550px",
          background: "#fffdfa",
          border: "1px solid #ded5c8",
          borderRadius: "22px",
          padding: "45px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "#c5542e",
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "4px",
            marginBottom: "15px",
          }}
        >
          YOUR DERMASCAN
        </div>

        <h1
          style={{
            textAlign: "center",
            fontSize: "52px",
            margin: "0 0 15px",
            color: "#29251f",
          }}
        >
          Welcome back.
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#625a51",
            fontSize: "17px",
            marginBottom: "35px",
          }}
        >
          Login to continue using
          DermaScan.
        </p>

        {error && (
          <div
            style={{
              background: "#fde8e5",
              border:
                "1px solid #efb5aa",
              color: "#b42318",
              padding: "15px 18px",
              borderRadius: "12px",
              marginBottom: "20px",
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
              fontSize: "13px",
              letterSpacing: "3px",
              fontWeight: "700",
            }}
          >
            EMAIL ADDRESS
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "18px",
              border:
                "1px solid #d8cdbc",
              borderRadius: "13px",
              boxSizing: "border-box",
              marginBottom: "25px",
              fontSize: "16px",
              background: "#fffdfa",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "9px",
              fontSize: "13px",
              letterSpacing: "3px",
              fontWeight: "700",
            }}
          >
            PASSWORD
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "18px",
              border:
                "1px solid #d8cdbc",
              borderRadius: "13px",
              boxSizing: "border-box",
              marginBottom: "25px",
              fontSize: "16px",
              background: "#fffdfa",
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
              fontSize: "17px",
              fontWeight: "700",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading
              ? "Logging in..."
              : "Login →"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#625a51",
          }}
        >
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() =>
              navigate("/register")
            }
            style={{
              border: "none",
              background: "none",
              color: "#c5542e",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}