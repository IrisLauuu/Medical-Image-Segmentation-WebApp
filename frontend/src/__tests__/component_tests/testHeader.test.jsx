import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../components/Header';

describe('Header Component', () => {
  const renderWithPath = (initialPath = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Header />
      </MemoryRouter>
    );
  };

  test('renders correctly with all navigation links', () => {
    renderWithPath();

    expect(screen.getByText(/UNSW Medical Image Segmentation/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Demo/i)).toBeInTheDocument();
    expect(screen.getByText(/Manual/i)).toBeInTheDocument();
    expect(screen.getByText(/Paper/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  test('highlights the active link based on the current path', () => {
    renderWithPath('/contact');
    const contactLink = screen.getByText(/^Contact$/i);
    expect(contactLink).toHaveClass('text-blue-700');
  });

  test('updates the active link when navigation changes', () => {
    renderWithPath('/demo');
    const demoLink = screen.getByText(/Demo/i);
    const homeLink = screen.getByText(/Home/i);

    expect(demoLink).toHaveClass('text-blue-700');
    expect(homeLink).not.toHaveClass('text-blue-700');
  });
});
