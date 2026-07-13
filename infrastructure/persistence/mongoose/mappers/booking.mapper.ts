import { Booking } from "@/domain/booking/entities/Booking";
import type { BookingDocument } from "../models/booking.model";

type LeanBooking = {
  _id: { toString(): string };
  eventId: { toString(): string };
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export function toDomainBooking(doc: BookingDocument | LeanBooking): Booking {
  const id =
    typeof doc._id === "string" ? doc._id : doc._id.toString();
  const eventId =
    typeof doc.eventId === "string" ? doc.eventId : doc.eventId.toString();

  return Booking.reconstitute({
    id,
    eventId,
    email: doc.email,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  });
}

export function toPersistenceBooking(booking: Booking) {
  return {
    eventId: booking.eventId,
    email: booking.email,
  };
}
