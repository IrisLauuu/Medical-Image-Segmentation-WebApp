from io import BytesIO
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image, ImageDraw
import requests # for test
import base64
from unet import UNet 
from config import get_config
import torch
import numpy as np
import albumentations as A
from albumentations.pytorch import ToTensorV2
import time

app = Flask(__name__)
CORS(app)

# Helper function to convert PIL image to base64
def image_to_base64(image):
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')
    
@app.route('/upload_test', methods=['POST'])
def upload_images():
    model_selected = request.form.get('model')
    if not model_selected:
        return jsonify({'error': 'Model selection is missing'}), 400

    images = []
    # handle default images
    default_images = request.files.getlist('defaultImage')
    for file in default_images:
        img = Image.open(file.stream)
        images.append(img)

    # handle images uploaded by users
    user_files = request.files.getlist('userFile')
    for file in user_files:
        img = Image.open(file.stream)
        images.append(img)

    if not images:
        return jsonify({'error': 'No valid images provided'}), 400

    # process images
    original_images_base64 = []
    processed_images_base64 = []
    processing_times = []

    transform = A.Compose([
        A.Resize(height=256, width=256),
        A.Normalize(mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225)),
        ToTensorV2()
    ])

    # load the pre-trained model selected
    # device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    config = get_config()
    if model_selected == "skin":
        # model = UNet().to(config.DEVICE)
        model = UNet(use_attention=config.USE_ATTENTION).to(config.DEVICE)
        model_path = os.path.join(os.path.dirname(__file__), 'unet_skin.pth')
    elif model_selected == "nuclei":
        # model = UNet().to(config.DEVICE)
        model = UNet(use_attention=config.USE_ATTENTION).to(config.DEVICE)
        model_path = os.path.join(os.path.dirname(__file__), 'unet_nuclei.pth')
    model.load_state_dict(torch.load(model_path, map_location=config.DEVICE), strict=False)
    model.eval()

    for img in images:
        # convert origianl images to base64
        original_base64 = image_to_base64(img)
        original_images_base64.append(f"data:image/png;base64,{original_base64}")

        # preprocess image
        img = np.array(img.convert("RGB"), dtype=np.float32)
        augmented = transform(image=img)
        image_tensor = augmented['image'].unsqueeze(0).to(config.DEVICE)

        start_time = time.time()  # Start timer

        # process segmentation
        with torch.no_grad():
            output = model(image_tensor)
            tensor = torch.sigmoid(output).squeeze().cpu()
            pred_mask = tensor.numpy()   # the segmented result

        end_time = time.time()  # End timer
        processing_times.append(round((end_time - start_time) * 1000, 2))  # Time in milliseconds

        # convert result images to base64
        binary_mask = (pred_mask * 255).astype(np.uint8)
        pred_mask_image = Image.fromarray(binary_mask).convert('1', dither=Image.Dither.NONE).convert('RGB')
        img_base64 = image_to_base64(pred_mask_image)
        processed_images_base64.append(f"data:image/png;base64,{img_base64}")
    
    accuracy = []
    dice = []
    iou = []
    # generate evaluation matrics for different models
    if model_selected == "skin":
        accuracy.append(91)
        dice.append(82)
        iou.append(70) 
    elif model_selected == "nuclei":
        accuracy.append(87)
        dice.append(77)
        iou.append(62)

    # return json includes base64 images
    return jsonify({'originalImages': original_images_base64, 'processedImages': processed_images_base64, 
        'timeTaken': processing_times, 'accuracy': accuracy, 'dice': dice, 'iou': iou}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port="5050")

