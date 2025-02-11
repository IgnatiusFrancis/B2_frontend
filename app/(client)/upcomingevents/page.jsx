// // Parent Component (UpcomingEvent)
// import SectionHeader from "@/components/SectionHeader";
// import AllEvent from "@/components/AllEvents";
// import { getEvents } from "@/lib/api";
// import SearchComponent from "@/hooks/useSearchArtist";

// export default async function UpcomingEvent() {
//   const allEvents = await getEvents();

//   return (
//     <>
//       <SectionHeader
//         title={"Upcoming Events"}
//         desc={
//           "Experience unforgettable moments with a curated selection of live performances, workshops, and cultural events. From intimate acoustic sessions to grand concerts, find your next memorable experience here."
//         }
//         bgWallpaper="/eventWallpaper.jpg"
//       />

//       <div className="bg-gradient-to-b from-gray-900 to-black">
//         <section className="w-full md:w-5/6 mx-auto py-10 px-8">
//           <div>
//             <h1
//               className={`md:text-left text-center text-lg md:text-2xl font-bold text-gray-200`}
//             >
//               Your Gateway to Extraordinary Experiences
//             </h1>
//             <p className={`text-center md:text-left text-white`}>
//               Where every event tells a unique story
//             </p>
//           </div>
//         </section>

//         <SearchComponent
//           data={allEvents}
//           ContentContainer={AllEvent}
//           searchFields={["title", "subTitle"]}
//         />
//       </div>
//     </>
//   );
// }

import SectionHeader from "@/components/SectionHeader";
import AllEvent from "@/components/AllEvents";
import { getEvents } from "@/lib/api";
import SearchComponent from "@/hooks/useSearchArtist";

export default async function UpcomingEvent() {
  const allEvents = await getEvents();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <SectionHeader
        title={"Upcoming Events"}
        desc={
          "Experience unforgettable moments with a curated selection of live performances, workshops, and cultural events. From intimate acoustic sessions to grand concerts, find your next memorable experience here."
        }
        bgWallpaper="/eventWallpaper.jpg"
      />

      <section className="w-full relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-black pointer-events-none" />

        <div className="relative w-full lg:w-5/6 mx-auto py-16 px-4 lg:px-8">
          {/* <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
              Your Gateway to Extraordinary Experiences
            </h1>
            <p className="text-gray-400 text-sm md:text-base lg:text-lg">
              Where every event tells a unique story
            </p>
          </div> */}

          <div className="relative z-10 backdrop-blur-md bg-gray-900/30 rounded-2xl p-6 shadow-xl border border-gray-800">
            <SearchComponent
              data={allEvents}
              ContentContainer={AllEvent}
              searchFields={["title", "subTitle"]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
