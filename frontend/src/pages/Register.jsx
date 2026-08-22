import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const API_URL = "http://127.0.0.1:5000";


export default function Register() {

  const navigate = useNavigate();


  const [form, setForm] = useState({

    name: "",
    email: "",
    password: "",
    confirmPassword: ""

  });


  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (event) => {

    setForm({

      ...form,

      [event.target.name]:
        event.target.value

    });

  };


  // =====================================================
  // REGISTER
  // =====================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");


    // ---------------------------------------------------
    // VALIDATION
    // ---------------------------------------------------

    if (!form.name.trim()) {

      setError(
        "Please enter your full name."
      );

      return;
    }


    if (!form.email.trim()) {

      setError(
        "Please enter your email address."
      );

      return;
    }


    if (form.password.length < 6) {

      setError(
        "Password must contain at least 6 characters."
      );

      return;
    }


    if (
      form.password !==
      form.confirmPassword
    ) {

      setError(
        "Passwords do not match."
      );

      return;
    }


    setLoading(true);


    try {

      // -------------------------------------------------
      // SEND REQUEST TO FLASK
      // -------------------------------------------------

      const response = await fetch(
        `${API_URL}/api/register`,
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            name:
              form.name.trim(),

            email:
              form.email.trim(),

            password:
              form.password

          })

        }
      );


      const data =
        await response.json();


      // -------------------------------------------------
      // ERROR FROM BACKEND
      // -------------------------------------------------

      if (!response.ok || !data.success) {

        setError(

          data.message ||
          "Registration failed."

        );

        setLoading(false);

        return;
      }


      // -------------------------------------------------
      // SAVE LOGIN INFORMATION
      // -------------------------------------------------

      localStorage.setItem(
        "dermascan_token",
        data.token
      );


      localStorage.setItem(
        "dermascan_user",
        JSON.stringify(
          data.user
        )
      );


      // -------------------------------------------------
      // GO HOME
      // -------------------------------------------------

      navigate("/");


    } catch (error) {

      console.error(
        "Registration error:",
        error
      );


      setError(
        "Cannot connect to DermaScan backend. Make sure Flask is running on port 5000."
      );

    } finally {

      setLoading(false);

    }

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div style={styles.page}>

      <div style={styles.container}>

        <div style={styles.header}>

          <div style={styles.eyebrow}>
            YOUR DERMA SCAN
          </div>


          <h1 style={styles.title}>
            Create account.
          </h1>


          <p style={styles.subtitle}>
            Create your DermaScan account to
            analyze skin images and keep your
            prediction history.
          </p>

        </div>


        <div style={styles.card}>


          {error && (

            <div style={styles.error}>
              {error}
            </div>

          )}


          <form onSubmit={handleSubmit}>


            {/* NAME */}

            <label style={styles.label}>
              FULL NAME
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              style={styles.input}
              autoComplete="name"
            />


            {/* EMAIL */}

            <label style={styles.label}>
              EMAIL ADDRESS
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={styles.input}
              autoComplete="email"
            />


            {/* PASSWORD */}

            <label style={styles.label}>
              PASSWORD
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              style={styles.input}
              autoComplete="new-password"
            />


            {/* CONFIRM PASSWORD */}

            <label style={styles.label}>
              CONFIRM PASSWORD
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={
                form.confirmPassword
              }
              onChange={handleChange}
              placeholder="Confirm your password"
              style={styles.input}
              autoComplete="new-password"
            />


            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,

                opacity:
                  loading ? 0.7 : 1

              }}
            >

              {loading
                ? "Creating account..."
                : "Create Account →"
              }

            </button>


          </form>


          <div style={styles.divider}></div>


          <div style={styles.loginText}>

            Already have an account?{" "}

            <Link
              to="/login"
              style={styles.loginLink}
            >
              Login
            </Link>

          </div>


        </div>

      </div>

    </div>

  );

}


// =======================================================
// STYLES
// =======================================================

const styles = {

  page: {

    minHeight: "100vh",

    background:
      "#f7f4ee",

    padding:
      "70px 20px 100px",

    boxSizing:
      "border-box"

  },


  container: {

    width:
      "100%",

    maxWidth:
      "720px",

    margin:
      "0 auto"

  },


  header: {

    textAlign:
      "center",

    marginBottom:
      "42px"

  },


  eyebrow: {

    fontSize:
      "12px",

    letterSpacing:
      "3px",

    color:
      "#bd522c",

    fontWeight:
      "700",

    marginBottom:
      "12px"

  },


  title: {

    margin:
      "0",

    fontSize:
      "56px",

    lineHeight:
      "1.05",

    color:
      "#28241f",

    fontFamily:
      "Georgia, serif",

    fontWeight:
      "700"

  },


  subtitle: {

    maxWidth:
      "560px",

    margin:
      "20px auto 0",

    fontSize:
      "16px",

    lineHeight:
      "1.7",

    color:
      "#746d64"

  },


  card: {

    background:
      "#fffdfa",

    border:
      "1px solid #ddd3c5",

    borderRadius:
      "22px",

    padding:
      "40px",

    boxSizing:
      "border-box",

    boxShadow:
      "0 15px 40px rgba(50,40,30,0.04)"

  },


  error: {

    background:
      "#fce9e5",

    border:
      "1px solid #efc1b5",

    color:
      "#b23e25",

    padding:
      "15px 18px",

    borderRadius:
      "12px",

    marginBottom:
      "28px",

    fontSize:
      "14px"

  },


  label: {

    display:
      "block",

    fontSize:
      "12px",

    letterSpacing:
      "2px",

    fontWeight:
      "700",

    color:
      "#635a51",

    marginBottom:
      "9px",

    marginTop:
      "22px"

  },


  input: {

    width:
      "100%",

    height:
      "58px",

    boxSizing:
      "border-box",

    border:
      "1px solid #ddd3c5",

    borderRadius:
      "12px",

    background:
      "#fffdfa",

    padding:
      "0 17px",

    fontSize:
      "15px",

    outline:
      "none",

    color:
      "#28241f"

  },


  button: {

    width:
      "100%",

    height:
      "60px",

    marginTop:
      "30px",

    border:
      "none",

    borderRadius:
      "12px",

    background:
      "#29251f",

    color:
      "white",

    fontSize:
      "15px",

    fontWeight:
      "700",

    cursor:
      "pointer"

  },


  divider: {

    height:
      "1px",

    background:
      "#ddd3c5",

    margin:
      "30px 0"

  },


  loginText: {

    textAlign:
      "center",

    fontSize:
      "14px",

    color:
      "#746d64"

  },


  loginLink: {

    color:
      "#bd522c",

    fontWeight:
      "700",

    textDecoration:
      "none"

  }

};