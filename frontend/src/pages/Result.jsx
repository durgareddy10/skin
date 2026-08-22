import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CLASS_NAMES = [
  "Atopic Dermatitis (AD)",
  "Contact Dermatitis (CD)",
  "Eczema (EC)",
  "Scabies (SC)",
  "Seborrheic Dermatitis (SD)",
  "Tinea Corporis (TC)",
];

/*
|--------------------------------------------------------------------------
| Disease information
|--------------------------------------------------------------------------
*/

const DISEASE_INFO = {
  "Atopic Dermatitis (AD)": {
    shortName: "Atopic Dermatitis",
    description:
      "Atopic dermatitis is a chronic inflammatory skin condition that commonly causes dry, itchy and irritated skin. Symptoms can come and go and may become worse during flare-ups.",

    causes: [
      "Genetic tendency and changes in the skin barrier can increase risk.",
      "Immune-system activity can contribute to inflammation.",
      "Common triggers may include fragrances, harsh detergents, weather changes, heat, sweating and stress.",
    ],

    precautions: [
      "Keep the skin moisturized regularly.",
      "Prefer fragrance-free creams or ointments.",
      "Avoid harsh soaps and irritating skin-care products.",
      "Avoid scratching the affected area.",
      "Wear comfortable, loose-fitting clothing.",
      "Try to identify and avoid personal triggers.",
    ],

    doctor:
      "Consult a dermatologist if the rash is persistent, repeatedly returns, becomes severe, interferes with sleep, or does not improve with gentle skin care.",

    urgent:
      "Seek urgent medical care if the rash is rapidly spreading, very painful, associated with fever, develops blisters or open sores, or involves the eyes, lips or mouth.",
  },

  "Contact Dermatitis (CD)": {
    shortName: "Contact Dermatitis",
    description:
      "Contact dermatitis is a skin reaction that can occur after the skin comes into contact with an irritating substance or an allergen. It may cause itching, redness, irritation or a rash.",

    causes: [
      "Soaps, detergents and cleaning chemicals.",
      "Fragrances and cosmetics.",
      "Certain metals such as nickel.",
      "Hair, skin-care or other personal-care products.",
      "Plants or other substances that trigger an allergic reaction.",
    ],

    precautions: [
      "Try to identify and avoid the substance causing the reaction.",
      "Use gentle, fragrance-free skin-care products.",
      "Wear protective gloves when handling irritating chemicals.",
      "Wash the affected area gently after exposure.",
      "Avoid scratching the affected skin.",
      "Test new skin-care products on a small area before regular use.",
    ],

    doctor:
      "Consult a dermatologist if the rash keeps returning, the cause is unclear, symptoms are severe, or the rash does not improve after avoiding the suspected trigger.",

    urgent:
      "Get urgent medical help if you develop swelling of the lips or eyes, difficulty breathing or swallowing, or a rapidly spreading severe reaction.",
  },

  "Eczema (EC)": {
    shortName: "Eczema",
    description:
      "Eczema is a group of inflammatory skin conditions that can cause dry, itchy, irritated and inflamed skin. Symptoms can vary from person to person.",

    causes: [
      "A weakened or sensitive skin barrier.",
      "Immune-system and genetic factors.",
      "Environmental triggers.",
      "Fragrances and irritating skin-care products.",
      "Dry weather, heat, sweating and stress may trigger flare-ups.",
    ],

    precautions: [
      "Moisturize regularly, especially after bathing.",
      "Use fragrance-free creams or ointments.",
      "Take short baths or showers with warm rather than very hot water.",
      "Avoid harsh soaps and detergents.",
      "Avoid scratching the skin.",
      "Wear soft, loose-fitting clothing.",
    ],

    doctor:
      "Consult a dermatologist if symptoms are persistent, severe, frequently recurring, affecting sleep, or not improving with basic skin care.",

    urgent:
      "Seek urgent medical attention if the rash spreads rapidly, becomes very painful, develops blisters or open sores, is accompanied by fever, or affects the eyes, lips or mouth.",
  },

  "Scabies (SC)": {
    shortName: "Scabies",
    description:
      "Scabies is a contagious skin infestation caused by microscopic mites. It commonly causes intense itching and a rash and can spread through close skin-to-skin contact.",

    causes: [
      "Infestation by scabies mites.",
      "Close and prolonged skin-to-skin contact with an infected person.",
      "Sharing clothing, towels or bedding used by someone with scabies can contribute to spread.",
    ],

    precautions: [
      "Avoid close skin-to-skin contact until treatment is completed.",
      "Do not share clothing, towels or bedding.",
      "Household members and close contacts may need treatment at the same time when scabies is diagnosed.",
      "Wash recently used clothing, towels and bedding according to healthcare guidance.",
      "Complete the treatment prescribed by a healthcare professional.",
    ],

    doctor:
      "If you suspect scabies, consult a healthcare professional. Proper diagnosis and prescription treatment are important because ordinary over-the-counter products do not treat scabies.",

    urgent:
      "Seek prompt medical attention if the rash is extensive, severe, crusted, infected, or if symptoms are occurring in an infant, elderly person or someone with a weakened immune system.",
  },

  "Seborrheic Dermatitis (SD)": {
    shortName: "Seborrheic Dermatitis",
    description:
      "Seborrheic dermatitis is a common inflammatory skin condition that often causes a scaly or flaky rash, especially on oily areas such as the scalp, face and chest.",

    causes: [
      "Yeast that naturally lives on the skin can play a role.",
      "Skin oil (sebum) may contribute.",
      "Cold and dry weather can trigger flare-ups.",
      "Stress and sweating may worsen symptoms.",
      "Harsh soaps and irritating products can cause flare-ups.",
    ],

    precautions: [
      "Wash the skin gently.",
      "Use fragrance-free skin-care products.",
      "Avoid harsh soaps and irritating chemicals.",
      "Avoid very hot showers.",
      "Manage stress where possible.",
      "Keep the affected areas clean and follow a dermatologist's treatment plan.",
    ],

    doctor:
      "Consult a dermatologist if symptoms continue, become widespread, repeatedly return, or do not improve with appropriate skin care.",

    urgent:
      "Seek medical attention if the rash becomes very painful, rapidly spreads, develops open sores or signs of infection, or is associated with fever.",
  },

  "Tinea Corporis (TC)": {
    shortName: "Tinea Corporis / Ringworm",
    description:
      "Tinea corporis, commonly called ringworm, is a fungal infection of the skin. Despite its name, it is caused by a fungus and not by a worm.",

    causes: [
      "Fungi that grow well in warm and humid environments.",
      "Skin-to-skin contact with an infected person.",
      "Contact with infected animals.",
      "Sharing contaminated towels, clothing or personal items.",
      "Warm, sweaty and damp environments can increase risk.",
    ],

    precautions: [
      "Keep the affected area clean and dry.",
      "Avoid sharing towels, clothing or personal items.",
      "Wash hands after touching the affected area.",
      "Change sweaty clothing regularly.",
      "Avoid scratching the affected area.",
      "Follow the complete antifungal treatment recommended by a healthcare professional or according to the product directions.",
    ],

    doctor:
      "Consult a dermatologist if the infection is spreading, keeps returning, is extensive, affects the scalp or nails, or does not improve with appropriate antifungal treatment.",

    urgent:
      "Seek medical attention if the area becomes very painful, develops pus or significant swelling, spreads rapidly, or you develop fever or other signs of infection.",
  },
};

