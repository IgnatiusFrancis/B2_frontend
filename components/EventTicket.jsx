"use client";
import Link from "next/link";
import pld from "@/public/pld.jpeg";
function EventTicket({ id, title, url, location, date }) {
 
  return (
    <>
      <Link
        prefetch={true}
        key={id}
        href={`upcomingevents/${id}`}
        className={`hover:bg-gray-200 hover:font-bold hover:text-primarycolor transition-all duration-500 bg-white rounded-xl p-4 md:p-0 md:flex gap-6 justify-between items-center  cursor-pointer`}
      >
        <div className="flex gap-6 items-center">
          <div className="w-[250px] h-[120px] hidden md:block">
            <url
              src={url ? url : pld}
              width={1000}
              height={1000}
              alt="alb"
              className="w-full h-full object-cover rounded-tl-xl rounded-bl-xl border-r-4 border-primarycolor "
            />
          </div>

          <div className="p-4 md:py-4 ">
            <p className={` md:text-xl `}>{title}</p>

            <div className="flex gap-4">
              <h1 className={` md:text-base text-[11px]`}>
                Date: {date.split("T")[0]}
              </h1>
            </div>

            <h1
              className={` md:text-base text-[11px] text-primarycolor font-bold`}
            >
              Location: {location}
            </h1>
          </div>
        </div>
        <div className="md:p-4 px-4">
          <Link
            href={`/upcomingevents/${id}`}
            className="text-[14px] px-3 py-2 rounded-lg md:py-4 md:px-8 bg-primarycolor text-white"
          >
            View Event
          </Link>
        </div>
      </Link>
    </>
  );
}

export default EventTicket;
