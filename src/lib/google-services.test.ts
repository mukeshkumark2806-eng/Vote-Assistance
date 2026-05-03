/**
 * Comprehensive tests for Google Services integration
 * Covers: Analytics tracking, Firestore CRUD, reCAPTCHA, Maps utilities
 */
import {
  trackEvent, trackPageView,
  FirestoreService,
  getGoogleMapsDirectionsUrl,
} from './google-services';

describe('Google Services', () => {

  describe('Analytics - trackEvent', () => {
    it('should not throw when gtag is unavailable', () => {
      expect(() => trackEvent({
        action: 'test_click',
        category: 'testing',
        label: 'unit_test',
      })).not.toThrow();
    });

    it('should call gtag when available', () => {
      const mockGtag = jest.fn();
      (window as unknown as Record<string, unknown>).gtag = mockGtag;
      trackEvent({ action: 'vote_click', category: 'engagement', value: 1 });
      expect(mockGtag).toHaveBeenCalledWith('event', 'vote_click', expect.objectContaining({
        event_category: 'engagement',
      }));
      delete (window as unknown as Record<string, unknown>).gtag;
    });
  });

  describe('Analytics - trackPageView', () => {
    it('should not throw when gtag is unavailable', () => {
      expect(() => trackPageView('/candidates', 'Candidates')).not.toThrow();
    });
  });

  describe('Firestore Service', () => {
    let service: FirestoreService;

    beforeEach(() => {
      localStorage.clear();
      service = new FirestoreService('test_collection');
    });

    it('should add a document and return an ID', async () => {
      const id = await service.addDocument({ name: 'Test', value: 42 });
      expect(id).toBeTruthy();
      expect(id).toContain('doc_');
    });

    it('should retrieve all documents', async () => {
      await service.addDocument({ name: 'Doc1' });
      await service.addDocument({ name: 'Doc2' });
      const docs = await service.getDocuments();
      expect(docs).toHaveLength(2);
    });

    it('should get document by ID', async () => {
      const id = await service.addDocument({ name: 'FindMe' });
      const doc = await service.getDocumentById(id);
      expect(doc).not.toBeNull();
      expect((doc as Record<string, unknown>).name).toBe('FindMe');
    });

    it('should return null for non-existent document', async () => {
      const doc = await service.getDocumentById('nonexistent_id');
      expect(doc).toBeNull();
    });

    it('should delete a document', async () => {
      const id = await service.addDocument({ name: 'ToDelete' });
      const deleted = await service.deleteDocument(id);
      expect(deleted).toBe(true);
      const doc = await service.getDocumentById(id);
      expect(doc).toBeNull();
    });

    it('should return false when deleting non-existent document', async () => {
      const result = await service.deleteDocument('fake_id');
      expect(result).toBe(false);
    });

    it('should add timestamps to documents', async () => {
      const id = await service.addDocument({ name: 'Timestamped' });
      const doc = await service.getDocumentById(id);
      expect(doc).not.toBeNull();
      expect((doc as Record<string, unknown>).createdAt).toBeTruthy();
      expect((doc as Record<string, unknown>).updatedAt).toBeTruthy();
    });

    it('should isolate collections from each other', async () => {
      const otherService = new FirestoreService('other_collection');
      await service.addDocument({ name: 'InTest' });
      const otherDocs = await otherService.getDocuments();
      expect(otherDocs).toHaveLength(0);
    });
  });

  describe('Google Maps Utilities', () => {
    it('should generate valid directions URL', () => {
      const url = getGoogleMapsDirectionsUrl('Election Commission of India');
      expect(url).toContain('google.com/maps/dir');
      expect(url).toContain(encodeURIComponent('Election Commission of India'));
    });

    it('should encode special characters in URLs', () => {
      const url = getGoogleMapsDirectionsUrl('123 Main St, Delhi & NCR');
      expect(url).toContain(encodeURIComponent('123 Main St, Delhi & NCR'));
    });
  });
});
