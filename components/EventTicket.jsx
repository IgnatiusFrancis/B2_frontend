// "use client";
// import Link from "next/link";
// import pld from "@/public/pld.jpeg";
// import Image from "next/image";

// function EventTicket({ id, title, url, location, date }) {
//   // Format date and time
//   const formattedDate = new Date(date);
//   const dateString = formattedDate.toLocaleDateString("en-US", {
//     weekday: "long",
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
//   const timeString = formattedDate.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });

//   return (
//     <Link
//       prefetch={true}
//       key={id}
//       href={`upcomingevents/${id}`}
//       className="hover:scale-105 hover:shadow-xl transition-all duration-500 bg-white rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-6 justify-between items-center cursor-pointer"
//     >
//       {/* Image Section - Fixed Size for Small Screens */}
//       <div className="w-full md:w-[250px] h-[150px] md:h-[120px] relative flex-shrink-0">
//         <Image
//           src={url ? url : pld}
//           width={1000}
//           height={1000}
//           alt={title}
//           className="w-full h-full object-cover rounded-xl border-r-4 border-primarycolor"
//         />
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
//       </div>

//       {/* Event Details */}
//       <div className="flex flex-col gap-4 w-full">
//         <div className="flex flex-wrap gap-4 text-gray-600">
//           <p className="text-sm md:text-base font-semibold w-full sm:w-[48%] md:w-2/5">
//             <span className="font-semibold">Event:</span> {title}
//           </p>
//           <p className="text-sm md:text-base font-semibold w-full sm:w-[48%] md:w-2/5">
//             <span className="font-semibold">Date:</span> {dateString}
//           </p>
//           <p className="text-sm md:text-base font-semibold w-full sm:w-[48%] md:w-2/5">
//             <span className="font-semibold">Time:</span> {timeString}
//           </p>
//           <p className="text-sm md:text-base text-primarycolor font-bold w-full sm:w-[48%] md:w-1/5">
//             <span className="font-semibold">Location:</span> {location}
//           </p>
//         </div>

//         {/* Button - Aligned Properly */}
//         <div className="flex justify-start md:justify-end w-full">
//           <Link
//             href={`/upcomingevents/${id}`}
//             className="text-[16px] px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-semibold shadow-md transition-all hover:bg-primarycolor/90"
//           >
//             View
//           </Link>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default EventTicket;

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
    <Link
      prefetch={true}
      key={id}
      href={`upcomingevents/${id}`}
      className="group block bg-white hover:bg-gray-50 rounded-lg p-3 md:p-4 
        shadow-sm hover:shadow-md transition-all duration-300 
        transform hover:-translate-y-0.5"
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
        {/* Image Section - More Compact */}
        <div className="w-full sm:w-[140px] h-[120px] sm:h-[90px] relative rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={url ? url : pld}
            width={1000}
            height={1000}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-purple-600 via-pink-500 to-orange-500" />
        </div>

        {/* Content Section - More Compact */}
        <div className="flex-1 min-w-0">
          {" "}
          {/* min-w-0 helps with text truncation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {/* Title */}
            <div className="sm:col-span-2">
              <h3 className="text-gray-900 font-semibold text-sm sm:text-base line-clamp-1">
                {title}
              </h3>
            </div>

            {/* Date and Time */}
            <div className="flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs text-gray-600">{dateString}</p>
            </div>

            {/* Time */}
            <div className="flex items-center gap-2">
              <svg
                className="w-3.5 h-3.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xs text-gray-600">{timeString}</p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 sm:col-span-2">
              <svg
                className="w-3.5 h-3.5 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-xs font-medium text-purple-600 line-clamp-1">
                {location}
              </p>
            </div>
          </div>
          {/* View Button - More Compact */}
          <div className="flex justify-end mt-3">
            <div className="relative inline-flex group-hover:shadow-sm">
              <div
                className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 
                rounded-md opacity-50 group-hover:opacity-70 transition duration-300"
              ></div>
              <button className="relative px-3 py-1.5 bg-white rounded-md text-xs font-medium text-gray-900">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventTicket;
