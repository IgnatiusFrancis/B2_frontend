import AllMusic from "@/components/AllMusic";
import SectionHeader from "@/components/SectionHeader";
import SearchComponent from "@/hooks/useSearchArtist";
import { getAudios } from "@/lib/api";

async function Musics() {
  const audios = await getAudios();

  return (
    <>
      <SectionHeader
        title={"Musics"}
        desc={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates suscipit labore eaque ducimus qui corporis expedita, quis possimus et corrupti."
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
        data={audios}
        ContentContainer={AllMusic}
        searchFields={["title", "description", "subTitle"]}
      />
    </>
  );
}

export default Musics;
