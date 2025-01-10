// pages/artist/[artistId]/page.js
import Image from "next/image";
import { getArtist, getTopArtists } from "@/lib/api";
import CategoriesHeading from "@/components/CategoriesHeading";
import TopMusic from "@/components/TopMusic";
import { VscLoading } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa";
import ArtistVideos from "@/components/ArtistVideos";
import ArtistSongs from "@/components/ArtistSongs";
import TabContainer from "@/components/TabContainer";

export default async function SingleMusics({ params, searchParams }) {
  const { artistId } = params;
  const activeTab = searchParams.tab || 'songs'; 

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
    <>
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
            <p className="text-white text-md">Artist. View Profile</p>
            <h1 className="text-white text-3xl font-bold">{artist.name}</h1>
            <button className="bg-red-500 text-white px-4 py-2 text-sm rounded-full flex gap-1 items-center">
              <FaPlay /> Play All
            </button>
          </div>
        </div>
        <TabContainer activeTab={activeTab} artistId={artistId} />
      </div>

      {/* Main Content */}
      <section className="w-full md:w-5/6 md:mx-auto flex flex-col md:flex-row gap-2 py-8">
        <div className="w-4/6">
          {activeTab === 'songs' && (
            <>
              <CategoriesHeading title="Artist Songs" />
              <div className="py-4">
                <ArtistSongs tracks={artist?.track} />
              </div>
            </>
          )}
          
          {activeTab === 'videos' && (
            <>
              <CategoriesHeading title="Artist Videos" />
              <ArtistVideos videos={artist?.videos} />
            </>
          )}
          
          {activeTab === 'bio' && (
            <>
              <CategoriesHeading title="Biography" />
              <div className="py-4">
                <p>{artist?.bio}</p>
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <div className="md:w-2/6">
          <CategoriesHeading title="Top 10 Artists" />
          <div className="grid grid-cols-2 py-4 md:flex flex-col gap-2">
            {topArtists?.map((artist, index) => (
              <TopMusic key={artist.id} topArtists={artist} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}