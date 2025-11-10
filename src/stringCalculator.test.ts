import { add } from './stringCalculator';

describe('String Calculator', () => {
  test('should return 0 for empty string', () => {
    expect(add('')).toBe(0);
  });
});
