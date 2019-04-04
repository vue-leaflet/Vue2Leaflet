import { debounce } from '@/utils/utils';

const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));
const debounceTime = 10;
const sleepTime = 15;

describe('utils: debounce', () => {
  test('it calls a function only once in a given window', async () => {
    const fn = jest.fn();
    const debounced = debounce(fn, debounceTime);

    debounced();
    debounced();
    debounced();
    await sleep(sleepTime);

    expect(fn.mock.calls.length).toBe(1);
  });

  test('it allows multiple calls when outside the given window', async () => {
    const fn = jest.fn();
    const debounced = debounce(fn, debounceTime);

    debounced();
    await sleep(sleepTime);
    debounced();
    debounced();
    await sleep(sleepTime);

    expect(fn.mock.calls.length).toBe(2);
  });

  test('it passes arguments to the debounced function', async () => {
    const fn = jest.fn();
    const debounced = debounce(fn, debounceTime);

    debounced(1, 'two', { three: 4 });
    await sleep(sleepTime);

    expect(fn.mock.calls.length).toBe(1);

    expect(fn.mock.calls[0][0]).toBe(1);
    expect(fn.mock.calls[0][1]).toBe('two');
    expect(fn.mock.calls[0][2]).toEqual({ three: 4 });
  });

  test('it only executes the final call in the time window, even with different arguments', async () => {
    const fn = jest.fn();
    const debounced = debounce(fn, debounceTime);

    debounced('a');
    debounced('b');
    debounced('c');
    await sleep(sleepTime);

    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe('c');
  });

  test('it keeps the window open on subsequent calls, until it first expires', async () => {
    const fn = jest.fn();
    const debounced = debounce(fn, debounceTime);

    // Call the function multiple times, each a little bit before the previous window
    // would have expired. Even though this sequence will last 3.2 times the debounce
    // window length plus the full sleep time, we expect only the final call to be
    // actually executed.
    debounced(1);
    await sleep(debounceTime * 0.8);
    debounced(2);
    await sleep(debounceTime * 0.8);
    debounced(3);
    await sleep(debounceTime * 0.8);
    debounced(4);
    await sleep(debounceTime * 0.8);
    debounced(5);
    await sleep(sleepTime);

    expect(fn.mock.calls.length).toBe(1);
    expect(fn.mock.calls[0][0]).toBe(5);
  });
});
