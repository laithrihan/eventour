import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getContainer } from "@/infrastructure/composition/container";
import {
  NotFoundError,
  ValidationError,
} from "@/domain/shared/errors/DomainError";
import { cacheLife } from "next/cache";
import type { EventDto } from "@/application/event/dto/EventDto";
import EventDetails from "@/components/events/EventDetails";

async function loadEventPageData(slug: string): Promise<{
  event: EventDto;
  similarEvents: EventDto[];
  bookingCount: number;
} | null> {
  "use cache";
  cacheLife("hours");

  const { getEventBySlug, getSimilarEvents, countBookingsForEvent } =
    getContainer();

  try {
    const event = await getEventBySlug(slug);
    const [similarEvents, bookingCount] = await Promise.all([
      getSimilarEvents(slug),
      countBookingsForEvent(event.id),
    ]);

    return { event, similarEvents, bookingCount };
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof ValidationError) {
      return null;
    }
    console.error("Error loading event:", error);
    return null;
  }
}

async function EventDetailsLoader({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await loadEventPageData(slug);

  if (!data) {
    return notFound();
  }

  return (
    <EventDetails
      event={data.event}
      similarEvents={data.similarEvents}
      bookingCount={data.bookingCount}
    />
  );
}

const EventDetailsPage = ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetailsLoader params={params} />
      </Suspense>
    </main>
  );
};

export default EventDetailsPage;
