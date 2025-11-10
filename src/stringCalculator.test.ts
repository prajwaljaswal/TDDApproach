import { add } from './stringCalculator';

describe('String Calculator', () => {
  test('should return 0 for empty string', () => {
    expect(add('')).toBe(0);
  });

  test('should return the number for single number', () => {
    expect(add('1')).toBe(1);
    expect(add('5')).toBe(5);
  });

  test('should return sum of two numbers separated by comma', () => {
    expect(add('1,2')).toBe(3);
    expect(add('10,20')).toBe(30);
  });

  test('should handle newlines as separators', () => {
    expect(add('1\n2,3')).toBe(6);
    expect(add('1,2\n3')).toBe(6);
  });

  test('should support custom delimiters', () => {
    expect(add('//;\n1;2')).toBe(3);
    expect(add('//|\n1|2|3')).toBe(6);
  });

  test('should throw exception for negative numbers', () => {
    expect(() => add('1,-2')).toThrow('negative numbers not allowed: -2');
    expect(() => add('1,-2,-3')).toThrow('negative numbers not allowed: -2,-3');
  });

  test('should ignore numbers greater than 1000', () => {
    expect(add('2,1001')).toBe(2);
    expect(add('1000,1001,2')).toBe(1002);
  });

  test('should support multi-character delimiters', () => {
    expect(add('//[***]\n1***2***3')).toBe(6);
    expect(add('//[sep]\n1sep2sep3')).toBe(6);
  });
});
