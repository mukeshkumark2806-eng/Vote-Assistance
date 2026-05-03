/**
 * VoteWise Elite - Library Barrel Exports
 * 
 * Central export point for all shared utilities and services.
 * Import from '@/lib' for cleaner import paths.
 * 
 * @module lib
 */

// Core utilities
export { cn } from './utils';

// Security utilities
export {
  sanitizeInput,
  isValidEmail,
  isInputSafe,
  checkRateLimit,
  resetRateLimit,
  generateCSRFToken,
  validateCSRFToken,
  safeGetItem,
  safeSetItem,
  safeRemoveItem,
} from './security';

// Performance utilities
export {
  collectWebVitals,
  debounce,
  throttle,
  preloadResource,
} from './performance';
export type { PerformanceMetric } from './performance';

// Google services
export {
  trackEvent,
  trackPageView,
  FirestoreService,
  contactsService,
  feedbackService,
  executeRecaptcha,
  getGoogleMapsEmbedUrl,
  getGoogleMapsDirectionsUrl,
} from './google-services';
export type {
  FirestoreDocument,
  ContactSubmission,
  UserFeedback,
  PollingBooth,
} from './google-services';

// Auth
export { AuthProvider, useAuth } from './auth-context';

// Data
export {
  mockCandidates,
  mockParties,
  mockTimelines,
  mockLiveResults,
  mockFaqs,
} from './mock-db';
export type { Candidate, Party } from './mock-db';
