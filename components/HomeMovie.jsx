import React from "react";
import TrendingMovies from "./TrendingMovies";

const HomeMovie = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return (
      <div>
        <p className="text-gray-500 font-bold">No movies Available</p>
      </div>
    );
  }

  return <TrendingMovies movies={movies} />;
};

export default HomeMovie;
