import SectionHeader from "@/components/SectionHeader";
import { fetchSeriesData } from "@/lib/api";
import SeriesEpisodesPage from "@/components/SeriesEpisodesPage";

export default async function SeriesEpisode({ params }) {
  const { episodeid } = params;

  const series = await fetchSeriesData(episodeid);

  return (
    <>
      <SectionHeader
        title={"Cinema City"}
        desc={
          "🎥 Stream & Download Your Favorites: Discover the ultimate movie haven where streaming meets downloading. Enjoy seamless access to the latest and greatest films anytime, anywhere! 🍿✨"
        }
        bgWallpaper="/moviesWallpaper.webp"
      />
      <SeriesEpisodesPage series={series} />
    </>
  );
}
