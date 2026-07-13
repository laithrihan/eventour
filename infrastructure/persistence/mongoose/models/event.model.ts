import { Schema, model, models, type Document } from "mongoose";
import type { EventModeValue } from "@/domain/event/value-objects/EventMode";

/** Persistence document shape — domain rules live in domain/Event, not here. */
export interface EventDocument extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    slug: { type: String, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    overview: { type: String, required: true, trim: true, maxlength: 500 },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    mode: {
      type: String,
      required: true,
      enum: ["online", "offline", "hybrid"],
    },
    audience: { type: String, required: true, trim: true },
    agenda: { type: [String], required: true },
    organizer: { type: String, required: true, trim: true },
    tags: { type: [String], required: true },
  },
  { timestamps: true },
);

EventSchema.index({ slug: 1 }, { unique: true });
EventSchema.index({ date: 1, mode: 1 });

const EventModel =
  models.Event || model<EventDocument>("Event", EventSchema);

export default EventModel;
