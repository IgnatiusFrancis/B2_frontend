"use client";
import axios from "axios";
import useSWR from "swr";
import RecentPost from "./RecentPost";
import { useEffect, useState } from "react";

function HomeRecentPost() {
  const [allPost, setAllPost] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          "https://b2xclusive.onrender.com/api/v1/post/posts",
        );
        setAllPost(response?.data?.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message || "Error fetching posts");
        setIsLoading(false);
      }
    };
    fetchdata();
  }, []);

  if (error)
    return (
      <div>
        <p className="text-red-500 font-bold">Error Fetching Posts</p>
      </div>
    );
  if (isLoading)
    return (
      <div className="w-full py-4">
        <div className="h-20 w-full bg-gray-300 animate-pulse rounded-lg "></div>
      </div>
    );

  return (
    <>
      <div className=" flex flex-col gap-1 pt-4 ">
        {allPost &&
          allPost
            ?.slice(0, 3)
            .map((post) => <RecentPost key={post.id} {...post} />)}
      </div>
    </>
  );
}

export default HomeRecentPost;
