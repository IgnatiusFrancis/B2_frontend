// app/components/SearchMoviesClient.jsx
"use client";

import { useState, useTransition } from "react";
import AllMoviesHome from "./MoviesHome";
//import AllSeriesHome from "./SeriesHome";
import Image from "next/image";
import { Search, Loader2 } from "lucide-react";
import AllSeasonalHome from "./AllSeasonalHome";
import pld from "@/public/pld.jpeg";

export default function SearchMoviesClient({ movies, seasonal }) {
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSearch = (query) => {
    setSearchQuery(query);
    startTransition(() => {
      if (!query) {
        setSearchResults(null);
        return;
      }

      const results = [
        ...movies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        ),
        // ...series.filter((serie) =>
        //   serie.title.toLowerCase().includes(query.toLowerCase())
        // ),
        ...seasonal.filter((seasonal) =>
          seasonal.title.toLowerCase().includes(query.toLowerCase())
        ),
      ];

      setSearchResults(results.length > 0 ? results : null);
    });
  };

  return (
    <div className="w-full lg:w-5/6 mx-auto px-4 py-6">
      {/* Search Input */}
      <div className="relative max-w-3xl mx-auto mb-12 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isPending ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          placeholder="Search for movies or series..."
          className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl 
                   focus:ring-2 focus:ring-purple-500 focus:border-transparent
                   transition-all duration-300 placeholder-gray-400
                   backdrop-blur-lg shadow-xl"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-xl 
                      group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className="space-y-12">
        {searchResults ? (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-gray-200">
              {`Search Results for "${searchQuery}"`}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {searchResults.map((item) => (
                <SearchResultCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-16 animate-fadeIn">
            <AllMoviesHome movies={movies} />
            {/* <AllSeriesHome series={series} /> */}
            <AllSeasonalHome seasonal={seasonal} />
          </div>
        )}
      </div>
    </div>
  );
}

// Search Result Card Component
function SearchResultCard({ item }) {
  return (
    <div
      className="group relative bg-gray-800/50 rounded-xl overflow-hidden hover:scale-105 
                    transition-all duration-300 backdrop-blur-sm shadow-xl"
    >
      <div className="aspect-[2/3] relative">
        <Image
          src={item.seasons?.[0]?.episodes?.imageKey || item.imageUrl || pld}
          alt={item.title}
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full 
                    group-hover:translate-y-0 transition-transform duration-300"
      >
        <div className="bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg">
          <h3 className="font-bold text-white mb-2">{item.title}</h3>
          <p className="text-sm text-gray-300 line-clamp-2">
            {item.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 bg-purple-500/20 rounded-full text-purple-200">
              {item.genre}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
