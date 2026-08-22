import { Link } from "react-router-dom";

const C = {
  bg: "#f7f4ee",
  dark: "#29251f",
  brown: "#756c61",
  terracotta: "#b95731",
  light: "#eee5d9",
  border: "#ded5c9",
};

function Home() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 74px)",
        background: C.bg,
        color: C.dark,
        fontFamily: "Arial, Helvetica, sans-serif",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        padding: "60px 30px",
      }}
    >

      {/* MAIN HOME CONTENT */}

      <section
        style={{
          width: "100%",
          maxWidth: "900px",
          textAlign: "center",
        }}
      >

        {/* LABEL */}

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",

            padding: "9px 15px",

            borderRadius: "30px",

            background: C.light,

            border: `1px solid ${C.border}`,

            color: C.terracotta,

            fontSize: "9px",

            fontWeight: "700",

            letterSpacing: "1.2px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: C.terracotta,
            }}
          />

          AI-POWERED SKIN ANALYSIS
        </div>


        {/* HEADING */}

        <h1
          style={{
            marginTop: "28px",

            marginBottom: "0",

            fontFamily:
              "Georgia, 'Times New Roman', serif",

            fontSize:
              "clamp(55px, 8vw, 92px)",

            lineHeight: "1.02",

            letterSpacing: "-3px",

            fontWeight: "700",

            color: C.dark,
          }}
        >
          Understand your skin.
        </h1>


        <h2
          style={{
            marginTop: "8px",

            fontFamily:
              "Georgia, 'Times New Roman', serif",

            fontSize:
              "clamp(45px, 6vw, 70px)",

            lineHeight: "1.05",

            letterSpacing: "-2px",

            fontWeight: "700",

            color: C.terracotta,
          }}
        >
          Powered by AI.
        </h2>


        {/* DESCRIPTION */}

        <p
          style={{
            maxWidth: "620px",

            margin:
              "28px auto 0",

            color: C.brown,

            fontSize: "15px",

            lineHeight: "1.8",
          }}
        >
          Upload a skin image and get an
          AI-assisted prediction of possible
          skin conditions using deep learning.
        </p>


        {/* BUTTONS */}

        <div
          style={{
            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            gap: "12px",

            marginTop: "32px",
          }}
        >

          <Link
            to="/check-skin"

            style={{
              display: "inline-flex",

              alignItems: "center",

              justifyContent: "center",

              padding: "15px 23px",

              borderRadius: "9px",

              background: C.dark,

              color: "#ffffff",

              textDecoration: "none",

              fontSize: "12px",

              fontWeight: "700",

              transition: "0.2s",
            }}
          >
            Analyze My Skin →
          </Link>


          <Link
            to="/about"

            style={{
              display: "inline-flex",

              alignItems: "center",

              justifyContent: "center",

              padding: "14px 23px",

              borderRadius: "9px",

              border:
                `1px solid ${C.border}`,

              background:
                "transparent",

              color: C.brown,

              textDecoration: "none",

              fontSize: "12px",

              fontWeight: "600",
            }}
          >
            Learn More
          </Link>

        </div>


        {/* SMALL INFORMATION */}

        <div
          style={{
            marginTop: "55px",

            display: "flex",

            justifyContent: "center",

            gap: "35px",

            color: "#91877b",

            fontSize: "9px",

            fontWeight: "700",

            letterSpacing: "1px",
          }}
        >

          <span>
            AI ANALYSIS
          </span>

          <span>
            •
          </span>

          <span>
            DEEP LEARNING
          </span>

          <span>
            •
          </span>

          <span>
            SKIN CLASSIFICATION
          </span>

        </div>

      </section>

    </div>
  );
}

export default Home;