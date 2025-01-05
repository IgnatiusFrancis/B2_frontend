"use client";
import Event from "./Event";
import CategoriesHeading from "./CategoriesHeading";
import Link from "next/link";

async function HomeEvents({events}) {
  if (!events || events.length === 0) {
    return (
      <div>
        <p className="text-gray-500 font-bold">No Events Available</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <CategoriesHeading title="Upcoming Events" />
        <div className="w-full flex justify-center flex-col">
          <div className="flex w-full flex-col gap-4 my-4">
            {events.slice(0, 3).map((event) => (
              <Event
                key={event.id}
                id={event.id}
                title={event.title}
                image={event.image}
                location={event.location}
                date={event.date}
              />
            ))}
          </div>
          <Link
            href="/upcomingevents"
            className="text-primarycolor font-bold text-center cursor-pointer"
          >
            Read More
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomeEvents;
