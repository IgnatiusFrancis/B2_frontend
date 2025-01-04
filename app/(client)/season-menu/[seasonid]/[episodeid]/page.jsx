"use client";

import SectionHeader from "@/components/SectionHeader";
import { useParams } from "next/navigation";
import { FaFileDownload } from "react-icons/fa";
import SingleEpisode from "@/components/SingleEpisode";

function SinglePageEpisode() { 
  const { episodeid } = useParams();
 
  return (
    <>
      <SectionHeader
        title={"Cinema City"}
        desc={
          "🎥 Stream & Download Your Favorites: Discover the ultimate movie haven where streaming meets downloading. Enjoy seamless access to the latest and greatest films anytime, anywhere! 🍿✨"
        }
        bgWallpaper="/moviesWallpaper.webp"
      />

      <SingleEpisode id={episodeid} /> 
    </>
  );
}

export default SinglePageEpisode;
