import AllSeriesPage from "@/components/AllSeriesPage";
import SectionHeader from "@/components/SectionHeader";
import { fetchMovie } from "@/lib/api";

export default async function SingleSeasonPageSeries({ params }) {
  const { seriesseason } = params;

  const movie = await fetchMovie(seriesseason);
  return (
    <>
      <SectionHeader
        title="Cinema City"
        desc="🎥 Stream & Download Your Favorites: Discover the ultimate movie haven where streaming meets downloading. Enjoy seamless access to the latest and greatest films anytime, anywhere! 🍿✨"
        bgWallpaper="/moviesWallpaper.webp"
      />
      <AllSeriesPage movie={movie.movie} />
    </>
  );
}
