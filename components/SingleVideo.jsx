"use client";
import CategoriesHeading from "@/components/CategoriesHeading";
import SectionHeader from "@/components/SectionHeader";
import TopMusic from "@/components/TopMusic";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaComment,
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaShare,
  FaTwitter,
  FaYoutube,
  FaFileDownload,
  FaEye,
} from "react-icons/fa";
import { useState } from "react";
import NoContentDesign from "@/components/NoContent";

function SingleVideo({ video, artistVideos, topArtists }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const baseUrl = process.env.B2XCLUSIVE_APP_BASE_URL;

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const isAWS = video?.videoUrl.includes("b2xclusive-bucket.s3");
      const isCloudinary = video?.videoUrl.includes("res.cloudinary.com");
      let downloadUrl;

      if (isAWS) {
        downloadUrl = `${baseUrl}/track/download?type=video&key=${video?.key}&id=${video?.id}`;
      } else if (isCloudinary) {
        return;
        downloadUrl = `${baseUrl}/track/download?type=video&publicId=${video?.publicId}&id=${video?.id}`;
      } else {
        console.error("Unknown video source. Cannot download.");
        return;
      }

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", video?.customFilename || video?.title);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      {/* <SectionHeader
        title={video?.title}
        desc={video?.subtitle || "A little about the album goes here"}
      /> */}

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[60vh] overflow-hidden"
      >
        <Image
          src={video?.url || imgPlaceholder}
          alt={video?.title}
          fill
          className="object-cover brightness-50 transform hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          >
            {video?.title}
          </motion.h1>
        </div>
      </motion.section>

      <div className="bg-gradient-to-b from-gray-900 to-black">
        <section className="md:w-5/6 md:p-8 p-4 mx-auto md:flex md:gap-8">
          <div className="w-full p-4 md:w-4/6 flex flex-col gap-8">
            <div>
              <div className="w-full mb-6">
                <video
                  width="100%"
                  height="auto"
                  controls
                  autoPlay
                  preload="none"
                  src={video?.videoUrl.replace("http://", "https://")}
                  type="video/mp4"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="py-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-200">
                  {video?.title}
                </h1>
                <p className="text-lg text-gray-500 mb-4">
                  {video?.subtitle || "A little about the album goes here"}
                </p>
              </div>
              <div className="flex gap-2 mb-4">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                  <Image
                    src={video.artist.url || pld}
                    width={1000}
                    height={1000}
                    alt="artist"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-lg text-gray-200">
                    {video?.artist?.name}
                  </h1>
                  <p className="text-sm text-gray-400">
                    {video?.updatedAt.split("T")[0]}
                  </p>
                </div>
              </div>
              <div
                className="text-base text-gray-200 my-6"
                dangerouslySetInnerHTML={{ __html: video.description }}
              />
              <div className="space-y-4 my-10">
                <h2 className="text-2xl font-bold text-left">Download</h2>
                <div className="flex justify-start">
                  <button
                    className={`md:w-[40%] w-full py-4 ${
                      isDownloading ? "bg-green-400" : "bg-green-600"
                    } justify-center text-white rounded-2xl shadow-md transition-all flex items-center`}
                    onClick={handleDownload}
                    disabled={isDownloading}
                  >
                    <FaFileDownload className="mr-2" />
                    <span>
                      {isDownloading ? "Initiating Download..." : "Download"}
                    </span>
                  </button>
                </div>
              </div>

              {/* <div className="flex items-center gap-2 py-4">
              <FaEye className="text-2xl text-gray-600" />
              <p className="text-xl">{video?.views.length} Views</p>
            </div> */}
            </div>
          </div>

          {/* <div className="md:w-2/6 p-4">
          <CategoriesHeading title="Top 10 Artists" />
          <div className="flex flex-col gap-4">
            {topArtists?.map((artist, index) => (
              <TopMusic key={artist.id} topArtists={artist} index={index} />
            ))}
          </div>

          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>
          <CategoriesHeading title="Get Connected" />
          <div className="flex justify-between p-4">
            <FaFacebook className="text-3xl" />
            <FaTwitter className="text-3xl" />
            <FaLinkedin className="text-3xl" />
            <FaYoutube className="text-3xl" />
            <FaInstagram className="text-3xl" />
            <FaPinterest className="text-3xl" />
          </div>
        </div> */}

          {/*Animated section */}
          {/* <div className="hidden md:block">
          <CategoriesHeading title={"Feel The Beat"} />         
            <div className="w-full">
              <NoContentDesign />
            </div>
          </div> */}

          {/* Sidebar */}
          <aside className="md:w-1/3 space-y-10 sticky top-16 h-full">
            {/* Top Artists */}
            <div className="bg-gray-800/50 rounded-xl shadow-lg p-6">
              <CategoriesHeading title="Top 5 Artists" />
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mt-6">
                {topArtists?.map((artist, index) => (
                  <TopMusic key={artist.id} topArtists={artist} index={index} />
                ))}
              </div>
            </div>
            {/* <div className="hidden md:block">
            <CategoriesHeading title={"Feel The Beat"} />
            <div className="w-full">
            <NoContentDesign  />
            </div>  
          </div> */}
          </aside>
        </section>
      </div>
    </>
  );
}

export default SingleVideo;
