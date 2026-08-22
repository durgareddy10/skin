import { useNavigate, useParams } from "react-router-dom";

const diseaseData = {
  AD: {
    code: "AD",
    name: "Atopic Dermatitis",
    subtitle:
      "A chronic inflammatory skin condition commonly associated with dry, itchy and irritated skin.",
    icon: "💧",

    about:
      "Atopic dermatitis is an inflammatory skin condition that can cause dry, itchy and irritated skin. Symptoms can vary from person to person and may come and go over time.",

    causes: [
      "Dry or sensitive skin",
      "Changes in the skin barrier",
      "Environmental triggers",
      "Irritants and allergens",
      "Family history can increase susceptibility",
    ],

    symptoms: [
      "Dry skin",
      "Intense itching",
      "Red or inflamed areas",
      "Skin irritation",
      "Cracked or scaly skin",
    ],

    precautions: [
      "Keep the skin moisturized regularly",
      "Avoid known irritants and triggers",
      "Use gentle skin-care products",
      "Avoid excessive scratching",
      "Keep the skin clean and hydrated",
    ],

    seekHelp:
      "If symptoms are severe, persistent, infected, spreading, or significantly affecting daily life, consult a qualified healthcare professional.",
  },


  CD: {
    code: "CD",
    name: "Contact Dermatitis",
    subtitle:
      "Skin inflammation that develops after contact with an irritating or allergenic substance.",
    icon: "🔴",

    about:
      "Contact dermatitis occurs when the skin reacts after coming into contact with a substance that irritates the skin or triggers an allergic reaction.",

    causes: [
      "Soaps and detergents",
      "Cosmetics or fragrances",
      "Certain metals",
      "Cleaning products",
      "Plants or other allergens",
    ],

    symptoms: [
      "Red or irritated skin",
      "Itching",
      "Burning or stinging",
      "Dry or cracked skin",
      "Rash or blisters",
    ],

    precautions: [
      "Identify and avoid the triggering substance",
      "Use gentle fragrance-free products",
      "Protect the skin when handling irritants",
      "Keep affected skin moisturized",
      "Avoid scratching the affected area",
    ],

    seekHelp:
      "Seek professional medical advice if the reaction is severe, widespread, persistent, or involves significant swelling or infection.",
  },


  EC: {
    code: "EC",
    name: "Eczema",
    subtitle:
      "A group of inflammatory skin conditions that may cause dry, itchy and irritated skin.",
    icon: "🌿",

    about:
      "Eczema describes a group of conditions that can cause dry, itchy, inflamed or irritated skin. Different forms of eczema can affect different parts of the body.",

    causes: [
      "Skin barrier dysfunction",
      "Environmental factors",
      "Irritants",
      "Allergens",
      "Individual genetic susceptibility",
    ],

    symptoms: [
      "Dry skin",
      "Itching",
      "Redness",
      "Inflammation",
      "Scaly or irritated skin",
    ],

    precautions: [
      "Moisturize the skin regularly",
      "Avoid harsh soaps and irritants",
      "Use gentle skin-care products",
      "Avoid prolonged hot showers",
      "Try to identify personal triggers",
    ],

    seekHelp:
      "Consult a healthcare professional when symptoms are severe, recurrent, worsening, or difficult to manage.",
  },


  SC: {
    code: "SC",
    name: "Scabies",
    subtitle:
      "A contagious skin condition associated with intense itching and a characteristic rash.",
    icon: "🔬",

    about:
      "Scabies is a contagious skin condition associated with an infestation of microscopic mites. It commonly causes intense itching and a characteristic rash.",

    causes: [
      "Close skin-to-skin contact",
      "Contact with an affected person",
      "Shared bedding or clothing",
      "Crowded living conditions",
    ],

    symptoms: [
      "Intense itching",
      "Small itchy bumps",
      "Skin rash",
      "Symptoms that may become worse at night",
      "Burrow-like marks may occur",
    ],

    precautions: [
      "Avoid close contact with affected individuals until treated",
      "Wash clothing and bedding appropriately",
      "Avoid sharing personal items",
      "Follow prescribed treatment carefully",
      "Inform close contacts when appropriate",
    ],

    seekHelp:
      "Medical evaluation is important because scabies requires appropriate treatment and can spread to other people.",
  },


  SD: {
    code: "SD",
    name: "Seborrheic Dermatitis",
    subtitle:
      "A common inflammatory skin condition that often affects oil-producing areas and may cause scaling.",
    icon: "🫧",

    about:
      "Seborrheic dermatitis commonly affects areas of the skin with more oil-producing glands. It may cause redness, irritation and scaling.",

    causes: [
      "Changes in oil-producing areas of the skin",
      "Skin yeast activity",
      "Individual skin sensitivity",
      "Environmental factors",
      "Stress may contribute to flare-ups",
    ],

    symptoms: [
      "Flaking or scaling",
      "Redness",
      "Itching",
      "Greasy or oily patches",
      "Irritated skin",
    ],

    precautions: [
      "Follow a gentle skin-care routine",
      "Keep affected areas clean",
      "Avoid harsh skin products",
      "Use recommended treatments when advised",
      "Try to identify factors associated with flare-ups",
    ],

    seekHelp:
      "Consult a healthcare professional if symptoms persist, become severe, or do not improve with appropriate skin care.",
  },


  TC: {
    code: "TC",
    name: "Tinea Corporis",
    subtitle:
      "A fungal skin infection that can produce circular or ring-shaped skin lesions.",
    icon: "⭕",

    about:
      "Tinea corporis is a fungal infection of the skin that may produce characteristic circular or ring-shaped lesions. It can spread through contact.",

    causes: [
      "Fungal infection",
      "Contact with an infected person",
      "Contact with infected animals",
      "Shared personal items",
      "Warm and moist environments",
    ],

    symptoms: [
      "Circular or ring-shaped rash",
      "Itching",
      "Scaling",
      "Red or irritated skin",
      "Gradually expanding patches",
    ],

    precautions: [
      "Keep affected skin clean and dry",
      "Avoid sharing towels and clothing",
      "Wash clothing and bedding regularly",
      "Avoid scratching affected areas",
      "Seek appropriate antifungal treatment when advised",
    ],

    seekHelp:
      "Consult a healthcare professional for appropriate diagnosis and treatment, especially if the rash spreads or does not improve.",
  },
};


