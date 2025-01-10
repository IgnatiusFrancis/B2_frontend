"use client";
import CategoriesHeading from "@/components/CategoriesHeading";
import SectionHeader from "@/components/SectionHeader";
import TopMusic from "@/components/TopMusic";
import TopPlaylist from "@/components/TopPlaylist";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSearch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import AllVideos from "@/components/AllVideos";
import HomeRecentPost from "@/components/HomeRecentPost";
import Link from "next/link";
import Image from "next/image";

const MovieTiles = [
  { id: 1, title: "Creed", img: "/creed.jpeg" },
  { id: 2, title: "Creed II", img: "/creed.jpeg" },
  { id: 3, title: "Creed III", img: "/creed.jpeg" },
  { id: 4, title: "Rocky", img: "/creed.jpeg" },
  { id: 5, title: "Rocky II", img: "/creed.jpeg" },
  { id: 6, title: "Rocky III", img: "/creed.jpeg" },
];

function FullSeriesPage() {
  return (
    <>
      <SectionHeader
        title={"Cinema City"}
        desc={
          "🎥 Stream & Download Your Favorites: Discover the ultimate movie haven where streaming meets downloading. Enjoy seamless access to the latest and greatest films anytime, anywhere! 🍿✨"
        }
        bgWallpaper="/moviesWallpaper.webp"
      />

      <section className="w-[90%] md:w-5/6 mx-auto my-10">
        <div className=" grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 py-8">
          {MovieTiles.map((tile) => (
            <div key={tile.id} className="border rounded-md overflow-hidden">
              <Link href={`/series-menu/${tile.title}/`}>
                <div className="h-[300px] bg-gray-200">
                  <Image
                    src={tile.img}
                    alt={tile.title}
                    height={100}
                    width={100}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="px-2 py-3 text-center font-medium">
                  {tile.title}
                </p>
              </Link>
            </div>
          ))}
        </div>

        <button className="w-full py-2 bg-primarycolor text-white my-5 rounded-xl">
          Load more series
        </button>
      </section>
    </>
  );
}

export default FullSeriesPage;
