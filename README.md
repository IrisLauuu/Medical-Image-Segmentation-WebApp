# Medical Image Segmentation Web App


## Background

Medical image segmentation is a powerful tool that combines medical imaging and computer vision to analyze complex medical images. It helps identify important structures and abnormalities in images, which is essential for accurate diagnoses and effective treatment planning.

## Main Features
### 1. Specialized Segmentation Models With Attention Mechanism:
● Skin Lesion Segmentation: Helps outline skin lesions for dermatological analysis.

● Multi-Organ Nuclei Segmentation: Highlights cell nuclei in images from
multiple organs for research or diagnosis.

### 2. Model Selection:
Use the drop-down menu to select the desired segmentation type

### 3. Upload Images or Select Default Images
Uploaded images are processed and presented alongside each of the segmented results respectively for visual comparison.

### 4. Model Performance Metrics Display
On the segmentation result page, metrics including accuracy, Dice coefficients
and IoU scores for evaluating the performance of the model specific to the
selected task, and the processing times for each segmented image are provided.

### 5. Additional User-Driven Features
The system offers a detailed user manual with usage instructions and related research links, plus a simple interface for user feedback and issue reporting.


## Deployment
This project is fully dockerized for easy setup and usage.

1. **Clone the repository:**
```bash
git clone https://github.com/IrisLauuu/Medical-Image-Segmentation-WebApp.git
```
2. **Navigate to the project folder.**
3. **Build and run the Docker containers:**
```bash
docker compose up --build
```
4. **Access the application:**
Once the build completes, open your browser and go to http://localhost:3000 to use the application.

The landing page of web application:

<img width="800" height="600" alt="image" src="https://github.com/user-attachments/assets/d0836c75-4fdd-42e9-ae08-00b1fc820e90" />

## Troubleshooting

If you encounter an error related to EmailJS not working during the Docker build process, the Docker cache may need to be cleared.

### Method 1: Clear Docker Cache

Run the following commands in your terminal:

```bash
docker system prune -af
docker compose up --build
```

### Method 2: Manual Installation

If the Dockerized application does not run properly, you can manually install and run the backend and frontend:

**Backend**

1. Navigate to the backend directory.
2. Install required Python packages:
```bash
pip install torch
pip install -r requirements.txt
```
3. Run the backend server:
```bash
python3 server.py
```
or
```bash
python server.py
```
**Frontend**
1. Navigate to the frontend directory.
2. Install npm dependencies:
```bash
npm install
```
3. Start the frontend app:
```bash
npm start
```


