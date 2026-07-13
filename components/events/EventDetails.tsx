import Image from "next/image";
import type { EventDto } from "@/application/event/dto/EventDto";
import BookEvent from "@/components/booking/BookEvent";
import EventMetaRow from "./EventMetaRow";
import EventList from "./EventList";

type EventDetailsProps = {
  event: EventDto;
  similarEvents: EventDto[];
  bookingCount: number;
};

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventDetails = ({
  event,
  similarEvents,
  bookingCount,
}: EventDetailsProps) => {
  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    venue,
    mode,
    agenda,
    audience,
    tags,
    organizer,
  } = event;

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>

      <div className="details">
        <div className="content">
          <Image
            src={image}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventMetaRow
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventMetaRow icon="/icons/clock.svg" alt="clock" label={time} />
            <EventMetaRow icon="/icons/pin.svg" alt="pin" label={location} />
            <EventMetaRow icon="/icons/pin.svg" alt="venue" label={venue} />
            <EventMetaRow icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventMetaRow
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda agendaItems={agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookingCount > 0 ? (
              <p className="text-sm">
                Join {bookingCount} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}

            <BookEvent eventId={event.id} />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <EventList events={similarEvents} className="events" />
      </div>
    </section>
  );
};

export default EventDetails;
