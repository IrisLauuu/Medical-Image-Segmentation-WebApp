import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LandingPage from '../../pages/LandingPage';
import DemoPage from '../../pages/DemoPage';
import SegmentationPage from '../../pages/SegmentationPage';
import axios from 'axios';

jest.mock('axios', () => ({
    post: jest.fn(),
}));

describe('Happy Path UI Test', () => {
  it('should navigate through the happy path from LandingPage to SegmentationPage', async () => {
    // Mock axios response for submit request
    axios.post = jest.fn(() => ({
      status: 200, 
      data: {
        originalImages: [
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...'
        ],
        processedImages: [
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...'
        ],
        timeTaken: [2,3],
        accuracy: [95, 89],
        dice: [90, 85],
        iou: [85, 80],
      },
    }));

    global.fetch = jest.fn().mockImplementation(() => {
      const response = {
        blob: jest.fn().mockResolvedValue(new Blob(["mocked image content"], { type: "image/png" })),
      };
      return Promise.resolve(response);
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/segmentation" element={<SegmentationPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Step 1: Navigate to DemoPage by clicking "Try Demo" on LandingPage
    fireEvent.click(screen.getByText(/Try Demo/i));
    const NavDemoPage = await screen.findByText(/Start by selecting a default medical picture/i);
    expect(NavDemoPage).toBeInTheDocument();

    // Step 2: Select the first default image on DemoPage
    const firstImage = screen.getAllByRole('img')[0];
    fireEvent.click(firstImage);

    // Step 3: Select the "skin" model from the dropdown
    fireEvent.change(screen.getByTestId('model-select'), { target: { value: 'skin' } });

    // Step 4: Submit the form
    fireEvent.click(screen.getByText(/Submit/i));
    const loadingPopup = await screen.findByTestId('loading-popup');
    expect(loadingPopup).toBeInTheDocument();

    // Step 5: Wait for CheckResultPopup to appear and click "Go to Results"
    const ResultNavPopup = await screen.findByText(/Check Segmentation Results/i);
    expect(ResultNavPopup).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Go to Results/i));

    // Step 6: Verify navigation to SegmentationPage and presence of segmentation results
    expect(screen.getByAltText('Original 1')).toHaveAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...');
    expect(screen.getByAltText('Processed 1')).toHaveAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...');
    
    const timeTakenElements = screen.getAllByText(/Time Taken/i);
    expect(timeTakenElements[0]).toHaveTextContent(`Time Taken: 2 ms`);
    expect(timeTakenElements[1]).toHaveTextContent(`Time Taken: 3 ms`);
    expect(screen.getByText(/Average Accuracy/i)).toHaveTextContent(`Average Accuracy: 95%`);
    expect(screen.getByText(/Average Dice Coefficient/i)).toHaveTextContent(`Average Dice Coefficient: 90%`);
    expect(screen.getByText(/Average IoU Score/i)).toHaveTextContent(`Average IoU Score: 85%`);
  });
});
