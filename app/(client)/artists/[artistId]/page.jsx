// pages/artist/[artistId]/page.js
import Image from "next/image";
import { getArtist, getTopArtists } from "@/lib/api";
import CategoriesHeading from "@/components/CategoriesHeading";
import TopMusic from "@/components/TopMusic";
import { VscLoading } from "react-icons/vsc";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPlay,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import ArtistVideos from "@/components/ArtistVideos";
import ArtistSongs from "@/components/ArtistSongs";
import TabContainer from "@/components/TabContainer";
import Link from "next/link";

export default async function SingleMusics({ params, searchParams }) {
  const { artistId } = params;
  const activeTab = searchParams.tab || "songs";

  const [artist, topArtists] = await Promise.all([
    getArtist(artistId),
    getTopArtists(),
  ]);

  if (!artist) {
    return (
      <div className="w-full flex justify-center mt-20">
        <VscLoading className="text-4xl animate-spin" />
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* Artist Header Section */}
      <div className="relative">
        <div className="relative">
          <div className="h-[500px]">
            <Image
              src={artist?.url}
              width={1000}
              height={1000}
              alt="artist"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bg-[#3F254C80] w-full h-full top-0"></div>
        </div>
        <div className="absolute bottom-[30%] left-[10%] flex gap-8 items-center">
          <div className="w-[150px] h-[150px]">
            <Image
              src={artist?.url}
              width={1000}
              height={1000}
              alt="artist"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white text-md">Artist Profile View</p>
            <h1 className="text-white text-3xl font-bold">{artist.name}</h1>
          </div>
        </div>
        <TabContainer activeTab={activeTab} artistId={artistId} />
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-b from-gray-900 to-black">
        <section className="w-full md:w-5/6 md:mx-auto flex flex-col md:flex-row md:gap-10 gap-2 py-8">
          <div className="md:w-4/6 w-[90%]">
            {activeTab === "songs" && (
              <div className="ml-5">
                <CategoriesHeading title="Artist Songs" />
                <div className="py-4">
                  <ArtistSongs tracks={artist?.track} />
                </div>
              </div>
            )}

            {activeTab === "videos" && (
              <div className="ml-5">
                <CategoriesHeading title="Artist Videos" />
                <ArtistVideos videos={artist?.videos} />
              </div>
            )}

            {activeTab === "bio" && (
              <div className="ml-5">
                <CategoriesHeading title="Biography" />
                <div className="py-4">
                  <p className="text-gray-200">{artist?.bio}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:w-2/6 w-[90%] mx-auto">
            <CategoriesHeading title="Top 10 Artists" />
            <div className="grid grid-cols-1 py-4 md:flex flex-col gap-2">
              {topArtists?.map((artist, index) => (
                <TopMusic key={artist.id} topArtists={artist} index={index} />
              ))}
            </div>
            {/* GET CONNECTED */}
            <div className="my-8 w-full h-[3px] bg-primarycolor"></div>
            <CategoriesHeading title={"Get Connected"} />

            <div className="flex justify-around p-4 text-gray-200 text-3xl">
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

            <div className="my-8 w-full h-[3px] bg-primarycolor"></div>
          </div>
        </section>
      </div>
    </section>
  );
}
