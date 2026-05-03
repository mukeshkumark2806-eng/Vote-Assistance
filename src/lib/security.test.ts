/**
 * Comprehensive tests for security utilities
 * Covers: XSS prevention, rate limiting, CSRF, safe localStorage
 */
import {
  sanitizeInput, isValidEmail, isInputSafe,
  checkRateLimit, resetRateLimit,
  generateCSRFToken, validateCSRFToken,
  safeGetItem, safeSetItem, safeRemoveItem,
} from './security';

describe('Security Utilities', () => {

  // ========== XSS Prevention ==========
  describe('sanitizeInput', () => {
    it('should escape HTML special characters', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).not.toContain('<script>');
      expect(sanitizeInput('<img onerror=alert(1)>')).not.toContain('<img');
    });

    it('should escape ampersands', () => {
      expect(sanitizeInput('Tom & Jerry')).toBe('Tom &amp; Jerry');
    });

    it('should escape quotes', () => {
      expect(sanitizeInput('"hello"')).toBe('&quot;hello&quot;');
      expect(sanitizeInput("it's")).toBe("it&#x27;s");
    });

    it('should handle empty strings', () => {
      expect(sanitizeInput('')).toBe('');
    });

    it('should handle non-string inputs gracefully', () => {
      // @ts-expect-error testing runtime safety
      expect(sanitizeInput(null)).toBe('');
      // @ts-expect-error testing runtime safety
      expect(sanitizeInput(undefined)).toBe('');
      // @ts-expect-error testing runtime safety
      expect(sanitizeInput(123)).toBe('');
    });

    it('should preserve safe text content', () => {
      expect(sanitizeInput('Hello World 123')).toBe('Hello World 123');
    });
  });

  describe('isValidEmail', () => {
    it('should accept valid emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.user+tag@domain.co.in')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('notanemail')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
    });

    it('should reject excessively long emails', () => {
      const longEmail = 'a'.repeat(250) + '@b.com';
      expect(isValidEmail(longEmail)).toBe(false);
    });
  });

  describe('isInputSafe', () => {
    it('should flag script tags as unsafe', () => {
      expect(isInputSafe('<script>alert(1)</script>')).toBe(false);
    });

    it('should flag javascript: protocol as unsafe', () => {
      expect(isInputSafe('javascript:void(0)')).toBe(false);
    });

    it('should flag event handlers as unsafe', () => {
      expect(isInputSafe('<img onerror=alert(1)>')).toBe(false);
    });

    it('should allow normal text', () => {
      expect(isInputSafe('Hello, how do I register to vote?')).toBe(true);
    });
  });

  // ========== Rate Limiting ==========
  describe('checkRateLimit', () => {
    beforeEach(() => { resetRateLimit('test_action'); });

    it('should allow initial requests', () => {
      const result = checkRateLimit('test_action', 3, 60000);
      expect(result.allowed).toBe(true);
      expect(result.remainingAttempts).toBe(2);
    });

    it('should block after exceeding max attempts', () => {
      checkRateLimit('test_action', 2, 60000);
      checkRateLimit('test_action', 2, 60000);
      const result = checkRateLimit('test_action', 2, 60000);
      expect(result.allowed).toBe(false);
      expect(result.remainingAttempts).toBe(0);
      expect(result.retryAfterMs).toBeGreaterThan(0);
    });

    it('should track separate actions independently', () => {
      checkRateLimit('action_a', 1, 60000);
      const result = checkRateLimit('action_b', 1, 60000);
      expect(result.allowed).toBe(true);
    });
  });

  // ========== CSRF Protection ==========
  describe('CSRF', () => {
    it('should generate tokens of correct length', () => {
      const token = generateCSRFToken();
      expect(token).toHaveLength(32);
    });

    it('should generate unique tokens', () => {
      const t1 = generateCSRFToken();
      const t2 = generateCSRFToken();
      expect(t1).not.toBe(t2);
    });

    it('should validate matching tokens', () => {
      const token = generateCSRFToken();
      expect(validateCSRFToken(token, token)).toBe(true);
    });

    it('should reject mismatched tokens', () => {
      expect(validateCSRFToken('abc', 'xyz')).toBe(false);
    });

    it('should reject different length tokens', () => {
      expect(validateCSRFToken('short', 'muchlonger')).toBe(false);
    });
  });

  // ========== Safe localStorage ==========
  describe('safeGetItem / safeSetItem', () => {
    beforeEach(() => { localStorage.clear(); });

    it('should store and retrieve values', () => {
      safeSetItem('key', { hello: 'world' });
      expect(safeGetItem('key', null)).toEqual({ hello: 'world' });
    });

    it('should return fallback for missing keys', () => {
      expect(safeGetItem('nonexistent', 'default')).toBe('default');
    });

    it('should handle arrays', () => {
      safeSetItem('arr', [1, 2, 3]);
      expect(safeGetItem<number[]>('arr', [])).toEqual([1, 2, 3]);
    });

    it('should remove items safely', () => {
      safeSetItem('to_remove', 'data');
      expect(safeRemoveItem('to_remove')).toBe(true);
      expect(safeGetItem('to_remove', null)).toBeNull();
    });
  });
});
