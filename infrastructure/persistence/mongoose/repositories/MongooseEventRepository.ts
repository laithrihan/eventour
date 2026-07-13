import type { Event } from "@/domain/event/entities/Event";
import type { IEventRepository } from "@/domain/event/repositories/IEventRepository";
import connectDB from "@/infrastructure/persistence/mongodb";
import EventModel from "../models/event.model";
import { toDomainEvent, toPersistenceEvent } from "../mappers/event.mapper";

export class MongooseEventRepository implements IEventRepository {
  async findAll(): Promise<Event[]> {
    await connectDB();
    const docs = await EventModel.find().sort({ createdAt: -1 }).lean();
    return docs.map((doc) => toDomainEvent(doc));
  }

  async findBySlug(slug: string): Promise<Event | null> {
    await connectDB();
    const doc = await EventModel.findOne({ slug }).select("-__v").lean();
    return doc ? toDomainEvent(doc) : null;
  }

  async findById(id: string): Promise<Event | null> {
    await connectDB();
    const doc = await EventModel.findById(id).select("-__v").lean();
    return doc ? toDomainEvent(doc) : null;
  }

  async save(event: Event): Promise<Event> {
    await connectDB();
    const payload = toPersistenceEvent(event);

    if (event.id) {
      const updated = await EventModel.findByIdAndUpdate(event.id, payload, {
        new: true,
        runValidators: true,
      }).lean();

      if (!updated) {
        throw new Error(`Failed to update event ${event.id}`);
      }

      return toDomainEvent(updated);
    }

    const created = await EventModel.create(payload);
    return toDomainEvent(created.toObject());
  }

  async findSimilarByTags(excludeId: string, tags: string[]): Promise<Event[]> {
    await connectDB();
    const docs = await EventModel.find({
      _id: { $ne: excludeId },
      tags: { $in: tags },
    }).lean();

    return docs.map((doc) => toDomainEvent(doc));
  }
}
