import os
import io
import json
import uuid
import sqlite3

import numpy as np
import tensorflow as tf

from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash


# =========================================================
# APPLICATION
# =========================================================

app = Flask(__name__)

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "*"
        }
    }
)


# =========================================================
# PATHS
# =========================================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

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

DATABASE_PATH = os.path.join(
    BASE_DIR,
    "dermascan.db"
)


# =========================================================
# SETTINGS
# =========================================================

IMAGE_SIZE = (224, 224)

MAX_IMAGE_SIZE = 10 * 1024 * 1024


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

print()
print("=" * 60)
print("Loading DermaScan model...")
print("=" * 60)

model = tf.keras.models.load_model(
    MODEL_PATH
)

print("Model loaded successfully.")
print()

print("Model input shape:")
print(model.input_shape)

print()

print("Classes:")

for index, class_name in enumerate(CLASS_NAMES):

    print(
        f"{index} -> {class_name}"
    )

print()

print("Checking model layers...")

for index, layer in enumerate(model.layers):

    print(
        f"{index} -> {layer.name} -> "
        f"{layer.__class__.__name__}"
    )

print("=" * 60)


# =========================================================
# DATABASE
# =========================================================

def get_db():

    connection = sqlite3.connect(
        DATABASE_PATH
    )

    connection.row_factory = sqlite3.Row

    return connection


def init_database():

    connection = get_db()

    cursor = connection.cursor()

    # -----------------------------------------------------
    # USERS TABLE
    # -----------------------------------------------------

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT NOT NULL,

            email TEXT NOT NULL UNIQUE,

            password TEXT NOT NULL,

            token TEXT UNIQUE,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        )
        """
    )

    # -----------------------------------------------------
    # HISTORY TABLE
    # -----------------------------------------------------

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS history (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            user_id INTEGER NOT NULL,

            filename TEXT,

            disease TEXT,

            confidence REAL,

            probabilities TEXT,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(user_id)
            REFERENCES users(id)

        )
        """
    )

    connection.commit()

    connection.close()


init_database()


# =========================================================
# DISEASE INFORMATION
# =========================================================

DISEASE_INFO = {

    "Atopic Dermatitis (AD)": {

        "causes":
            "Atopic dermatitis may be associated with a sensitive skin barrier, genetics, allergens, irritants, dry skin and environmental factors.",

        "precautions":
            "Keep the skin moisturized, avoid known irritants, use gentle skin products and avoid scratching the affected area.",

        "doctor":
            "Consider seeing a dermatologist if symptoms are severe, persistent, spreading, infected or repeatedly returning."

    },


    "Contact Dermatitis (CD)": {

        "causes":
            "Contact dermatitis can occur when the skin reacts to an irritating or allergenic substance such as cosmetics, soaps, chemicals or metals.",

        "precautions":
            "Avoid suspected irritants or allergens, keep the affected area clean and use gentle skin-care products.",

        "doctor":
            "Consider medical evaluation if the rash is severe, persistent, spreading or does not improve after avoiding the suspected trigger."

    },


    "Eczema (EC)": {

        "causes":
            "Eczema may be associated with skin-barrier problems, genetics, allergens, irritants, stress and environmental triggers.",

        "precautions":
            "Keep the skin moisturized, avoid harsh soaps and known triggers, and try not to scratch the affected area.",

        "doctor":
            "See a healthcare professional if symptoms are severe, persistent, infected or interfering with daily activities."

    },


    "Scabies (SC)": {

        "causes":
            "Scabies is caused by infestation with microscopic mites and can spread through prolonged close skin-to-skin contact.",

        "precautions":
            "Avoid close contact and sharing personal items until evaluated. Household contacts may also require evaluation if scabies is suspected.",

        "doctor":
            "Medical evaluation is recommended because scabies usually requires specific treatment."

    },


    "Seborrheic Dermatitis (SD)": {

        "causes":
            "Seborrheic dermatitis can be associated with oil-producing skin, yeast on the skin, genetics, stress and environmental factors.",

        "precautions":
            "Keep the affected area clean, use gentle skin-care products and avoid scratching or irritating the skin.",

        "doctor":
            "Consider seeing a dermatologist if symptoms persist, become severe or do not improve with basic skin care."

    },


    "Tinea Corporis (TC)": {

        "causes":
            "Tinea corporis is a fungal skin infection that can spread through contact with infected skin, animals or contaminated personal items.",

        "precautions":
            "Keep the affected area clean and dry, avoid sharing towels or clothing and avoid close contact with infected areas.",

        "doctor":
            "Medical evaluation is recommended when a fungal infection is suspected because appropriate antifungal treatment may be required."

    }

}


# =========================================================
# HOME
# =========================================================

