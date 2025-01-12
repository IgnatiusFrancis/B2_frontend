import SectionHeader from "@/components/SectionHeader";

import AllVideos from "@/components/AllVideos";
import { getTopArtists, getVideos } from "@/lib/api";
import SearchClient from "@/hooks/useSearch";

async function VideosHome() {
      const [videos, topArtists] = await Promise.all([
        getVideos(),
        getTopArtists(),
      ]);

  return (
    <>
      <SectionHeader title={"All videos"} desc={"some"} />

      <section className="w-full md:w-5/6 mx-auto py-4">
        <div className="p-6">
          <h1 className={` text-4xl font-bold`}>
            Find the most recent video release
          </h1>
          <p className={``}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum,
            consequatur.
          </p>
        </div>
      </section>

      <SearchClient
        data={videos}
        ContentContainer={AllVideos}
        searchFields={["title", "description", "subTitle"]}
        topArtists={topArtists} 
      />
    </>
  );
}
export default VideosHome;
