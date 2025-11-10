export function add(numbers: string): number {
  if (numbers === '') {
    return 0;
  }

  // Handle single number
  if (!numbers.includes(',')) {
    return parseInt(numbers, 10);
  }

  return 0;
}
