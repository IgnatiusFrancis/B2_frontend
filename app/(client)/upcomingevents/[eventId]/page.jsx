
// app/events/[eventId]/page.js
import SingleEventClient from "@/components/SingleEventClient";
import { getEvent, getTopArtists } from "@/lib/api";


async function SingleEventPage({ params }) {
  try {
    const { eventId } = params;
    const [event, topArtists] = await Promise.all([   
      getEvent(eventId),
      getTopArtists(),
    ]);

    return (
      <SingleEventClient 
        event={event} 
        topArtists={topArtists}
      />
    );
  } catch (error) {
    console.error("Error loading event data:", error);
    return (
      <div className="w-full text-center py-10">
        <p>Error loading event data. Please try again later.</p>
      </div>
    );
  }
}

export default SingleEventPage;