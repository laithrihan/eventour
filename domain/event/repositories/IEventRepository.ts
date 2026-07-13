import type { Event } from "../entities/Event";

export interface IEventRepository {
  findAll(): Promise<Event[]>;
  findBySlug(slug: string): Promise<Event | null>;
  findById(id: string): Promise<Event | null>;
  save(event: Event): Promise<Event>;
  findSimilarByTags(excludeId: string, tags: string[]): Promise<Event[]>;
}
