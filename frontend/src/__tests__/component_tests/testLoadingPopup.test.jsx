import { render, screen } from '@testing-library/react';
import LoadingPopup from '../../components/LoadingPopup';

describe('LoadingPopup Component', () => {
  test('renders the loading popup with correct content', () => {
    render(<LoadingPopup />);

    expect(screen.getByText(/Processing.../i)).toBeInTheDocument();
    
    expect(screen.getByText(/Please wait while we process your request./i)).toBeInTheDocument();
    
    const spinner = screen.getByRole('img', { hidden: true });
    expect(spinner).toHaveClass('animate-spin');
  });
});
