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
          "🎶 Dive into the rhythm! Discover beats, melodies, and tracks that move your soul in our music haven. Let the sound take you away!"
        }
        bgWallpaper="/artistWallpaper.jpeg"
      />

      <div className="bg-gradient-to-b from-gray-900 to-black">
        <section className="w-full md:w-5/6 mx-auto py-10 px-8">
          <div>
            <h1
              className={`md:text-left text-center text-lg md:text-2xl font-bold text-gray-200`}
            >
              Find the most recent music release
            </h1>
            <p className={` text-center md:text-left text-gray-200`}>
              Discover the rhythm that moves you{" "}
            </p>
          </div>
        </section>

        <SearchComponent
          data={audios}
          ContentContainer={AllMusic}
          searchFields={["title", "subTitle"]}
        />
      </div>
    </>
  );
}

export default Musics;