@app.route(
    "/",
    methods=["GET"]
)
def home():

    return jsonify({

        "success": True,

        "message":
            "DermaScan backend is running.",

        "service":
            "Skin Disease Detection API",

        "model_loaded":
            True

    })


# =========================================================
# HEALTH
# =========================================================

@app.route(
    "/api/health",
    methods=["GET"]
)
def health():

    return jsonify({

        "success": True,

        "status":
            "healthy",

        "model_loaded":
            True

    })


# =========================================================
# REGISTER
# =========================================================

@app.route(
    "/api/register",
    methods=["POST"]
)
def register():

    try:

        data = request.get_json()

        if not data:

            return jsonify({

                "success": False,

                "message":
                    "No registration data received."

            }), 400


        name = str(
            data.get("name", "")
        ).strip()


        email = str(
            data.get("email", "")
        ).strip().lower()


        password = str(
            data.get("password", "")
        )


        # -------------------------------------------------
        # VALIDATION
        # -------------------------------------------------

        if not name:

            return jsonify({

                "success": False,

                "message":
                    "Full name is required."

            }), 400


        if not email:

            return jsonify({

                "success": False,

                "message":
                    "Email address is required."

            }), 400


        if "@" not in email:

            return jsonify({

                "success": False,

                "message":
                    "Enter a valid email address."

            }), 400


        if len(password) < 6:

            return jsonify({

                "success": False,

                "message":
                    "Password must contain at least 6 characters."

            }), 400


        # -------------------------------------------------
        # DATABASE
        # -------------------------------------------------

        connection = get_db()

        cursor = connection.cursor()


        cursor.execute(
            """
            SELECT id
            FROM users
            WHERE email = ?
            """,
            (email,)
        )


        existing_user = cursor.fetchone()


        if existing_user:

            connection.close()

            return jsonify({

                "success": False,

                "message":
                    "An account with this email already exists."

            }), 409


        # -------------------------------------------------
        # TOKEN
        # -------------------------------------------------

        token = str(
            uuid.uuid4()
        )


        # -------------------------------------------------
        # PASSWORD HASH
        # -------------------------------------------------

        password_hash = generate_password_hash(
            password
        )


        # -------------------------------------------------
        # INSERT USER
        # -------------------------------------------------

        cursor.execute(
            """
            INSERT INTO users
            (
                name,
                email,
                password,
                token
            )

            VALUES
            (?, ?, ?, ?)
            """,
            (
                name,
                email,
                password_hash,
                token
            )
        )


        user_id = cursor.lastrowid

        connection.commit()

        connection.close()


        print(
            f"New user registered: {email}"
        )


        return jsonify({

            "success": True,

            "message":
                "Account created successfully.",

            "token":
                token,

            "user": {

                "id":
                    user_id,

                "name":
                    name,

                "email":
                    email

            }

        }), 201


    except Exception as error:

        print(
            "REGISTER ERROR:",
            error
        )

        return jsonify({

            "success": False,

            "message":
                f"Registration failed: {str(error)}"

        }), 500


# =========================================================
# LOGIN
# =========================================================

@app.route(
    "/api/login",
    methods=["POST"]
)
def login():

    try:

        data = request.get_json()

        if not data:

            return jsonify({

                "success": False,

                "message":
                    "No login data received."

            }), 400


        email = str(
            data.get("email", "")
        ).strip().lower()


        password = str(
            data.get("password", "")
        )


        if not email or not password:

            return jsonify({

                "success": False,

                "message":
                    "Email and password are required."

            }), 400


        connection = get_db()

        cursor = connection.cursor()


        cursor.execute(
            """
            SELECT *
            FROM users
            WHERE email = ?
            """,
            (email,)
        )


        user = cursor.fetchone()


        if not user:

            connection.close()

            return jsonify({

                "success": False,

                "message":
                    "Invalid email or password."

            }), 401


        if not check_password_hash(
            user["password"],
            password
        ):

            connection.close()

            return jsonify({

                "success": False,

                "message":
                    "Invalid email or password."

            }), 401


        token = user["token"]


        if not token:

            token = str(
                uuid.uuid4()
            )


            cursor.execute(
                """
                UPDATE users
                SET token = ?
                WHERE id = ?
                """,
                (
                    token,
                    user["id"]
                )
            )


            connection.commit()


        connection.close()


        return jsonify({

            "success": True,

            "message":
                "Login successful.",

            "token":
                token,

            "user": {

                "id":
                    user["id"],

                "name":
                    user["name"],

                "email":
                    user["email"]

            }

        })


    except Exception as error:

        print(
            "LOGIN ERROR:",
            error
        )


        return jsonify({

            "success": False,

            "message":
                f"Login failed: {str(error)}"

        }), 500


# =========================================================
# AUTHENTICATION HELPER
# =========================================================

