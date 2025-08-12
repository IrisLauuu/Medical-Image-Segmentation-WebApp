/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DemoPage from '../../pages/DemoPage';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

function renderWithRouter(ui) {
  return render(ui, { wrapper: BrowserRouter });
}

describe('DemoPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders default images and allows selection', () => {
    renderWithRouter(<DemoPage />);
    
    const defaultImages = screen.getAllByRole('img');
    expect(defaultImages.length).toBe(6);

    fireEvent.click(defaultImages[0]);
    expect(defaultImages[0].closest('div')).toHaveClass('border-blue-500');
  });

  test('clears selected images on clicking "Clear Selections"', () => {
    renderWithRouter(<DemoPage />);

    const defaultImages = screen.getAllByRole('img');
    
    fireEvent.click(defaultImages[0]);
    expect(defaultImages[0].closest('div')).toHaveClass('border-blue-500');
    
    const clearButton = screen.getByText('Clear Selections');
    fireEvent.click(clearButton);
    expect(defaultImages[0].closest('div')).toHaveClass('border-gray-300');
  });

  test('validates file upload and clears default images when uploading', async () => {
    renderWithRouter(<DemoPage />);

    const fileInput = screen.getByTestId('file-upload');
    
    const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const defaultImages = screen.getAllByRole('img');
    defaultImages.forEach((img) => {
      expect(img.closest('div')).toHaveClass('border-gray-300');
    });
  });

  test('shows modal with message when submitting without an image or model selection', async () => {
    renderWithRouter(<DemoPage />);
    
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await screen.findByText('Please select at least a valid image before submitting.');
  });

  test('shows loading popup and calls backend on valid submission', async () => {
    renderWithRouter(<DemoPage />);
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
    
    const defaultImages = screen.getAllByRole('img');
    const modelSelect = screen.getByTestId('model-select');
    const submitButton = screen.getByText('Submit');

    fireEvent.click(defaultImages[0]);
    fireEvent.change(modelSelect, { target: { value: 'skin' } });
    fireEvent.click(submitButton);

    await screen.findByText(/Processing.../i);
  });

  test('redirects to segmentation page on confirming results', async () => {
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

    renderWithRouter(<DemoPage />);
    
    const defaultImages = screen.getAllByRole('img');
    const modelSelect = screen.getByTestId('model-select');
    const submitButton = screen.getByText('Submit');

    fireEvent.click(defaultImages[0]);
    fireEvent.change(modelSelect, { target: { value: 'skin' } });
    fireEvent.click(submitButton);

    // screen.findAllByTestId();
    const loadingPopup = await screen.findByTestId('loading-popup');
    expect(loadingPopup).toBeInTheDocument();

    await screen.findByText(/Check Segmentation Results/i);
  });
});