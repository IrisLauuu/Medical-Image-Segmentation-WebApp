const Modal = ({ title, message, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-gray-700 mb-4">{message}</p>
          <div className="flex justify-center">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
};

export default Modal;