def get_current_user():

    authorization = request.headers.get(
        "Authorization",
        ""
    )


    if not authorization.startswith(
        "Bearer "
    ):

        return None


    token = authorization.replace(
        "Bearer ",
        "",
        1
    ).strip()


    if not token:

        return None


    connection = get_db()

    cursor = connection.cursor()


    cursor.execute(
        """
        SELECT *
        FROM users
        WHERE token = ?
        """,
        (token,)
    )


    user = cursor.fetchone()

    connection.close()


    return user


# =========================================================
# PREDICT
# =========================================================

@app.route(
    "/api/predict",
    methods=["POST"]
)
def predict():

    try:

        # -------------------------------------------------
        # LOGIN REQUIRED
        # -------------------------------------------------

        user = get_current_user()


        if not user:

            return jsonify({

                "success": False,

                "message":
                    "Please login before analysing an image."

            }), 401


        # -------------------------------------------------
        # IMAGE CHECK
        # -------------------------------------------------

        if "image" not in request.files:

            return jsonify({

                "success": False,

                "message":
                    "No image was uploaded."

            }), 400


        file = request.files["image"]


        if not file.filename:

            return jsonify({

                "success": False,

                "message":
                    "No image was selected."

            }), 400


        # -------------------------------------------------
        # READ IMAGE
        # -------------------------------------------------

        image_bytes = file.read()


        if len(image_bytes) > MAX_IMAGE_SIZE:

            return jsonify({

                "success": False,

                "message":
                    "Image must be less than 10 MB."

            }), 400


        # -------------------------------------------------
        # OPEN IMAGE
        # -------------------------------------------------

        try:

            image = Image.open(
                io.BytesIO(image_bytes)
            )

            image = image.convert("RGB")

        except Exception as error:

            print(
                "IMAGE ERROR:",
                error
            )

            return jsonify({

                "success": False,

                "message":
                    "Invalid image file."

            }), 400


        # -------------------------------------------------
        # PREPROCESSING
        # -------------------------------------------------
        #
        # IMPORTANT:
        #
        # DO NOT divide by 255 here.
        #
        # The trained EfficientNetB0 model handles
        # the required preprocessing internally.
        #
        # Training images were loaded using
        # image_dataset_from_directory(), where images
        # are initially represented in the 0-255 range.
        #
        # Therefore we send the resized image directly
        # to the trained model.
        # -------------------------------------------------

        image = image.resize(
            IMAGE_SIZE
        )


        image_array = np.asarray(
            image,
            dtype=np.float32
        )


        image_array = np.expand_dims(
            image_array,
            axis=0
        )


        print()
        print("=" * 60)
        print("IMAGE PREPROCESSING")
        print("=" * 60)

        print(
            "Filename:",
            file.filename
        )

        print(
            "Input shape:",
            image_array.shape
        )

        print(
            "Minimum pixel value:",
            float(np.min(image_array))
        )

        print(
            "Maximum pixel value:",
            float(np.max(image_array))
        )

        print(
            "Mean pixel value:",
            float(np.mean(image_array))
        )

        print(
            "Backend normalization: NONE"
        )

        print("=" * 60)


        # -------------------------------------------------
        # MODEL PREDICTION
        # -------------------------------------------------

        predictions = model.predict(
            image_array,
            verbose=0
        )


        probabilities = np.asarray(
            predictions[0],
            dtype=np.float32
        )


        print()
        print("=" * 60)
        print("RAW MODEL OUTPUT")
        print("=" * 60)


        for index, value in enumerate(
            probabilities
        ):

            print(
                f"{CLASS_NAMES[index]} : "
                f"{float(value):.6f}"
            )


        print("=" * 60)


        # -------------------------------------------------
        # CHECK MODEL OUTPUT
        # -------------------------------------------------

        probability_sum = float(
            np.sum(probabilities)
        )


        print(
            "Raw probability sum:",
            probability_sum
        )


        # -------------------------------------------------
        # HANDLE LOGITS IF NECESSARY
        # -------------------------------------------------

        if (
            np.any(probabilities < 0)
            or probability_sum < 0.99
            or probability_sum > 1.01
        ):

            print(
                "Output does not look like probabilities."
            )

            print(
                "Applying softmax."
            )


            probabilities = tf.nn.softmax(
                probabilities
            ).numpy()


        # -------------------------------------------------
        # FINAL NORMALIZATION
        # -------------------------------------------------

        probability_sum = float(
            np.sum(probabilities)
        )


        if probability_sum > 0:

            probabilities = (
                probabilities /
                probability_sum
            )


        # -------------------------------------------------
        # FINAL PREDICTION
        # -------------------------------------------------

        predicted_index = int(
            np.argmax(probabilities)
        )


        confidence = float(
            probabilities[
                predicted_index
            ]
        )


        disease = CLASS_NAMES[
            predicted_index
        ]


        probability_list = [

            round(
                float(value) * 100,
                2
            )

            for value in probabilities

        ]


        # -------------------------------------------------
        # PRINT FINAL RESULT
        # -------------------------------------------------

        print()
        print("=" * 60)
        print("FINAL RESULT")
        print("=" * 60)

        print(
            "Predicted disease:",
            disease
        )

        print(
            "Predicted class:",
            predicted_index
        )

        print(
            "Confidence:",
            f"{confidence * 100:.2f}%"
        )

        print()

        print(
            "ALL PROBABILITIES:"
        )


        for index, value in enumerate(
            probability_list
        ):

            print(
                f"{CLASS_NAMES[index]} : "
                f"{value}%"
            )


        print("=" * 60)


        # -------------------------------------------------
        # DISEASE INFORMATION
        # -------------------------------------------------

        info = DISEASE_INFO.get(
            disease,
            {}
        )


        # -------------------------------------------------
        # SAVE HISTORY
        # -------------------------------------------------

        connection = get_db()

        cursor = connection.cursor()


        cursor.execute(
            """
            INSERT INTO history
            (
                user_id,
                filename,
                disease,
                confidence,
                probabilities
            )

            VALUES
            (?, ?, ?, ?, ?)
            """,
            (
                user["id"],
                file.filename,
                disease,
                round(
                    confidence * 100,
                    2
                ),
                json.dumps(
                    probability_list
                )
            )
        )


        connection.commit()


        history_id = cursor.lastrowid

        connection.close()


        # -------------------------------------------------
        # RESPONSE
        # -------------------------------------------------

        return jsonify({

            "success": True,

            "message":
                "Image analysed successfully.",

            "history_id":
                history_id,

            "filename":
                file.filename,

            "disease":
                disease,

            "class_index":
                predicted_index,

            "confidence":
                round(
                    confidence * 100,
                    2
                ),

            "probabilities":
                probability_list,

            "causes":
                info.get(
                    "causes",
                    ""
                ),

            "precautions":
                info.get(
                    "precautions",
                    ""
                ),

            "doctor":
                info.get(
                    "doctor",
                    ""
                )

        })


    except Exception as error:

        print()
        print("=" * 60)
        print("PREDICTION ERROR")
        print("=" * 60)

        print(
            repr(error)
        )

        print("=" * 60)
        print()


        return jsonify({

            "success": False,

            "message":
                f"Prediction failed: {str(error)}"

        }), 500


