export function isValidISBN(isbn: string[]): boolean {
  let i = 0,
    sum = 0;

  for (const segment of isbn) {
    for (const char of segment) {
      if (i > 12) {
        return false;
      }
      const digit = +char;
      if (isNaN(digit)) {
        return false;
      }
      const isEvenIndex = i % 2 === 0;
      sum += digit * (isEvenIndex ? 1 : 3);
      i++;
    }
  }
  const lastDigit = +isbn[isbn.length - 1];
  sum -= lastDigit;
  const remainder = sum % 10;
  const result = (10 - remainder) % 10;
  return result === lastDigit;
}
