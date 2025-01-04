"use client";

import ArtistSong from "@/components/ArtistSong";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaDownload,
  FaFacebook,
  FaHamburger,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaPlay,
  FaPlus,
  FaRegPlayCircle,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import axios from "axios";
import pld from "@/public/pld.jpeg";
import { VscLoading } from "react-icons/vsc";
import AudioPlayer from "@/components/AudioPlayer";
import HomeRecentPost from "@/components/HomeRecentPost";
import CategoriesHeading from "@/components/CategoriesHeading";
import TopPlaylist from "@/components/TopPlaylist";
import TopMusic from "@/components/TopMusic";

function SingleMusics({ params }) {
  const { artistId } = params;

  const [artist, setArtist] = useState("");
  const [audios, setAudios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get(
        `https://b2xclusive.onrender.com/api/v1/artist/${artistId}`,
      );

      setArtist(response?.data?.data);
      const audiosresponse = await axios.get(
        `https://b2xclusive.onrender.com/api/v1/artist/${artistId}`,
      );
      setAudios(audiosresponse?.data?.data?.track);
      console.log(audiosresponse?.data);
    };

    fetchdata();
  }, [artistId, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = audios?.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate total number of pages
  const totalPages = Math.ceil(audios.length / postsPerPage);

  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (!artist) {
    return (
      <div className="w-full flex justify-center mt-20 ">
        <VscLoading className="text-4xl animate-spin" />
      </div>
    ); // Add a loading state if blog is null
  }

  return (
    <>
      <div className="relative">
        <div className="relative">
          <div className="h-[500px]">
            <Image
              src={artist ? artist?.image?.url : pld}
              width={1000}
              height={1000}
              alt="artist"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bg-[#3F254C80] w-full h-full top-0"></div>
        </div>{" "}
        <div className="absolute bottom-[30%] left-[10%] flex gap-8 items-center">
          <div className="w-[150px] h-[150px]">
            <Image
              src={artist ? artist?.image?.url : pld}
              width={1000}
              height={1000}
              alt="artist"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white text-md">Artist. View Profile</p>
            <h1 className="text-white text-3xl font-bold">{artist.name}</h1>
            <button className="bg-red-500 text-white px-4 py-2  text-sm rounded-full flex gap-1 items-center">
              {" "}
              <FaPlay /> Play All{" "}
            </button>
          </div>
        </div>
        <div className=" bg-[#00000030] bottom-0 absolute w-full px-[10%] flex gap-10">
          <button
            onClick={() => setActiveTab("tab1")}
            className={`text-white p-4 ${activeTab === "tab1" ? "border-red-500 border-b-4 " : " "}`}
          >
            All Songs
          </button>

          <button
            onClick={() => setActiveTab("tabs2")}
            className={`text-white  p-4 ${activeTab !== "tab1" ? "border-red-500 border-b-4" : " "}`}
          >
            {" "}
            Biography{" "}
          </button>
        </div>
      </div>

      <section
        className={` w-full md:w-5/6 md:mx-auto flex flex-col md:flex-row gap-2 py-8 `}
      >
        {activeTab === "tab1" ? (
          <div className="w-4/6">
            <CategoriesHeading title={"Artist Songs"} />
            <div className="py-4"></div>
            <div className="flex flex-col gap-2">
              {currentPosts.map((audio) => (
                <div key={artistId}>
                  <ArtistSong key={audio.id} {...audio} />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              {/* Previous button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2"
              >
                Previous
              </button>
              {/* Page number buttons */}
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`border border-gray-500 text-primarycolor px-4 py-2 rounded-md mx-1 ${
                    currentPage === number ? "bg-white" : ""
                  }`}
                >
                  {number}
                </button>
              ))}
              {/* Next button */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="bg-primarycolor text-white px-4 py-2 rounded-md ml-2"
              >
                Next
              </button>{" "}
            </div>
            <CategoriesHeading title={"Artist videos"} />
          </div>
        ) : (
          <div className="w-4/6">
            <CategoriesHeading title={"Description"} />
            <p> {artist?.bio}</p>
          </div>
        )}
        <div className="md:w-2/6">
          {/* TOP ARTIST SECTION */}
          <CategoriesHeading title={"Top 10 Artist"} />

          <div className="grid grid-cols-2 py-4 md:flex flex-col gap-2">
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
          </div>

          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>

          {/* TOP PLAYLIST SECTION */}
          <CategoriesHeading title={"Top Playlist"} />

          <div className="grid grid-cols-2 py-4 md:flex flex-col gap-2">
            <TopPlaylist />
            <TopPlaylist />
            <TopPlaylist />
            <TopPlaylist />
          </div>

          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>

          {/* GET CONNECTED */}
          <CategoriesHeading title={"Get Connected"} />

          <div className="flex justify-between p-4">
            <FaFacebook className={`text-3xl `} />
            <FaTwitter className={`text-3xl `} />
            <FaLinkedin className={`text-3xl `} />
            <FaYoutube className={`text-3xl `} />
            <FaInstagram className={`text-3xl `} />
            <FaPinterest className={`text-3xl `} />
          </div>

          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>

          {/* Recent post section */}
          <CategoriesHeading title={"Recent Posts"} />

          <div className=" flex flex-col gap-1 pt-4 ">
            <HomeRecentPost />
          </div>
        </div>
      </section>
    </>
  );
}

export default SingleMusics;