# =========================================================
# HISTORY
# =========================================================

@app.route(
    "/api/history",
    methods=["GET"]
)
def history():

    try:

        user = get_current_user()


        if not user:

            return jsonify({

                "success": False,

                "message":
                    "Please login first."

            }), 401


        connection = get_db()

        cursor = connection.cursor()


        cursor.execute(
            """
            SELECT
                id,
                filename,
                disease,
                confidence,
                probabilities,
                created_at

            FROM history

            WHERE user_id = ?

            ORDER BY created_at DESC
            """,
            (
                user["id"],
            )
        )


        rows = cursor.fetchall()

        connection.close()


        results = []


        for row in rows:

            probabilities = []


            try:

                probabilities = json.loads(
                    row["probabilities"]
                )

            except Exception:

                probabilities = []


            results.append({

                "id":
                    row["id"],

                "filename":
                    row["filename"],

                "disease":
                    row["disease"],

                "confidence":
                    row["confidence"],

                "probabilities":
                    probabilities,

                "created_at":
                    row["created_at"]

            })


        return jsonify({

            "success": True,

            "history":
                results

        })


    except Exception as error:

        print(
            "HISTORY ERROR:",
            error
        )


        return jsonify({

            "success": False,

            "message":
                f"Could not load history: {str(error)}"

        }), 500


# =========================================================
# CURRENT USER
# =========================================================

@app.route(
    "/api/me",
    methods=["GET"]
)
def current_user():

    user = get_current_user()


    if not user:

        return jsonify({

            "success": False,

            "message":
                "Not authenticated."

        }), 401


    return jsonify({

        "success": True,

        "user": {

            "id":
                user["id"],

            "name":
                user["name"],

            "email":
                user["email"]

        }

    })


# =========================================================
# 404
# =========================================================

@app.errorhandler(404)
def not_found(error):

    return jsonify({

        "success": False,

        "message":
            "API endpoint not found."

    }), 404


# =========================================================
# START SERVER
# =========================================================

if __name__ == "__main__":

    print()
    print("=" * 60)
    print("DERMASCAN BACKEND")
    print("=" * 60)

    print(
        "Server: http://127.0.0.1:5000"
    )

    print(
        "Network: http://0.0.0.0:5000"
    )

    print(
        "Model: dermascan_final.keras"
    )

    print(
        "Model status: LOADED"
    )

    print("=" * 60)
    print()


    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )