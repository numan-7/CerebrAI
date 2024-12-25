from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import io
import os
import hashlib
from tensorflow.keras.backend import clear_session
import uvicorn

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

clear_session()
model = tf.keras.models.load_model("../model/final_model.keras")

CLASS_INDICES = {
    'glioma_tumor': 0,
    'meningioma_tumor': 1,
    'no_tumor': 2,
    'pituitary_tumor': 3
}

@tf.function(reduce_retracing=True)
def make_prediction(input_tensor):
    return model(input_tensor)

def preprocess_image(image: Image.Image) -> np.ndarray:
    # ensure RGB
    if image.mode != "RGB":
        image = image.convert("RGB")
    # resize 
    image = image.resize((224, 224))
    # convert to array
    image_array = img_to_array(image)
    # scale to [0,1]
    image_array = image_array / 255.0
    # expand dims: shape = (1, 224, 224, 3)
    image_array = np.expand_dims(image_array, axis=0)
    return image_array

@app.post("/api/analyze")
async def analyze_brain_scan(file: UploadFile = File(...)):
    try:
        # read file
        contents = await file.read()
        file_hash = hashlib.md5(contents).hexdigest()
        print(f"File hash: {file_hash}")

        # attempt to open image
        try:
            image = Image.open(io.BytesIO(contents))
        except IOError:
            raise HTTPException(
                status_code=400, detail="Uploaded file is not a valid image."
            )

        # preprocess image
        processed_image = preprocess_image(image)

        # predict
        prediction = make_prediction(processed_image)
        # convert from tensor to numpy array
        prediction = prediction.numpy()[0]  # shape: (4,)

        # determine predicted class index
        prediction_class = int(np.argmax(prediction))
        confidence = float(prediction[prediction_class]) * 100.0

        # if the predicted index is 2 => no_tumor
        no_tumor_index = CLASS_INDICES['no_tumor']
        has_tumor = (prediction_class != no_tumor_index)

        return {
            "hasTumor": has_tumor,
            "confidence": confidence,
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid input: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)