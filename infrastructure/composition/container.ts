import { createListEvents } from "@/application/event/use-cases/ListEvents";
import { createGetEventBySlug } from "@/application/event/use-cases/GetEventBySlug";
import { createCreateEvent } from "@/application/event/use-cases/CreateEvent";
import { createGetSimilarEvents } from "@/application/event/use-cases/GetSimilarEvents";
import { createCreateBooking } from "@/application/booking/use-cases/CreateBooking";
import { createCountBookingsForEvent } from "@/application/booking/use-cases/CountBookingsForEvent";
import { MongooseEventRepository } from "@/infrastructure/persistence/mongoose/repositories/MongooseEventRepository";
import { MongooseBookingRepository } from "@/infrastructure/persistence/mongoose/repositories/MongooseBookingRepository";
import { CloudinaryImageUploader } from "@/infrastructure/storage/CloudinaryImageUploader";

function buildContainer() {
  const eventRepository = new MongooseEventRepository();
  const bookingRepository = new MongooseBookingRepository();
  const imageUploader = new CloudinaryImageUploader();

  return {
    listEvents: createListEvents(eventRepository),
    getEventBySlug: createGetEventBySlug(eventRepository),
    createEvent: createCreateEvent(eventRepository, imageUploader),
    getSimilarEvents: createGetSimilarEvents(eventRepository),
    createBooking: createCreateBooking(bookingRepository, eventRepository),
    countBookingsForEvent: createCountBookingsForEvent(bookingRepository),
  };
}

export type AppContainer = ReturnType<typeof buildContainer>;

let container: AppContainer | null = null;

export function getContainer(): AppContainer {
  if (!container) {
    container = buildContainer();
  }
  return container;
}
