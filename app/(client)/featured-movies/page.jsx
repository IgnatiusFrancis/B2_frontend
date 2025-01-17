// app/(client)/movieshome/page.jsx
import SectionHeader from "@/components/SectionHeader";
import { fetchMovies } from "@/lib/api";
import UseSearchMovies from "@/hooks/useMovieSearch";
import AllMoviesPage from "@/components/AllMovies";

export default async function AllMovies() {
  const allMovies = await fetchMovies(1, 300, "SINGLE");
  const series = allMovies.SINGLE;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <SectionHeader
        title="Cinema City"
        desc="🎥 Stream & Download Your Favorites: Discover the ultimate movie haven where streaming meets downloading. Enjoy seamless access to the latest and greatest films anytime, anywhere! 🍿✨"
        bgWallpaper="/moviesWallpaper.webp"
      />

      <section className="relative -mt-20 w-full lg:w-5/6 mx-auto px-4 py-6 z-10">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            🔍 Find Your Favorites
          </h1>
          <p className="text-gray-300 mt-2">
            Search for movies, shows, and more to start your next binge-worthy
            adventure!
          </p>
        </div>
      </section>

      <UseSearchMovies
        data={series}
        ContentContainer={AllMoviesPage}
        searchFields={["title"]}
      />
    </div>
  );
}
