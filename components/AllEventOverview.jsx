"use client";

import { useMemo, useState } from "react";

import EventOverview from "@/components/EventOverview";
import NoContentAvailable from "./NoAvailableContent";
function AllEventOverview({events}) { 

  const eventsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalPages = Math.ceil(events.length / eventsPerPage);
  
    const currentEvents = useMemo(() => {
      const indexOfLastEvents = currentPage * eventsPerPage;
      const indexOfFirstEvents = indexOfLastEvents - eventsPerPage;
      return events.slice(indexOfFirstEvents, indexOfLastEvents);
    }, [currentPage, events]);

    if (!events || events.length === 0) {
      return (
        <NoContentAvailable
          title="No events Found"
          message="It seems there are no events available at the moment. Please check back later."
        />
      );
    }


  return (
    <>
      <div className="w-full">
        <div className="w-full">
          {currentEvents?.map((event) => (
            <EventOverview key={event.id} {...event} />
          ))}
        </div>
        <div className="flex justify-center mt-4 gap-2">
        {totalPages > 1 && ( 
        <div className="flex justify-center py-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2 ${
                currentPage === index + 1 ? "bg-gray-100" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-primarycolor text-white px-4 py-2 rounded-md ml-2"
          >
            Next
          </button>
        </div>
      )}
        </div>
      </div>
    </>
  );
}

export default AllEventOverview;
