import { useState } from "react";

const C = {
  bg: "#f7f4ee",
  card: "#fbf9f5",
  dark: "#29251f",
  brown: "#756c61",
  terracotta: "#b95731",
  light: "#eee5d9",
  border: "#ded5c9",
};


function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [sent, setSent] = useState(false);


  const handleSubmit = (event) => {

    event.preventDefault();

    setSent(true);

    setName("");
    setEmail("");
    setMessage("");

  };


  return (
    <div
      style={{
        minHeight: "100vh",

        background: C.bg,

        color: C.dark,

        fontFamily:
          "Arial, Helvetica, sans-serif",

        padding:
          "75px 30px 90px",
      }}
    >

      {/* =========================================
          HEADER
      ========================================= */}

      <section
        style={{
          maxWidth: "1050px",

          margin: "0 auto",

          textAlign: "center",

          paddingBottom: "60px",
        }}
      >

        <div
          style={{
            display: "inline-block",

            padding:
              "8px 14px",

            borderRadius: "30px",

            background: C.light,

            border:
              `1px solid ${C.border}`,

            color: C.terracotta,

            fontSize: "9px",

            fontWeight: "700",

            letterSpacing: "1.2px",
          }}
        >
          GET IN TOUCH
        </div>


        <h1
          style={{
            marginTop: "18px",

            fontFamily:
              "Georgia, 'Times New Roman', serif",

            fontSize:
              "clamp(45px, 6vw, 68px)",

            lineHeight: "1.05",

            letterSpacing: "-2px",

            color: C.dark,
          }}
        >
          Have a question?

          <br />

          <span
            style={{
              color: C.terracotta,
            }}
          >
            Let's talk.
          </span>
        </h1>


        <p
          style={{
            maxWidth: "600px",

            margin:
              "20px auto 0",

            color: C.brown,

            fontSize: "13px",

            lineHeight: "1.8",
          }}
        >
          Have a question, suggestion or feedback
          about the DermaScan project? Send us
          a message below.
        </p>

      </section>


      {/* =========================================
          MAIN CONTACT AREA
      ========================================= */}

      <section
        style={{
          maxWidth: "1050px",

          margin: "0 auto",

          display: "grid",

          gridTemplateColumns:
            "0.8fr 1.2fr",

          gap: "25px",

          alignItems: "stretch",
        }}
      >

        {/* =====================================
            LEFT INFORMATION CARD
        ===================================== */}

        <div
          style={{
            padding: "32px",

            border:
              `1px solid ${C.border}`,

            borderRadius: "18px",

            background: C.card,
          }}
        >

          <div
            style={{
              width: "50px",

              height: "50px",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              borderRadius: "13px",

              background: C.light,

              color: C.terracotta,

              fontSize: "22px",
            }}
          >
            ✦
          </div>


          <h2
            style={{
              marginTop: "25px",

              fontFamily:
                "Georgia, 'Times New Roman', serif",

              fontSize: "28px",

              color: C.dark,
            }}
          >
            Contact DermaScan
          </h2>


          <p
            style={{
              marginTop: "12px",

              color: C.brown,

              fontSize: "11px",

              lineHeight: "1.8",
            }}
          >
            We welcome questions, suggestions and
            feedback about the project.
          </p>


          {/* LOCATION */}

          <ContactInfo
            icon="⌖"
            title="Location"
            text="Vijayawada, Andhra Pradesh"
          />


          {/* PROJECT */}

          <ContactInfo
            icon="✦"
            title="Project"
            text="AI-Assisted Skin Disease Classification"
          />


          {/* EMAIL */}

          <ContactInfo
            icon="✉"
            title="Email"
            text="dermascan.project@gmail.com"
          />

        </div>


        {/* =====================================
            FORM CARD
        ===================================== */}

        <div
          style={{
            padding: "32px",

            border:
              `1px solid ${C.border}`,

            borderRadius: "18px",

            background: C.card,
          }}
        >

          <div
            style={{
              color: C.terracotta,

              fontSize: "9px",

              fontWeight: "700",

              letterSpacing: "1px",
            }}
          >
            SEND A MESSAGE
          </div>


          <h2
            style={{
              marginTop: "9px",

              fontFamily:
                "Georgia, 'Times New Roman', serif",

              fontSize: "30px",

              color: C.dark,
            }}
          >
            We'd love to hear from you.
          </h2>


          {/* SUCCESS */}

          {sent && (

            <div
              style={{
                marginTop: "20px",

                padding: "14px 16px",

                borderRadius: "9px",

                background: "#e9eee6",

                border:
                  "1px solid #d3dfce",

                color: "#52614d",

                fontSize: "11px",

                lineHeight: "1.6",
              }}
            >
              ✓ Your message has been received
              successfully.
            </div>

          )}


          <form
            onSubmit={handleSubmit}

            style={{
              marginTop: "25px",
            }}
          >

            {/* NAME */}

            <label
              style={{
                display: "block",

                marginBottom: "17px",
              }}
            >

              <span
                style={{
                  display: "block",

                  marginBottom: "7px",

                  color: C.brown,

                  fontSize: "9px",

                  fontWeight: "700",

                  letterSpacing: "0.8px",
                }}
              >
                YOUR NAME
              </span>


              <input
                type="text"

                value={name}

                onChange={(e) =>
                  setName(e.target.value)
                }

                placeholder="Enter your name"

                required

                style={inputStyle}
              />

            </label>


            {/* EMAIL */}

            <label
              style={{
                display: "block",

                marginBottom: "17px",
              }}
            >

              <span
                style={{
                  display: "block",

                  marginBottom: "7px",

                  color: C.brown,

                  fontSize: "9px",

                  fontWeight: "700",

                  letterSpacing: "0.8px",
                }}
              >
                EMAIL ADDRESS
              </span>


              <input
                type="email"

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                placeholder="Enter your email"

                required

                style={inputStyle}
              />

            </label>


            {/* MESSAGE */}

            <label
              style={{
                display: "block",

                marginBottom: "20px",
              }}
            >

              <span
                style={{
                  display: "block",

                  marginBottom: "7px",

                  color: C.brown,

                  fontSize: "9px",

                  fontWeight: "700",

                  letterSpacing: "0.8px",
                }}
              >
                MESSAGE
              </span>


              <textarea
                value={message}

                onChange={(e) =>
                  setMessage(e.target.value)
                }

                placeholder="Write your message..."

                required

                rows="6"

                style={{
                  ...inputStyle,

                  height: "130px",

                  paddingTop: "13px",

                  resize: "vertical",
                }}
              />

            </label>


            {/* SEND BUTTON */}

            <button
              type="submit"

              style={{
                width: "100%",

                height: "47px",

                border: "none",

                borderRadius: "9px",

                background: C.dark,

                color: "#fff",

                fontSize: "11px",

                fontWeight: "700",

                cursor: "pointer",
              }}
            >
              Send Message →
            </button>

          </form>

        </div>

      </section>


      {/* =========================================
          BOTTOM NOTE
      ========================================= */}

      <section
        style={{
          maxWidth: "1050px",

          margin: "30px auto 0",

          padding: "20px 24px",

          borderRadius: "12px",

          background: C.light,

          border:
            `1px solid ${C.border}`,

          textAlign: "center",
        }}
      >

        <p
          style={{
            margin: 0,

            color: C.brown,

            fontSize: "10px",

            lineHeight: "1.7",
          }}
        >
          DermaScan is an AI-assisted skin image
          classification project. For medical concerns,
          please consult a qualified healthcare professional.
        </p>

      </section>

    </div>
  );
}


