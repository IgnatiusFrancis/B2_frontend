// app/(client)/movieshome/page.jsx
import SectionHeader from "@/components/SectionHeader";
import AllMoviesHome from "@/components/MoviesHome";
import AllSeriesHome from "@/components/SeriesHome";
import SearchMoviesClient from "@/components/SearchMoviesClient";
import { getMovies } from "@/lib/api";

export default async function MoviesHome() {
  // Fetch all movies and series data on the server

  const allMovies = await getMovies();

  // Separate movies and series based on their type
  const movies = allMovies.filter((movie) => movie.type === "SINGLE");
  const series = allMovies.filter((movie) => movie.type === "SEASONAL");

  return (
    <>
      <SectionHeader
        title="Cinema City"
        desc="🎥 Stream & Download Your Favorites: Discover the ultimate movie haven where streaming meets downloading. Enjoy seamless access to the latest and greatest films anytime, anywhere! 🍿✨"
        bgWallpaper="/moviesWallpaper.webp"
      />
      <section className="w-full md:w-5/6 mx-auto py-4">
        <div className="p-6">
          <h1 className="text-4xl font-bold">🔍 Find Your Favorites:</h1>
          <p className="text-gray-700">
            Search for movies, shows, and more to start your next binge-worthy
            adventure!
          </p>
        </div>
      </section>

      {/* SearchMoviesClient handles conditional rendering */}
      <SearchMoviesClient movies={movies} series={series} />

      {/* Server-Side Components */}
      {/* <AllMoviesHome movies={movies} /> 
      <AllSeriesHome series={series} />  */}
    </>
  );
}
