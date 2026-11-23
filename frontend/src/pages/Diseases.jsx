import React from "react";
import { Link } from "react-router-dom";

const C = {
  bg: "#f7f4ee",
  card: "#fffdfa",
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
      "A chronic inflammatory condition causing dry, hypersensitive skin and intense itching cycles.",
    type: "Common",
    dietHighlight: "Eat: Omega-3 Fatty Fish, Quercetin · Avoid: Dairy, Refined Sugar",
  },
  {
    code: "CD",
    name: "Contact Dermatitis",
    icon: "🔴",
    description:
      "Localized skin inflammation and blisters caused by direct exposure to irritants or allergens.",
    type: "Common",
    dietHighlight: "Eat: Vitamin C, Turmeric, Ginger · Avoid: High-Nickel Foods, Wine",
  },
  {
    code: "EC",
    name: "Eczema",
    icon: "🌿",
    description:
      "A widespread group of inflammatory skin conditions characterized by dry, cracked, and red patches.",
    type: "Common",
    dietHighlight: "Eat: Bone Broth, Blueberries, Seeds · Avoid: Cow's Milk, Trans Fats",
  },
  {
    code: "SC",
    name: "Scabies",
    icon: "🔬",
    description:
      "A contagious parasitic infestation by microscopic mites causing intense nocturnal itching.",
    type: "Contagious",
    dietHighlight: "Eat: Garlic, Vitamin A, Zinc · Avoid: Sugar, Excess Alcohol, Fast Food",
  },
  {
    code: "SD",
    name: "Seborrheic Dermatitis",
    icon: "🫧",
    description:
      "Scaling and greasy redness on sebum-rich areas (scalp, face) driven by Malassezia yeast.",
    type: "Common",
    dietHighlight: "Eat: Anti-Fungal Herbs, Coconut Oil · Avoid: Refined Carbs, Beer, Yeasty Foods",
  },
  {
    code: "TC",
    name: "Tinea Corporis",
    icon: "⭕",
    description:
      "A contagious superficial fungal infection producing characteristic circular ring-shaped lesions.",
    type: "Contagious",
    dietHighlight: "Eat: Raw Garlic, Leafy Greens · Avoid: Sugar, Bakery Yeast, Sweet Drinks",
  },
];

export default function Diseases() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        color: C.dark,
        fontFamily: "Georgia, 'Times New Roman', serif",
        padding: "50px 20px 90px",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER SECTION */}
      <section
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          textAlign: "center",
          paddingBottom: "50px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "30px",
            background: C.light,
            border: `1px solid ${C.border}`,
            color: C.terracotta,
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "2.5px",
            marginBottom: "16px",
          }}
        >
          DERMASCAN CLINICAL ATLAS
        </div>

        <h1
          style={{
            margin: "0 0 16px",
            fontSize: "clamp(34px, 5.5vw, 52px)",
            lineHeight: "1.1",
            color: C.dark,
            fontWeight: "700",
          }}
        >
          Explore Skin Conditions &{" "}
          <span style={{ color: C.terracotta }}>Dietary Guides</span>
        </h1>

        <p
          style={{
            maxWidth: "680px",
            margin: "0 auto",
            color: C.brown,
            fontSize: "16px",
            lineHeight: "1.7",
          }}
        >
          Learn the symptoms, triggers, precautions, and medically-recommended foods to eat and avoid for each of the six conditions classified by DermaScan.
        </p>
      </section>

      {/* RESPONSIVE DISEASE CARDS GRID */}
      <section
        style={{
          maxWidth: "1140px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "20px",
        }}
      >
        {diseases.map((disease) => (
          <div
            key={disease.code}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: "22px",
              padding: "clamp(20px, 4vw, 32px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 8px 24px rgba(41, 37, 31, 0.04)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            {/* TOP CARD CONTENT */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "15px",
                    background: C.light,
                    fontSize: "26px",
                  }}
                >
                  {disease.icon}
                </div>

                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span
                    style={{
                      background: "#f8ece8",
                      color: C.terracotta,
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "1px",
                    }}
                  >
                    {disease.code}
                  </span>
                  <span
                    style={{
                      background: C.light,
                      color: C.brown,
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: "600",
                    }}
                  >
                    {disease.type}
                  </span>
                </div>
              </div>

              <h2
                style={{
                  margin: "0 0 10px",
                  fontSize: "24px",
                  color: C.dark,
                  fontWeight: "700",
                  lineHeight: "1.2",
                }}
              >
                {disease.name}
              </h2>

              <p
                style={{
                  margin: "0 0 18px",
                  color: C.brown,
                  fontSize: "14.5px",
                  lineHeight: "1.65",
                }}
              >
                {disease.description}
              </p>

              {/* DIET PREVIEW PILL */}
              <div
                style={{
                  background: "#f4fbf5",
                  border: "1px solid #c8eccf",
                  borderRadius: "12px",
                  padding: "12px 14px",
                  marginBottom: "22px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    color: "#1c5d29",
                    marginBottom: "4px",
                  }}
                >
                  🥗 DIET & NUTRITION GUIDE
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#286b36",
                    lineHeight: "1.5",
                  }}
                >
                  {disease.dietHighlight}
                </div>
              </div>
            </div>

            {/* CARD BOTTOM ACTION */}
            <div>
              <Link
                to={`/diseases/${disease.code}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "13px",
                  background: C.dark,
                  color: "#ffffff",
                  textDecoration: "none",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "700",
                  boxSizing: "border-box",
                  transition: "background 0.2s",
                }}
              >
                View Symptoms & Full Diet Guide →
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
