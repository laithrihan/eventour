import type { Booking } from "../entities/Booking";

export interface IBookingRepository {
  create(booking: Booking): Promise<Booking>;
  countByEventId(eventId: string): Promise<number>;
  findById(id: string): Promise<Booking | null>;
}