/*
|--------------------------------------------------------------------------
| Find disease information even if backend returns slightly different text
|--------------------------------------------------------------------------
*/

function normalizeDiseaseName(value) {
  if (!value) return "Unknown";

  const text = String(value).trim().toLowerCase();

  if (
    text.includes("atopic") ||
    text === "ad"
  ) {
    return "Atopic Dermatitis (AD)";
  }

  if (
    text.includes("contact dermatitis") ||
    text === "cd"
  ) {
    return "Contact Dermatitis (CD)";
  }

  if (
    text === "eczema" ||
    text.includes("eczema") ||
    text === "ec"
  ) {
    return "Eczema (EC)";
  }

  if (
    text.includes("scabies") ||
    text === "sc"
  ) {
    return "Scabies (SC)";
  }

  if (
    text.includes("seborrheic") ||
    text === "sd"
  ) {
    return "Seborrheic Dermatitis (SD)";
  }

  if (
    text.includes("tinea") ||
    text.includes("ringworm") ||
    text === "tc"
  ) {
    return "Tinea Corporis (TC)";
  }

  return String(value);
}

/*
|--------------------------------------------------------------------------
| Get saved result
|--------------------------------------------------------------------------
*/

function getSavedResult() {
  const keys = [
    "dermascan_result",
    "analysisResult",
    "predictionResult",
  ];

  for (const key of keys) {
    const value = localStorage.getItem(key);

    if (!value) continue;

    try {
      const parsed = JSON.parse(value);

      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    } catch (error) {
      console.warn(
        `Could not read ${key}:`,
        error
      );
    }
  }

  return null;
}

