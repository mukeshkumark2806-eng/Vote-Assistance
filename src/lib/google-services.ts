/**
 * Google Services Integration Layer for VoteWise Elite
 * 
 * Provides structured integration with Google Cloud services:
 * - Firebase Analytics event tracking
 * - Google Cloud Firestore service layer (mock-ready)
 * - Google reCAPTCHA v3 verification
 * - Google Maps utilities
 * 
 * @module google-services
 */

// ============================================================
// Firebase Analytics Integration
// ============================================================

/** Google Analytics event parameters */
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Tracks a custom event via Google Analytics (gtag.js).
 * Falls back silently if gtag is not loaded.
 */
export function trackEvent({ action, category, label, value }: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === 'function') {
    w.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * Tracks a page view event for SPA navigation.
 */
export function trackPageView(path: string, title: string): void {
  if (typeof window === 'undefined') return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === 'function') {
    w.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
      page_path: path,
      page_title: title,
    });
  }
}

// ============================================================
// Firestore Service Layer (Mock-Ready)
// ============================================================

/** Generic Firestore document interface */
export interface FirestoreDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

/** Contact form submission stored in Firestore */
export interface ContactSubmission extends FirestoreDocument {
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'reviewed' | 'resolved';
}

/** User feedback entry */
export interface UserFeedback extends FirestoreDocument {
  userId: string;
  rating: number;
  comment: string;
  page: string;
}

/**
 * Firestore service abstraction layer.
 * Currently uses localStorage as a mock store.
 * Designed for seamless migration to real Firestore.
 * 
 * To switch to real Firestore, replace the method implementations
 * with firebase/firestore SDK calls (addDoc, getDocs, etc.)
 */
export class FirestoreService {
  private collectionName: string;

  constructor(collection: string) {
    this.collectionName = collection;
  }

  /** Add a new document */
  async addDocument<T extends Record<string, unknown>>(data: T): Promise<string> {
    const id = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const doc = {
      ...data,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const collection = this.getCollection();
    collection.push(doc);
    this.saveCollection(collection);
    return id;
  }

  /** Get all documents */
  async getDocuments<T extends FirestoreDocument>(): Promise<T[]> {
    return this.getCollection() as T[];
  }

  /** Get document by ID */
  async getDocumentById<T extends FirestoreDocument>(id: string): Promise<T | null> {
    const collection = this.getCollection();
    return (collection.find((doc: FirestoreDocument) => doc.id === id) as T) || null;
  }

  /** Delete a document */
  async deleteDocument(id: string): Promise<boolean> {
    const collection = this.getCollection();
    const filtered = collection.filter((doc: FirestoreDocument) => doc.id !== id);
    if (filtered.length === collection.length) return false;
    this.saveCollection(filtered);
    return true;
  }

  private getCollection(): FirestoreDocument[] {
    try {
      if (typeof window === 'undefined') return [];
      const data = localStorage.getItem(`firestore_${this.collectionName}`);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  }

  private saveCollection(data: FirestoreDocument[]): void {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(`firestore_${this.collectionName}`, JSON.stringify(data));
    } catch { /* quota exceeded */ }
  }
}

// Pre-configured service instances
export const contactsService = new FirestoreService('contacts');
export const feedbackService = new FirestoreService('feedback');
export const analyticsService = new FirestoreService('analytics_events');

// ============================================================
// Google reCAPTCHA v3 Integration
// ============================================================

/**
 * Executes Google reCAPTCHA v3 verification.
 * Returns a token that should be validated server-side.
 * 
 * @param action - The action name (e.g., 'contact_form', 'login')
 * @returns The reCAPTCHA token, or null if unavailable
 */
export async function executeRecaptcha(action: string): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  const w = window as typeof window & { grecaptcha?: { ready: (cb: () => void) => void; execute: (key: string, opts: { action: string }) => Promise<string> } };
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey || !w.grecaptcha) return null;

  return new Promise((resolve) => {
    w.grecaptcha!.ready(async () => {
      try {
        const token = await w.grecaptcha!.execute(siteKey, { action });
        resolve(token);
      } catch {
        resolve(null);
      }
    });
  });
}

// ============================================================
// Google Maps Utilities
// ============================================================

/** Polling booth location data */
export interface PollingBooth {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  constituency: string;
  state: string;
}

/**
 * Generates a Google Maps embed URL for a given location.
 * Uses the free embed API that doesn't require an API key.
 */
export function getGoogleMapsEmbedUrl(query: string): string {
  return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&q=${encodeURIComponent(query)}`;
}

/**
 * Generates a Google Maps directions URL.
 */
export function getGoogleMapsDirectionsUrl(destination: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}
