import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../components/Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('renders the modal with correct content', async () => {
    const message = "This is an error message";
    render(<Modal message={message} onClose={mockOnClose} />);

    await screen.findByText(/Error/i);
    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(await screen.findByText(/close/i)).toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    render(<Modal message="Error message" onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
