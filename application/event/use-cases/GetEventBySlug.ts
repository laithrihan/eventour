import { NotFoundError } from "@/domain/shared/errors/DomainError";
import { Slug } from "@/domain/event/value-objects/Slug";
import type { IEventRepository } from "@/domain/event/repositories/IEventRepository";
import { toEventDto } from "../mappers/toEventDto";
import type { EventDto } from "../dto/EventDto";

export function createGetEventBySlug(eventRepository: IEventRepository) {
  return async function getEventBySlug(rawSlug: string): Promise<EventDto> {
    const slug = Slug.parse(rawSlug);
    const event = await eventRepository.findBySlug(slug.value);

    if (!event) {
      throw new NotFoundError(`Event with slug "${slug.value}" not found`);
    }

    return toEventDto(event);
  };
}
