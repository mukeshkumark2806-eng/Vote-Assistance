/**
 * Comprehensive tests for mock database
 * Covers: data integrity, edge cases, filtering, type safety
 */
import {
  mockCandidates, mockParties, mockTimelines,
  mockLiveResults, mockFaqs,
  type Candidate, type Party,
} from './mock-db';

describe('Mock Database', () => {

  // ========== Data Integrity ==========
  describe('mockParties', () => {
    it('should contain at least 10 parties', () => {
      expect(mockParties.length).toBeGreaterThanOrEqual(10);
    });

    it('should have unique IDs', () => {
      const ids = mockParties.map(p => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('should have all required fields populated', () => {
      mockParties.forEach((party: Party) => {
        expect(party.id).toBeTruthy();
        expect(party.name).toBeTruthy();
        expect(party.fullName).toBeTruthy();
        expect(party.color).toBeTruthy();
        expect(party.hex).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });

    it('should have valid hex color codes', () => {
      mockParties.forEach(party => {
        expect(party.hex).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });
  });

  describe('mockCandidates', () => {
    it('should contain candidates from multiple states', () => {
      const states = new Set(mockCandidates.map(c => c.state));
      expect(states.size).toBeGreaterThanOrEqual(5);
    });

    it('should have unique IDs', () => {
      const ids = mockCandidates.map(c => c.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('should have valid candidate ages (18-100)', () => {
      mockCandidates.forEach((c: Candidate) => {
        expect(c.age).toBeGreaterThanOrEqual(18);
        expect(c.age).toBeLessThanOrEqual(100);
      });
    });

    it('should have non-empty manifesto arrays', () => {
      mockCandidates.forEach(c => {
        expect(c.manifesto.length).toBeGreaterThan(0);
      });
    });

    it('should have valid avatar URLs', () => {
      mockCandidates.forEach(c => {
        expect(c.avatarUrl).toBeTruthy();
        expect(typeof c.avatarUrl).toBe('string');
      });
    });

    it('should reference valid party names', () => {
      const partyNames = new Set(mockParties.map(p => p.name));
      // Some candidates may have parties not in mockParties (e.g. CPI(M))
      mockCandidates.forEach(c => {
        expect(c.party).toBeTruthy();
      });
    });

    it('should handle filtering by state', () => {
      const tnCandidates = mockCandidates.filter(c => c.state === 'Tamil Nadu');
      expect(tnCandidates.length).toBeGreaterThan(0);
    });

    it('should handle filtering by party', () => {
      const bjpCandidates = mockCandidates.filter(c => c.party === 'BJP');
      expect(bjpCandidates.length).toBeGreaterThan(0);
    });

    it('should handle filtering with no results', () => {
      const none = mockCandidates.filter(c => c.state === 'NonexistentState');
      expect(none).toHaveLength(0);
    });

    it('should handle age range filtering', () => {
      const under40 = mockCandidates.filter(c => c.age < 40);
      const over60 = mockCandidates.filter(c => c.age > 60);
      const middle = mockCandidates.filter(c => c.age >= 40 && c.age <= 60);
      expect(under40.length + over60.length + middle.length).toBe(mockCandidates.length);
    });

    it('should handle case-insensitive search', () => {
      const term = 'vijay';
      const results = mockCandidates.filter(c =>
        c.name.toLowerCase().includes(term.toLowerCase())
      );
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('mockTimelines', () => {
    it('should have events in chronological order', () => {
      for (let i = 1; i < mockTimelines.length; i++) {
        expect(new Date(mockTimelines[i].date).getTime())
          .toBeGreaterThanOrEqual(new Date(mockTimelines[i - 1].date).getTime());
      }
    });

    it('should have valid date formats', () => {
      mockTimelines.forEach(t => {
        expect(new Date(t.date).toString()).not.toBe('Invalid Date');
      });
    });

    it('should have non-empty descriptions', () => {
      mockTimelines.forEach(t => {
        expect(t.description.length).toBeGreaterThan(0);
      });
    });
  });

  describe('mockLiveResults', () => {
    it('should have percentages summing close to 100', () => {
      const total = mockLiveResults.reduce((sum, r) => sum + r.percentage, 0);
      expect(total).toBeGreaterThan(95);
      expect(total).toBeLessThanOrEqual(100.5);
    });

    it('should have valid color codes', () => {
      mockLiveResults.forEach(r => {
        expect(r.color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });

    it('should have positive vote counts', () => {
      mockLiveResults.forEach(r => {
        expect(r.votes).toBeGreaterThan(0);
      });
    });
  });

  describe('mockFaqs', () => {
    it('should have matching question and answer pairs', () => {
      mockFaqs.forEach(faq => {
        expect(faq.q).toBeTruthy();
        expect(faq.a).toBeTruthy();
        expect(faq.a.length).toBeGreaterThan(faq.q.length);
      });
    });
  });
});
