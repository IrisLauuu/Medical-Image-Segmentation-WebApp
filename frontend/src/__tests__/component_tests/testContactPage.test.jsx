import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactPage from '../../pages/ContactPage';
import { BrowserRouter } from 'react-router-dom';
import emailjs from '@emailjs/browser';

jest.mock('@emailjs/browser', () => ({
  send: jest.fn(),
}));

function renderWithRouter(ui) {
  return render(ui, { wrapper: BrowserRouter });
}

describe('ContactPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders contact form with default values', async () => {
    renderWithRouter(<ContactPage />);

    expect(await screen.findByLabelText('Name')).toHaveValue('');
    expect(await screen.findByLabelText('Email Address')).toHaveValue('');
    expect(await screen.findByLabelText('Message')).toHaveValue('');
  });

  test('updates form fields on user input', async () => {
    renderWithRouter(<ContactPage />);

    fireEvent.change(await screen.findByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(await screen.findByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    fireEvent.change(await screen.findByLabelText('Message'), { target: { value: 'Hello there!' } });

    expect(await screen.findByLabelText('Name')).toHaveValue('John Doe');
    expect(await screen.findByLabelText('Email Address')).toHaveValue('john@example.com');
    expect(await screen.findByLabelText('Message')).toHaveValue('Hello there!');
  });

  test('shows success modal when email is sent successfully', async () => {
    emailjs.send.mockResolvedValue({ status: 200 });
    renderWithRouter(<ContactPage />);

    fireEvent.change(await screen.findByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(await screen.findByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    fireEvent.change(await screen.findByLabelText('Message'), { target: { value: 'Hello there!' } });

    fireEvent.click(await screen.findByRole('button', { name: /Contact Us/i }));

    expect(await screen.findByText('Your message has been sent!')).toBeInTheDocument();
    expect(await screen.findByText('Success')).toBeInTheDocument();
  });

  test('shows error modal when email sending fails', async () => {
    emailjs.send.mockRejectedValue({ text: 'Network Error' });
    renderWithRouter(<ContactPage />);

    fireEvent.change(await screen.findByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(await screen.findByLabelText('Email Address'), { target: { value: 'john@example.com' } });
    fireEvent.change(await screen.findByLabelText('Message'), { target: { value: 'Hello there!' } });

    fireEvent.click(await screen.findByRole('button', { name: /Contact Us/i }));

    expect(await screen.findByText('Error: Network Error')).toBeInTheDocument();
    expect(await screen.findByText('Error')).toBeInTheDocument();
  });
});
