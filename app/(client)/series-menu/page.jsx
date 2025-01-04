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
import AllSeriesHome from "@/components/SeriesHome";

const MovieTiles = [
  { id: 1, title: "Creed", img: "/creed.jpeg" },
  { id: 2, title: "Creed II", img: "/creed.jpeg" },
  { id: 3, title: "Creed III", img: "/creed.jpeg" },
  { id: 4, title: "Rocky", img: "/creed.jpeg" },
  { id: 5, title: "Rocky II", img: "/creed.jpeg" },
  { id: 6, title: "Rocky III", img: "/creed.jpeg" },
];

function SeriesMenuHome() {
  return (
    <>
      <SectionHeader
        title={"Cinema City"}
        desc={
          "🎥 Stream & Download Your Favorites: Discover the ultimate movie haven where streaming meets downloading. Enjoy seamless access to the latest and greatest films anytime, anywhere! 🍿✨"
        }
        bgWallpaper="/moviesWallpaper.webp"
      />
      <section className="w-full md:w-5/6 mx-auto py-4">
        <div className="p-6">
          <h1 className="text-4xl font-bold">🔍 Find Your Favorites:</h1>
          <p className="text-gray-700">
            Search for movies, shows, and more to start your next binge-worthy
            adventure!
          </p>
        </div>
      </section>
      <section className="w-full md:w-5/6 mx-auto p-4">
        <div className="md:w-4/6 rounded-full flex items-center border border-gray-300">
          <input
            type="text"
            placeholder="Search here"
            className="w-11/12 bg-transparent p-4 outline-none text-gray-700"
          />
          <button className="rounded-full text-white bg-primarycolor flex items-center md:text-base text-[12px] py-2 gap-1 px-4 mr-2 hover:bg-primarycolor-dark transition">
            <FaSearch /> Search
          </button>
        </div>
      </section>

      <section className="w-[90%] md:w-5/6 mx-auto my-10">
        <p className="text-2xl font-bold">Popular downloads</p>
        <div className=" grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4 py-8">
          {MovieTiles.map((tile) => (
            <div key={tile.id} className="border rounded-md overflow-hidden">
              <Link href={`/series-menu/${tile.title}/`}>
                <div className="h-48 bg-gray-200">
                  <img
                    src={tile.img}
                    alt={tile.title}
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
      </section>

      <AllSeriesHome />
    </>
  );
}

export default SeriesMenuHome;
