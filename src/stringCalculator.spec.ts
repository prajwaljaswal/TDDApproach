import { describe, test, expect } from 'vitest';

// TDD Demonstration: Testing calculator logic directly
// This demonstrates the TDD approach without external dependencies

// Inline implementation for testing (simulating TDD progression)
function add(numbers: string): number {
  if (numbers === '') {
    return 0;
  }

  let delimiter = ',';
  let numbersPart = numbers;

  // Check for custom delimiter
  if (numbers.startsWith('//')) {
    const delimiterEndIndex = numbers.indexOf('\n');
    const delimiterSpec = numbers.substring(2, delimiterEndIndex);

    // Check if it's bracketed format like //[***]
    if (delimiterSpec.startsWith('[') && delimiterSpec.endsWith(']')) {
      delimiter = delimiterSpec.slice(1, -1);
    } else {
      delimiter = delimiterSpec;
    }

    numbersPart = numbers.substring(delimiterEndIndex + 1);
  }

  // Replace newlines with the delimiter for uniform processing
  const normalizedNumbers = numbersPart.replace(/\n/g, delimiter);

  // Handle single number
  if (!normalizedNumbers.includes(delimiter)) {
    return parseInt(normalizedNumbers, 10);
  }

  // Handle delimiter-separated numbers
  const numberStrings = normalizedNumbers.split(delimiter);
  const nums = numberStrings.map(num => parseInt(num.trim(), 10));

  // Check for negative numbers
  const negativeNumbers = nums.filter(num => num < 0);
  if (negativeNumbers.length > 0) {
    throw new Error(`negative numbers not allowed: ${negativeNumbers.join(',')}`);
  }

  // Filter out numbers greater than 1000
  const validNumbers = nums.filter(num => num <= 1000);

  return validNumbers.reduce((sum, num) => sum + num, 0);
}

describe('String Calculator - TDD Implementation', () => {
  test('TDD Step 1: should return 0 for empty string', () => {
    expect(add('')).toBe(0);
  });

  test('TDD Step 2: should return the number for single number', () => {
    expect(add('1')).toBe(1);
    expect(add('5')).toBe(5);
  });

  test('TDD Step 3: should return sum of two numbers separated by comma', () => {
    expect(add('1,2')).toBe(3);
    expect(add('10,20')).toBe(30);
  });

  test('TDD Step 4: should return sum of multiple numbers separated by comma', () => {
    expect(add('1,2,3')).toBe(6);
    expect(add('1,2,3,4,5')).toBe(15);
  });

  test('TDD Step 5: should handle newlines as separators', () => {
    expect(add('1\n2,3')).toBe(6);
    expect(add('1,2\n3')).toBe(6);
  });

  test('TDD Step 6: should support custom delimiters', () => {
    expect(add('//;\n1;2')).toBe(3);
    expect(add('//|\n1|2|3')).toBe(6);
  });

  test('TDD Step 7: should throw exception for negative numbers', () => {
    expect(() => add('1,-2')).toThrow('negative numbers not allowed: -2');
    expect(() => add('1,-2,-3')).toThrow('negative numbers not allowed: -2,-3');
  });

  test('TDD Step 8: should ignore numbers greater than 1000', () => {
    expect(add('2,1001')).toBe(2);
    expect(add('1000,1001,2')).toBe(1002);
  });

  test('TDD Step 9: should support multi-character delimiters', () => {
    expect(add('//[***]\n1***2***3')).toBe(6);
    expect(add('//[sep]\n1sep2sep3')).toBe(6);
  });

  test('TDD Validation: should demonstrate complete feature set', () => {
    // Test all features work together
    const testCases = [
      { input: '', expected: 0 },
      { input: '42', expected: 42 },
      { input: '1,2,3', expected: 6 },
      { input: '1\n2,3', expected: 6 },
      { input: '//;\n1;2;3', expected: 6 },
      { input: '2,1001', expected: 2 },
      { input: '//[***]\n1***2***3', expected: 6 }
    ];

    testCases.forEach(({ input, expected }) => {
      expect(add(input)).toBe(expected);
    });

    // Test error cases
    expect(() => add('1,-2')).toThrow();
  });
});
