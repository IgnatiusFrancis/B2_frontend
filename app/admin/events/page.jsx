// import AllArtistOverview from "@/components/AllArtistOverview";
// import AllEventOverview from "@/components/AllEventOverview";
// import { getArtists, getEvents } from "@/lib/api";

// async function Events() {
   
//         const [artists, events] = await Promise.all([ 
//           getArtists(),
//           getEvents(),
//         ]);
//   return (
//     <>
//       <div className="p-2 w-full flex flex-col gap-2 md:w-10/12">
//         <h1 className="text-xl ">Artists & Events</h1>
//         <div className="min-h-72">
//           <div className="w-full p-2 flex border border-gray-100 rounded-se rounded-ss">
//             <div className="w-7/12">
//               <h1 className={` text-xs`}>Artist</h1>
//             </div>
//             <h1 className={` w-3/12 text-xs`}>Date</h1>

//             <h1 className={` w-2/12 text-xs`}>Action</h1>
//           </div>

//           <AllArtistOverview artists={artists}/> 
//         </div>

//         <div>
//           <div className="w-full p-2  border border-gray-100 rounded-se rounded-ss">
//             <div className="w-full flex">
//               <div className="w-7/12">
//                 <h1 className={` text-xs`}>Events</h1>
//               </div>
//               <h1 className={` w-3/12 text-xs`}>Date</h1>
//               <h1 className={` w-2/12 text-xs`}>Action</h1>
//             </div>
//           </div>
//           <AllEventOverview events={events}/>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Events;




"use client";
import { Suspense } from 'react';
import { getArtists, getEvents } from "@/lib/api";
import { Users, Calendar, Search } from 'lucide-react';
import AllEventOverview from '@/components/AllEventOverview';
import AllArtistOverview from '@/components/AllArtistOverview';

// Main Events Page Component
async function Events() {
  const [artists, events] = await Promise.all([
    getArtists(),
    getEvents(),
  ]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Artists & Events</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{artists.length} Artists</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{events.length} Events</span>
          </div>
        </div>
      </header>

      <div className="grid gap-8">
        {/* Artists Section */}
        <section className="bg-white rounded-lg shadow"> 
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Artists</h2>
          </div>
          <Suspense fallback={<div className="p-6">Loading artists...</div>}>
            <AllArtistOverview artists={artists} />
          </Suspense>
        </section>

        {/* Events Section */}
        <section className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Events</h2>
          </div>
          <Suspense fallback={<div className="p-6">Loading events...</div>}>
            <AllEventOverview events={events} />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

export default Events;