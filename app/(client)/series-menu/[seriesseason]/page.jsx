// app/(client)/series-menu/[seriesseason]/page.jsx
// "use client";

// import AllSeriesPage from "@/components/AllSeriesPage";
// import SectionHeader from "@/components/SectionHeader";
// import { useParams } from "next/navigation";

// function SingleSeasonPageSeries() { 
//   const { seriesseason } = useParams();

//   return (
//     <>
//       <SectionHeader
//         title={"Cinema City"} 
//         desc={
//           "🎥 Stream & Download Your Favorites: Discover the ultimate movie haven where streaming meets downloading. Enjoy seamless access to the latest and greatest films anytime, anywhere! 🍿✨"
//         }
//         bgWallpaper="/moviesWallpaper.webp"
//       />

//       <AllSeriesPage id={seriesseason} /> 
//     </>
//   );
// }

// export default SingleSeasonPageSeries;


import AllSeriesPage from "@/components/AllSeriesPage";
import SectionHeader from "@/components/SectionHeader";

async function fetchMovieData(id) {
  const url = `https://b2xclusive.onrender.com/api/v1/track/movie/${id}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch series data"); 
  }
  const data = await response.json();
  return data?.data?.movie || null;
}

export default async function SingleSeasonPageSeries({ params }) {
  const { seriesseason } = params;

  const movie = await fetchMovieData(seriesseason);

  return ( 
    <>
      <SectionHeader
        title="Cinema City"  
        desc="🎥 Stream & Download Your Favorites: Discover the ultimate movie haven where streaming meets downloading. Enjoy seamless access to the latest and greatest films anytime, anywhere! 🍿✨"
        bgWallpaper="/moviesWallpaper.webp"
      />
      <AllSeriesPage movie={movie} />
    </>
  );
}
