import React from 'react';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const SegmentationPage = () => {
  const location = useLocation();
  const { originalImages, processedImages, timeTaken, accuracy, dice, iou } = location.state || { originalImages: [], processedImages: [], timeTaken: [], accuracy: [], dice: [], iou: [] };
  const navigate = useNavigate(); // use useNavigate to redirect page
  
  const handleNavDemo = () => {
    navigate('/demo');
  };


  const CustomLeftControl = () => (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/30 group-hover:bg-black/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-black dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
      <svg stroke="currentColor" 
        fill="none" 
        strokeWidth="2" 
        viewBox="0 0 24 24" 
        aria-hidden="true" 
        className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6" 
        height="1em" 
        width="1em" 
        xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M15 19l-7-7 7-7">
          </path>
      </svg>
    </span>
  );

  const CustomRightControl = () => (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/30 group-hover:bg-black/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-black dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
      </svg>
    </span>
  );

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Segmentation Results</h1>

      {originalImages.length > 0 && processedImages.length > 0 ? (
        <>
          <Carousel slide={false} leftControl={<CustomLeftControl />} rightControl={<CustomRightControl />} indicators={false} className="space-y-6 py-10px">
            {originalImages.map((originalPath, index) => (
              <div key={index} className="relative grid grid-cols-2 gap-4">
                {/* Original Image */}
                <div className="flex flex-col items-center justify-center border border-gray-200 p-4">
                  <img
                    src={originalPath}
                    alt={`Original ${index + 1}`}
                    className="object-contain w-auto max-h-full"
                  />
                  <p className="text-gray-600 mt-2">Original</p>
                </div>

                {/* Processed Image */}
                <div className="flex flex-col items-center justify-center border border-gray-200 p-4">
                  <img
                    src={processedImages[index]}
                    alt={`Processed ${index + 1}`}
                    className="object-contain w-auto max-h-full"
                  />
                  <p className="text-gray-600 mt-2">Processed</p>
                </div>
                {/* Time taken for Each Image */}
                <div className="col-span-2 text-center mt-4">
                  <p className="text-gray-600 text-lg">
                    Time Taken: {timeTaken[index] || "N/A"} ms
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
            {/* Model's Metrics display */}
            <div className="col-span-2 text-center mt-4">
              <p className="text-black-600 text-2xl">
                Model's metrics:
              </p>
              <p className="text-gray-600 text-lg">
                Average Accuracy: {accuracy[0] || "N/A"}%
              </p>
              <p className="text-gray-600 text-lg">
                Average Dice Coefficient: {dice[0] || "N/A"}%
              </p>
              <p className="text-gray-600 text-lg">
                Average IoU Score: {iou[0] || "N/A"}%
            </p>
          </div>
        </>
      ) : (
        <p className="text-gray-700">No images available. Please upload images in the demo page.</p>
      )}

        <div className="mt-10 flex justify-center mb-4">
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleNavDemo}
            >
                Try another testing sets
            </button>
        </div>
    </div>
  );
};

export default SegmentationPage;

