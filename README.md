<div align="center">

# ✦ DermaScan

### AI-Assisted Skin Disease Classification System

Upload a skin image, analyze it with a TensorFlow EfficientNetB0 model, view class probabilities, and keep your prediction history in one clean web application.

<p>
<img src="assets/01-ai-analysis.png" width="30%">
<img src="assets/02-model.png" width="30%">
<img src="assets/03-history.png" width="30%">
</p>

**React • Vite • Flask • TensorFlow • EfficientNetB0 • SQLite**

</div>

---

## ✦ Overview

**DermaScan** is a full-stack AI-assisted web application for classifying six supported skin-condition categories from an uploaded image.

It combines a React + Vite frontend, Flask REST API, TensorFlow/Keras EfficientNetB0 model, SQLite application data, account-based history, and result guidance.

> **Important:** DermaScan provides an AI-assisted classification result and is **not a medical diagnosis**. Results should not replace examination or advice from a qualified healthcare professional.

---

## ✦ Supported Conditions

| Class | Condition |
|---:|---|
| 0 | Atopic Dermatitis (AD) |
| 1 | Contact Dermatitis (CD) |
| 2 | Eczema (EC) |
| 3 | Scabies (SC) |
| 4 | Seborrheic Dermatitis (SD) |
| 5 | Tinea Corporis (TC) |

---

## ✦ Model Performance

The trained model was evaluated on a 1,200-image test set.

### **Reported test accuracy: 94.08%**

| Condition | Precision | Recall | F1-score | Support |
|---|---:|---:|---:|---:|
| Atopic Dermatitis (AD) | 0.8491 | 0.9184 | 0.8824 | 49 |
| Contact Dermatitis (CD) | 0.9558 | 0.9072 | 0.9309 | 334 |
| Eczema (EC) | 0.9558 | 0.9266 | 0.9410 | 327 |
| Scabies (SC) | 0.9675 | 0.9876 | 0.9774 | 241 |
| Seborrheic Dermatitis (SD) | 0.9298 | 0.9464 | 0.9381 | 56 |
| Tinea Corporis (TC) | 0.8905 | 0.9689 | 0.9280 | 193 |
| **Accuracy** | | | **0.9408** | **1200** |

---

## ✦ How It Works

```text
USER
  ↓
React Web Interface
  ↓
Image Upload
  ↓
Flask API
  ↓
Image Preprocessing
  ↓
EfficientNetB0
  ↓
Six-Class Prediction
  ↓
Disease + Confidence + Probabilities
  ↓
Result Guidance
  ↓
SQLite History
```

---

## ✦ Main Features

### 🔐 Authentication
- User registration
- User login
- Logout
- Account-based application flow

### 🔬 Skin Analysis
- Upload JPG, JPEG, PNG, or WEBP images
- Image preview
- TensorFlow model inference
- Predicted condition
- Model confidence
- Probability for every supported class

### 📋 Result Information
- Predicted condition
- Model confidence
- Prediction scores
- Possible causes
- General precautions
- Guidance about professional medical evaluation

### 🕘 History
- Save completed analyses
- View previous predictions
- Account-based prediction history

---

## ✦ Technology Stack

**Frontend**
- React
- Vite
- JavaScript
- CSS
- React Router

**Backend**
- Python
- Flask
- Flask-CORS
- Pillow

**Machine Learning**
- TensorFlow
- Keras
- EfficientNetB0
- Transfer Learning
- NumPy

**Database**
- SQLite

---

## ✦ Project Structure

```text
skin/
├── backend/
│   ├── app.py
│   ├── prediction.py
│   ├── model_loader.py
│   ├── dermascan.db
│   ├── requirements.txt
│   └── model/
│       ├── dermascan_final.keras
│       └── class_names.json
│
└── frontend/
    ├── package.json
    ├── index.html
    └── src/
        ├── App.jsx
        ├── pages/
        └── components/
```

---

## ✦ Local Setup

### Backend

```bash
cd backend
python -m venv venv311
```

Windows:

```powershell
.\venv311\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start Flask:

```bash
python app.py
```

Backend:

```text
http://127.0.0.1:5000
```

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## ✦ API

### Health Check

```http
GET /api/health
```

### Skin Prediction

```http
POST /api/predict
```

Form field:

```text
image
```

Example response:

```json
{
  "success": true,
  "disease": "Eczema (EC)",
  "confidence": 82.31,
  "class_index": 2,
  "probabilities": [4.21, 5.14, 82.31, 2.88, 1.73, 3.73]
}
```

---

## ✦ User Flow

```text
Home
 ↓
Register / Login
 ↓
Check Skin
 ↓
Upload Image
 ↓
Analyze
 ↓
Prediction Result
 ├── Condition
 ├── Confidence
 ├── Class Probabilities
 ├── Causes
 ├── Precautions
 └── Doctor Guidance
 ↓
History
```

---

## ✦ Responsible Use

<img src="assets/04-safety.png" width="70%">

DermaScan is intended as an **AI-assisted classification project** and should not be used as a substitute for clinical diagnosis.

Image quality, lighting, skin tone, camera conditions, dataset limitations, and differences between training images and real-world images can affect model predictions.

If a skin condition is persistent, worsening, painful, infected, rapidly spreading, or otherwise concerning, seek evaluation from a qualified healthcare professional.

---

## ✦ Future Scope

- Improve model generalization using more diverse datasets
- Add Grad-CAM model explainability
- Add image-quality validation
- Improve mobile responsiveness
- Add secure production authentication
- Deploy frontend and backend
- Add model monitoring
- Add multilingual guidance
- Improve database security and privacy

---

## ✦ Project Highlights

> **94.08% reported test accuracy**  
> **6 supported skin-condition classes**  
> **EfficientNetB0 transfer learning**  
> **React + Flask full-stack architecture**  
> **Account-based prediction history**

---

<div align="center">

### Built with ✦ for an AI-assisted healthcare project

**DermaScan**

</div>
