import type { EventDto } from "@/application/event/dto/EventDto";
import EventCard from "./EventCard";

type EventListProps = {
  events: EventDto[];
  className?: string;
};

const EventList = ({ events}: EventListProps) => {
  if (!events.length) return null;

  return (
    <ul className="events list-none">
      {events.map((event) => (
        <li key={event.id}>
          <EventCard
            title={event.title}
            image={event.image}
            slug={event.slug}
            location={event.location}
            date={event.date}
            time={event.time}
          />
        </li>
      ))}
    </ul>
  );
};

export default EventList;
