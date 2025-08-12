import React, {useState, useRef} from 'react';
import LoadingPopup from '../components/LoadingPopup';
import Modal from '../components/Modal';
import CheckResultPopup from '../components/CheckResultPopup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DemoPage () {
    const images = [
      "/static/default_images/skin_1.jpg",
      "/static/default_images/cell_1.jpg",
      "/static/default_images/skin_2.jpg",
      "/static/default_images/cell_2.jpg",
      "/static/default_images/skin_3.jpg",
      "/static/default_images/cell_3.jpg",
    ];
  
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false); // loading window

    const [showModal, setShowModal] = useState(false); // modal window
    const [modalMessage, setModalMessage] = useState('');
    const [checkResult, setCheckResult] = useState(false); // check result popup

    const [originalImages, setOriginalImages] = useState([]);
    const [processedImages, setProcessedImages] = useState([]);
    const [timeTaken, setTimeTaken] = useState([]);
    const [accuracy, setAccuracy] = useState([]);
    const [dice, setDice] = useState([]);
    const [iou, setIou] = useState([]);
   // store images from response

    const navigate = useNavigate(); // use useNavigate to redirect page
    const fileInputRef = useRef(null);

    const handleImageClick = (index) => {
      if (selectedImages.includes(index)) {
        setSelectedImages(selectedImages.filter((i) => i !== index));
      } else {
        setSelectedImages([...selectedImages, index]);
        setSelectedFiles([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    };

    const handleClearSelection = () => {
      setSelectedImages([]); // clear selectedImages
    };

    const handleFileChange = (event) => {
      const files = Array.from(event.target.files);

      // validate file type and size
      const validFiles = files.filter(file => {
        const isValidType = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'].includes(file.type);
        const isValidSize = file.size <= 10 * 1024 * 1024; // max size if 10M
        
        return isValidType && isValidSize;
      });

      // if there user chose their own images, then clear default images
      if (validFiles.length >= 1) {
        setSelectedImages([]);
      }

      setSelectedFiles(validFiles);
    };

    const handleSubmit = async () => {
      const selectedImageUrls = selectedImages.map((index) => images[index]);

      if ((selectedImages.length === 0) && (selectedFiles.length === 0)) {
        setModalMessage('Please select at least a valid image before submitting.');
        setShowModal(true);
        return;
      }

      const formData = new FormData();

      // append default selected image to FormData
      await Promise.all(
        selectedImageUrls.map(async (imagePath, index) => {
          const response = await fetch(imagePath);
          const blob = await response.blob();
          
          const fileName = `defaultImage_${index + 1}.jpg`;
          const file = new File([blob], fileName, { type: blob.type });
          
          formData.append("defaultImage", file);
        })
      );

      // append user selected file to FormData
      Array.from(selectedFiles).forEach((file, _) => {
        formData.append("userFile", file);
      });

      if (selectedOption) {
        formData.append('model', selectedOption);
      } else {
        setModalMessage('Please select a model before submitting.');
        setShowModal(true);
        return;
      }
      
      try {
        // display loading popup window
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await axios.post('http://localhost:5050/upload_test', formData);

        setLoading(false);
        
        if (response.status === 400) {
          const errorData = await response.json();
          setModalMessage(`Error: ${errorData.error}`);
          setShowModal(true);
          return;
        }

        // fetch image from backend
        const data = await response.data;
        setOriginalImages(data.originalImages);
        setProcessedImages(data.processedImages);
        setTimeTaken(data.timeTaken)
        setAccuracy(data.accuracy);
        setDice(data.dice);
        setIou(data.iou);

        // Display Check Result Popup window
        setCheckResult(true); // Show check result popup

      } catch (error) {
        setLoading(false);
        setModalMessage(`Newtwork error or server unavailable: ${error}`);
        setShowModal(true);
        return;
      }
    };

    // navigate to segementation page
    const handleRedirect = () => {
      setCheckResult(false);
      navigate('/segmentation', { state: { originalImages, processedImages, timeTaken, accuracy, dice, iou } });
    };

    return (
        <>
          {/* select default images */}
          <div className="p-10 max-w-4xl mx-auto">
            <h2 className="text-lg font-bold mb-4 text-gray-900">
              Start by selecting a default medical picture:
            </h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {images.map((src, index) => (
                <div
                  key={index}
                  className={`border-2 p-2 ${
                    selectedImages.includes(index) ? 'border-blue-500' : 'border-gray-300'
                  } cursor-pointer`}
                  onClick={() => handleImageClick(index)}
                >
                  <img src={src} alt={`Medical ${index + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
            <br/>

            {/* clear button to clear default image optinos */}
            <div className="flex justify-end mb-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleClearSelection}
              >
                Clear Selections
              </button>
            </div>

            {/* upload users own images */}
            <h2 className="text-lg font-bold mb-4 text-gray-900">
              Or upload your own picture:
            </h2>
            <input 
              data-testid="file-upload"
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
              id="multiple_files" 
              type="file" 
              multiple
              accept=".png, .jpg, .jpeg, .bmp"
              ref={fileInputRef} // binding ref
              onChange={handleFileChange}
            />

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG JPEG or BMP (MAX. 10M).</p>
            <br/>

            <h2 className="text-lg font-bold mb-4 text-gray-900">
              Finally select a model:
            </h2>
            <div className="mb-4">
              <select
                data-testid="model-select"
                className="border p-2 rounded w-full"
                value={selectedOption}
                required
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value="" disabled>
                  Select a model
                </option>
                <option value="skin">Skin Lesion Segmentation</option>
                <option value="nuclei">Multi-Organ Nuclei Segmentation</option>
              </select>
            </div>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Submit
            </button>
            
            {showModal && (
              <Modal title="Error" message={modalMessage} onClose={() => setShowModal(false)} />
            )}

            {/* loading Popup */}
            {loading && <LoadingPopup />}

            {/* Check Result Popup */}
            {checkResult && (
              <CheckResultPopup onConfirm={handleRedirect} />
            )}
          </div>
        </>
      );
    
}

export default DemoPage;
