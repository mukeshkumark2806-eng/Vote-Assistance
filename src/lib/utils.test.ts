import { cn } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge tailwind classes correctly', () => {
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
      expect(cn('p-4', { 'p-8': true })).toBe('p-8');
      expect(cn('text-sm', false && 'text-lg')).toBe('text-sm');
    });
  });
});