/*
|--------------------------------------------------------------------------
| Convert probabilities into six numbers
|--------------------------------------------------------------------------
*/

function getProbabilityArray(result) {
  if (!result) {
    return [];
  }

  let values =
    result.probabilities ||
    result.predictions ||
    [];

  if (!Array.isArray(values)) {
    return [];
  }

  values = values
    .slice(0, 6)
    .map((value) => Number(value))
    .map((value) =>
      Number.isFinite(value) && value >= 0
        ? value
        : 0
    );

  while (values.length < 6) {
    values.push(0);
  }

  /*
   * IMPORTANT:
   *
   * Your backend sometimes returns values whose
   * total is not exactly 100%.
   *
   * Example:
   * 0 + 3.25 + 5.69 + 80.51 + 2 + 10.53
   * = 101.98
   *
   * We normalize ONLY for display.
   * We do not change the selected disease.
   */

  const total = values.reduce(
    (sum, value) => sum + value,
    0
  );

  if (total <= 0) {
    return values;
  }

  return values.map(
    (value) => (value / total) * 100
  );
}

/*
|--------------------------------------------------------------------------
| Format percentage
|--------------------------------------------------------------------------
*/

function formatPercent(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0.00%";
  }

  return `${number.toFixed(2)}%`;
}

/*
|--------------------------------------------------------------------------
| Result Page
|--------------------------------------------------------------------------
*/

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const [result, setResult] = useState(null);

  useEffect(() => {
    /*
     * First priority:
     * result sent through navigate("/result", { state })
     */

    if (
      location.state &&
      location.state.result
    ) {
      setResult(location.state.result);

      /*
       * Also save it so refresh does not lose it.
       */
      localStorage.setItem(
        "dermascan_result",
        JSON.stringify(
          location.state.result
        )
      );

      return;
    }

    /*
     * If page is refreshed, load from localStorage.
     */

    const saved = getSavedResult();

    if (saved) {
      setResult(saved);
    }
  }, [location.state]);

  /*
   * -----------------------------------------
   * NO RESULT
   * -----------------------------------------
   */

  if (!result) {
    return (
      <div style={styles.page}>
        <div style={styles.emptyCard}>
          <div style={styles.sectionLabel}>
            NO RESULT
          </div>

          <h1 style={styles.emptyTitle}>
            No analysis result found.
          </h1>

          <p style={styles.emptyText}>
            Please upload a skin image and
            run the analysis again.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/check-skin")
            }
            style={styles.primaryButton}
          >
            Analyze Skin →
          </button>
        </div>
      </div>
    );
  }

  /*
   * -----------------------------------------
   * PREDICTED DISEASE
   * -----------------------------------------
   */

  const disease =
    normalizeDiseaseName(
      result.disease ||
        result.predicted_class ||
        result.prediction ||
        result.class_name
    );

  const info =
    DISEASE_INFO[disease] || {
      shortName: disease,

      description:
        "The model has produced a classification result. This result is an AI-assisted prediction and should not be treated as a medical diagnosis.",

      causes: [
        "The exact cause cannot be determined from an image alone.",
        "Different skin conditions can have similar visual appearances.",
      ],

      precautions: [
        "Keep the affected area clean.",
        "Avoid scratching or irritating the skin.",
        "Avoid using strong medicines without professional advice.",
        "Monitor whether the symptoms improve or worsen.",
      ],

      doctor:
        "Consult a qualified healthcare professional if the condition persists, worsens, or you are uncertain about the diagnosis.",

      urgent:
        "Seek urgent medical care for a rapidly spreading, very painful or blistering rash, fever with a rash, breathing difficulty, swallowing difficulty, or swelling of the eyes or lips.",
    };

  const probabilities =
    getProbabilityArray(result);

  const confidence =
    Number(result.confidence);

  const image =
    result.imagePreview ||
    result.image ||
    null;

  /*
   * -----------------------------------------
   * UI
   * -----------------------------------------
   */

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* -----------------------------------
            MAIN RESULT
            ----------------------------------- */}

        <section style={styles.resultHero}>
          <div style={styles.sectionLabel}>
            ANALYSIS RESULT
          </div>

          <h1 style={styles.mainTitle}>
            {info.shortName}
          </h1>

          <p style={styles.description}>
            {info.description}
          </p>

          <div style={styles.confidenceBox}>
            <div>
              <div style={styles.smallLabel}>
                MODEL CONFIDENCE
              </div>

              <div style={styles.confidenceValue}>
                {formatPercent(confidence)}
              </div>
            </div>

            <div style={styles.resultBadge}>
              AI-ASSISTED RESULT
            </div>
          </div>

          <div style={styles.disclaimer}>
            <strong>
              Important:
            </strong>{" "}
            This result is an AI-assisted
            classification based on the uploaded
            image. It is not a medical diagnosis.
            A healthcare professional should make
            the final diagnosis.
          </div>
        </section>

        {/* -----------------------------------
            IMAGE
            ----------------------------------- */}

        {image && (
          <section style={styles.imageCard}>
            <div style={styles.sectionLabel}>
              ANALYZED IMAGE
            </div>

            <div style={styles.imageWrapper}>
              <img
                src={image}
                alt="Analyzed skin"
                style={styles.resultImage}
              />
            </div>
          </section>
        )}

        {/* -----------------------------------
            DISEASE INFORMATION
            ----------------------------------- */}

        <section style={styles.infoCard}>
          <div style={styles.sectionLabel}>
            ABOUT THIS CONDITION
          </div>

          <h2 style={styles.infoTitle}>
            {info.shortName}
          </h2>

          <p style={styles.infoDescription}>
            {info.description}
          </p>
        </section>

        <div style={styles.infoGrid}>

          {/* CAUSES */}

          <section style={styles.infoCard}>
            <div style={styles.sectionLabel}>
              POSSIBLE CAUSES
            </div>

            <h2 style={styles.infoTitle}>
              What may contribute to it?
            </h2>

            <ul style={styles.list}>
              {info.causes.map(
                (item, index) => (
                  <li
                    key={index}
                    style={styles.listItem}
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </section>

          {/* PRECAUTIONS */}

          <section style={styles.infoCard}>
            <div style={styles.sectionLabel}>
              PRECAUTIONS
            </div>

            <h2 style={styles.infoTitle}>
              What you can do
            </h2>

            <ul style={styles.list}>
              {info.precautions.map(
                (item, index) => (
                  <li
                    key={index}
                    style={styles.listItem}
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </section>
        </div>

        {/* -----------------------------------
            DOCTOR INFORMATION
            ----------------------------------- */}

        <section style={styles.doctorCard}>
          <div style={styles.sectionLabel}>
            WHEN TO CONSULT A DOCTOR
          </div>

          <h2 style={styles.infoTitle}>
            Do I need to see a doctor?
          </h2>

          <p style={styles.doctorText}>
            {info.doctor}
          </p>

          <div style={styles.urgentBox}>
            <div style={styles.urgentTitle}>
              Seek urgent medical care if:
            </div>

            <p style={styles.urgentText}>
              {info.urgent}
            </p>
          </div>
        </section>

        {/* -----------------------------------
            MODEL PREDICTION SCORES
            ----------------------------------- */}

        <section style={styles.scoresCard}>
          <div style={styles.sectionLabel}>
            MODEL PREDICTION SCORES
          </div>

          <p style={styles.scoreDescription}>
            Prediction probability for each
            supported class.
          </p>

          {CLASS_NAMES.map(
            (className, index) => {
              const probability =
                probabilities[index] || 0;

              const isPredicted =
                className === disease;

              return (
                <div
                  key={className}
                  style={styles.scoreRow}
                >
                  <div style={styles.scoreHeader}>
                    <span
                      style={{
                        ...styles.scoreName,

                        ...(isPredicted
                          ? styles.predictedName
                          : {}),
                      }}
                    >
                      {className}
                    </span>

                    <span
                      style={{
                        ...styles.scoreValue,

                        ...(isPredicted
                          ? styles.predictedValue
                          : {}),
                      }}
                    >
                      {formatPercent(
                        probability
                      )}
                    </span>
                  </div>

                  <div
                    style={styles.progressBackground}
                  >
                    <div
                      style={{
                        ...styles.progressBar,

                        width: `${Math.min(
                          100,
                          probability
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              );
            }
          )}

          <div style={styles.totalRow}>
            <span>
              Probability total
            </span>

            <strong>
              100.00%
            </strong>
          </div>
        </section>

        {/* -----------------------------------
            ACTIONS
            ----------------------------------- */}

        <div style={styles.actions}>
          <button
            type="button"
            onClick={() =>
              navigate("/check-skin")
            }
            style={styles.primaryButton}
          >
            Analyze Another Image →
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/history")
            }
            style={styles.secondaryButton}
          >
            View History
          </button>
        </div>

        <div style={styles.footerNote}>
          DermaScan is intended for educational
          and AI-assisted screening support only.
          It cannot replace examination,
          diagnosis or treatment by a qualified
          healthcare professional.
        </div>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| STYLES
|--------------------------------------------------------------------------
*/

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8f5ef",
    color: "#29251f",
    padding: "45px 20px 80px",
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    boxSizing: "border-box",
  },

  container: {
    width: "min(1400px, 100%)",
    margin: "0 auto",
  },

  resultHero: {
    background: "#fffdfa",
    border: "1px solid #ded5c8",
    borderRadius: "24px",
    padding: "45px",
    marginBottom: "28px",
    boxSizing: "border-box",
  },

  sectionLabel: {
    color: "#c5542e",
    fontSize: "14px",
    fontWeight: "700",
    letterSpacing: "5px",
    marginBottom: "20px",
  },

  mainTitle: {
    fontSize: "52px",
    lineHeight: "1.1",
    margin: "0 0 18px",
    color: "#29251f",
  },

  description: {
    fontSize: "20px",
    lineHeight: "1.7",
    color: "#5d554d",
    maxWidth: "1000px",
    margin: "0 0 30px",
  },

  confidenceBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "25px",
    background: "#eee5d7",
    borderRadius: "18px",
    marginBottom: "22px",
    flexWrap: "wrap",
  },

  smallLabel: {
    fontSize: "12px",
    letterSpacing: "3px",
    fontWeight: "700",
    color: "#756a60",
    marginBottom: "7px",
  },

  confidenceValue: {
    fontSize: "38px",
    fontWeight: "700",
    color: "#c5542e",
  },

  resultBadge: {
    padding: "12px 18px",
    borderRadius: "30px",
    background: "#29251f",
    color: "#ffffff",
    fontSize: "12px",
    letterSpacing: "2px",
    fontWeight: "700",
  },

  disclaimer: {
    padding: "18px 20px",
    background: "#fff3e8",
    border: "1px solid #efc5ae",
    borderRadius: "14px",
    color: "#684c3c",
    lineHeight: "1.6",
    fontSize: "15px",
  },

  imageCard: {
    background: "#fffdfa",
    border: "1px solid #ded5c8",
    borderRadius: "24px",
    padding: "35px",
    marginBottom: "28px",
  },

  imageWrapper: {
    width: "100%",
    height: "430px",
    background: "#eee5d7",
    borderRadius: "18px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  resultImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(420px, 1fr))",
    gap: "28px",
    marginBottom: "28px",
  },

  infoCard: {
    background: "#fffdfa",
    border: "1px solid #ded5c8",
    borderRadius: "24px",
    padding: "35px",
    marginBottom: "28px",
    boxSizing: "border-box",
  },

  infoTitle: {
    fontSize: "30px",
    lineHeight: "1.2",
    margin: "0 0 18px",
    color: "#29251f",
  },

  infoDescription: {
    fontSize: "17px",
    lineHeight: "1.8",
    color: "#5d554d",
    margin: 0,
  },

  list: {
    margin: 0,
    paddingLeft: "25px",
  },

  listItem: {
    marginBottom: "14px",
    fontSize: "17px",
    lineHeight: "1.6",
    color: "#5d554d",
  },

  doctorCard: {
    background: "#fffdfa",
    border: "1px solid #ded5c8",
    borderRadius: "24px",
    padding: "35px",
    marginBottom: "28px",
  },

  doctorText: {
    fontSize: "17px",
    lineHeight: "1.8",
    color: "#5d554d",
    marginBottom: "25px",
  },

  urgentBox: {
    background: "#fde8e5",
    border: "1px solid #efb5aa",
    borderRadius: "16px",
    padding: "22px",
  },

  urgentTitle: {
    color: "#a62b20",
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "10px",
  },

  urgentText: {
    color: "#6f3d37",
    fontSize: "16px",
    lineHeight: "1.7",
    margin: 0,
  },

  scoresCard: {
    background: "#fffdfa",
    border: "1px solid #ded5c8",
    borderRadius: "24px",
    padding: "35px",
    marginBottom: "28px",
  },

  scoreDescription: {
    fontSize: "18px",
    color: "#5d554d",
    margin: "0 0 35px",
  },

  scoreRow: {
    marginBottom: "25px",
  },

  scoreHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "10px",
  },

  scoreName: {
    fontSize: "17px",
    color: "#3d3730",
  },

  predictedName: {
    fontWeight: "700",
    color: "#c5542e",
  },

  scoreValue: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#3d3730",
  },

  predictedValue: {
    color: "#c5542e",
    fontWeight: "700",
  },

  progressBackground: {
    width: "100%",
    height: "11px",
    background: "#e8dfd3",
    borderRadius: "20px",
    overflow: "hidden",
  },

  progressBar: {
    height: "100%",
    background: "#c5542e",
    borderRadius: "20px",
    transition:
      "width 0.5s ease",
  },

  totalRow: {
    borderTop:
      "1px solid #ded5c8",
    marginTop: "35px",
    paddingTop: "22px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "17px",
    color: "#3d3730",
  },

  actions: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "10px",
    marginBottom: "30px",
  },

  primaryButton: {
    border: "none",
    borderRadius: "13px",
    padding: "17px 28px",
    background: "#29251f",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },

  secondaryButton: {
    border:
      "1px solid #cfc3b3",
    borderRadius: "13px",
    padding: "17px 28px",
    background: "#fffdfa",
    color: "#29251f",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
  },

  footerNote: {
    background: "#eee5d7",
    borderRadius: "16px",
    padding: "20px",
    textAlign: "center",
    color: "#665d54",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  emptyCard: {
    width: "min(1000px, 95%)",
    margin: "100px auto",
    background: "#fffdfa",
    border:
      "1px solid #ded5c8",
    borderRadius: "24px",
    padding: "70px 40px",
    textAlign: "center",
    boxSizing: "border-box",
  },

  emptyTitle: {
    fontSize: "48px",
    margin: "0 0 20px",
  },

  emptyText: {
    fontSize: "19px",
    color: "#665d54",
    marginBottom: "30px",
  },
};