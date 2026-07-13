import EventList from "@/components/events/EventList";
import ExploreBtn from "@/components/layout/ExploreBtn";
import { getContainer } from "@/infrastructure/composition/container";
import { cacheLife } from "next/cache";

const page = async () => {
  "use cache";
  cacheLife("minutes");

  const { listEvents } = getContainer();
  const events = await listEvents();

  return (
    <section>
      <h1 className="text-center">
        The Hub for all Dev Events <br /> Events can&apos;t miss
      </h1>
      <p className="text-center mt-5">
        Hackathons , Meetups and Conferences, all in one place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <EventList events={events} />
      </div>
    </section>
  );
};

export default page;
