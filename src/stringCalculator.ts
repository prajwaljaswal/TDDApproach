export function add(numbers: string): number {
  if (numbers === '') {
    return 0;
  }

  // Replace newlines with commas for uniform processing
  const normalizedNumbers = numbers.replace(/\n/g, ',');

  // Handle single number
  if (!normalizedNumbers.includes(',')) {
    return parseInt(normalizedNumbers, 10);
  }

  // Handle comma-separated numbers
  const numberStrings = normalizedNumbers.split(',');
  const nums = numberStrings.map(num => parseInt(num.trim(), 10));
  return nums.reduce((sum, num) => sum + num, 0);
}
