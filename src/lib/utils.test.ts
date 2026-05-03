/**
 * Comprehensive tests for utility functions
 * Covers: cn merge utility with edge cases
 */
import { cn } from './utils';

describe('utils', () => {
  describe('cn - Tailwind class merger', () => {
    it('should merge tailwind classes correctly', () => {
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
      expect(cn('p-4', { 'p-8': true })).toBe('p-8');
      expect(cn('text-sm', false && 'text-lg')).toBe('text-sm');
    });

    it('should handle empty inputs', () => {
      expect(cn()).toBe('');
      expect(cn('')).toBe('');
      expect(cn(null as unknown as string)).toBe('');
      expect(cn(undefined as unknown as string)).toBe('');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      expect(cn('base', isActive && 'active', isDisabled && 'disabled')).toBe('base active');
    });

    it('should handle object notation', () => {
      expect(cn({ 'bg-red-500': true, 'text-white': true, 'hidden': false })).toBe('bg-red-500 text-white');
    });

    it('should handle array inputs', () => {
      expect(cn(['bg-red-500', 'text-white'])).toBe('bg-red-500 text-white');
    });

    it('should resolve Tailwind conflicts correctly', () => {
      // Later classes should win in conflicts
      expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
      expect(cn('text-sm text-gray-500', 'text-lg')).toBe('text-gray-500 text-lg');
    });

    it('should handle multiple arguments of mixed types', () => {
      const result = cn(
        'base-class',
        true && 'conditional-true',
        false && 'conditional-false',
        { 'object-true': true, 'object-false': false },
        ['array-class']
      );
      expect(result).toContain('base-class');
      expect(result).toContain('conditional-true');
      expect(result).not.toContain('conditional-false');
      expect(result).toContain('object-true');
      expect(result).not.toContain('object-false');
      expect(result).toContain('array-class');
    });
  });
});
