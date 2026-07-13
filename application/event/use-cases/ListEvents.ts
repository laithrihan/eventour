import type { IEventRepository } from "@/domain/event/repositories/IEventRepository";
import { toEventDto } from "../mappers/toEventDto";
import type { EventDto } from "../dto/EventDto";

export function createListEvents(eventRepository: IEventRepository) {
  return async function listEvents(): Promise<EventDto[]> {
    const events = await eventRepository.findAll();
    return events.map(toEventDto);
  };
}
