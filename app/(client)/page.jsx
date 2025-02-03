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
  FaWhatsapp,
} from "react-icons/fa";

import HomePost from "@/components/HomePosts";
import HomeEvents from "@/components/HomeEvents";
import HomeRecentPost from "@/components/HomeRecentPost";
import {
  getAlbums,
  getEvents,
  getHeroSection,
  getMovies,
  getPosts,
  getTopArtists,
  getTopTrendingSongs,
  getTrendingVideos,
} from "@/lib/api";
import HeroSection from "@/components/HeroSection";
import TopList from "@/components/TopList";
import NoContentDesign from "@/components/NoContent";
import HomeMovie from "@/components/HomeMovie";

export default async function Home() {
  const [
    posts,
    events,
    albums,
    topArtists,
    videos,
    hero,
    movies,
    topTrendingSongs,
  ] = await Promise.all([
    getPosts(3),
    getEvents(2),
    getAlbums(1),
    getTopArtists(),
    getTrendingVideos(),
    getHeroSection(),
    getMovies(),
    getTopTrendingSongs(),
  ]);

  // Transform `topTrendingSongs` to group tracks by artist
  const transformData = (tracks) => {
    const artistsMap = new Map();

    tracks.forEach((track) => {
      if (!track.artist) return; // Ensure track has an artist

      const { id, name, bio, url } = track.artist;

      if (!artistsMap.has(id)) {
        artistsMap.set(id, {
          id,
          name,
          bio,
          url,
          track: [], // Initialize track array
        });
      }

      artistsMap.get(id).track.push(track);
    });

    return Array.from(artistsMap.values());
  };

  const transformedArtists = transformData(topTrendingSongs);

  return (
    <main className="bg-gradient-to-b from-gray-900 to-black">
      <HeroSection hero={hero} />
      <section className="w-full lg:w-[80%] md:w-[90%] mx-auto md:flex mt-8 gap-6">
        <div className="w-full md:w-[80%] mx-auto p-3">
          {/* NEW ALBUM SECTION */}
          <CategoriesHeading title={"Adverts"} />

          {/* <div className="grid gap-4 grid-cols-2 md:py-4 md:flex md:gap-4">
            {albums.map((album) => (
              <AlbumCover key={album.id} album={album} />
            ))}
           
          </div> */}

          <div className="grid  grid-cols-1 md:py-4 ">
            <AlbumCover key={albums.id} album={albums} />
          </div>

          {/* UPCOMING EVENTS SECTION*/}
          <HomeEvents events={events} />

          {/* RECENT POST SECTION */}
          <CategoriesHeading title={"Trending Videos"} />
          <div className="w-full flex flex-col">
            <HomePost videos={videos} />
            <Link
              href={"/videoshome"}
              className="font-bold text-center cursor-pointer bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text"
            >
              See More
            </Link>
          </div>

          <CategoriesHeading title={"Trending Movies"} />
          <div className="w-full flex flex-col">
            <HomeMovie movies={movies} />
            <Link
              href={"/movieshome"}
              // className="text-gray-200 font-bold text-center cursor-pointer"
              className="font-bold text-center cursor-pointer bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text"
            >
              See More
            </Link>
          </div>

          {/* TOP 40 section */}
          <CategoriesHeading title={"Latest Musics"} />

          <div className="w-full py-4">
            <div className="grid gap-4 grid-cols-1">
              <TopList topArtists={transformedArtists} />
              {/* <Link
                href={"/musics"}
                className="text-gray-200 font-bold text-center cursor-pointer "
              >
                See More
              </Link> */}
              <Link
                href="/musics"
                className="font-bold text-center cursor-pointer bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text"
              >
                See More
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[40%] mx-auto p-3">
          {/* Sidebar */}
          <aside className="grid grid-cols-1 md:flex md:flex-col gap-2 py-2">
            {/* Top Artists */}
            <div className="bg-gray-800/50 rounded-xl shadow-lg p-6">
              <CategoriesHeading title="Artist of the week" />
              <div className="grid grid-cols-1 gap-4 mt-6">
                {topArtists?.map((artist, index) => (
                  <TopMusic key={artist.id} topArtists={artist} index={index} />
                ))}
              </div>
            </div>

            {/* Get Connected */}
            <div className="bg-gray-800/50 rounded-xl shadow-lg p-6 ">
              <CategoriesHeading title="Get Connected" />
              <div className="flex justify-around mt-4 text-gray-200 text-3xl">
                <Link
                  href={
                    "https://www.facebook.com/share/1RNuYmnfbq/?mibextid=wwXIfr"
                  }
                >
                  <FaFacebook />
                </Link>
                <Link href={"https://wa.me/message/DTRMTVSWSEOAP1"}>
                  <FaWhatsapp />
                </Link>
                <Link
                  href={
                    "https://www.instagram.com/b2xclusive?igsh=ZG01eTAxZ2cxaG5p"
                  }
                >
                  <FaInstagram />
                </Link>
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
