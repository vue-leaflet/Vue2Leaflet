import { capitalizeFirstLetter } from '@/utils/utils';

describe('utils: capitalizeFirstLetter', () => {
  test.each([
    ['capitalize me', 'Capitalize me'],
    ['toCaps', 'ToCaps']
  ])('it works with standard text', (input, expected) => {
    expect(capitalizeFirstLetter(input)).toBe(expected);
  });

  test.each([
    ['Already capitalized'],
    ['ALLCAPS']
  ])('it works when already capitalized', (value) => {
    expect(capitalizeFirstLetter(value)).toBe(value);
  });

  test('it returns the empty string when given that', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  test('it returns undefined when given that', () => {
    expect(capitalizeFirstLetter(undefined)).toBeUndefined();
  });
});