/* =========================================
   CONTACT INFORMATION
========================================= */

function ContactInfo({
  icon,
  title,
  text,
}) {

  return (
    <div
      style={{
        display: "flex",

        alignItems: "flex-start",

        gap: "13px",

        marginTop: "27px",
      }}
    >

      <div
        style={{
          width: "35px",

          height: "35px",

          flexShrink: 0,

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          borderRadius: "9px",

          background: C.light,

          color: C.terracotta,

          fontSize: "14px",
        }}
      >
        {icon}
      </div>


      <div>

        <div
          style={{
            color: C.brown,

            fontSize: "9px",

            fontWeight: "700",

            letterSpacing: "0.8px",
          }}
        >
          {title.toUpperCase()}
        </div>


        <div
          style={{
            marginTop: "5px",

            color: C.dark,

            fontSize: "11px",

            lineHeight: "1.6",
          }}
        >
          {text}
        </div>

      </div>

    </div>
  );
}


/* =========================================
   INPUT STYLE
========================================= */

const inputStyle = {
  boxSizing: "border-box",

  width: "100%",

  height: "45px",

  padding: "0 13px",

  border:
    "1px solid #ded5c9",

  borderRadius: "9px",

  outline: "none",

  background: "#fffdf9",

  color: "#29251f",

  fontFamily:
    "Arial, Helvetica, sans-serif",

  fontSize: "11px",
};


export default Contact;