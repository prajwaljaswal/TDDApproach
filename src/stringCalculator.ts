export function add(numbers: string): number {
  if (numbers === '') {
    return 0;
  }

  let delimiter = ',';
  let numbersPart = numbers;

  // Check for custom delimiter
  if (numbers.startsWith('//')) {
    const delimiterEndIndex = numbers.indexOf('\n');
    delimiter = numbers.substring(2, delimiterEndIndex);
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

  return nums.reduce((sum, num) => sum + num, 0);
}
