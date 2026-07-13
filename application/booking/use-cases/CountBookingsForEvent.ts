import type { IBookingRepository } from "@/domain/booking/repositories/IBookingRepository";

export function createCountBookingsForEvent(
  bookingRepository: IBookingRepository,
) {
  return async function countBookingsForEvent(eventId: string): Promise<number> {
    return bookingRepository.countByEventId(eventId);
  };
}
