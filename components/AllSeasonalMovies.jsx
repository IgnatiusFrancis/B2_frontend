"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MovieCard } from "./MovieCard";
import { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function AllSeasonalMovies({ data: movies = [] }) {
  const dataPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(movies.length / dataPerPage);

  const currentmovies = useMemo(() => {
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    return movies.slice(indexOfFirstData, indexOfLastData);
  }, [currentPage, movies]);
  return (
    <div className="w-full lg:w-5/6 mx-auto px-4 py-6">
      <div className="mb-8">
        <Link
          href="/movieshome"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50  
                     hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm 
                     border border-gray-700/50 mb-6"
        >
          <ArrowLeft
            className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors 
                               transform group-hover:-translate-x-1 duration-300"
          />
          <span className="text-gray-300 group-hover:text-purple-400 transition-colors">
            Back to Home
          </span>
        </Link>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          SEASONAL
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {currentmovies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 p-4">
        <button
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "border border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
