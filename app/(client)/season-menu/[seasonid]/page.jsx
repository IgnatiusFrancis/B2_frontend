

"use client";
import { SingleSeasonsPage } from "@/components/SingleSeasonsPage";
import SectionHeader from "@/components/SectionHeader";
import { fetchSeriesData } from "@/lib/api";

export default async function SinglePageSeries({ params }) { 
  const { seasonid } = params;
 
  const series = await fetchSeriesData(seasonid); 

  return (
    <>
      <SectionHeader 
        title={"Cinema City"}
        desc={
          "🎥 Stream & Download Your Favorites: Discover the ultimate movie haven where streaming meets downloading. Enjoy seamless access to the latest and greatest films anytime, anywhere! 🍿✨"
        }
        bgWallpaper="/moviesWallpaper.webp"
      />
      <SingleSeasonsPage series={series} /> 
    </>
  );
}
// function SinglePageSeries() {
//   const { seasonid } = useParams();
//   console.log("seasonMenu:", seasonid)
//   const season = await fetchSeriesData(seriesseason);
//   return (
//     <>
//       <SectionHeader 
//         title={"Cinema City"}
//         desc={
//           "🎥 Stream & Download Your Favorites: Discover the ultimate movie haven where streaming meets downloading. Enjoy seamless access to the latest and greatest films anytime, anywhere! 🍿✨"
//         }
//         bgWallpaper="/moviesWallpaper.webp"
//       />

//       <SingleSeasonsPage id={seasonid} />
//     </>
//   );
// }


