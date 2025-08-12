import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const preLoadDemoPage = () => {
  import('./DemoPage');
};

const useTypewriter = (text, speed) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
      if (index < text.length) {
          const timer = setTimeout(() => {
              setDisplayedText((prev) => prev + text.charAt(index));
              setIndex((prev) => prev + 1);
          }, speed);
          return () => clearTimeout(timer);
      }
  }, [index, text, speed]);

  return displayedText;
};

function LandingPage () {
    const headline1 = useTypewriter("Medical Image Segmentation", 50);
    const headline2 = useTypewriter("Instant Analysis For Skin Lesions And Cell Nuclei", 30);
    useEffect(() => {
      preLoadDemoPage();
    }, []);

    return (
      <div className="relative h-screen w-full">
        <svg 
        className="absolute top-0 left-0 w-full h-full" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="100%" height="100%" fill="#ffffff"/>
        <defs>
          <pattern id="hexagonPattern" x="0" y="0" width="50" height="86.6" patternUnits="userSpaceOnUse">
            <path 
              d="M25,0 L50,14.43 L50,43.3 L25,57.73 L0,43.3 L0,14.43 Z" 
              fill="none" 
              stroke="#e2e8f0" 
              strokeWidth="1"
            />
          </pattern>
          <linearGradient id="gradientOverlay" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.05 }}/>
            <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 0.1 }}/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagonPattern)" opacity="0.3"/>
        <rect width="100%" height="100%" fill="url(#gradientOverlay)"/>
        <path 
          d="M-100,300 Q250,200 500,300 T1100,300" 
          fill="none" 
          stroke="#93c5fd" 
          strokeWidth="1.5"
          opacity="0.3"
        />
        <path 
          d="M-100,310 Q250,210 500,310 T1100,310" 
          fill="none" 
          stroke="#93c5fd" 
          strokeWidth="1.5"
          opacity="0.2"
        />
      </svg>

        <div className="relative flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-5xl font-bold mb-4">
          {headline1} <br />{headline2}
          </h1>
          <p className="text-gray-500 mb-8">
          Upload your medical images and get instant, accurate segmentation results powered by advanced computer vision model. <br />
          Specialized in skin lesion analysis and multi-organ nuclei detection for medical professionals and researchers.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/demo"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Try Demo
            </Link>
            <Link
              to="/manual"
              className="text-blue-600 px-6 py-3 font-medium hover:text-blue-700 transition"
            >
              User Manual →
            </Link>
          </div>
        </div>
      </div>
    
      );
    
}

export default LandingPage;