// Parent Component (UpcomingEvent)
import SectionHeader from "@/components/SectionHeader";
import AllEvent from "@/components/AllEvents";
import { getEvents } from "@/lib/api";
import SearchComponent from "@/hooks/useSearchArtist";

export default async function UpcomingEvent() {
  const allEvents = await getEvents();

  return (
    <>
      <SectionHeader
        title={"Upcoming Events"}
        desc={
          "Experience unforgettable moments with a curated selection of live performances, workshops, and cultural events. From intimate acoustic sessions to grand concerts, find your next memorable experience here."
        }
        bgWallpaper="/eventWallpaper.jpg"
      />

      <div className="bg-gradient-to-b from-gray-900 to-black">
        <section className="w-full md:w-5/6 mx-auto py-10 px-8">
          <div>
            <h1
              className={`md:text-left text-center text-lg md:text-2xl font-bold text-gray-200`}
            >
              Your Gateway to Extraordinary Experiences
            </h1>
            <p className={`text-center md:text-left text-white`}>
              Where every event tells a unique story
            </p>
          </div>
        </section>

        <SearchComponent
          data={allEvents}
          ContentContainer={AllEvent}
          searchFields={["title", "subTitle"]}
        />
      </div>
    </>
  );
}
