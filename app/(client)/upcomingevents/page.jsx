
"use client";
// Parent Component (UpcomingEvent)
import SectionHeader from "@/components/SectionHeader";
import { FaSearch } from "react-icons/fa";
import AllEvent from "@/components/AllEvents";
import { getEvents } from "@/lib/api"; 

export default async function UpcomingEvent() {
  const allEvents = await getEvents(); 

  return (
    <>
      <SectionHeader
        title={"Events Listings"} 
        desc={"Find the latest events that suit your interest"}
      />

      <section className="w-full md:w-5/6 mx-auto p-4">
        <div className="flex gap-4 w-full">
          <div className="md:w-4/6 rounded-full flex items-center z-10 border">
            <input
              type="text"
              placeholder="Search here"
              className="w-11/12 bg-transparent p-4 text-white outline-none"
            />
            <button className="rounded-full text-white bg-primarycolor flex items-center md:text-base text-[12px] py-2 gap-1 px-4 mr-2">
              <FaSearch /> Search
            </button>
          </div>
        </div>
      </section>

      <section className="p-4 md:w-5/6 md:p-20 mx-auto flex flex-col md:gap-10 gap-4">
       
        <AllEvent allEvents={allEvents} />
      </section>
    </>
  );
}
