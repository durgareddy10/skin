import os
import numpy as np
import tensorflow as tf

from PIL import Image

from model_loader import model, CLASS_NAMES, IMAGE_SIZE


# =========================================================
# DATASET PATH
# =========================================================

DATASET_PATH = r"C:\Users\durga\Downloads\SkinDisNet_2\Augmented"


# =========================================================
# IMAGE EXTENSIONS
# =========================================================

VALID_EXTENSIONS = (
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
)


# =========================================================
# PREPROCESS IMAGE
# =========================================================

def prepare_image(image_path):

    image = Image.open(
        image_path
    ).convert("RGB")

    image = image.resize(
        IMAGE_SIZE
    )

    image_array = np.array(
        image,
        dtype=np.float32
    )

    image_array = (
        image_array / 255.0
    )

    image_array = np.expand_dims(
        image_array,
        axis=0
    )

    return image_array


# =========================================================
# PREDICT
# =========================================================

def predict_one(image_path):

    image_array = prepare_image(
        image_path
    )

    prediction = model.predict(
        image_array,
        verbose=0
    )[0]

    index = int(
        np.argmax(prediction)
    )

    confidence = float(
        prediction[index]
    ) * 100

    return (
        CLASS_NAMES[index],
        confidence,
        prediction
    )


# =========================================================
# MAIN TEST
# =========================================================

print("")
print("=" * 70)
print("DERMASCAN DATASET MODEL TEST")
print("=" * 70)

print(
    "Dataset:",
    DATASET_PATH
)

print("")


if not os.path.exists(
    DATASET_PATH
):

    print(
        "ERROR: Dataset folder not found."
    )

    print(
        "Change DATASET_PATH in this file."
    )

    raise SystemExit


# =========================================================
# GET CLASS FOLDERS
# =========================================================

class_folders = [

    folder

    for folder in os.listdir(
        DATASET_PATH
    )

    if os.path.isdir(
        os.path.join(
            DATASET_PATH,
            folder
        )
    )
]


print("Found folders:")

for folder in class_folders:

    print(
        " -",
        folder
    )

print("")


# =========================================================
# TEST IMAGES
# =========================================================

for folder in class_folders:

    folder_path = os.path.join(
        DATASET_PATH,
        folder
    )


    images = [

        file

        for file in os.listdir(
            folder_path
        )

        if file.lower().endswith(
            VALID_EXTENSIONS
        )

    ]


    print("")
    print("-" * 70)
    print(
        "ACTUAL CLASS:",
        folder
    )
    print("-" * 70)


    # Test first 5 images
    test_images = images[:5]


    for filename in test_images:

        image_path = os.path.join(
            folder_path,
            filename
        )


        try:

            predicted_class, confidence, probabilities = (
                predict_one(
                    image_path
                )
            )


            print("")
            print(
                "Image:",
                filename
            )

            print(
                "Actual:",
                folder
            )

            print(
                "Predicted:",
                predicted_class
            )

            print(
                "Confidence:",
                round(
                    confidence,
                    2
                ),
                "%"
            )


            # Print all probabilities

            print(
                "Scores:"
            )


            for index, score in enumerate(
                probabilities
            ):

                print(
                    f"  {CLASS_NAMES[index]}: "
                    f"{float(score) * 100:.2f}%"
                )


        except Exception as error:

            print(
                "ERROR:",
                error
            )


print("")
print("=" * 70)
print("TEST COMPLETED")
print("=" * 70)