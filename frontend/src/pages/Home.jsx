import React from "react";
import { Link } from "react-router-dom";

const C = {
  bg: "#f7f4ee",
  dark: "#29251f",
  brown: "#756c61",
  terracotta: "#b95731",
  light: "#eee5d9",
  border: "#ded5c9",
};

export default function Home() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 74px)",
        background: C.bg,
        color: C.dark,
        fontFamily: "Georgia, 'Times New Roman', serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px 80px",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "880px",
          textAlign: "center",
        }}
      >
        {/* EYEBROW BADGE */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            borderRadius: "30px",
            background: C.light,
            border: `1px solid ${C.border}`,
            color: C.terracotta,
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "2px",
            marginBottom: "24px",
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
          AI-POWERED DERMATOLOGICAL ANALYSIS
        </div>

        {/* HEADINGS */}
        <h1
          style={{
            margin: "0",
            fontSize: "clamp(36px, 6vw, 68px)",
            lineHeight: "1.08",
            letterSpacing: "-1.5px",
            fontWeight: "700",
            color: C.dark,
          }}
        >
          Understand your skin.
        </h1>

        <h2
          style={{
            margin: "8px 0 0",
            fontSize: "clamp(28px, 4.5vw, 52px)",
            lineHeight: "1.1",
            letterSpacing: "-1px",
            fontWeight: "700",
            color: C.terracotta,
          }}
        >
          Powered by Deep Learning.
        </h2>

        {/* DESCRIPTION */}
        <p
          style={{
            maxWidth: "640px",
            margin: "24px auto 0",
            color: C.brown,
            fontSize: "16px",
            lineHeight: "1.7",
          }}
        >
          Upload a clear image to get an instant AI-assisted classification of possible skin conditions, complete with doctor-approved precautions and dietary nutrition guides.
        </p>

        {/* PRIMARY ACTIONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "14px",
            marginTop: "32px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/check-skin"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 28px",
              borderRadius: "12px",
              background: C.terracotta,
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: "700",
              boxShadow: "0 4px 14px rgba(185, 87, 49, 0.25)",
              transition: "0.2s",
            }}
          >
            Analyze My Skin →
          </Link>

          <Link
            to="/diseases"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "15px 24px",
              borderRadius: "12px",
              border: `1px solid ${C.border}`,
              background: "#fffdfa",
              color: C.dark,
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: "700",
              transition: "0.2s",
            }}
          >
            🥗 Browse Diseases & Diets
          </Link>
        </div>

        {/* 3-PILLAR HIGHLIGHT CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
            marginTop: "55px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              background: "#fffdfa",
              border: `1px solid ${C.border}`,
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 4px 16px rgba(41, 37, 31, 0.03)",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>⚡</div>
            <h3 style={{ margin: "0 0 6px", fontSize: "17px", color: C.dark }}>
              Instant AI Screening
            </h3>
            <p style={{ margin: 0, fontSize: "13.5px", color: C.brown, lineHeight: "1.6" }}>
              Trained on clinical datasets to accurately distinguish six common and contagious dermatological conditions.
            </p>
          </div>

          <div
            style={{
              background: "#fffdfa",
              border: `1px solid ${C.border}`,
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 4px 16px rgba(41, 37, 31, 0.03)",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>🥗</div>
            <h3 style={{ margin: "0 0 6px", fontSize: "17px", color: C.dark }}>
              Diet & Trigger Guides
            </h3>
            <p style={{ margin: 0, fontSize: "13.5px", color: C.brown, lineHeight: "1.6" }}>
              Tailored lists of anti-inflammatory foods that heal and specific dietary triggers you should avoid.
            </p>
          </div>

          <div
            style={{
              background: "#fffdfa",
              border: `1px solid ${C.border}`,
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 4px 16px rgba(41, 37, 31, 0.03)",
            }}
          >
            <div style={{ fontSize: "28px", marginBottom: "12px" }}>🩺</div>
            <h3 style={{ margin: "0 0 6px", fontSize: "17px", color: C.dark }}>
              Clinical Care & Precautions
            </h3>
            <p style={{ margin: 0, fontSize: "13.5px", color: C.brown, lineHeight: "1.6" }}>
              Comprehensive care instructions, trigger warnings, and symptom thresholds for consulting a dermatologist.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
