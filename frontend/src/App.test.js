import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the Hangman component
jest.mock('./components/Hangman/Hangman', () => () => <div data-testid="hangman-component">Hangman Component</div>);

describe('App Component', () => {
  test('renders the Hangman component', () => {
    render(<App />);
    const hangmanElement = screen.getByTestId('hangman-component');
    expect(hangmanElement).toBeInTheDocument();
    expect(hangmanElement).toHaveTextContent('Hangman Component');
  });

  test('applies correct styles to the root div', () => {
    const { container } = render(<App />);
    const rootDiv = container.querySelector('.min-h-screen.bg-gray-100.py-8');
    expect(rootDiv).toBeInTheDocument();
  });
});
