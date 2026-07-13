import type { Event } from "@/domain/event/entities/Event";
import type { EventDto } from "../dto/EventDto";

export function toEventDto(event: Event): EventDto {
  const id = event.id;
  if (!id) {
    throw new Error("Cannot map event without id to DTO");
  }

  return {
    id,
    title: event.title,
    slug: event.slug,
    description: event.description,
    overview: event.overview,
    image: event.image,
    venue: event.venue,
    location: event.location,
    date: event.date,
    time: event.time,
    mode: event.mode,
    audience: event.audience,
    agenda: event.agenda,
    organizer: event.organizer,
    tags: event.tags,
    createdAt: event.createdAt?.toISOString(),
    updatedAt: event.updatedAt?.toISOString(),
  };
}
