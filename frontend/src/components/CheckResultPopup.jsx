import React, { useEffect, useState } from 'react';

const CheckResultPopup = ({ onConfirm }) => {
  const [countdown, setCountdown] = useState(3); // 3 seconds timer

  // update timer per second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // auto navigate to result page
    if (countdown === 0) {
      onConfirm();
    }

    // clear timer
    return () => clearInterval(timer);
  }, [countdown, onConfirm]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Check Segmentation Results</h2>
          <p className="text-gray-700 mb-4">
            Your submission has been processed.
            <br />
            Redirecting to result page in {countdown} seconds...
          </p>
          <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={onConfirm}
          >
          Go to Results
          </button>
      </div>
    </div>
  );
};

export default CheckResultPopup;
