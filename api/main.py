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

# load the model
model = tf.keras.models.load_model("../model/best_model.keras")

# preprocess image function
def preprocess_image(image: Image.Image) -> np.ndarray:
    # resize image to match model's expected sizing
    image = image.resize((224, 224))
    
    # convert image to numpy array and normalize
    image_array = np.array(image)
    image_array = image_array / 255.0
    
    # add batch dimension
    image_array = np.expand_dims(image_array, axis=0)
    
    return image_array

@app.post("/api/analyze")
async def analyze_brain_scan(file: UploadFile = File(...)):
    # validate file type
    # if file.content_type not in ["image/jpeg", "image/png"]:
    #     raise HTTPException(400, detail="Invalid file type. Only JPEG and PNG are supported.")
    
    try:
        # read and preprocess the image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        processed_image = preprocess_image(image)
        
        # make prediction
        prediction = model.predict(processed_image)
        prediction_class = np.argmax(prediction[0])
        confidence = float(prediction[0][prediction_class]) * 100
        
        # convert prediction to boolean (3 is the index for no tumor)
        has_tumor = prediction_class != 3
        
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