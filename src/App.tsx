import { useState } from 'react';
import { add } from './stringCalculator';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    setError(null);
    setResult(null);

    try {
      const calculationResult = add(input);
      setResult(calculationResult);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during calculation.');
      }
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', color: '#333' }}>
      <h1>String Calculator</h1>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="number-input" style={{ display: 'block', marginBottom: '10px' }}>
          Enter numbers (comma, newline, or custom delimiters):
        </label>
        <textarea
          id="number-input"
          style={{ width: '100%', minHeight: '100px', padding: '10px', marginBottom: '10px' }}
          placeholder="Examples:
//;\n1;2;3
//[***]\n1***2***3
1,2\n3
1,2,3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleCalculate}
          style={{
            padding: '10px 20px',
            backgroundColor: '#008cba',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}>
          Calculate
        </button>
      </div>

      {result !== null && (
        <div style={{ color: '#2e7d32', padding: '10px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
          <strong>Result: {result}</strong>
        </div>
      )}

      {error && (
        <div style={{ color: '#d32f2f', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
          <strong>Error: {error}</strong>
        </div>
      )}
    </div>
  );
};

export default App;