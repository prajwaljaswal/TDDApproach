export function add(numbers: string): number {
  if (numbers === '') {
    return 0;
  }

  // Handle single number
  if (!numbers.includes(',')) {
    return parseInt(numbers, 10);
  }

  // Handle comma-separated numbers
  const numberStrings = numbers.split(',');
  const nums = numberStrings.map(num => parseInt(num.trim(), 10));
  return nums.reduce((sum, num) => sum + num, 0);
}
