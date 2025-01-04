
import SectionHeader from "@/components/SectionHeader";
import { fetchMovie } from "@/lib/api";
import SingleMovie from "@/components/SingleMovie";


export default async function SinglePageSeries({ params }) { 
  const { movieid } = params;
 
  const movie = await fetchMovie(movieid); 

  return (
    <>
      <SectionHeader 
        title={"Cinema City"}
        desc={
          "🎥 Stream & Download Your Favorites: Discover the ultimate movie haven where streaming meets downloading. Enjoy seamless access to the latest and greatest films anytime, anywhere! 🍿✨"
        }
        bgWallpaper="/moviesWallpaper.webp"
      />
      <SingleMovie movie={movie} /> 
    </>
  );
}