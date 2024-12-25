# <img src ="https://github.com/numan-7/CerebrAI/blob/main/public/brain.svg" style="width: 35px; height: 35px;" /> CerebrAI: Brain Tumor Detection with AI

CerebrAI is a project that utilizes artificial intelligence to detect brain tumors in MRI scans. Built as a web application with React and powered by a fine-tuned DenseNet201 model, CerebrAI provides an interface for users to upload MRI scans and receive analysis results.

This project aims to explore the potential of machine learning in medical imaging, offering a simplified example of how AI can assist in detecting and classifying brain tumors.

## Table of Contents
1. [Features & Demo](#features-and-demo)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
   - [Installation](#installation)
   - [Model Training](#model-training)
   - [Running the Application](#running-the-application)
4. [Usage](#usage)
5. [Model Details](#model-details)
   - [Model Architecture](#model-architecture)
   - [Layers and Fine-Tuning](#layers-and-fine-tuning)
   - [Training Data](#training-data)
   - [Performance Metrics](#performance-metrics)
   - [Limitations](#limitations)
6. [Acknowledgements](#acknowledgements)

## Features And Demo
- Upload and analyze brain MRI scans.
- Detect and classify four categories:
  - Glioma tumors.
  - Meningioma tumors.
  - Pituitary tumors.
  - No tumors (healthy scans).
- Real-time analysis results.
- Basic visualization of predictions and confidence levels.

View a demo of the project here:
https://youtu.be/0eXBTFZoaWI

## Tech Stack
- **Frontend:**
  - React 18, TypeScript, Tailwind CSS for styling, shadcn/ui components for consistent UI.
- **AI Model:**
  - TensorFlow/Keras, DenseNet201 architecture (fine-tuned).
- **Backend:**
  - Python FastAPI.

## Getting Started

### Installation
1. Clone the repository:
     ```bash
     git clone https://github.com/numan-7/CerebrAI.git
     cd CerebrAI
     ```
2. Install dependencies for the frontend:
    ```bash
    npm install
    ```
3. Install dependences for the backend:
    ```bash
    cd api/
    python -m venv venv
    source venv/bin/activate 
    pip install -r requirements.txt
    ```

### Model Training
Before running the backend, we need ensure the model is trained, or you can put your own model under `model/` with the name `best_model.keras` and use that.

1. Import the following [dataset](https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset/data)

3. Install dependencies for the model:
    ```bash
    cd ../model
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```
4. Train the model:
   ```bash
   python model.py
   ```
This step will save the trained model, which the backend will use for predictions.

## Running the Application
1. Start the backend server:
    ```bash
    cd ../api
    source venv/bin/activate 
    python -m uvicorn main:app --reload
    ```
2. Start the frontend:
    ```bash
    cd ../
    npm run dev
    ```
3. Open your browser and navigate to `http://localhost:5173`

## Usage
1. Upload an MRI scan using the provided interface (at the bottom of home page)
2. Wait for the AI model to analyze the scan.
3. View the results with confidence level.


## Model Details

### Model Architecture
The model is based on the **DenseNet201** architecture, pre-trained on ImageNet, and fine-tuned for brain tumor detection. DenseNet201 uses densely connected convolutional layers to maximize feature reuse and minimize redundancy, making it efficient and highly accurate for image classification tasks. The classification head has been customized to categorize MRI scans into four distinct categories: Glioma tumors, Meningioma tumors, Pituitary tumors, and No tumors (healthy).

### Layers and Fine-Tuning
- **DenseNet201 Base**:
  - Serves as a feature extractor by leveraging pre-trained weights from ImageNet.
  - The base layers are initially frozen during training to retain pre-trained weights.
- **Custom Classification Head**:
  - **Flatten Layer**: Converts the 3D tensor from DenseNet into a 1D feature vector.
  - **Dense Layer**: Fully connected layer with 64 neurons and ReLU activation, learning task-specific features.
  - **Dropout Layer**: Regularization with a 20% dropout rate to prevent overfitting.
  - **Output Layer**: A fully connected layer with 4 neurons (for the four categories) and a softmax activation function to output probabilities.
- **Fine-Tuning**:
  - After training the classification head for 10 epochs, the DenseNet201 base layers are unfrozen, except for BatchNormalization layers (to maintain stability).
  - Fine-tuning adjusts the pre-trained layers to adapt them for the specific brain MRI dataset.

### Training Data
- The model was trained on a [publicly available dataset of brain MRI scans](https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset/data). Data augmentation techniques, such as rotation, zoom, brightness adjustments, and horizontal flipping, were applied to enhance generalization and reduce overfitting.
- The dataset was split into training and testing sets, ensuring diverse and balanced samples for robust evaluation.

### Performance Metrics
The model achieves high accuracy, precision, and recall across all categories. Below are the visualizations of the model's performance:

- **Confusion Matrix**:
  - <img src="https://github.com/numan-7/CerebrAI/blob/main/model/img/confusion_matrix.png" />
  - The confusion matrix illustrates that the model accurately classifies most samples. Minimal misclassifications are observed, indicating strong generalization.
  - Notable diagonal dominance signifies high true positive rates across all categories.

- **Training and Validation Accuracy**
  - <img src="https://github.com/numan-7/CerebrAI/blob/main/model/img/training_accuracy.png" />
  - Both training and validation accuracy consistently improve over epochs, peaking at approximately 99%.
  - The close alignment of training and validation accuracy indicates low overfitting.

- **Training and Validation Loss**:
  - <img src="https://github.com/numan-7/CerebrAI/blob/main/model/img/training_loss.png" />
  - Training and validation loss show a steady decline, with validation loss stabilizing at a minimal value, confirming effective generalization.

### Limitations
- The model is not intended for clinical use or real-world medical diagnosis.
- Performance is reliant on the quality and diversity of the training dataset, potentially limiting generalizability to unseen MRI scans.
- Rare or highly complex tumor types may not be accurately classified due to dataset limitations.


## Acknowledgements
- The initial inspiration for the model's custom classification head and structure came from [this Kaggle notebook](https://www.kaggle.com/code/alsaniipe/brain-tumor-classification-with-custom-cnn/notebook). While the original implementation served as a helpful reference, this project introduced significant modifications and optimizations tailored to a different dataset and classification task.  
- Notably, this implementation included fine-tuning the DenseNet201 layers, which was absent in the original approach. This allowed the model to better adapt to the dataset and significantly improve accuracy.  
- Additional improvements included:
  - More advanced data augmentation techniques to enhance generalization.
  - Adjustments to batch size and learning rate schedules for better convergence.
  - A two-stage training process: initial training with frozen DenseNet201 layers followed by fine-tuning of unfrozen layers.  
- Special thanks to CSU Chico for allowing students to use their 80GB A100 GPU, which enabled the training of this model.  

