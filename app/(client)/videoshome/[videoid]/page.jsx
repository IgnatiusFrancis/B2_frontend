"use client";
import Button from "@/components/Button";
import CategoriesHeading from "@/components/CategoriesHeading";
import { toast } from "react-toastify";
import SectionHeader from "@/components/SectionHeader";
import TopMusic from "@/components/TopMusic";
import TopPlaylist from "@/components/TopPlaylist";

import { usePostData } from "@/hooks/usePostData";
import Image from "next/image";
import Link from "next/link";
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
} from "react-icons/fa";
import axios from "axios";

import pld from "@/public/pld.jpeg";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import HomeRecentPost from "@/components/HomeRecentPost";
import { VscLoading } from "react-icons/vsc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function VideoId({ params }) {
  const { videoid } = params;
  const [video, setVideo] = useState("");
  const [allVideo, setAllVideo] = useState([]);
  const [sendingComment, setsendingComment] = useState(false);
  const [comment, setComment] = useState("");
  const [token, setToken] = useState("");
  const url = `https://b2xclusive.onrender.com/api/v1/track/video/${videoid}`;
  const { isLoading, isError, data, refetch } = usePostData(
    "video-comments",
    url,
  );

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/track/video/${videoid}`,
        );

        setVideo(response?.data?.data);
        const allvideoresponse = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/track/videos`,
        );
        setAllVideo(allvideoresponse?.data?.data);
      } catch (error) {
        console.log("error loading videe", error.message);
      }
    };

    fetchdata();
  }, [videoid]);

  useEffect(() => {
    const storedToken = localStorage.getItem("b2xclusiveuser");
    if (storedToken) {
      const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");
      setToken(cleanedToken);
    } else {
      console.error("Bearer token not found");
    }
  }, []);

  // const handleDownload = async () => {
  //   try {
  //     const response = await fetch(video?.videoUrl);
  //     const blob = await response.blob();
  //     const url = URL.createObjectURL(blob);
  //
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = `${video?.title}.mp4`;
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   } catch (error) {
  //     console.log("Error downloading video:", error.message);
  //   }
  // };
  const { user } = useContext(ThemeContext);
  const [showComment, setShowComment] = useState(false);

  if (!video) {
    return (
      <div className="w-full flex justify-center mt-20 ">
        <VscLoading className="text-4xl animate-spin" />
      </div>
    ); // Add a loading state if blog is null
  }

  const handleComment = async (e) => {
    e.preventDefault();
    setsendingComment(true);
    try {
      const formData = new FormData();
      formData.append("comment", comment);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      };
      const commentresponse = await axios.put(
        `https://b2xclusive.onrender.com/api/v1/track/video/${videoid}/comment`,
        formData,
        config,
      );

      setComment("");
      /* window.location.reload(); */
    } catch (error) {
      console.error("Failed to add comment", error.message);
      toast.error(error?.response?.data?.message || "Failed to add comment", {
        position: "top-center",
      });
    } finally {
      setsendingComment(false);
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
            <div dangerouslySetInnerHTML={{ __html: video.description }} />{" "}
            <div className="pt-10">
              <a
                className=" text-[14px] px-3 py-2 rounded-lg md:py-4 md:px-8 bg-primarycolor text-white"
                target="_blank"
                download={video?.videoUrl.replace("http://", "https://")}
                href={`https://b2xclusive.onrender.com/api/v1/track/download?type=video&publicId=${video?.publicId}&id=${video?.id}`}
              >
                downloadddd
              </a>
            </div>{" "}
          </div>
          <CategoriesHeading title={"Related Videos"} />
          <div className="grid grid-cols-2 gap-4 py-4">
            {allVideo.slice(0, 1).map((video) => (
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
          <CategoriesHeading title={"Comments"} />
          <div>
            {video?.comments ? (
              video?.comments.map((comment) => (
                <div key={comment.id} className={`p-4 flex gap-4 `}>
                  <div className="w-[200px]  md:w-[50px] h-[50px]">
                    <Image
                      src={pld}
                      width={1000}
                      height={1000}
                      alt="alb"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div>
                      <h1
                        className={`font-bold text-md md:text-base text-[12px] `}
                      >
                        {comment?.user?.userName}
                      </h1>
                      <p className={` md:text-xs text-gray-400 text-[10px]`}>
                        {comment.createdAt.split("T")[0]}
                      </p>
                    </div>
                    <p className={`md:text-base text-[10px] `}>
                      {comment?.content}{" "}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Comment</p>
            )}
          </div>{" "}
          <div
            onClick={() => {
              if (user === null) {
                toast.error("Please login to drop a comment", {
                  position: "top-center",
                });
              } else {
                setShowComment(true);
              }
            }}
            className="text-white w-fit md:text-base text-[10px] cursor-pointer p-3 border rounded-md bg-primarycolor"
          >
            Add Comment
          </div>
          {showComment ? (
            user === null ? (
              <Link href={"/login"}>Please login to drop a comment</Link>
            ) : (
              <form className="p-4" onSubmit={handleComment}>
                <textarea
                  name="comment"
                  id=""
                  value={comment}
                  cols="10"
                  onChange={(e) => setComment(e.target.value)}
                  rows="10"
                  className={`  w-full h-[100px] border my-2 p-4 bg-white`}
                  placeholder="Type your comments"
                ></textarea>

                <button
                  type="submit"
                  // Use handlePost instead of handleingPost
                  className={`${sendingComment ? "bg-orange-100" : "bg-primarycolor"} text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
                >
                  {sendingComment ? (
                    <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin infinite" />
                  ) : (
                    "send comment"
                  )}
                </button>
              </form>
            )
          ) : (
            ""
          )}{" "}
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
            <TopMusic />
          </div>
          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>
          {/* TOP PLAYLIST SECTION */}
          <CategoriesHeading title={"Top Playlist"} />{" "}
          <div className="flex flex-col gap-2">
            <TopPlaylist />
            <TopPlaylist />
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

export default VideoId;
