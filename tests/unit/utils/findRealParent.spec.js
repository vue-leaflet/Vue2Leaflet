import { findRealParent } from '@/utils/utils';

describe('utils: findRealParent', () => {
  test('it identifies when the given object is the parent', () => {
    const realParent = { mapObject: 'exists' };

    const foundParent = findRealParent(realParent);

    expect(foundParent).toEqual(realParent);
  });

  test('it finds a parent deeper in the hierarchy', () => {
    const realParent = { mapObject: 'exists' };
    const descendent = { $parent: { $parent: realParent } };

    const foundParent = findRealParent(descendent);

    expect(foundParent).toEqual(realParent);
  });

  test('it returns undefined when no real parent exists', () => {
    const orphan = { $parent: { $parent: {} } };

    const foundParent = findRealParent(orphan);

    expect(foundParent).toBeUndefined();
  });

  test('it returns undefined when not given an object', () => {
    expect(findRealParent()).toBeUndefined();
  });
});
