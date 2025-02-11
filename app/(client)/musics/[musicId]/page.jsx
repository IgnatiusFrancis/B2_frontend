import SingleSongPageComponent from "@/components/SingleSongPageComponent";
import { getAudio, getTopArtists } from "@/lib/api";

export default async function SingleSongPage({ params }) {
  const { musicId } = params;

  const [audio, topArtists] = await Promise.all([
    getAudio(musicId),
    getTopArtists(),
  ]);

  return <SingleSongPageComponent audio={audio} topArtists={topArtists} />;
}
