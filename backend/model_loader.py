import json
import os

import numpy as np
import tensorflow as tf
from PIL import Image


# =========================================================
# PATHS
# =========================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "dermascan_final.keras"
)

CLASS_NAMES_PATH = os.path.join(
    BASE_DIR,
    "model",
    "class_names.json"
)


# =========================================================
# MODEL SETTINGS
# =========================================================

IMAGE_SIZE = (224, 224)


# =========================================================
# LOAD CLASS NAMES
# =========================================================

with open(
    CLASS_NAMES_PATH,
    "r",
    encoding="utf-8"
) as file:

    CLASS_NAMES = json.load(file)


# =========================================================
# LOAD MODEL
# =========================================================

print("")
print("=" * 60)
print("Loading DermaScan model...")
print("=" * 60)

model = tf.keras.models.load_model(
    MODEL_PATH
)

print("Model loaded successfully.")

print("")
print("Model input shape:")
print(model.input_shape)

print("")
print("Classes:")

for index, class_name in enumerate(CLASS_NAMES):
    print(f"{index} -> {class_name}")


# =========================================================
# CHECK MODEL
# =========================================================

print("")
print("Checking EfficientNet preprocessing...")

print(
    "EfficientNetB0 handles image preprocessing internally."
)

print(
    "Backend will NOT divide image pixels by 255."
)

print("=" * 60)


# =========================================================
# PREDICT IMAGE
# =========================================================

def predict_image(image):

    # -----------------------------------------------------
    # RESIZE IMAGE
    # -----------------------------------------------------

    image = image.resize(
        IMAGE_SIZE,
        Image.Resampling.BILINEAR
    )


    # -----------------------------------------------------
    # CONVERT TO RGB
    # -----------------------------------------------------

    image = image.convert("RGB")


    # -----------------------------------------------------
    # CONVERT TO NUMPY
    # -----------------------------------------------------

    image_array = np.asarray(
        image,
        dtype=np.float32
    )


    # -----------------------------------------------------
    # IMPORTANT
    # -----------------------------------------------------
    #
    # DO NOT DO:
    #
    # image_array = image_array / 255.0
    #
    # EfficientNetB0 already contains its preprocessing.
    #
    # -----------------------------------------------------


    # -----------------------------------------------------
    # ADD BATCH DIMENSION
    # -----------------------------------------------------

    image_array = np.expand_dims(
        image_array,
        axis=0
    )


    # -----------------------------------------------------
    # MODEL PREDICTION
    # -----------------------------------------------------

    predictions = model.predict(
        image_array,
        verbose=0
    )


    probabilities = predictions[0]


    # -----------------------------------------------------
    # NORMALIZE OUTPUT SAFELY
    # -----------------------------------------------------

    probabilities = np.asarray(
        probabilities,
        dtype=np.float32
    )

    probability_sum = float(
        np.sum(probabilities)
    )

    if probability_sum > 0:
        probabilities = (
            probabilities / probability_sum
        )


    # -----------------------------------------------------
    # FIND BEST CLASS
    # -----------------------------------------------------

    predicted_index = int(
        np.argmax(probabilities)
    )


    # -----------------------------------------------------
    # CONFIDENCE
    # -----------------------------------------------------

    confidence = float(
        probabilities[predicted_index]
    )


    # -----------------------------------------------------
    # DISEASE NAME
    # -----------------------------------------------------

    predicted_class = CLASS_NAMES[
        predicted_index
    ]


    # -----------------------------------------------------
    # ALL PROBABILITIES
    # -----------------------------------------------------

    probability_results = []

    for index, value in enumerate(probabilities):

        probability_results.append({
            "class_index": index,
            "disease": CLASS_NAMES[index],
            "confidence": round(
                float(value) * 100,
                2
            )
        })


    # -----------------------------------------------------
    # SORT HIGHEST FIRST
    # -----------------------------------------------------

    probability_results.sort(
        key=lambda item: item["confidence"],
        reverse=True
    )


    # -----------------------------------------------------
    # FINAL RESULT
    # -----------------------------------------------------

    return {

        "class_index":
            predicted_index,

        "disease":
            predicted_class,

        "confidence":
            round(
                confidence * 100,
                2
            ),

        "probabilities":
            probability_results
    }