"use client";

import { useState, useMemo } from "react";
import EventTicket from "./EventTicket";
import NoContentAvailable from "./NoAvailableContent";
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
      <NoContentAvailable
        title="No Events Found"
        message="There are no events available at the moment. Please check back later."
      />
    );
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  return (
    <div className="w-full pb-6">
      <div className="w-[90%] p-3 md:w-5/6 mx-auto flex flex-col gap-4">
        {currentEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1, // Stagger the animation for each card
              type: "spring",
              stiffness: 100,
            }}
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
        <div className="flex justify-center items-center gap-2 mt-4 px-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border text-[10px] md:text-base border-gray-500 text-gray-500 px-2 md:px-4 md:py-2 rounded-md 
              hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              // Show first page, last page, current page, and one page before and after current
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
                    <span key={index} className="px-2">
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
                  className={`border border-gray-500 text-[10px] md:text-base px-3 md:px-4 md:py-2 rounded-md
                    hover:bg-gray-50 transition-colors
                    ${
                      currentPage === pageNumber
                        ? "bg-gray-100 font-medium"
                        : "text-gray-500"
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
            className="bg-primarycolor text-white text-[10px] md:text-base px-2 md:px-4 md:py-2 rounded-md
              hover:bg-primarycolor/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default AllEvent;
