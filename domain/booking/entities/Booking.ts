import { ValidationError } from "../../shared/errors/DomainError";
import { Email } from "../../shared/value-objects/Email";

export type BookingProps = {
  id?: string;
  eventId: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateBookingInput = {
  eventId: string;
  email: string;
};

export class Booking {
  private constructor(private readonly props: BookingProps) {}

  static create(input: CreateBookingInput): Booking {
    if (!input.eventId?.trim()) {
      throw new ValidationError("Event ID is required");
    }

    const email = Email.create(input.email);

    return new Booking({
      eventId: input.eventId.trim(),
      email: email.value,
    });
  }

  static reconstitute(props: BookingProps): Booking {
    if (!props.id) {
      throw new ValidationError("Persisted booking must have an id");
    }
    return new Booking(props);
  }

  get id(): string | undefined {
    return this.props.id;
  }

  get eventId(): string {
    return this.props.eventId;
  }

  get email(): string {
    return this.props.email;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  toProps(): BookingProps {
    return { ...this.props };
  }
}
