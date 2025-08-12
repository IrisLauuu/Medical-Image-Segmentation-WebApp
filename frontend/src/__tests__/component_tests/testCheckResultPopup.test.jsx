import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import CheckResultPopup from '../../components/CheckResultPopup';

describe('CheckResultPopup Component', () => {
  jest.useFakeTimers();

  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    mockOnConfirm.mockClear();
  });

  test('renders correctly with initial countdown', () => {
    render(<CheckResultPopup onConfirm={mockOnConfirm} />);
    expect(screen.getByText(/Check Segmentation Results/i)).toBeInTheDocument();
    expect(screen.getByText(/Redirecting to result page in 3 seconds.../i)).toBeInTheDocument();
  });

  test('counts down every second', () => {
    render(<CheckResultPopup onConfirm={mockOnConfirm} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/Redirecting to result page in 2 seconds.../i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText(/Redirecting to result page in 1 second.../i)).toBeInTheDocument();
  });

  test('calls onConfirm automatically when countdown reaches 0', () => {
    render(<CheckResultPopup onConfirm={mockOnConfirm} />);

    act(() => {
      jest.advanceTimersByTime(3000); // fast-forward 3 seconds
    });

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  test('calls onConfirm when "Go to Results" button is clicked', () => {
    render(<CheckResultPopup onConfirm={mockOnConfirm} />);
    
    fireEvent.click(screen.getByText(/Go to Results/i));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });
});
