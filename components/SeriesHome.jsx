// app/components/MoviesHome.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import pld from "@/public/pld.jpeg";

export default function AllSeriesHome({ series: movieSeries }) {
  if (!movieSeries || movieSeries.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          SERIES
        </h2>
        <Link
          href="/series-movies"
          className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 
                     transition-all duration-300 backdrop-blur-sm border border-gray-700/50"
        >
          <span className="text-gray-300 group-hover:text-purple-400 transition-colors">
            Load More
          </span>
          <ArrowRight
            className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors 
                                transform group-hover:translate-x-1 duration-300"
          />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movieSeries.slice(0, 10).map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </section>
  );
}

// Extracted MovieCard component for reuse
function MovieCard({ movie, index }) {
  return (
    <div
      className="group relative bg-gray-800/50 rounded-xl overflow-hidden
                hover:scale-105 transition-all duration-300 backdrop-blur-sm
                shadow-xl animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Link href={`/movies-menu/${movie.id}`}>
        <div className="aspect-[2/3] relative overflow-hidden">
          <Image
            src={movie.imageUrl || pld}
            alt={movie.title}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p
                className="text-white font-bold text-lg transform translate-y-full
                          group-hover:translate-y-0 transition-transform duration-300"
              >
                View Details
              </p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3
            className="text-gray-200 font-semibold text-center group-hover:text-purple-400
                       transition-colors duration-300"
          >
            {movie.title}
          </h3>
        </div>
      </Link>
    </div>
  );
}
