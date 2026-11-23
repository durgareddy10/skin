const C = {
  bg: "#f7f4ee",
  card: "#fbf9f5",
  dark: "#29251f",
  brown: "#756c61",
  terracotta: "#b95731",
  light: "#eee5d9",
  border: "#ded5c9",
};


function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        color: C.dark,
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >

      {/* ==================================================
          HEADER
      ================================================== */}

      <section
        style={{
          maxWidth: "1050px",
          margin: "0 auto",
          padding: "85px 30px 55px",
        }}
      >

        <div
          style={{
            color: C.terracotta,
            fontSize: "9px",
            fontWeight: "700",
            letterSpacing: "1.3px",
          }}
        >
          ABOUT DERMASCAN
        </div>


        <h1
          style={{
            maxWidth: "800px",
            marginTop: "15px",
            fontFamily:
              "Georgia, 'Times New Roman', serif",
            fontSize:
              "clamp(28px, 5.5vw, 64px)",
            lineHeight: "1.05",
            letterSpacing: "-2px",
            color: C.dark,
          }}
        >
          From image to
          <br />

          <span
            style={{
              color: C.terracotta,
            }}
          >
            intelligent insight.
          </span>
        </h1>


        <p
          style={{
            maxWidth: "720px",
            marginTop: "22px",
            color: C.brown,
            fontSize: "14px",
            lineHeight: "1.8",
          }}
        >
          DermaScan is an AI-assisted skin image
          classification project designed to analyze
          skin images and predict the most likely
          condition from the classes supported by
          the trained deep learning model.
        </p>

      </section>


      {/* ==================================================
          WHAT IS DERMASCAN
      ================================================== */}

      <section
        style={{
          maxWidth: "1050px",
          margin: "0 auto",
          padding: "20px 30px 75px",
        }}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "120px 1fr",
            gap: "40px",
            padding: "45px 0",
            borderTop:
              `1px solid ${C.border}`,
          }}
        >

          {/* NUMBER */}

          <div>
            <span
              style={{
                fontFamily:
                  "Georgia, 'Times New Roman', serif",
                fontSize: "28px",
                color: C.terracotta,
              }}
            >
              01
            </span>
          </div>


          {/* CONTENT */}

          <div>

            <div
              style={{
                color: C.terracotta,
                fontSize: "9px",
                fontWeight: "700",
                letterSpacing: "1px",
              }}
            >
              THE PROJECT
            </div>


            <h2
              style={{
                marginTop: "10px",
                fontFamily:
                  "Georgia, 'Times New Roman', serif",
                fontSize: "36px",
                color: C.dark,
              }}
            >
              What is DermaScan?
            </h2>


            <p
              style={{
                maxWidth: "720px",
                marginTop: "15px",
                color: C.brown,
                fontSize: "13px",
                lineHeight: "1.9",
              }}
            >
              DermaScan is a web-based AI-assisted
              skin disease classification system.
              A user can upload an image of a skin
              condition through the website. The
              uploaded image is sent to the backend,
              where it is processed and passed to
              the trained deep learning model.
            </p>


            <p
              style={{
                maxWidth: "720px",
                marginTop: "12px",
                color: C.brown,
                fontSize: "13px",
                lineHeight: "1.9",
              }}
            >
              The model analyzes the image and returns
              a predicted skin-condition class along
              with a confidence score. The result is
              then displayed to the user through the
              DermaScan interface.
            </p>

          </div>

        </div>


        {/* ==================================================
            HOW PROJECT WORKS
        ================================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "120px 1fr",
            gap: "40px",
            padding: "45px 0",
            borderTop:
              `1px solid ${C.border}`,
          }}
        >

          <div>

            <span
              style={{
                fontFamily:
                  "Georgia, 'Times New Roman', serif",
                fontSize: "28px",
                color: C.terracotta,
              }}
            >
              02
            </span>

          </div>


          <div>

            <div
              style={{
                color: C.terracotta,
                fontSize: "9px",
                fontWeight: "700",
                letterSpacing: "1px",
              }}
            >
              SYSTEM FLOW
            </div>


            <h2
              style={{
                marginTop: "10px",
                fontFamily:
                  "Georgia, 'Times New Roman', serif",
                fontSize: "36px",
                color: C.dark,
              }}
            >
              How the project works
            </h2>


            <p
              style={{
                maxWidth: "720px",
                marginTop: "15px",
                color: C.brown,
                fontSize: "13px",
                lineHeight: "1.9",
              }}
            >
              The complete system follows a simple
              image-to-prediction pipeline. The user
              interacts with the frontend, while the
              backend handles the image and communicates
              with the trained model.
            </p>


            {/* WORKFLOW */}

            <div
              style={{
                marginTop: "30px",
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, 1fr)",
                gap: "12px",
              }}
            >

              <Workflow
                number="01"
                title="Upload Image"
                text="The user selects a clear skin image from the device."
              />

              <Workflow
                number="02"
                title="Send to Backend"
                text="The frontend sends the selected image to the Flask backend."
              />

              <Workflow
                number="03"
                title="Process Image"
                text="The backend prepares the image in the format required by the model."
              />

              <Workflow
                number="04"
                title="Generate Prediction"
                text="The trained deep learning model analyzes the image and predicts the class."
              />

              <Workflow
                number="05"
                title="Return Result"
                text="The backend sends the predicted class and confidence back to the frontend."
              />

              <Workflow
                number="06"
                title="Display Result"
                text="DermaScan displays the prediction and supporting information to the user."
              />

            </div>

          </div>

        </div>


        {/* ==================================================
            AI MODEL WORKFLOW
        ================================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "120px 1fr",
            gap: "40px",
            padding: "45px 0",
            borderTop:
              `1px solid ${C.border}`,
          }}
        >

          <div>

            <span
              style={{
                fontFamily:
                  "Georgia, 'Times New Roman', serif",
                fontSize: "28px",
                color: C.terracotta,
              }}
            >
              03
            </span>

          </div>


          <div>

            <div
              style={{
                color: C.terracotta,
                fontSize: "9px",
                fontWeight: "700",
                letterSpacing: "1px",
              }}
            >
              ARTIFICIAL INTELLIGENCE
            </div>


            <h2
              style={{
                marginTop: "10px",
                fontFamily:
                  "Georgia, 'Times New Roman', serif",
                fontSize: "36px",
                color: C.dark,
              }}
            >
              AI / Model Workflow
            </h2>


            <p
              style={{
                maxWidth: "720px",
                marginTop: "15px",
                color: C.brown,
                fontSize: "13px",
                lineHeight: "1.9",
              }}
            >
              DermaScan uses a trained deep learning
              image-classification model. The model
              learns visual patterns from the skin
              disease dataset and uses those learned
              patterns to classify a new uploaded image.
            </p>


            {/* MODEL PIPELINE */}

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >

              <ModelStep
                number="01"
                title="Training Dataset"
                text="The model is trained using the prepared SkinDisNet_2 dataset containing the supported skin-condition classes."
              />

              <ModelStep
                number="02"
                title="Image Preprocessing"
                text="Input images are resized and prepared so that they match the format expected by the trained model."
              />

              <ModelStep
                number="03"
                title="Deep Learning Model"
                text="The trained neural network extracts visual features from the uploaded skin image."
              />

              <ModelStep
                number="04"
                title="Classification"
                text="The model compares the learned features and produces probabilities for the supported classes."
              />

              <ModelStep
                number="05"
                title="Prediction + Confidence"
                text="The class with the highest predicted probability is returned together with its confidence score."
              />

            </div>

          </div>

        </div>


        {/* ==================================================
            IMPORTANT NOTE
        ================================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "120px 1fr",
            gap: "40px",
            padding: "45px 0",
            borderTop:
              `1px solid ${C.border}`,
          }}
        >

          <div>

            <span
              style={{
                fontFamily:
                  "Georgia, 'Times New Roman', serif",
                fontSize: "28px",
                color: C.terracotta,
              }}
            >
              04
            </span>

          </div>


          <div>

            <div
              style={{
                color: C.terracotta,
                fontSize: "9px",
                fontWeight: "700",
                letterSpacing: "1px",
              }}
            >
              IMPORTANT
            </div>


            <h2
              style={{
                marginTop: "10px",
                fontFamily:
                  "Georgia, 'Times New Roman', serif",
                fontSize: "36px",
                color: C.dark,
              }}
            >
              Important note
            </h2>


            <div
              style={{
                marginTop: "18px",
                padding: "22px",
                borderRadius: "12px",
                background: C.light,
                border:
                  `1px solid ${C.border}`,
              }}
            >

              <p
                style={{
                  color: C.brown,
                  fontSize: "12px",
                  lineHeight: "1.8",
                  margin: 0,
                }}
              >
                DermaScan is an AI-assisted image
                classification project. The prediction
                generated by the system should not be
                considered a medical diagnosis or a
                replacement for professional medical
                examination.
              </p>


              <p
                style={{
                  color: C.brown,
                  fontSize: "12px",
                  lineHeight: "1.8",
                  marginTop: "12px",
                  marginBottom: 0,
                }}
              >
                For health-related concerns, users should
                consult a qualified healthcare professional
                for proper evaluation and treatment.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}


/* ==================================================
   WORKFLOW CARD
================================================== */

function Workflow({
  number,
  title,
  text,
}) {
  return (
    <div
      style={{
        padding: "20px",
        border:
          `1px solid ${C.border}`,
        borderRadius: "12px",
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
        {number}
      </div>


      <h3
        style={{
          marginTop: "9px",
          fontFamily:
            "Georgia, 'Times New Roman', serif",
          fontSize: "18px",
          color: C.dark,
        }}
      >
        {title}
      </h3>


      <p
        style={{
          marginTop: "7px",
          color: C.brown,
          fontSize: "10px",
          lineHeight: "1.7",
        }}
      >
        {text}
      </p>

    </div>
  );
}


/* ==================================================
   MODEL STEP
================================================== */

function ModelStep({
  number,
  title,
  text,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "55px 1fr",
        gap: "15px",
        alignItems: "start",

        padding: "17px 18px",

        border:
          `1px solid ${C.border}`,

        borderRadius: "10px",

        background: C.card,
      }}
    >

      <div
        style={{
          width: "38px",
          height: "38px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: "9px",

          background: C.light,

          color: C.terracotta,

          fontFamily:
            "Georgia, 'Times New Roman', serif",

          fontSize: "14px",

          fontWeight: "700",
        }}
      >
        {number}
      </div>


      <div>

        <h3
          style={{
            margin: 0,

            fontFamily:
              "Georgia, 'Times New Roman', serif",

            fontSize: "18px",

            color: C.dark,
          }}
        >
          {title}
        </h3>


        <p
          style={{
            marginTop: "6px",

            color: C.brown,

            fontSize: "10px",

            lineHeight: "1.7",
          }}
        >
          {text}
        </p>

      </div>

    </div>
  );
}


export default About;