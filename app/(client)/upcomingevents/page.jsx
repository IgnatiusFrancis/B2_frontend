// import SectionHeader from "@/components/SectionHeader";
// import { FaSearch } from "react-icons/fa";


// import AllEvent from "@/components/AllEvents";
// import { getEvents } from "@/lib/api";

// async function UpcomingEvent() {
//   const events = await getEvents(1); 
 
//   return (
//     <>
//       <SectionHeader
//         title={"Events Listings"}
//         desc={"Find the latest events that suits your interest"}
//       />

//       <section className="w-full md:w-5/6 mx-auto p-4">
//         <div className="flex gap-4 w-full">
//           <div className="md:w-4/6 rounded-full flex items-center z-10 border">
//             <input
//               type="text"
//               placeholder="Search here"
//               className={`  w-11/12 bg-transparent p-4 text-white outline-none `}
//             />
//             <button className="rounded-full text-white bg-primarycolor flex items-center md:text-base text-[12px] py-2 gap-1 px-4 mr-2">
//               <FaSearch /> Search
//             </button>
//           </div>

//           {/* <div className="w-2/6 p-4 bg-transparent outline-none border rounded-lg">
//             <select
//               name=""
//               id=""
//               className="w-full bg-transparent outline-none"
//             >
//               <option value="">Filter</option>
//               <option value="">Realesed Date</option>
//               <option value="">Artist</option>
//             </select>
//           </div> */}
//         </div>
//       </section>
//       <section className="p-4 md:w-5/6 md:p-20 mx-auto flex flex-col md:gap-10 gap-4">
//         <div>
//         <AllEvent events={events} currentPage={currentPage} />
//         </div>
//       </section>
//     </>
//   );
// }
// export default UpcomingEvent;

// import { useState } from 'react';
// import SectionHeader from "@/components/SectionHeader";
// import { FaSearch } from "react-icons/fa";
// import AllEvent from "@/components/AllEvents";
// import { getEvents } from "@/lib/api";

// async function UpcomingEvent({ initialPage = 1 }) {
//   const [currentPage, setCurrentPage] = useState(initialPage); // Manage currentPage state

//   // Fetch events based on currentPage
//   const events = await getEvents(currentPage);

//   // Callback to update currentPage
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };
//   return (
//     <>
//       <SectionHeader
//         title={"Events Listings"}
//         desc={"Find the latest events that suit your interest"}
//       />

//       <section className="w-full md:w-5/6 mx-auto p-4">
//         <div className="flex gap-4 w-full">
//           <div className="md:w-4/6 rounded-full flex items-center z-10 border">
//             <input
//               type="text"
//               placeholder="Search here"
//               className="w-11/12 bg-transparent p-4 text-white outline-none"
//             />
//             <button className="rounded-full text-white bg-primarycolor flex items-center md:text-base text-[12px] py-2 gap-1 px-4 mr-2">
//               <FaSearch /> Search
//             </button>
//           </div>
//         </div>
//       </section>

//       <section className="p-4 md:w-5/6 md:p-20 mx-auto flex flex-col md:gap-10 gap-4">
//       <AllEvent events={events} currentPage={currentPage} onPageChange={handlePageChange} />
//       </section>
//     </>
//   );
// }

// export default UpcomingEvent;

// Parent Component (UpcomingEvent)
import SectionHeader from "@/components/SectionHeader";
import { FaSearch } from "react-icons/fa";
import AllEvent from "@/components/AllEvents";
import { getEvents } from "@/lib/api"; // Function to fetch all events

export default async function UpcomingEvent() {
  const allEvents = await getEvents(); // Fetch all events from the server (no pagination here)

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
        {/* Pass all events to AllEvent */}
        <AllEvent allEvents={allEvents} />
      </section>
    </>
  );
}

// This component will be server-rendered
// import SectionHeader from "@/components/SectionHeader";
// import { FaSearch } from "react-icons/fa";
// import AllEvent from "@/components/AllEvents";
// import { getEvents } from "@/lib/api"; // Assuming you have a function to fetch events

// export default async function UpcomingEvent({ searchParams }) {
//   const page = searchParams?.page || 1; // Get currentPage from query params
//   const initialEvents = await getEvents(page); // Fetch events from the server

//   return (
//     <>
//       <SectionHeader
//         title={"Events Listings"}
//         desc={"Find the latest events that suit your interest"}
//       />

//       <section className="w-full md:w-5/6 mx-auto p-4">
//         <div className="flex gap-4 w-full">
//           <div className="md:w-4/6 rounded-full flex items-center z-10 border">
//             <input
//               type="text"
//               placeholder="Search here"
//               className="w-11/12 bg-transparent p-4 text-white outline-none"
//             />
//             <button className="rounded-full text-white bg-primarycolor flex items-center md:text-base text-[12px] py-2 gap-1 px-4 mr-2">
//               <FaSearch /> Search
//             </button>
//           </div>
//         </div>
//       </section>

//       <section className="p-4 md:w-5/6 md:p-20 mx-auto flex flex-col md:gap-10 gap-4">
//         {/* Pass events, currentPage, and onPageChange to AllEvent */}
//         <AllEvent
//           events={initialEvents}
//           currentPage={page}
//         />
//       </section>
//     </>
//   );
// }
