import AlbumCover from "@/components/AlbumCover";
import CategoriesHeading from "@/components/CategoriesHeading";
import TopMusic from "@/components/TopMusic";

import Link from "next/link";
import {
  FaBackward,
  FaBook,
  FaFacebook,
  FaForward,
  FaInstagram,
  FaLinkedin,
  FaMicrophone,
  FaMusic,
  FaPinterest,
  FaSearch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import HomePost from "@/components/HomePosts";
import HomeEvents from "@/components/HomeEvents";
import HomeRecentPost from "@/components/HomeRecentPost";
import {
  getAlbums,
  getEvents,
  getPosts,
  getTopArtists,
  getTrendingVideos,
} from "@/lib/api";
import HeroSection from "@/components/HeroSection";
import TopList from "@/components/TopList";
import NoContentDesign from "@/components/NoContent";

export default async function Home() {
  const [posts, events, albums, topArtists, videos] = await Promise.all([
    getPosts(3),
    getEvents(2),
    getAlbums(3),
    getTopArtists(),
    getTrendingVideos(),
  ]);

  return (
    <main>
      <HeroSection />
      <section className="w-full md:w-9/12 mx-auto md:flex mt-8 gap-6">
        <div className="w-full md:w-3/4">
          {/* NEW ALBUM SECTION */}
          <CategoriesHeading title={"New Album releases"} />

          <div className="grid gap-4 grid-cols-2 md:py-4 md:flex md:gap-4">
            {albums.map((album) => (
              <AlbumCover key={album.id} album={album} />
            ))}
          </div>

          {/* <div className="flex items-end justify-between mb-10">
            <div className="w-[80%] h-[2px] bg-primarycolor"></div>
            <div className="flex gap-4">
              <FaBackward className={`border w-5 h-5 p-1  `} />
              <FaForward className={`border w-5 h-5 p-1 `} />
            </div>
          </div> */}

          {/* UPCOMING EVENTS SECTION*/}
          <HomeEvents events={events} />

          {/* RECENT POST SECTION */}
          <CategoriesHeading title={"Trending Videos"} />
          <div className="w-full flex flex-col">
            <HomePost videos={videos} />
            <Link
              href={"/videoshome"}
              className="text-primarycolor font-bold text-center cursor-pointer"
            >
              Read More
            </Link>
          </div>

          {/* TOP 40 section */}
          <CategoriesHeading title={"Top Trending Artist Songs"} />

          <div className="py-4 grid grid-cols-2 md:flex md:flex-col gap-4 ">
            <TopList topArtists={topArtists} />
          </div>
        </div>

        <div className="w-full md:w-4/12">
          {/* Sidebar */}
          <aside className="grid grid-cols-3 md:flex md:flex-col gap-2 py-2">
            {/* Top Artists */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <CategoriesHeading title="Top 5 Artists" />
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mt-6">
                {topArtists?.map((artist, index) => (
                  <TopMusic key={artist.id} topArtists={artist} index={index} />
                ))}
              </div>
            </div>

            {/* Get Connected */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <CategoriesHeading title="Get Connected" />
              <div className="flex justify-between mt-4 text-gray-700">
                <FaFacebook className="text-2xl hover:text-primarycolor transition-all cursor-pointer" />
                <FaTwitter className="text-2xl hover:text-primarycolor transition-all cursor-pointer" />
                <FaLinkedin className="text-2xl hover:text-primarycolor transition-all cursor-pointer" />
                <FaYoutube className="text-2xl hover:text-primarycolor transition-all cursor-pointer" />
                <FaInstagram className="text-2xl hover:text-primarycolor transition-all cursor-pointer" />
                <FaPinterest className="text-2xl hover:text-primarycolor transition-all cursor-pointer" />
              </div>
            </div>
          </aside>

          {/* Recent post section */}
          <div className="hidden md:block">
            <CategoriesHeading title={"Recent Posts"} />
            <div className="w-full">
              <HomeRecentPost posts={posts} />
            </div>
          </div>
         
          {/*Animated section */}
          <div className="hidden md:block">
          <CategoriesHeading title={"Feel The Beat"} />         
            <div className="w-full">
              <NoContentDesign />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
