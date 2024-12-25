from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import tensorflow as tf
import numpy as np
import uvicorn
import io

app = FastAPI()

# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
model = tf.keras.models.load_model("best_model.keras")

# Preprocess image function
def preprocess_image(image: Image.Image) -> np.ndarray:
    # Resize image to match model's expected sizing
    image = image.resize((224, 224))
    
    # Convert image to numpy array and normalize
    image_array = np.array(image)
    image_array = image_array / 255.0
    
    # Add batch dimension
    image_array = np.expand_dims(image_array, axis=0)
    
    return image_array

@app.post("/api/analyze")
async def analyze_brain_scan(file: UploadFile = File(...)):
    # Validate file type
    # if file.content_type not in ["image/jpeg", "image/png"]:
    #     raise HTTPException(400, detail="Invalid file type. Only JPEG and PNG are supported.")
    
    try:
        # Read and preprocess the image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        processed_image = preprocess_image(image)
        
        # Make prediction
        prediction = model.predict(processed_image)
        prediction_class = np.argmax(prediction[0])
        confidence = float(prediction[0][prediction_class]) * 100
        
        # Convert prediction to boolean (assuming class 0 is no tumor and others indicate tumor)
        has_tumor = prediction_class != 3
        
        return {
            "hasTumor": has_tumor,
            "confidence": confidence
        }
        
    except Exception as e:
        raise HTTPException(500, detail=str(e))

# Optional: Add a health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 