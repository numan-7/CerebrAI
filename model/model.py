import numpy as np
import os
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import classification_report, confusion_matrix

import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import DenseNet201
from tensorflow.keras.layers import Flatten, Dense, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint

# consts
TRAIN_DIR = "./Training/"
TEST_DIR = "./Testing/"
IMG_SIZE = 224
BATCH_SIZE = 32
NUM_CLASSES = 4
IMG_SAVE_DIR = "./img/"

# make sure img/ directory exists
os.makedirs(IMG_SAVE_DIR, exist_ok=True)

# data generators w/ augmentation
def create_data_generators(train_dir, test_dir, img_size, batch_size):
    train_datagen = ImageDataGenerator(
        rescale=1.0 / 255,
        rotation_range=25,
        zoom_range=0.2,
        width_shift_range=0.2,
        height_shift_range=0.2,
        horizontal_flip=True,
        brightness_range=(0.9, 1.1),
        fill_mode='nearest'
    )

    test_datagen = ImageDataGenerator(rescale=1.0 / 255)

    train_data = train_datagen.flow_from_directory(
        directory=train_dir,
        target_size=(img_size, img_size),
        batch_size=batch_size,
        class_mode="categorical"
    )

    test_data = test_datagen.flow_from_directory(
        directory=test_dir,
        target_size=(img_size, img_size),
        batch_size=batch_size,
        class_mode="categorical",
        shuffle=False
    )

    return train_data, test_data

# get data
train_data, test_data = create_data_generators(TRAIN_DIR, TEST_DIR, IMG_SIZE, BATCH_SIZE)

# define the model
def build_model(input_shape, num_classes):
    base_model = DenseNet201(include_top=False, weights="imagenet", input_shape=input_shape)

    # freeze the base model
    base_model.trainable = False

    # custom layers 
    x = base_model.output
    x = Flatten(name="flatten")(x)
    x = Dense(64, activation="relu")(x)
    x = Dropout(0.2)(x)
    output = Dense(num_classes, activation="softmax")(x)

    # create the model
    model = Model(inputs=base_model.input, outputs=output)
    
    return model

# init model
model = build_model((IMG_SIZE, IMG_SIZE, 3), NUM_CLASSES)

# compile the model
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=3e-4),
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

# callback
callbacks = [
    EarlyStopping(monitor="val_loss", patience=8, restore_best_weights=True),
    ReduceLROnPlateau(monitor="val_loss", factor=0.2, patience=4, verbose=1, min_lr=1e-6),
    ModelCheckpoint("best_model.keras", monitor="val_loss", save_best_only=True, verbose=1)
]

# train the model with frozen base
history = model.fit(
    train_data,
    validation_data=test_data,
    epochs=10,  
    steps_per_epoch=len(train_data),
    validation_steps=len(test_data),
    callbacks=callbacks
)

# unfreeze the base model for fine-tuning
for layer in model.layers:
    if isinstance(layer, tf.keras.layers.BatchNormalization):
        layer.trainable = False  # keep batchnorm layers frozen
    else:
        layer.trainable = True  # unfreeze all other layers

# recompile the model for fine-tuning
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

# fine-tune the model
fine_tune_history = model.fit(
    train_data,
    validation_data=test_data,
    epochs=20,  
    steps_per_epoch=len(train_data),
    validation_steps=len(test_data),
    callbacks=callbacks
)

# evaluate the model
def evaluate_model(model, test_data):
    test_labels = test_data.classes
    predictions = model.predict(test_data)
    predicted_classes = np.argmax(predictions, axis=1)

    print("\nClassification Report:\n")
    print(classification_report(test_labels, predicted_classes, target_names=list(test_data.class_indices.keys())))

    conf_matrix = confusion_matrix(test_labels, predicted_classes)
    plt.figure(figsize=(10, 8))
    sns.heatmap(conf_matrix, annot=True, fmt="d", cmap="Blues", xticklabels=test_data.class_indices.keys(), yticklabels=test_data.class_indices.keys())
    plt.title("Confusion Matrix")
    plt.xlabel("Predicted Labels")
    plt.ylabel("True Labels")
    plt.savefig(os.path.join(IMG_SAVE_DIR, "confusion_matrix.png"))
    plt.close()

evaluate_model(model, test_data)

# save the final model
model.save("final_model.keras")
print("Model saved as 'final_model.keras'.")

def plot_training(history, fine_tune_history, save_dir):
    combined_history = {
        "loss": history.history["loss"] + fine_tune_history.history["loss"],
        "val_loss": history.history["val_loss"] + fine_tune_history.history["val_loss"],
        "accuracy": history.history["accuracy"] + fine_tune_history.history["accuracy"],
        "val_accuracy": history.history["val_accuracy"] + fine_tune_history.history["val_accuracy"]
    }

    # loss plot
    plt.figure()
    plt.plot(combined_history["loss"], label="Training Loss")
    plt.plot(combined_history["val_loss"], label="Validation Loss")
    plt.title("Loss Over Epochs")
    plt.xlabel("Epochs")
    plt.ylabel("Loss")
    plt.legend()
    plt.savefig(os.path.join(save_dir, "training_loss.png"))
    plt.close()

    # accuracy plot
    plt.figure()
    plt.plot(combined_history["accuracy"], label="Training Accuracy")
    plt.plot(combined_history["val_accuracy"], label="Validation Accuracy")
    plt.title("Accuracy Over Epochs")
    plt.xlabel("Epochs")
    plt.ylabel("Accuracy")
    plt.legend()
    plt.savefig(os.path.join(save_dir, "training_accuracy.png"))
    plt.close()

# save training curves
plot_training(history, fine_tune_history, IMG_SAVE_DIR)
print(f"Training and evaluation graphs saved in '{IMG_SAVE_DIR}' directory.")