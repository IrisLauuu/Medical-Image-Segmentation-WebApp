import React from 'react';
import img1 from '../imgs/screenshot1.png';
import img2 from '../imgs/screenshot2.png';
import img3 from '../imgs/screenshot3.png';
import img4 from '../imgs/screenshot4.png';
import img5 from '../imgs/screenshot5.png';
import img6 from '../imgs/screenshot6.png';
import img7 from '../imgs/screenshot7.png';

function ManualPage() {
  return (
    <div className="relative h-full w-full min-h-screen bg-gradient-to-b from-white to-blue-50 p-10">
      <h1 className="text-3xl font-bold mb-4 text-center">User Manual</h1>
      <br></br>

      {/* Introduction */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p className="text-lg">
            UNSW Medical Image Segmentation provides advanced segmentation models for skin lesion and multi-organ nuclei segmentation to help facilitate faster and more objective diagnoses. 
            Using region-based attention, it automates and standardizes medical image segmentation, enhancing diagnostic accuracy and efficiency.
        </p>
      </section>

      {/* Step 1: Navigating to the Demo Page */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Step 1: Navigating to the Demo Page</h2>
        <p className="mb-4">To start using the tool, click the "Demo" button in the navbar to go to the demo page, where you can upload and segment images.</p>
        <img src={img1} alt="Navigating to Demo Page" className="max-w-4xl w-full h-auto border rounded-md shadow-lg mb-6" />
      </section>

      {/* Step 2: Selecting or Uploading Images */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Step 2: Select Default Images or Upload Your Own</h2>
        <p className="mb-4">You can select one or more default medical images for segmentation.</p>
        <img src={img2} alt="Selecting Images" className="max-w-4xl w-full h-auto border rounded-md shadow-lg mb-6" />
        <p className="mb-4">Or you can upload your own images, subject to file type and size limitations.</p>
        <img src={img3} alt="Uploading Images" className="max-w-4xl w-full h-auto border rounded-md shadow-lg mb-6" />
      </section>

      {/* Step 3: Selecting a Model */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Step 3: Select a Model</h2>
        <p className="mb-4">Choose a model suited to your segmentation needs, such as skin lesion or multi-organ nuclei segmentation.</p>
        <img src={img4} alt="Selecting a Model" className="max-w-3xl w-full h-auto border rounded-md shadow-lg mb-6" />
      </section>

      {/* Step 4: Making Segmentations */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Step 4: Make Segmentations</h2>
        <p className="mb-4">In this example, the first, third, and fifth medical images are selected, and the Skin Lesion Segmentation model is chosen. Once selections are made, click the Submit button to generate segmentations.</p>
        <img src={img5} alt="Making Segmentations" className="max-w-3xl w-full h-auto border rounded-md shadow-lg mb-6" />
      </section>

      {/* Step 5: Checking Segmentation Results */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Step 5: Check Segmentation Results</h2>
        <p className="mb-4">After clicking the Submit button, the tool will process the images and automatically navigate to the Segmentation Results page within 3 seconds (or you can navigate manually). </p>
        <img src={img6} alt="Checking Segmentation Results" className="max-w-lg w-full h-auto border rounded-md shadow-lg mb-6" />
        <p className="mb-4">The segmentation results, including the original images, processed images, and the time taken for segmentation, will be displayed in a carousel format. The performance metrics for the selected model will appear below the carousel. </p>
        <img src={img7} alt="Checking Segmentation Results" className="max-w-3xl w-full h-auto border rounded-md shadow-lg mb-6" />
      </section>

    </div>
  );
}

export default ManualPage;
