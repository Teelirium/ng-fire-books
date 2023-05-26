import { isValidISBN } from './isValidISBN';

describe('ISBN validator', () => {
  it('true on valid ISBN', () => {
    const isbn = '978-5-459-01044-2';
    const res = isValidISBN(isbn.split('-'));
    expect(res).toBeTrue();
  });
  it('false on invalid ISBN', () => {
    const isbn = '978-5-459-01044-9';
    const res = isValidISBN(isbn.split('-'));
    expect(res).toBeFalse();
  });
  it('false on garbage', () => {
    const isbn = '978-5-4a9-01044-2';
    const res = isValidISBN(isbn.split('-'));
    expect(res).toBeFalse();
  });
});
