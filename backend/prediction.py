import json
import os

import numpy as np
import tensorflow as tf
from PIL import Image


# ============================================================
# PATHS
# ============================================================

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


# ============================================================
# SETTINGS
# ============================================================

IMAGE_SIZE = (224, 224)


# ============================================================
# CLASS NAMES
# ============================================================

with open(
    CLASS_NAMES_PATH,
    "r",
    encoding="utf-8"
) as file:

    CLASS_NAMES = json.load(file)


# ============================================================
# LOAD MODEL
# ============================================================

print()
print("=" * 60)
print("Loading DermaScan model...")
print("=" * 60)

model = tf.keras.models.load_model(
    MODEL_PATH,
    compile=False
)

print("Model loaded successfully.")
print()

print("Model input shape:")
print(model.input_shape)

print()

print("Classes:")

for index, name in enumerate(CLASS_NAMES):
    print(f"{index} -> {name}")

print()

print("Checking model layers...")

for index, layer in enumerate(model.layers):
    print(
        f"{index} -> {layer.name} -> "
        f"{layer.__class__.__name__}"
    )

print("=" * 60)


# ============================================================
# PREPROCESS IMAGE
# ============================================================

def preprocess_image(image):
    """
    Prepare image exactly for the trained model.

    image_dataset_from_directory() provides images
    in the 0-255 range.

    EfficientNetB0 used inside the trained model
    handles its own preprocessing.

    Therefore we DO NOT divide by 255 here.
    """

    image = image.convert("RGB")

    image = image.resize(
        IMAGE_SIZE,
        Image.Resampling.LANCZOS
    )

    image_array = np.asarray(
        image,
        dtype=np.float32
    )

    image_array = np.expand_dims(
        image_array,
        axis=0
    )

    return image_array


# ============================================================
# PREDICT IMAGE
# ============================================================

def predict_image(image):

    print()
    print("=" * 60)
    print("NEW IMAGE PREDICTION")
    print("=" * 60)

    # --------------------------------------------------------
    # PREPROCESS
    # --------------------------------------------------------

    image_array = preprocess_image(image)

    print(
        "Input shape:",
        image_array.shape
    )

    print(
        "Input minimum:",
        float(image_array.min())
    )

    print(
        "Input maximum:",
        float(image_array.max())
    )

    # --------------------------------------------------------
    # MODEL PREDICTION
    # --------------------------------------------------------

    predictions = model.predict(
        image_array,
        verbose=0
    )

    probabilities = np.asarray(
        predictions[0],
        dtype=np.float64
    )

    # --------------------------------------------------------
    # SAFETY CHECK
    # --------------------------------------------------------

    if probabilities.ndim != 1:

        raise ValueError(
            "Unexpected model output shape."
        )

    if len(probabilities) != len(CLASS_NAMES):

        raise ValueError(
            "Number of model outputs does not "
            "match number of classes."
        )

    # --------------------------------------------------------
    # NORMALIZE ONLY IF NECESSARY
    # --------------------------------------------------------

    probability_sum = float(
        probabilities.sum()
    )

    # Softmax output should already sum to 1.
    # This fallback protects against unusual model outputs.

    if (
        probability_sum <= 0
        or not np.isfinite(probability_sum)
    ):

        raise ValueError(
            "Invalid model prediction."
        )

    if not np.isclose(
        probability_sum,
        1.0,
        atol=0.01
    ):

        probabilities = (
            probabilities /
            probability_sum
        )

    # --------------------------------------------------------
    # FIND PREDICTED CLASS
    # --------------------------------------------------------

    predicted_index = int(
        np.argmax(probabilities)
    )

    predicted_class = CLASS_NAMES[
        predicted_index
    ]

    confidence = float(
        probabilities[predicted_index] * 100
    )

    # --------------------------------------------------------
    # ALL CLASS PROBABILITIES
    # --------------------------------------------------------

    probability_list = []

    for index, value in enumerate(probabilities):

        probability_list.append({
            "class_index": index,
            "disease": CLASS_NAMES[index],
            "probability": round(
                float(value) * 100,
                2
            )
        })

    # --------------------------------------------------------
    # SORTED PROBABILITIES
    # --------------------------------------------------------

    sorted_predictions = sorted(
        probability_list,
        key=lambda item: item["probability"],
        reverse=True
    )

    # --------------------------------------------------------
    # DEBUG OUTPUT
    # --------------------------------------------------------

    print()
    print("RAW MODEL PREDICTIONS:")

    for item in probability_list:

        print(
            f"{item['disease']}: "
            f"{item['probability']}%"
        )

    print()
    print(
        "PREDICTED DISEASE:",
        predicted_class
    )

    print(
        "CONFIDENCE:",
        round(confidence, 2),
        "%"
    )

    print("=" * 60)

    # --------------------------------------------------------
    # RETURN
    # --------------------------------------------------------

    return {

        "class_index": predicted_index,

        "disease": predicted_class,

        "confidence": round(
            confidence,
            2
        ),

        "probabilities": [
            item["probability"]
            for item in probability_list
        ],

        "prediction_details":
            probability_list,

        "top_predictions":
            sorted_predictions[:3]
    }