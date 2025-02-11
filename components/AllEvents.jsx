// "use client";

// import { useState, useMemo } from "react";
// import EventTicket from "./EventTicket";
// import NoContentAvailable from "./NoAvailableContent";
// import { motion } from "framer-motion";

// function AllEvent({ data: allEvents = [] }) {
//   const eventsPerPage = 8;
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(allEvents.length / eventsPerPage);

//   const currentEvents = useMemo(() => {
//     const indexOfLastEvent = currentPage * eventsPerPage;
//     const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
//     return allEvents.slice(indexOfFirstEvent, indexOfLastEvent);
//   }, [currentPage, allEvents]);

//   if (!allEvents || allEvents.length === 0) {
//     return (
//       <NoContentAvailable
//         title="No Events Found"
//         message="There are no events available at the moment. Please check back later."
//       />
//     );
//   }

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
//   };

//   return (
//     <div className="w-full pb-6">
//       <div className="w-[90%] p-3 md:w-5/6 mx-auto flex flex-col gap-4">
//         {currentEvents.map((event, index) => (
//           <motion.div
//             key={event.id}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//               duration: 0.6,
//               delay: index * 0.1, // Stagger the animation for each card
//               type: "spring",
//               stiffness: 100,
//             }}
//           >
//             <EventTicket
//               key={event.id}
//               id={event.id}
//               title={event.title}
//               url={event.url}
//               location={event.location}
//               date={event.date}
//             />
//           </motion.div>
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <div className="flex justify-center items-center gap-2 mt-4 px-4">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="border text-[10px] md:text-base border-gray-500 text-gray-500 px-2 md:px-4 md:py-2 rounded-md
//               hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             Previous
//           </button>

//           <div className="flex gap-1">
//             {Array.from({ length: totalPages }).map((_, index) => {
//               const pageNumber = index + 1;
//               // Show first page, last page, current page, and one page before and after current
//               const shouldShow =
//                 pageNumber === 1 ||
//                 pageNumber === totalPages ||
//                 Math.abs(pageNumber - currentPage) <= 1;

//               if (!shouldShow) {
//                 if (
//                   pageNumber === currentPage - 2 ||
//                   pageNumber === currentPage + 2
//                 ) {
//                   return (
//                     <span key={index} className="px-2">
//                       ...
//                     </span>
//                   );
//                 }
//                 return null;
//               }

//               return (
//                 <button
//                   key={index}
//                   onClick={() => handlePageChange(pageNumber)}
//                   className={`border border-gray-500 text-[10px] md:text-base px-3 md:px-4 md:py-2 rounded-md
//                     hover:bg-gray-50 transition-colors
//                     ${
//                       currentPage === pageNumber
//                         ? "bg-gray-100 font-medium"
//                         : "text-gray-500"
//                     }`}
//                 >
//                   {pageNumber}
//                 </button>
//               );
//             })}
//           </div>

//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="bg-primarycolor text-white text-[10px] md:text-base px-2 md:px-4 md:py-2 rounded-md
//               hover:bg-primarycolor/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AllEvent;

"use client";

import { useState, useMemo } from "react";
import EventTicket from "./EventTicket";
import { motion } from "framer-motion";

function AllEvent({ data: allEvents = [] }) {
  const eventsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allEvents.length / eventsPerPage);

  const currentEvents = useMemo(() => {
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    return allEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  }, [currentPage, allEvents]);

  if (!allEvents || allEvents.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-8 bg-gray-900/50 rounded-xl backdrop-blur-sm">
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-bold text-gray-200">No Events Found</h3>
          <p className="text-gray-400 max-w-md">
            There are no events available at the moment. Please check back
            later.
          </p>
        </div>
      </div>
    );
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  return (
    <div className="w-full pb-12">
      <div className="w-[95%] lg:w-5/6 mx-auto space-y-6">
        {currentEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <EventTicket
              key={event.id}
              id={event.id}
              title={event.title}
              url={event.url}
              location={event.location}
              date={event.date}
            />
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8 px-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 bg-gray-800/50 text-gray-200 px-4 py-2.5 rounded-lg
              hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
              text-sm md:text-base backdrop-blur-sm border border-gray-700"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              const shouldShow =
                pageNumber === 1 ||
                pageNumber === totalPages ||
                Math.abs(pageNumber - currentPage) <= 1;

              if (!shouldShow) {
                if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <span key={index} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              }

              return (
                <button
                  key={index}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg
                    transition-all duration-300 text-sm md:text-base
                    ${
                      currentPage === pageNumber
                        ? "bg-primary text-white font-medium"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
                    }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg
              hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
              text-sm md:text-base"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default AllEvent;
