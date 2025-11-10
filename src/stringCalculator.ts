export function add(numbers: string): number {
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
