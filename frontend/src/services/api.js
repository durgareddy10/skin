const API_BASE_URL = "http://127.0.0.1:5000";

export async function healthCheck() {
  const response = await fetch(`${API_BASE_URL}/api/health`);

  if (!response.ok) {
    throw new Error("Backend health check failed");
  }

  return await response.json();
}

export async function predictSkinDisease(imageFile) {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await fetch(
    `${API_BASE_URL}/api/predict`,
    {
      method: "POST",
      body: formData,
    }
  );

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid response from backend");
  }

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Skin analysis failed"
    );
  }

  return data;
}