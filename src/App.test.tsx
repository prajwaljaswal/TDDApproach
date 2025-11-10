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

  describe('UI States and Interactions', () => {
    test('should show loading state during calculation', async () => {
      const user = userEvent.setup();
      render(<App />);

      const textarea = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /calculate/i });

      await user.type(textarea, '1,2,3,4,5');
      await user.click(button);

      // Check loading button text
      expect(button).toHaveTextContent('Calculating...');

      // Wait for calculation to complete
      await new Promise(resolve => setTimeout(resolve, 600));

      // Check button returns to normal state
      expect(button).toHaveTextContent('Calculate');
    });

    test('should display error messages with proper styling', async () => {
      const user = userEvent.setup();
      render(<App />);

      const textarea = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /calculate/i });

      await user.type(textarea, '1,-2,-3');
      await user.click(button);

      const errorElement = screen.getByText(/negative numbers not allowed: -2,-3/);
      expect(errorElement).toBeInTheDocument();

      // Check if error has proper ARIA attributes (would work with testing-library/jest-dom)
      const errorContainer = errorElement.closest('div');
      expect(errorContainer).toHaveAttribute('role', 'alert');
    });

    test('should handle empty input gracefully', async () => {
      const user = userEvent.setup();
      render(<App />);

      const button = screen.getByRole('button', { name: /calculate/i });

      await user.click(button);

      // Should show result 0 for empty input
      expect(screen.getByText('Result: 0')).toBeInTheDocument();
    });

    test('should clear error messages on new calculation', async () => {
      const user = userEvent.setup();
      render(<App />);

      const textarea = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /calculate/i });

      // First show an error
      await user.type(textarea, '1,-2');
      await user.click(button);
      expect(screen.getByText(/negative numbers not allowed/)).toBeInTheDocument();

      // Clear and calculate valid input
      await user.clear(textarea);
      await user.type(textarea, '1,2,3');
      await user.click(button);

      // Error should be gone, result should be shown
      expect(screen.queryByText(/negative numbers not allowed/)).not.toBeInTheDocument();
      expect(screen.getByText('Result: 6')).toBeInTheDocument();
    });

    test('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<App />);

      const textarea = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /calculate/i });

      // Focus textarea
      textarea.focus();
      expect(textarea).toHaveFocus();

      // Tab to button
      await user.keyboard('{Tab}');
      expect(button).toHaveFocus();

      // Press Enter on button
      await user.keyboard('{Enter}');

      // Should calculate with empty input (result: 0)
      expect(screen.getByText('Result: 0')).toBeInTheDocument();
    });

    test('should handle multi-character delimiters in UI', async () => {
      const user = userEvent.setup();
      render(<App />);

      const textarea = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /calculate/i });

      await user.type(textarea, '//[***]\n1***2***3');
      await user.click(button);

      expect(screen.getByText('Result: 6')).toBeInTheDocument();
    });

    test('should filter numbers greater than 1000 in UI', async () => {
      const user = userEvent.setup();
      render(<App />);

      const textarea = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /calculate/i });

      await user.type(textarea, '2,1001,3');
      await user.click(button);

      expect(screen.getByText('Result: 5')).toBeInTheDocument();
    });

    test('should handle complex input with newlines and custom delimiters', async () => {
      const user = userEvent.setup();
      render(<App />);

      const textarea = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /calculate/i });

      await user.type(textarea, '//|\n1|2\n3|4');
      await user.click(button);

      expect(screen.getByText('Result: 10')).toBeInTheDocument();
    });

    test('should show proper placeholder text', () => {
      render(<App />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('placeholder');
      expect(textarea.placeholder).toContain('Enter numbers');
      expect(textarea.placeholder).toContain('comma');
      expect(textarea.placeholder).toContain('delimiters');
    });

    test('should have proper form labels', () => {
      render(<App />);

      const textarea = screen.getByRole('textbox');
      const label = screen.getByText(/Enter numbers separated by commas/);

      expect(label.tagName).toBe('LABEL');
      expect(label).toHaveAttribute('for', textarea.id);
    });

    test('should display results with proper styling', async () => {
      const user = userEvent.setup();
      render(<App />);

      const textarea = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /calculate/i });

      await user.type(textarea, '5,10,15');
      await user.click(button);

      const resultElement = screen.getByText('Result: 30');
      const resultContainer = resultElement.closest('div');

      expect(resultContainer).toHaveAttribute('role', 'status');
      expect(resultElement).toHaveAttribute('aria-live', 'polite');
    });

    test('should handle rapid successive calculations', async () => {
      const user = userEvent.setup();
      render(<App />);

      const textarea = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /calculate/i });

      // First calculation
      await user.type(textarea, '1,2');
      await user.click(button);
      expect(screen.getByText('Result: 3')).toBeInTheDocument();

      // Immediate second calculation
      await user.clear(textarea);
      await user.type(textarea, '10,20,30');
      await user.click(button);

      // Should show new result
      expect(screen.getByText('Result: 60')).toBeInTheDocument();
      expect(screen.queryByText('Result: 3')).not.toBeInTheDocument();
    });
  });
});
