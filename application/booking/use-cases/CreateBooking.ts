import { Booking } from "@/domain/booking/entities/Booking";
import type { IBookingRepository } from "@/domain/booking/repositories/IBookingRepository";
import type { IEventRepository } from "@/domain/event/repositories/IEventRepository";
import { NotFoundError } from "@/domain/shared/errors/DomainError";
import type { BookingDto } from "../dto/BookingDto";

export type CreateBookingCommand = {
  eventId: string;
  email: string;
};

export function createCreateBooking(
  bookingRepository: IBookingRepository,
  eventRepository: IEventRepository,
) {
  return async function createBooking(
    command: CreateBookingCommand,
  ): Promise<{ success: true; booking: BookingDto } | { success: false }> {
    try {
      const event = await eventRepository.findById(command.eventId);
      if (!event) {
        throw new NotFoundError(`Event with ID ${command.eventId} does not exist`);
      }

      const booking = Booking.create({
        eventId: command.eventId,
        email: command.email,
      });

      const saved = await bookingRepository.create(booking);

      return {
        success: true,
        booking: {
          id: saved.id!,
          eventId: saved.eventId,
          email: saved.email,
          createdAt: saved.createdAt?.toISOString(),
          updatedAt: saved.updatedAt?.toISOString(),
        },
      };
    } catch (error) {
      console.error("create booking failed", error);
      return { success: false };
    }
  };
}

