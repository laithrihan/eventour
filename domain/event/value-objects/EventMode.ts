import { ValidationError } from "../../shared/errors/DomainError";

export const EVENT_MODES = ["online", "offline", "hybrid"] as const;
export type EventModeValue = (typeof EVENT_MODES)[number];

export class EventMode {
  private constructor(readonly value: EventModeValue) {}

  static create(raw: string): EventMode {
    const normalized = raw.trim().toLowerCase();

    if (!EVENT_MODES.includes(normalized as EventModeValue)) {
      throw new ValidationError(
        "Mode must be either online, offline, or hybrid",
      );
    }

    return new EventMode(normalized as EventModeValue);
  }
}
