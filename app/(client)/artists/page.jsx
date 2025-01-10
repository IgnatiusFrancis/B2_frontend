import AllArtists from "@/components/AllArtists";
import SectionHeader from "@/components/SectionHeader";
import SearchComponent from "@/hooks/useSearchArtist";
import { getArtists } from "@/lib/api";

async function Artists() {
  const artists = await getArtists();

  return (
    <>
      <SectionHeader
        title={"Your Favourtite Artist: The Sound of Your Soul"}
        desc={
          "Experience music that connects, inspires, and stays with you long after the last note fades."
        }
      />

      <section className="w-full md:w-5/6 mx-auto py-10 px-8">
        <div>
          <h1
            className={`md:text-left text-center text-lg md:text-2xl font-bold`}
          >
            Find the most recent music release
          </h1>
          <p className={` text-center md:text-left`}>
            Discover the rhythm that moves you{" "}
          </p>
        </div>
      </section>

      <SearchComponent
        data={artists}
        ContentContainer={AllArtists}
        searchFields={["bio", "name"]}
      />
    </>
  );
}

export default Artists;
