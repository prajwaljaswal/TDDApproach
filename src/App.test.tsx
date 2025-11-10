import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Note: These tests are designed to work with @testing-library/jest-dom and axe-core
// When dependencies are installed, uncomment the imports above and remove this comment

describe('String Calculator App', () => {
  test('should render the calculator interface', () => {
    render(<App />);

    expect(screen.getByText('String Calculator')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument();
  });

  test('should calculate and display result for comma-separated numbers', async () => {
    const user = userEvent.setup();
    render(<App />);

    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /calculate/i });

    await user.type(textarea, '1,2,3');
    await user.click(button);

    expect(screen.getByText('Result: 6')).toBeInTheDocument();
  });

  test('should handle custom delimiters', async () => {
    const user = userEvent.setup();
    render(<App />);

    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /calculate/i });

    await user.type(textarea, '//;\n1;2;3');
    await user.click(button);

    expect(screen.getByText('Result: 6')).toBeInTheDocument();
  });

  test('should display error for negative numbers', async () => {
    const user = userEvent.setup();
    render(<App />);

    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /calculate/i });

    await user.type(textarea, '1,-2');
    await user.click(button);

    expect(screen.getByText(/negative numbers not allowed/)).toBeInTheDocument();
  });

  test('should clear previous results when calculating new values', async () => {
    const user = userEvent.setup();
    render(<App />);

    const textarea = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /calculate/i });

    // First calculation
    await user.type(textarea, '1,2');
    await user.click(button);
    expect(screen.getByText('Result: 3')).toBeInTheDocument();

    // Clear and second calculation
    await user.clear(textarea);
    await user.type(textarea, '10,20');
    await user.click(button);
    expect(screen.getByText('Result: 30')).toBeInTheDocument();
  });
});
