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
      <SectionHeader
        title={"All videos"}
        desc={
          "Experience the story in motion, watch, learn, and be inspired with our curated video highlights!"
        }
        bgWallpaper="/videosWallpaper.jpeg"
      />

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
