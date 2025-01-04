"use client";
import Button from "@/components/Button";
import CategoriesHeading from "@/components/CategoriesHeading";
import Comments from "@/components/Comments";
import RelatedArticles from "@/components/RelatedArticles";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import {
  FaComment,
  FaEye,
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaShare,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import axios from "axios";
import { VscLoading } from "react-icons/vsc";
import pld from "@/public/pld.jpeg";
import { toast } from "react-toastify";
import Link from "next/link";
import { ThemeContext } from "@/context/ThemeContext";
import Blogs from "../page";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import TopMusic from "@/components/TopMusic";
import HomeRecentPost from "@/components/HomeRecentPost";
function SingleBlog({ params }) {
  const { blogId } = params;
  const router = useRouter();
  const { user } = useContext(ThemeContext);
  const [showComment, setShowComment] = useState(false);
  const [sendingComment, setsendingComment] = useState(false);
  const [comment, setComment] = useState("");

  const [blog, setBlog] = useState("");
  const [allPost, setAllPost] = useState([]);
  const [token, setToken] = useState("");
  const [like, setLike] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("b2exclusiveuser");
    if (storedToken) {
      const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");
      setToken(cleanedToken);
    } else {
      console.error("Bearer token not found");
    }
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/post/${blogId}`,
        );

        setBlog(response?.data?.data);

        const allpostresponse = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/post/posts`,
        );
        setAllPost(allpostresponse?.data?.data);
      } catch (error) {
        console.error("Failed to fethc blog post", error.message);
        toast.error(
          error?.response?.data?.message || "Failed to fecthblog post",
          {
            position: "top-center",
          },
        );
      }
    };

    fetchdata();
  }, [blogId]);

  if (!blog) {
    return (
      <div className="w-full flex justify-center mt-20 ">
        <VscLoading className="text-4xl animate-spin" />
      </div>
    ); // Add a loading state if blog is null
  }

  const handleLike = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const like = await axios.put(
        `https://b2xclusive.onrender.com/api/v1/post/${blogId}/like`,
        config,
      );

      setLike(false); // Update local state to reflect unliked status
      toast.success(like?.response?.data?.message, { position: "top-center" });

      // Check if the post has already been liked
    } catch (error) {
      console.error("Failed to handle like/unlike", error.message);
      toast.error(
        error?.response?.data?.message || "Failed to handle like/unlike",
        { position: "top-center" },
      );
    }
  };

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
        `https://b2xclusive.onrender.com/api/v1/post/comment/${blogId}`,
        formData,
        config,
      );

      setComment("");
      window.location.reload();
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
      <SectionHeader title={blog?.title} desc={blog?.subtitle} />
      <section className="w-full p-4 md:w-4/5 md:mx-auto flex gap-10">
        <div className="md:w-4/6">
          <div className="flex flex-col gap-2 md:gap-6">
            <div className="py-4 flex flex-col gap-4">
              <h1 className={`text-black text-3xl md:text-5xl font-bold`}>
                {blog.title}
              </h1>
              <p className={``}>{blog.subtitle}</p>
            </div>
            <div className="flex gap-2">
              <div className="w-[50px] h-[50px] rounded-full">
                <Image
                  src={pld}
                  width={1000}
                  height={1000}
                  alt="alb"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div>
                <h1 className={` font-bold text-lg`}>
                  {blog?.author?.userName}
                </h1>
                <div className="flex gap-4">
                  <p className={``}>{blog?.updatedAt.split("T")[0]}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-4 my-4 border-t border-b border-gray-400">
              <div className="flex items-center gap-2">
                <div onClick={handleLike}>
                  {like ? (
                    <FaHeart className={`text-primarycolor`} />
                  ) : (
                    <FaHeart className={``} />
                  )}{" "}
                </div>{" "}
                <p className={``}>{blog?.likes.length}</p>
              </div>
              <div className="flex items-center gap-2">
                <FaComment className={``} />
                <p className={``}>{blog.comment.length}</p>
              </div>

              <div className="flex items-center gap-2">
                <FaEye className={``} />
                <p className={``}>{blog?.views.length}</p>
              </div>

              <FaShare className={``} />
            </div>
            <div className="w-full h-[300px] md:h-[600px]">
              <Image
                src={blog?.image?.length > 0 ? blog?.image[0]?.url : pld}
                width={2000}
                height={2000}
                alt="alb"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="text-2xl py-6"
              dangerouslySetInnerHTML={{
                __html:
                  blog?.description?.split(" ").slice(0, 20).join(" ") + "...",
              }}
            />{" "}
          </div>
          <CategoriesHeading title={"Related Articles by Tags"} />
          <div className="grid grid-cols-2 gap-4 py-4">
            {allPost.slice(0, 1).map((blog) => (
              <RelatedArticles key={blog.id} {...blog} />
            ))}
          </div>
          <CategoriesHeading title={"Comments"} />
          <div>
            {blog?.comment ? (
              blog?.comment.map((comment) => (
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
          {showComment &&
            user !==
              null(
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
                </form>,
              )}
        </div>
        <div className="md:w-2/6">
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

export default SingleBlog;
