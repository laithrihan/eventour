import type { Event } from "../entities/Event";

/**
 * Pure similarity rule: share at least one tag with the source event,
 * and never include the source itself. Returns [] when the source is missing
 * so callers do not need null-guards around tag queries.
 */
export class SimilarEventsMatcher {
  static shouldSearch(source: Event | null): source is Event {
    return source !== null && source.tags.length > 0;
  }

  static filterCandidates(source: Event, candidates: Event[]): Event[] {
    const tagSet = new Set(source.tags);
    return candidates.filter(
      (candidate) =>
        candidate.id !== source.id &&
        candidate.tags.some((tag) => tagSet.has(tag)),
    );
  }
}
