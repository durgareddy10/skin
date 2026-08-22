import { Link } from "react-router-dom";

const C = {
  bg: "#f7f4ee",
  dark: "#29251f",
  brown: "#756c61",
  terracotta: "#b95731",
  light: "#eee5d9",
  border: "#ded5c9",
};

function NotFound() {
  return (
    <div
      style={{
        minHeight:
          "calc(100vh - 74px)",

        background: C.bg,

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        padding: "40px 20px",

        textAlign: "center",
      }}
    >

      <div>

        <div
          style={{
            fontFamily:
              "Georgia, 'Times New Roman', serif",

            fontSize: "100px",

            lineHeight: "1",

            color: C.terracotta,
          }}
        >
          404
        </div>


        <div
          style={{
            marginTop: "15px",

            color: C.terracotta,

            fontSize: "9px",

            fontWeight: "700",

            letterSpacing: "1.2px",
          }}
        >
          PAGE NOT FOUND
        </div>


        <h1
          style={{
            marginTop: "10px",

            fontFamily:
              "Georgia, 'Times New Roman', serif",

            fontSize: "35px",

            color: C.dark,
          }}
        >
          This page doesn't exist.
        </h1>


        <p
          style={{
            maxWidth: "450px",

            margin:
              "12px auto 0",

            color: C.brown,

            fontSize: "12px",

            lineHeight: "1.7",
          }}
        >
          The page you are looking for may have
          been moved or does not exist.
        </p>


        <Link
          to="/"

          style={{
            display:
              "inline-flex",

            marginTop: "25px",

            padding:
              "13px 20px",

            borderRadius: "9px",

            background: C.dark,

            color: "#fff",

            textDecoration:
              "none",

            fontSize: "11px",

            fontWeight: "700",
          }}
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default NotFound;