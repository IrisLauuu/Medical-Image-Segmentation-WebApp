import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Modal from '../components/Modal';

const ContactPage = () => {
  const [showModal, setShowModal] = useState(false); // modal window
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setmodalTitle] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      message: formData.message,
    };
    emailjs.send(
        'contact_service',   // Replace with your EmailJS Service ID
        'template_vtgfqbt',  // Replace with your EmailJS Template ID
        templateParams,
        '9bCbkimGCWiqFGDWl'       // Replace with your EmailJS User ID
      )
      .then(() => {
        console.log('SUCCESS!');
        setmodalTitle('Success');
        setModalMessage('Your message has been sent!');
        setShowModal(true);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.log('FAILED...', error.text);
        setmodalTitle('Error');
        setModalMessage(`Error: ${error.text}`);
        setShowModal(true);
      });
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex w-full max-w-4xl">
        
        {/* Left Section */}
        <div className="w-1/2 p-8 bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-gray-600 mb-8">
          We are a team of students from UNSW, working together on our final capstone project.
          This project brings together everything we've learned, allowing us to build something meaningful and practical.
          </p>
          <p className="text-gray-600 mb-8">
            If you have any questions, please email us at xxx@gmail.com or fill out the form on the right.
            </p>

          <div className="text-gray-600 space-y-4">
            <div className="items-center">
                <p className="font-semibold mr-2">Project Contributors:</p>
                <p className="text-gray-700">
                    Hanqing Xu • Honghao Yu • Iris Liu • Yuchen Gao • Yuhao Guo • Zhihong Ke
                </p>
            </div>
          </div>

        </div>


        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700">Message</label>
              <textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows="4" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                required 
              />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">Contact Us</button>
          </form>
        </div>
        {showModal && (
              <Modal title={modalTitle} message={modalMessage} onClose={() => setShowModal(false)} />
            )}
      </div>
    </div>
  );
};

export default ContactPage;
