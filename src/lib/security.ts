/**
 * Security Utilities for VoteWise Elite
 * 
 * Implements defensive security practices including:
 * - Input sanitization to prevent XSS attacks
 * - Rate limiting for form submissions
 * - CSRF token generation and validation
 * - Safe localStorage access with error boundaries
 * - Content Security Policy helpers
 * 
 * @module security
 */

// ============================================================
// XSS Prevention: Input Sanitization
// ============================================================

/**
 * HTML entity map for escaping dangerous characters.
 * Prevents XSS by converting special chars to safe HTML entities.
 */
const HTML_ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#96;',
};

/**
 * Sanitizes a string by escaping HTML special characters.
 * Prevents Cross-Site Scripting (XSS) attacks by neutralizing
 * potentially dangerous characters in user input.
 * 
 * @param input - The raw user input string to sanitize
 * @returns The sanitized string with HTML entities escaped
 * 
 * @example
 * ```ts
 * sanitizeInput('<script>alert("xss")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
 * ```
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input.replace(/[&<>"'`/]/g, (char) => HTML_ENTITY_MAP[char] || char);
}

/**
 * Validates an email address format using RFC 5322 simplified pattern.
 * Does NOT check if the email actually exists.
 * 
 * @param email - The email address to validate
 * @returns True if the format is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validates that a string does not contain dangerous patterns
 * such as SQL injection attempts or script tags.
 * 
 * @param input - The input to validate
 * @returns True if the input is safe
 */
export function isInputSafe(input: string): boolean {
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // Event handlers like onclick=
    /data:text\/html/gi,
    /vbscript:/gi,
  ];
  return !dangerousPatterns.some(pattern => pattern.test(input));
}

// ============================================================
// Rate Limiting
// ============================================================

/** Rate limit entry tracking submission timestamps */
interface RateLimitEntry {
  timestamps: number[];
  blocked: boolean;
}

/** In-memory rate limit store keyed by action identifier */
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Checks if an action is rate-limited.
 * Uses a sliding window algorithm to track submission frequency.
 * 
 * @param actionKey - Unique identifier for the action (e.g., 'contact_form')
 * @param maxAttempts - Maximum allowed attempts within the window (default: 5)
 * @param windowMs - Time window in milliseconds (default: 60000 = 1 minute)
 * @returns Object with `allowed` boolean and `retryAfterMs` if blocked
 * 
 * @example
 * ```ts
 * const result = checkRateLimit('contact_form_submit');
 * if (!result.allowed) {
 *   showError(`Too many attempts. Try again in ${Math.ceil(result.retryAfterMs! / 1000)}s`);
 * }
 * ```
 */
export function checkRateLimit(
  actionKey: string,
  maxAttempts: number = 5,
  windowMs: number = 60000
): { allowed: boolean; retryAfterMs?: number; remainingAttempts: number } {
  const now = Date.now();
  let entry = rateLimitStore.get(actionKey);

  if (!entry) {
    entry = { timestamps: [], blocked: false };
    rateLimitStore.set(actionKey, entry);
  }

  // Clean up old timestamps outside the window
  entry.timestamps = entry.timestamps.filter(ts => now - ts < windowMs);

  if (entry.timestamps.length >= maxAttempts) {
    const oldestTimestamp = entry.timestamps[0];
    const retryAfterMs = windowMs - (now - oldestTimestamp);
    return {
      allowed: false,
      retryAfterMs,
      remainingAttempts: 0,
    };
  }

  entry.timestamps.push(now);
  return {
    allowed: true,
    remainingAttempts: maxAttempts - entry.timestamps.length,
  };
}

/**
 * Resets the rate limit counter for a specific action.
 * Useful for testing or when a user successfully completes verification.
 * 
 * @param actionKey - The action key to reset
 */
export function resetRateLimit(actionKey: string): void {
  rateLimitStore.delete(actionKey);
}

// ============================================================
// CSRF Protection
// ============================================================

/**
 * Generates a cryptographically random CSRF token.
 * Uses the Web Crypto API when available, falling back to Math.random.
 * 
 * @returns A 32-character hexadecimal CSRF token
 */
export function generateCSRFToken(): string {
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  // Fallback for environments without Web Crypto
  return Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

/**
 * Validates a CSRF token against the stored session token.
 * Uses constant-time comparison to prevent timing attacks.
 * 
 * @param token - The token to validate
 * @param storedToken - The original token stored in the session
 * @returns True if tokens match
 */
export function validateCSRFToken(token: string, storedToken: string): boolean {
  if (token.length !== storedToken.length) return false;

  // Constant-time string comparison to prevent timing attacks
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ storedToken.charCodeAt(i);
  }
  return result === 0;
}

// ============================================================
// Safe localStorage Access
// ============================================================

/**
 * Safely retrieves a value from localStorage with error boundaries.
 * Handles cases where localStorage is unavailable (SSR, private browsing,
 * storage quota exceeded, or corrupted data).
 * 
 * @typeParam T - The expected type of the stored value
 * @param key - The localStorage key to retrieve
 * @param fallback - Default value if the key doesn't exist or parsing fails
 * @returns The parsed value or the fallback
 * 
 * @example
 * ```ts
 * const bookmarks = safeGetItem<string[]>('votewise_bookmarks', []);
 * ```
 */
export function safeGetItem<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const item = localStorage.getItem(key);
    if (item === null) return fallback;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`[Security] Failed to read localStorage key "${key}":`, error);
    return fallback;
  }
}

/**
 * Safely sets a value in localStorage with error boundaries.
 * Handles storage quota exceeded and serialization errors.
 * 
 * @param key - The localStorage key
 * @param value - The value to store (will be JSON-serialized)
 * @returns True if the operation succeeded
 */
export function safeSetItem(key: string, value: unknown): boolean {
  try {
    if (typeof window === 'undefined') return false;
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`[Security] Failed to write localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Safely removes a value from localStorage.
 * 
 * @param key - The localStorage key to remove
 * @returns True if the operation succeeded
 */
export function safeRemoveItem(key: string): boolean {
  try {
    if (typeof window === 'undefined') return false;
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`[Security] Failed to remove localStorage key "${key}":`, error);
    return false;
  }
}
