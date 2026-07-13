import { Event } from "@/domain/event/entities/Event";
import type { IEventRepository } from "@/domain/event/repositories/IEventRepository";
import type { IImageUploader } from "@/application/ports/IImageUploader";
import { ValidationError } from "@/domain/shared/errors/DomainError";
import { toEventDto } from "../mappers/toEventDto";
import type { EventDto } from "../dto/EventDto";

export type CreateEventCommand = {
  title: string;
  description: string;
  overview: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  organizer: string;
  tags: string[];
  agenda: string[];
  imageBuffer: Buffer;
};

/**
 * Creates an event: upload image first (external side-effect), then build a
 * validated domain Event and persist. Domain rules run before the DB write so
 * invalid payloads never reach persistence.
 */
export function createCreateEvent(
  eventRepository: IEventRepository,
  imageUploader: IImageUploader,
) {
  return async function createEvent(
    command: CreateEventCommand,
  ): Promise<EventDto> {
    if (!command.imageBuffer?.length) {
      throw new ValidationError("Image file is required");
    }

    const { url } = await imageUploader.upload(command.imageBuffer, "DevEvent");

    const event = Event.create({
      title: command.title,
      description: command.description,
      overview: command.overview,
      image: url,
      venue: command.venue,
      location: command.location,
      date: command.date,
      time: command.time,
      mode: command.mode,
      audience: command.audience,
      agenda: command.agenda,
      organizer: command.organizer,
      tags: command.tags,
    });

    const saved = await eventRepository.save(event);
    return toEventDto(saved);
  };
}
