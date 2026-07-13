import { ValidationError } from "../../shared/errors/DomainError";
import { EventMode, type EventModeValue } from "../value-objects/EventMode";
import { Slug } from "../value-objects/Slug";

export type EventProps = {
  id?: string;
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

export type CreateEventInput = {
  title: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
};

/**
 * Normalizes clock times to HH:MM (24h).
 * Examples: "9:05 AM" → "09:05", "12:00 PM" → "12:00", "12:30 AM" → "00:30"
 */
function normalizeTime(timeString: string): string {
  const timeRegex = /^(\d{1,2}):(\d{2})(\s*(AM|PM))?$/i;
  const match = timeString.trim().match(timeRegex);

  if (!match) {
    throw new ValidationError("Invalid time format. Use HH:MM or HH:MM AM/PM");
  }

  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[4]?.toUpperCase();

  if (period) {
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
  }

  if (hours < 0 || hours > 23 || parseInt(minutes, 10) < 0 || parseInt(minutes, 10) > 59) {
    throw new ValidationError("Invalid time values");
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

function normalizeDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new ValidationError("Invalid date format");
  }
  return date.toISOString().split("T")[0];
}

export class Event {
  private constructor(private readonly props: EventProps) {}

  static create(input: CreateEventInput): Event {
    const title = input.title.trim();
    if (!title || title.length > 100) {
      throw new ValidationError("Title is required and cannot exceed 100 characters");
    }

    const description = input.description.trim();
    if (!description || description.length > 1000) {
      throw new ValidationError(
        "Description is required and cannot exceed 1000 characters",
      );
    }

    const overview = input.overview.trim();
    if (!overview || overview.length > 500) {
      throw new ValidationError(
        "Overview is required and cannot exceed 500 characters",
      );
    }

    if (!input.image?.trim()) {
      throw new ValidationError("Image URL is required");
    }

    if (!input.venue?.trim()) {
      throw new ValidationError("Venue is required");
    }

    if (!input.location?.trim()) {
      throw new ValidationError("Location is required");
    }

    if (!input.audience?.trim()) {
      throw new ValidationError("Audience is required");
    }

    if (!input.organizer?.trim()) {
      throw new ValidationError("Organizer is required");
    }

    if (!input.agenda?.length) {
      throw new ValidationError("At least one agenda item is required");
    }

    if (!input.tags?.length) {
      throw new ValidationError("At least one tag is required");
    }

    const mode = EventMode.create(input.mode);
    const slug = Slug.fromTitle(title);

    return new Event({
      title,
      slug: slug.value,
      description,
      overview,
      image: input.image.trim(),
      venue: input.venue.trim(),
      location: input.location.trim(),
      date: normalizeDate(input.date),
      time: normalizeTime(input.time),
      mode: mode.value,
      audience: input.audience.trim(),
      agenda: input.agenda.map((item) => item.trim()).filter(Boolean),
      organizer: input.organizer.trim(),
      tags: input.tags.map((tag) => tag.trim()).filter(Boolean),
    });
  }

  /** Rehydrate from persistence without re-running create-time normalization. */
  static reconstitute(props: EventProps): Event {
    if (!props.id) {
      throw new ValidationError("Persisted event must have an id");
    }
    return new Event(props);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get slug(): string {
    return this.props.slug;
  }

  get description(): string {
    return this.props.description;
  }

  get overview(): string {
    return this.props.overview;
  }

  get image(): string {
    return this.props.image;
  }

  get venue(): string {
    return this.props.venue;
  }

  get location(): string {
    return this.props.location;
  }

  get date(): string {
    return this.props.date;
  }

  get time(): string {
    return this.props.time;
  }

  get mode(): EventModeValue {
    return this.props.mode;
  }

  get audience(): string {
    return this.props.audience;
  }

  get agenda(): string[] {
    return this.props.agenda;
  }

  get organizer(): string {
    return this.props.organizer;
  }

  get tags(): string[] {
    return this.props.tags;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  toProps(): EventProps {
    return { ...this.props, agenda: [...this.props.agenda], tags: [...this.props.tags] };
  }
}
