import SectionHeader from "@/components/SectionHeader";
import { FaSearch } from "react-icons/fa";

import axios from "axios";
import AllEvent from "@/components/AllEvents";

function UpcomingEvent() {
  return (
    <>
      <SectionHeader
        title={"Events Listings"}
        desc={"Find the latest events that suits your interest"}
      />

      <section className="w-full md:w-5/6 mx-auto p-4">
        <div className="flex gap-4 w-full">
          <div className="md:w-4/6 rounded-full flex items-center z-10 border">
            <input
              type="text"
              placeholder="Search here"
              className={`  w-11/12 bg-transparent p-4 text-white outline-none `}
            />
            <button className="rounded-full text-white bg-primarycolor flex items-center md:text-base text-[12px] py-2 gap-1 px-4 mr-2">
              <FaSearch /> Search
            </button>
          </div>

          <div className="w-2/6 p-4 bg-transparent outline-none border rounded-lg">
            <select
              name=""
              id=""
              className="w-full bg-transparent outline-none"
            >
              <option value="">Filter</option>
              <option value="">Realesed Date</option>
              <option value="">Artist</option>
            </select>
          </div>
        </div>
      </section>
      <section className="p-4 md:w-5/6 md:p-20 mx-auto flex flex-col md:gap-10 gap-4">
        <div>
          <AllEvent />
        </div>
      </section>
    </>
  );
}
export default UpcomingEvent;
