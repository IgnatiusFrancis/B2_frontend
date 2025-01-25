"use client";
import Link from "next/link";
import pld from "@/public/pld.jpeg";
import Image from "next/image";

function EventTicket({ id, title, url, location, date }) {
  // Format date and time
  const formattedDate = new Date(date);
  const dateString = formattedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeString = formattedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <>
      <Link
        prefetch={true}
        key={id}
        href={`upcomingevents/${id}`}
        className="hover:scale-105 hover:shadow-xl transition-all duration-500 bg-white rounded-xl p-4 md:p-0 md:flex gap-6 justify-between items-center cursor-pointer relative overflow-hidden"
      >
        <div className="flex gap-6 items-center w-full">
          <div className="w-[250px] h-[120px] hidden md:block relative flex-shrink-0">
            <Image
              src={url ? url : pld}
              width={1000}
              height={1000}
              alt={title}
              className="w-full h-full object-cover rounded-tl-xl rounded-bl-xl border-r-4 border-primarycolor "
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Flex container to spread the event details */}
          <div className="flex flex-col gap-4 w-full md:w-4/6">
            {/* Event Title */}

            <div className="flex gap-4 text-gray-600 justify-between">
              {/* Event Date */}
              <p className="text-sm md:text-base font-semibold w-full md:w-2/5">
                <span className="font-semibold">Date:</span> {title}
              </p>

              <p className="text-sm md:text-base font-semibold w-full md:w-2/5">
                <span className="font-semibold">Date:</span> {dateString}
              </p>
              {/* Event Time */}
              <p className="text-sm md:text-base font-semibold w-full md:w-2/5">
                <span className="font-semibold">Time:</span> {timeString}
              </p>
              {/* Event Location */}
              <p className="text-sm md:text-base text-primarycolor font-bold w-full md:w-1/5">
                <span className="font-semibold">Location:</span> {location}
              </p>
            </div>
          </div>
        </div>

        {/* Adjust the button container */}
        <div className="md:p-4 px-4 mt-4 md:mt-0 flex justify-end">
          <Link
            href={`/upcomingevents/${id}`}
            className="text-[16px] px-6 py-3 rounded-lg md:py-4 md:px-8  bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-semibold shadow-md transition-all hover:bg-primarycolor/90"
          >
            View
          </Link>
        </div>
      </Link>
    </>
  );
}

export default EventTicket;
