from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import tensorflow as tf
import numpy as np
import uvicorn
import io

import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

app = FastAPI()

# add CORS middleware 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_model():
    return tf.keras.models.load_model("../model/best_model.keras")

# preprocess image function
def preprocess_image(image: Image.Image) -> np.ndarray:
    image = image.resize((224, 224))

    image_array = np.array(image)

    if len(image_array.shape) != 3 or image_array.shape[2] != 3:
        raise ValueError("Image does not have 3 color channels (RGB).")

    image_array = image_array / 255.0

    image_array = np.expand_dims(image_array, axis=0)

    return image_array

@app.post("/api/analyze")
async def analyze_brain_scan(file: UploadFile = File(...)):
    try:
        # ensure model is loaded
        model = get_model()

        # read and preprocess the image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        processed_image = preprocess_image(image)
        
        # make prediction
        prediction = model.predict(processed_image)
        prediction_class = int(np.argmax(prediction[0]))  
        confidence = float(prediction[0][prediction_class]) * 100
        
        # convert prediction to boolean (3 is the index for no tumor)
        has_tumor = bool(prediction_class != 3)  
        
        return {
            "hasTumor": has_tumor,
            "confidence": confidence
        }
        
    except Exception as e:
        raise HTTPException(500, detail=str(e))

# health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 