function DiseaseDetails() {

  const { code } = useParams();

  const navigate = useNavigate();

  const disease =
    diseaseData[code?.toUpperCase()];


  /* INVALID DISEASE */

  if (!disease) {

    return (

      <div className="not-found-page">

        <div className="not-found-content">

          <span className="not-found-number">
            404
          </span>

          <h1>
            Disease not found.
          </h1>

          <p>
            We couldn't find information for
            this skin condition.
          </p>

          <button
            className="primary-button"
            onClick={() =>
              navigate("/diseases")
            }
          >
            ← Back to Diseases
          </button>

        </div>

      </div>

    );
  }


  return (

    <div className="disease-details-page">


      {/* BACK BUTTON */}

      <div className="details-container">

        <button
          className="back-diseases-button"
          onClick={() =>
            navigate("/diseases")
          }
        >
          ← All skin conditions
        </button>


        {/* HEADER */}

        <div className="disease-details-header">

          <div className="details-icon">
            {disease.icon}
          </div>

          <div>

            <span className="details-code">
              {disease.code}
            </span>

            <h1>
              {disease.name}
            </h1>

            <p>
              {disease.subtitle}
            </p>

          </div>

        </div>


        {/* ABOUT */}

        <section className="details-section">

          <span className="details-label">
            ABOUT
          </span>

          <h2>
            What is {disease.name}?
          </h2>

          <p>
            {disease.about}
          </p>

        </section>


        {/* CAUSES + SYMPTOMS */}

        <div className="details-two-column">


          <section className="details-box">

            <span className="details-label">
              CAUSES
            </span>

            <h2>
              Possible causes
            </h2>

            <ul>

              {disease.causes.map(
                (cause, index) => (

                  <li key={index}>
                    <span>•</span>
                    {cause}
                  </li>

                )
              )}

            </ul>

          </section>


          <section className="details-box">

            <span className="details-label">
              SYMPTOMS
            </span>

            <h2>
              Common symptoms
            </h2>

            <ul>

              {disease.symptoms.map(
                (symptom, index) => (

                  <li key={index}>
                    <span>•</span>
                    {symptom}
                  </li>

                )
              )}

            </ul>

          </section>

        </div>


        {/* PRECAUTIONS */}

        <section className="details-section precautions-section">

          <span className="details-label">
            PRECAUTIONS
          </span>

          <h2>
            Helpful precautions
          </h2>

          <div className="precautions-grid">

            {disease.precautions.map(
              (precaution, index) => (

                <div
                  className="precaution-item"
                  key={index}
                >

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>
                    {precaution}
                  </p>

                </div>

              )
            )}

          </div>

        </section>


        {/* WHEN TO SEEK HELP */}

        <section className="seek-help-box">

          <span className="details-label">
            WHEN TO SEEK MEDICAL HELP
          </span>

          <h2>
            Talk to a healthcare professional
          </h2>

          <p>
            {disease.seekHelp}
          </p>

        </section>


        {/* DISCLAIMER */}

        <div className="details-disclaimer">

          <span>
            ⓘ
          </span>

          <p>
            This information is provided for
            educational purposes only. DermaScan's
            AI classification is not a medical
            diagnosis. A qualified healthcare
            professional should evaluate persistent,
            severe or concerning skin symptoms.
          </p>

        </div>

      </div>

    </div>

  );
}

export default DiseaseDetails;