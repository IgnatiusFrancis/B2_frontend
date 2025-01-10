// "use client";
// import { useEffect } from "react";
// import { usePostData } from "@/hooks/usePostData";
// import Link from "next/link";

// const AllSeriesHome = () => { 
//   const url =
//     "https://b2xclusive.onrender.com/api/v1/track/movies?type=SEASONAL&page=1&limit=6";

//   const { isLoading, isError, data } = usePostData("series", url);

//   useEffect(() => {
//     console.log("Fetched Data:", data);
//   }, [data]); 

//   if (isError)
//     return (
//       <div>
//         <p className="text-red-500 font-bold">Error Fetching Posts</p>
//       </div>
//     );

//   if (isLoading)
//     return (
//       <div className="w-[90%] md:w-5/6 mx-auto my-10 grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 py-8">
//         <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg"></div>
//         <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg"></div>
//         <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg"></div>
//         <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg"></div>
//         <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg"></div>
//         <div className="h-40 w-full bg-gray-300 animate-pulse rounded-lg"></div>
//       </div>
//     );

//   // Extract movies data
//   const movies = data?.data?.data?.movies || [];

//   if (movies.length === 0) {
//     return (
//       <div>
//         <p className="text-gray-500 font-bold">No series Available</p>
//       </div>
//     );
//   }

//   return (
//     <section className="w-[90%] md:w-5/6 mx-auto my-10">
//       <p className="text-2xl font-bold">New Series Uploads</p>
//       <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 py-8">
//         {movies.map((movie) => (
//           <div key={movie.id} className="border rounded-md overflow-hidden">
//             <Link href={`/series-menu/${movie.id}/`}>
//               <div className="h-48 bg-gray-200">
//                 <img
//                   src={movie.seasons[0]?.episodes[0]?.posterUrl?.url}
//                   alt={movie.title}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <p className="px-2 py-3 text-center font-medium">{movie.title}</p>
//             </Link>
//           </div>
//         ))}
//       </div>

//       <Link href="/series-menu">
//         {" "}
//         <button className="w-full py-2 bg-primarycolor text-white my-5 rounded-xl">
//           Load more series
//         </button>
//       </Link>
//     </section>
//   );
// };

// export default AllSeriesHome;


// app/components/seriesHome.jsx 


import Image from "next/image";
import Link from "next/link";

const AllSeriesHome = ({ series: movieSeries }) => {
  if (!movieSeries || movieSeries.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 font-bold text-xl">No Movie Series Available</p>
      </div>
    );
  }

  return (
    // <section className="w-[90%] md:w-5/6 mx-auto my-10">
    //   <div className="text-center mb-10">
    //     <p className="text-4xl font-extrabold text-gray-800">
    //       Latest Movie Series
    //     </p>
    //     <p className="text-gray-600 mt-2">
    //       Explore the newest uploads and binge-watch your favorites.
    //     </p>
    //   </div>

    //   <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 py-8">
    //     {movieSeries.map((movie) => (
    //       <div
    //         key={movie.id}
    //         className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    //       >
    //         <Link href={`/series-menu/${movie.id}/`}>
    //           <div className="relative group cursor-pointer">
    //             <img
    //               src={movie.seasons[0]?.episodes[0]?.posterUrl?.url || "/placeholder.png"}
    //               alt={movie.title}
    //               className="w-full h-48 object-cover"
    //             />
    //             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
    //               <p className="text-white font-bold text-lg hidden group-hover:block">
    //                 View Details
    //               </p>
    //             </div>
    //           </div>
    //           <div className="p-4">
    //             <p className="font-semibold text-lg text-gray-800 truncate">
    //               {movie.title}
    //             </p>
    //             <p className="text-sm text-gray-500 mt-1">
    //               {movie.description || "No description available"}
    //             </p>
    //           </div>
    //         </Link>
    //       </div>
    //     ))}
    //   </div>

    //   <div className="flex justify-center mt-8">
    //     <Link href="/series-menu">
    //       <button className="px-6 py-3 bg-primarycolor text-white font-semibold text-lg rounded-lg hover:bg-primarycolor-dark transition-colors">
    //         Load More Series
    //       </button>
    //     </Link>
    //   </div>
    // </section>

    <section>
<h2 className="text-2xl font-semibold mb-4">Series</h2>
<div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4">
  {/* {series.map((serie) => (
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
  ))} */}

{movieSeries.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
          >
            <Link href={`/series-menu/${movie.id}/`}>
              <div className="relative group cursor-pointer">
                <Image
                  src={movie.seasons[0]?.episodes[0]?.posterUrl?.url || "/placeholder.png"}
          alt={movie.title}
          height={100}
          width={100}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                  <p className="text-white font-bold text-lg hidden group-hover:block">
                    View Details
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold text-lg text-gray-800 truncate">
                  {movie.title}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {movie.description || "No description available"}
                </p>
              </div>
            </Link>
          </div>
        ))}
</div>
</section>
  );
};




export default AllSeriesHome;



// import Link from "next/link";

// const AllSeriesHome = ({ series:movieSeries }) => {
//   if (!movieSeries || movieSeries.length === 0) {
//     return (
//       <div>
//         <p className="text-gray-500 font-bold">No Movie Series Available</p>
//       </div>
//     );
//   }

//   return (
//     <section className="w-[90%] md:w-5/6 mx-auto my-10">
//       <p className="text-2xl font-bold">New Movie Series Uploads</p>
//       <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 py-8">
//         {movieSeries.map((movie) => (
//           <div key={movie.id} className="border rounded-md overflow-hidden">
//             <Link href={`/series-menu/${movie.id}/`}>  
//               <div className="h-48 bg-gray-200">
//                 <img
//                   src={movie.seasons[0]?.episodes[0]?.posterUrl?.url || "/placeholder.png"}
//                   alt={movie.title}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <p className="px-2 py-3 text-center font-medium">{movie.title}</p>
//             </Link>
//           </div>
//         ))}
//       </div>

//       <Link href="/series-menu">
//         <button className="w-full py-2 bg-primarycolor text-white my-5 rounded-xl">
//           Load more series
//         </button>
//       </Link>
//     </section>
//   );
// };

// export default AllSeriesHome;
