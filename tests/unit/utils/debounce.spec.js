import { debounce } from '@/utils/utils';

describe('utils: debounce', () => {
  const debounceTime = 1000;
  const sleepTime = 1500;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('it calls a function only once in a given window', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, debounceTime);

    debounced();
    debounced();
    debounced();
    jest.advanceTimersByTime(sleepTime);

    expect(fn.mock.calls.length).toBe(1);
  });

  test('it allows multiple calls when outside the given window', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, debounceTime);

    debounced();
    jest.advanceTimersByTime(sleepTime);
    debounced();
    debounced();
    jest.advanceTimersByTime(sleepTime);

    expect(fn.mock.calls.length).toBe(2);
  });

  test('it passes arguments to the debounced function', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, debounceTime);

    debounced(1, 'two', { three: 4 });
    jest.advanceTimersByTime(sleepTime);

    expect(fn.mock.calls.length).toBe(1);

    expect(fn.mock.calls[0][0]).toBe(1);
    expect(fn.mock.calls[0][1]).toBe('two');
    expect(fn.mock.calls[0][2]).toEqual({ three: 4 });
  });

  test('it only executes the final call in the time window, even with different arguments', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, debounceTime);

    debounced('a');
    debounced('b');
    debounced('c');
    jest.advanceTimersByTime(sleepTime);

    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe('c');
  });

  test('it keeps the window open on subsequent calls, until it first expires', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, debounceTime);

    // Call the function multiple times, each a little bit before the previous window
    // would have expired. Even though this sequence will last 3.2 times the debounce
    // window length plus the full sleep time, we expect only the final call to be
    // actually executed.
    debounced(1);
    jest.advanceTimersByTime(debounceTime * 0.8);
    debounced(2);
    jest.advanceTimersByTime(debounceTime * 0.8);
    debounced(3);
    jest.advanceTimersByTime(debounceTime * 0.8);
    debounced(4);
    jest.advanceTimersByTime(debounceTime * 0.8);
    debounced(5);
    jest.advanceTimersByTime(sleepTime);

    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(5);
  });
});
