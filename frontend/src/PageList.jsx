import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DemoPage from './pages/DemoPage';
import SegmentationPage from './pages/SegmentationPage';
import ContactPage from './pages/ContactPage';
import ManualPage from './pages/ManualPage';

const RedirectToPaper = () => {
  useEffect(() => {
    window.location.replace("https://ieeexplore.ieee.org/abstract/document/10059126");
  }, []);
  return null; 
};

function PageList () {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/segmentation" element={<SegmentationPage />} />
        <Route path="/manual" element={<ManualPage />} />
        <Route path="/paper" element={<RedirectToPaper />} />
        <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}
export default PageList;
