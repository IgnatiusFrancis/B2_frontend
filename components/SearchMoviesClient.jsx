// // "use client";
// // import { useState } from "react";

// // export default function SearchMoviesClient({ initialMovies }) {
// //   const [searchResults, setSearchResults] = useState(initialMovies);

// //   const handleSearch = async (query) => {
// //     const response = await fetch(`/api/movies/search?q=${query}`);
// //     const data = await response.json();
// //     setSearchResults(data.movies);
// //   };

// //   const handleClearSearch = () => setSearchResults(initialMovies);

// //   return (
// //     <>
// //       <div className="p-4">
// //         <input
// //           type="text"
// //           placeholder="Search movies..."
// //           onChange={(e) => handleSearch(e.target.value)}
// //           className="w-full border rounded p-2"
// //         />
// //         <button onClick={handleClearSearch} className="mt-2 text-blue-500">
// //           Clear Search
// //         </button>
// //       </div>

// //       <section className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 py-8">
// //         {searchResults.map((movie) => (
// //           <div key={movie.id} className="border rounded-md overflow-hidden">
// //             <img
// //               src={movie.posterUrl || "/placeholder.png"}
// //               alt={movie.title}
// //               className="w-full h-48 object-cover"
// //             />
// //             <div className="px-2 py-3">
// //               <h3 className="text-center font-medium">{movie.title}</h3>
// //               <p className="text-sm text-gray-600 truncate">
// //                 {movie.description}
// //               </p>
// //             </div>
// //           </div>
// //         ))}
// //       </section>
// //     </>
// //   );
// // }



// "use client";

// import { useState } from "react";
// import AllMoviesHome from "./MoviesHome";
// import AllSeriesHome from "./SeriesHome";

// export default function SearchMoviesClient({ movies, series }) {
//   const [searchResults, setSearchResults] = useState(null);
//   // console.log("movies:",movies )
//   // console.log("series:",series )
//   const handleSearch = (query) => {
//     console.log("Query:", query)
//     console.log("movies:",movies )
//     console.log("series:",series )
//     if (!query) {
//       setSearchResults(null); // Clear search results
//       return;
//     }
//     console.log("Query:", query)

//     // Search movies and series based on query
//     const results = [
//       ...movies.filter((movie) =>
//         movie.title.toLowerCase().includes(query.toLowerCase())
//       ),
//       ...series.filter((serie) =>
//         serie.title.toLowerCase().includes(query.toLowerCase())
//       ),
//     ];

//     setSearchResults(results.length > 0 ? results : null);
//   };
// console.log("searchResults:",searchResults )
//   return (
//     <div className="w-[90%] md:w-5/6 mx-auto py-6">
//       {/* Search Input */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="Search for movies or series data..."
//           className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//           onChange={(e) => {
//             console.log("Input Value:", e.target.value);
//             handleSearch(e.target.value);
//           }}
//         />
//       </div>

//       {/* Conditional Rendering */}
      
//       {searchResults ? (
//         // Render search results
//         <section className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4">
//           {searchResults.map((item) => (
//             <div key={item.id} className="border rounded-md overflow-hidden">
//               <div className="h-48 bg-gray-200">
//                 <img
//                   src={
//                     item.seasons?.[0]?.episodes?.[0]?.posterUrl?.url ||
//                     item.key ||
//                     "/placeholder.png"
//                   }
//                   alt={item.title}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <div className="px-2 py-3">
//                 <h3 className="text-center font-medium">{item.title}</h3>
//                 <p className="text-sm text-gray-600 truncate">
//                   {item.description}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Genre: {item.genre.join(", ")}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Language: {item.language}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </section>
//       ) : (
//         // Render default movies and series 
//         <>       
//        <AllMoviesHome movies={movies} /> 
//       <AllSeriesHome series={series} /> 
//         </>
//       )}
    
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import AllMoviesHome from "./MoviesHome";
import AllSeriesHome from "./SeriesHome";

export default function SearchMoviesClient({ movies, series }) {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = (query) => {
    if (!query) {
      setSearchResults(null); // Clear search results
      return;
    }

    // Search movies and series based on query
    const results = [
      ...movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      ),
      ...series.filter((serie) =>
        serie.title.toLowerCase().includes(query.toLowerCase())
      ),
    ];

    setSearchResults(results.length > 0 ? results : null);
  };

  return (
    <div className="w-[90%] md:w-5/6 mx-auto py-6">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for movies or series..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Conditional Rendering */}
      {searchResults ? (
        // Render search results
        <section className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4">
          {searchResults.map((item) => (
            <div key={item.id} className="border rounded-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img
                  src={
                    item.seasons?.[0]?.episodes?.[0]?.posterUrl?.url ||
                    item.key ||
                    "/placeholder.png"
                  }
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="px-2 py-3">
                <h3 className="text-center font-medium">{item.title}</h3>
                <p className="text-sm text-gray-600 truncate">
                  {item.description}
                </p>
                <p className="text-xs text-gray-500">
                  Genre: {item.genre.join(", ")}
                </p>
                <p className="text-xs text-gray-500">
                  Language: {item.language}
                </p>
              </div>
            </div>
          ))}
        </section>
      ) : (
        // Render default movies and series
        <>
          {/* <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Movies</h2>
            <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4">
              {movies.map((movie) => (
                <div key={movie.id} className="border rounded-md overflow-hidden">
                  <div className="h-48 bg-gray-200">
                    <img
                      src={
                        movie.seasons?.[0]?.episodes?.[0]?.posterUrl?.url ||
                        movie.key ||
                        "/placeholder.png"
                      }
                      alt={movie.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="px-2 py-3">
                    <h3 className="text-center font-medium">{movie.title}</h3>
                    <p className="text-sm text-gray-600 truncate">
                      {movie.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Series</h2>
            <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4">
              {series.map((serie) => (
                <div key={serie.id} className="border rounded-md overflow-hidden">
                  <div className="h-48 bg-gray-200">
                    <img
                      src={
                        serie.seasons?.[0]?.episodes?.[0]?.posterUrl?.url ||
                        serie.key ||
                        "/placeholder.png"
                      }
                      alt={serie.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="px-2 py-3">
                    <h3 className="text-center font-medium">{serie.title}</h3>
                    <p className="text-sm text-gray-600 truncate">
                      {serie.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section> */}

<AllMoviesHome movies={movies} /> 
<AllSeriesHome series={series} /> 
        </>
      )}
    </div>
  );
}
