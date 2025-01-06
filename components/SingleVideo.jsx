"use client";
import CategoriesHeading from "@/components/CategoriesHeading";
import SectionHeader from "@/components/SectionHeader";
import TopMusic from "@/components/TopMusic";
import TopPlaylist from "@/components/TopPlaylist";
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
  FaEye,
  FaFileDownload,
} from "react-icons/fa";
import pld from "@/public/pld.jpeg";
import HomeRecentPost from "@/components/HomeRecentPost";
import { useState } from "react";

function SingleVideo({ video, artistVideos }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      // Determine if the video is hosted on AWS or Cloudinary
      const isAWS = video?.videoUrl.includes("b2xclusive-bucket.s3");
      const isCloudinary = video?.videoUrl.includes("res.cloudinary.com");

      let downloadUrl;
     
      if (isAWS) {
        // Construct AWS-specific download URL
        downloadUrl = `https://b2xclusive.onrender.com/api/v1/track/download?type=video&key=${video?.key}&id=${video?.id}`;
      } else if (isCloudinary) {
        return;
        // Construct Cloudinary-specific download URL
        downloadUrl = `https://b2xclusive.onrender.com/api/v1/track/download?type=video&publicId=${video?.publicId}&id=${video?.id}`;
      } else {
        console.error("Unknown video source. Cannot download.");
        return;
      }

      // Trigger the download
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
      <SectionHeader
        title={video?.title}
        desc={video?.subtitle || "A littlee about the album goes here"}
      />

      <section className=" md:w-5/6 md:p-8 p-4 mx-auto md:flex md:gap-8">
        <div className="w-full p-4 md:w-4/6 flex flex-col gap-8">
          <div>
            <div className="w-full">
              <video
                width="1000"
                height="1000"
                controls
                autoPlay
                preload="none"
                src={video?.videoUrl.replace("http://", "https://")}
                type="video/mp4"
              />
            </div>
            <div className="py-4">
              <h1 className={` text-4xl md:text-5xl font-bold`}>
                {video?.title}{" "}
              </h1>
              <p className={``}>
                {video?.subtitle || "A littlee about the album goes here"}
              </p>
            </div>
            <div className="flex gap-2">
              <div className="w-[50px] h-[50px] rounded-full">
                <Image
                  src={"/alb.jpeg"}
                  width={1000}
                  height={1000}
                  alt="alb"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div>
                <h1 className={` font-bold text-lg`}>
                  {video?.user?.userName}
                </h1>
                <div className="flex gap-4">
                  <p className={`text-xs text-gray-400`}>
                    {video?.updatedAt.split("T")[0]}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-4 my-4 border-t border-b border-gray-400">
              <div className="flex items-center gap-2">
                <FaHeart className={``} />
                <p className={``}>{video?.likes.length}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaComment className={``} />
                <p className={``}>{video?.comments?.length}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaEye className={``} />
                <p className={``}>{video?.views.length}</p>
              </div>

              <FaShare className={``} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: video.description }} />
            <div className="space-y-4 my-10">
              <h2 className="md:text-2xl text-xl font-bold">Download</h2>
              <button
                className={`md:w-[40%] w-full py-5 ${
                  isDownloading ? "bg-green-400" : "bg-green-600"
                } text-white flex justify-center items-center gap-2 rounded-2xl border-none transition-colors`}
                onClick={handleDownload}
                disabled={isDownloading}
              >
                <FaFileDownload />
                {isDownloading ? "Initiating Download..." : "Download"}
              </button>
            </div>
          </div>
          <CategoriesHeading title={"Related Videos"} />
          <div className="grid grid-cols-2 gap-4 py-4">
            {artistVideos.slice(0, 1).map((video) => (
              <div key={video.id}>
                <div className="w-full h-[150px] md:h-[300px] relative">
                  <Image
                    src={video?.thumbnail?.url || pld}
                    width={1000}
                    height={1000}
                    alt="blogd"
                    className="w-full h-full object-cover"
                  />
                  <div className="text-white absolute bottom-0 bg-[#000000aa] left-0 p-2 md:p-4">
                    <h1 className="font-bold text-sm md:text-2xl text-white ">
                      {video?.title?.split(" ").slice(0, 3).join(" ")} .....
                    </h1>
                    <p className="md:text-base text-[10px]">
                      {video?.subtitle?.split(" ").slice(0, 6).join(" ") ||
                        "A littlee about the album goes here"}{" "}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" p-4 md:w-2/6">
          {/* TOP ARTIST SECTION */}
          <CategoriesHeading title={"Top 10 Artists"} />
          <div className="flex flex-col gap-2">
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
          </div>
          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>
          {/* TOP PLAYLIST SECTION */}
          <CategoriesHeading title={"Top Playlist"} />{" "}
          <div className="flex flex-col gap-2">
            <TopPlaylist />
            <TopPlaylist />
            <TopPlaylist />
          </div>
          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>
          {/* GET CONNECTED */}
          <CategoriesHeading title={"Get Connected"} />
          <div className="flex justify-between p-4">
            <FaFacebook className="text-3xl text-white" />
            <FaTwitter className="text-3xl text-white" />
            <FaLinkedin className="text-3xl text-white" />
            <FaYoutube className="text-3xl text-white" />
            <FaInstagram className="text-3xl text-white" />
            <FaPinterest className="text-3xl text-white" />
          </div>
          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>
          {/* Recent post section */}
          <CategoriesHeading title={"Receent Post"} />
          <div className=" flex flex-col gap-1 pt-4 ">
            <HomeRecentPost />
          </div>
        </div>
      </section>
    </>
  );
}

export default SingleVideo;
