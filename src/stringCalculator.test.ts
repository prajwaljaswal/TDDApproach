import { add } from './stringCalculator';

describe('String Calculator', () => {
  test('should return 0 for empty string', () => {
    expect(add('')).toBe(0);
  });

  test('should return the number for single number', () => {
    expect(add('1')).toBe(1);
    expect(add('5')).toBe(5);
  });
});
