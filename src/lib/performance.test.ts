/**
 * Tests for performance monitoring utilities
 */
import { debounce, throttle } from './performance';

describe('Performance Utilities', () => {

  describe('debounce', () => {
    beforeEach(() => { jest.useFakeTimers(); });
    afterEach(() => { jest.useRealTimers(); });

    it('should delay execution', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 200);
      debounced();
      expect(fn).not.toHaveBeenCalled();
      jest.advanceTimersByTime(200);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should reset timer on subsequent calls', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 200);
      debounced();
      jest.advanceTimersByTime(100);
      debounced(); // reset
      jest.advanceTimersByTime(100);
      expect(fn).not.toHaveBeenCalled();
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to the original function', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);
      debounced('arg1', 'arg2');
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
    });
  });

  describe('throttle', () => {
    beforeEach(() => { jest.useFakeTimers(); });
    afterEach(() => { jest.useRealTimers(); });

    it('should execute immediately on first call', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 200);
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should block subsequent calls within the limit', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 200);
      throttled();
      throttled();
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should allow calls after the limit period', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 200);
      throttled();
      jest.advanceTimersByTime(200);
      throttled();
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
