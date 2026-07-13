import { Event } from "@/domain/event/entities/Event";
import type { EventModeValue } from "@/domain/event/value-objects/EventMode";
import type { EventDocument } from "../models/event.model";

type LeanEvent = {
  _id: { toString(): string };
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: EventModeValue;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export function toDomainEvent(
  doc: EventDocument | LeanEvent,
): Event {
  const id =
    typeof doc._id === "string" ? doc._id : doc._id.toString();

  return Event.reconstitute({
    id,
    title: doc.title,
    slug: doc.slug,
    description: doc.description,
    overview: doc.overview,
    image: doc.image,
    venue: doc.venue,
    location: doc.location,
    date: doc.date,
    time: doc.time,
    mode: doc.mode,
    audience: doc.audience,
    agenda: doc.agenda,
    organizer: doc.organizer,
    tags: doc.tags,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  });
}

export function toPersistenceEvent(event: Event) {
  const props = event.toProps();
  return {
    title: props.title,
    slug: props.slug,
    description: props.description,
    overview: props.overview,
    image: props.image,
    venue: props.venue,
    location: props.location,
    date: props.date,
    time: props.time,
    mode: props.mode,
    audience: props.audience,
    agenda: props.agenda,
    organizer: props.organizer,
    tags: props.tags,
  };
}
