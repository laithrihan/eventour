import { SimilarEventsMatcher } from "@/domain/event/services/SimilarEventsMatcher";
import type { IEventRepository } from "@/domain/event/repositories/IEventRepository";
import { toEventDto } from "../mappers/toEventDto";
import type { EventDto } from "../dto/EventDto";

/**
 * Returns similar events by shared tags. If the source slug does not exist,
 * returns [] instead of throwing so UI sections stay empty rather than failing.
 */
export function createGetSimilarEvents(eventRepository: IEventRepository) {
  return async function getSimilarEvents(slug: string): Promise<EventDto[]> {
    const source = await eventRepository.findBySlug(slug);

    if (!SimilarEventsMatcher.shouldSearch(source) || !source.id) {
      return [];
    }

    const similar = await eventRepository.findSimilarByTags(
      source.id,
      source.tags,
    );

    return similar.map(toEventDto);
  };
}
