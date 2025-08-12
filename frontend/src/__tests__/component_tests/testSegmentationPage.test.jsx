import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SegmentationPage from '../../pages/SegmentationPage';
import DemoPage from '../../pages/DemoPage';

jest.mock('axios', () => ({
    post: jest.fn(),
}));

// Helper function to render with router context
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/segmentation" element={<SegmentationPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe('SegmentationPage Component', () => {
    test('renders content from location state', () => {
        const testState = {
          originalImages: ['/path/to/original1.jpg', '/path/to/original2.jpg'],
          processedImages: ['/path/to/processed1.jpg', '/path/to/processed2.jpg'],
          timeTaken: [23],
          accuracy: [95],
          dice: [88],
          iou: [80]
        };
      
        render(
          <MemoryRouter initialEntries={[{ pathname: '/segmentation', state: testState }]}>
            <Routes>
              <Route path="/segmentation" element={<SegmentationPage />} />
            </Routes>
          </MemoryRouter>
        );
      
        expect(screen.getByAltText('Original 1')).toHaveAttribute('src', testState.originalImages[0]);
        expect(screen.getByAltText('Processed 1')).toHaveAttribute('src', testState.processedImages[0]);
        
        const timeTakenElements = screen.getAllByText(/Time Taken/i);
        expect(timeTakenElements[0]).toHaveTextContent(`Time Taken: ${testState.timeTaken[0]} ms`);
        expect(screen.getByText(/Average Accuracy/i)).toHaveTextContent(`Average Accuracy: ${testState.accuracy[0]}%`);
        expect(screen.getByText(/Average Dice Coefficient/i)).toHaveTextContent(`Average Dice Coefficient: ${testState.dice[0]}%`);
        expect(screen.getByText(/Average IoU Score/i)).toHaveTextContent(`Average IoU Score: ${testState.iou[0]}%`);
    });


  test('renders no images message when there are no images', () => {
    renderWithRouter(<SegmentationPage />, { route: '/segmentation' });

    expect(screen.getByText('No images available. Please upload images in the demo page.')).toBeInTheDocument();
  });

  
  test('redirects to Demo page on button click', () => {
    renderWithRouter(<SegmentationPage />, { route: '/segmentation' });

    const navigateButton = screen.getByText('Try another testing sets');
    fireEvent.click(navigateButton);

    expect(screen.getByText('Start by selecting a default medical picture:')).toBeInTheDocument();
  });
});
