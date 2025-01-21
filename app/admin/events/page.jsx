import { Suspense } from "react";
import { getArtists, getEvents } from "@/lib/api";
import { Users, Calendar, Search } from "lucide-react";
import AllEventOverview from "@/components/AllEventOverview";
import AllArtistOverview from "@/components/AllArtistOverview";

// Main Events Page Component
async function Events() {
  const [artists, events] = await Promise.all([getArtists(), getEvents()]);

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
          {/* <Suspense fallback={<div className="p-6">Loading artists...</div>}> */}
          <AllArtistOverview artists={artists} />
          {/* </Suspense> */}
        </section>

        {/* Events Section */}
        <section className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Events</h2>
          </div>
          <AllEventOverview events={events} />
        </section>
      </div>
    </div>
  );
}

export default Events;
