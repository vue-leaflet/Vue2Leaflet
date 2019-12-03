import { collectionCleaner } from '@/utils/utils';

describe('utils: collectionCleaner', () => {
  test('it removes a key with a null value', () => {
    const input = { removeMe: null };
    const output = collectionCleaner(input);

    expect(output).toBeDefined();
    expect(
      Object.prototype.hasOwnProperty.call(output, 'removeMe')
    ).toBeFalsy();
  });

  test('it removes a key with an undefined value', () => {
    const input = { removeMe: undefined };
    const output = collectionCleaner(input);

    expect(output).toBeDefined();
    expect(
      Object.prototype.hasOwnProperty.call(output, 'removeMe')
    ).toBeFalsy();
  });

  test('it retains keys with the value false', () => {
    const input = { keepMe: false };
    const output = collectionCleaner(input);

    expect(output).toBeDefined();
    expect(Object.prototype.hasOwnProperty.call(output, 'keepMe')).toBeTruthy();
  });

  test('it retains keys with the value 0', () => {
    const input = { keepMe: 0 };
    const output = collectionCleaner(input);

    expect(output).toBeDefined();
    expect(Object.prototype.hasOwnProperty.call(output, 'keepMe')).toBeTruthy();
  });

  test('it retains keys with the empty string as a value', () => {
    const input = { keepMe: '' };
    const output = collectionCleaner(input);

    expect(output).toBeDefined();
    expect(Object.prototype.hasOwnProperty.call(output, 'keepMe')).toBeTruthy();
  });

  test('it retains keys with the value NaN', () => {
    const input = { keepMe: NaN };
    const output = collectionCleaner(input);

    expect(output).toBeDefined();
    expect(Object.prototype.hasOwnProperty.call(output, 'keepMe')).toBeTruthy();
  });

  test('it returns an empty object when given an undefined one', () => {
    const output = collectionCleaner();

    expect(output).toEqual({});
  });

  test('it does not remove nested null properties', () => {
    const expected = { a: { b: null } };
    const output = collectionCleaner(expected);

    expect(output).toEqual(expected);
  });

  test('it does not remove nested undefined properties', () => {
    const expected = { a: { b: undefined } };
    const output = collectionCleaner(expected);

    expect(output).toEqual(expected);
  });

  test('it works as expected on a more complicated object', () => {
    const expected = {
      a: 1,
      c: 'two',
      e: {
        f: undefined,
        g: 3.14159,
      },
    };
    const input = {
      ...expected,
      b: undefined,
      d: null,
    };

    const output = collectionCleaner(input);

    expect(output).toEqual(expected);
  });
});
