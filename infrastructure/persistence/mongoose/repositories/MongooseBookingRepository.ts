import type { Booking } from "@/domain/booking/entities/Booking";
import type { IBookingRepository } from "@/domain/booking/repositories/IBookingRepository";
import connectDB from "@/infrastructure/persistence/mongodb";
import BookingModel from "../models/booking.model";
import {
  toDomainBooking,
  toPersistenceBooking,
} from "../mappers/booking.mapper";

export class MongooseBookingRepository implements IBookingRepository {
  async create(booking: Booking): Promise<Booking> {
    await connectDB();
    const created = await BookingModel.create(toPersistenceBooking(booking));
    return toDomainBooking(created.toObject());
  }

  async countByEventId(eventId: string): Promise<number> {
    await connectDB();
    return BookingModel.countDocuments({ eventId });
  }

  async findById(id: string): Promise<Booking | null> {
    await connectDB();
    const doc = await BookingModel.findById(id).lean();
    return doc ? toDomainBooking(doc) : null;
  }
}
