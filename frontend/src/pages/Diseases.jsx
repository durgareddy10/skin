import { Link } from "react-router-dom";

const C = {
  bg: "#f7f4ee",
  card: "#fbf9f5",
  dark: "#29251f",
  brown: "#756c61",
  terracotta: "#b95731",
  light: "#eee5d9",
  border: "#ded5c9",
};


const diseases = [
  {
    code: "AD",
    name: "Atopic Dermatitis",
    icon: "💧",
    description:
      "A common inflammatory skin condition that can cause dry, itchy and irritated skin.",
    type: "Common",
  },

  {
    code: "CD",
    name: "Contact Dermatitis",
    icon: "🔴",
    description:
      "Skin inflammation that can occur when the skin comes into contact with an irritating or allergic substance.",
    type: "Common",
  },

  {
    code: "EC",
    name: "Eczema",
    icon: "🌿",
    description:
      "A group of conditions that may cause dry, itchy, inflamed or irritated skin.",
    type: "Common",
  },

  {
    code: "SC",
    name: "Scabies",
    icon: "🔬",
    description:
      "A contagious skin condition associated with intense itching and a characteristic skin rash.",
    type: "Contagious",
  },

  {
    code: "SD",
    name: "Seborrheic Dermatitis",
    icon: "🫧",
    description:
      "A skin condition that commonly affects areas with more oil-producing glands and may cause scaling.",
    type: "Common",
  },

  {
    code: "TC",
    name: "Tinea Corporis",
    icon: "⭕",
    description:
      "A fungal skin infection that can produce circular or ring-shaped skin lesions.",
    type: "Contagious",
  },
];


function Diseases() {

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
          PAGE HEADER
      ========================================= */}

      <section
        style={{
          maxWidth: "1100px",

          margin: "0 auto",

          textAlign: "center",

          paddingBottom: "55px",
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
          SKIN CONDITIONS
        </div>


        <h1
          style={{
            marginTop: "18px",

            fontFamily:
              "Georgia, 'Times New Roman', serif",

            fontSize:
              "clamp(42px, 5vw, 64px)",

            lineHeight: "1.05",

            letterSpacing: "-2px",

            color: C.dark,
          }}
        >
          Understand common
          <br />

          <span
            style={{
              color: C.terracotta,
            }}
          >
            skin conditions.
          </span>
        </h1>


        <p
          style={{
            maxWidth: "650px",

            margin:
              "20px auto 0",

            color: C.brown,

            fontSize: "13px",

            lineHeight: "1.8",
          }}
        >
          Explore the six skin conditions supported
          by the DermaScan classification model.
        </p>

      </section>


      {/* =========================================
          DISEASE CARDS
      ========================================= */}

      <section
        style={{
          maxWidth: "1100px",

          margin: "0 auto",

          display: "grid",

          gridTemplateColumns:
            "repeat(3, 1fr)",

          gap: "22px",
        }}
      >

        {diseases.map(
          (disease) => (

            <div
              key={disease.code}

              style={{
                minHeight: "285px",

                padding: "28px",

                border:
                  `1px solid ${C.border}`,

                borderRadius: "18px",

                background: C.card,

                display: "flex",

                flexDirection:
                  "column",

                justifyContent:
                  "space-between",

                transition:
                  "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >

              {/* CARD TOP */}

              <div>

                <div
                  style={{
                    display: "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "space-between",
                  }}
                >

                  {/* ICON */}

                  <div
                    style={{
                      width: "52px",

                      height: "52px",

                      display: "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      borderRadius: "13px",

                      background:
                        C.light,

                      fontSize: "23px",
                    }}
                  >
                    {disease.icon}
                  </div>


                  {/* CODE */}

                  <span
                    style={{
                      color: "#9b9083",

                      fontSize: "10px",

                      fontWeight: "700",

                      letterSpacing:
                        "1px",
                    }}
                  >
                    {disease.code}
                  </span>

                </div>


                {/* NAME */}

                <h2
                  style={{
                    marginTop: "28px",

                    fontFamily:
                      "Georgia, 'Times New Roman', serif",

                    fontSize: "25px",

                    lineHeight: "1.15",

                    color: C.dark,
                  }}
                >
                  {disease.name}
                </h2>


                {/* DESCRIPTION */}

                <p
                  style={{
                    marginTop: "12px",

                    color: C.brown,

                    fontSize: "11px",

                    lineHeight: "1.75",
                  }}
                >
                  {disease.description}
                </p>

              </div>


              {/* CARD BOTTOM */}

              <div
                style={{
                  display: "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "space-between",

                  marginTop: "25px",
                }}
              >

                {/* TYPE */}

                <span
                  style={{
                    color:
                      C.terracotta,

                    fontSize: "9px",

                    fontWeight: "700",

                    letterSpacing:
                      "0.5px",
                  }}
                >
                  {disease.type}
                </span>


                {/* ARROW */}

                <Link
                  to={`/diseases/${disease.code}`}

                  style={{
                    width: "38px",

                    height: "38px",

                    display: "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    borderRadius:
                      "50%",

                    background:
                      C.dark,

                    color: "#fff",

                    textDecoration:
                      "none",

                    fontSize: "17px",

                    transition:
                      "0.2s",
                  }}
                >
                  →
                </Link>

              </div>

            </div>

          )
        )}

      </section>


      {/* =========================================
          INFORMATION BOX
      ========================================= */}

      <section
        style={{
          maxWidth: "1100px",

          margin:
            "35px auto 0",

          padding: "20px 24px",

          borderRadius: "12px",

          background: C.light,

          border:
            `1px solid ${C.border}`,

          display: "flex",

          alignItems: "flex-start",

          gap: "12px",
        }}
      >

        <span
          style={{
            color: C.terracotta,

            fontSize: "15px",
          }}
        >
          ⓘ
        </span>


        <p
          style={{
            margin: 0,

            color: C.brown,

            fontSize: "10px",

            lineHeight: "1.7",
          }}
        >
          These are the six skin-condition classes
          currently supported by the DermaScan trained
          classification model. Select a disease card
          to learn more about its characteristics,
          causes and general precautions.
        </p>

      </section>

    </div>
  );
}


export default Diseases;