"use client";

import RecentPost from "./RecentPost";

import { usePostData } from "@/hooks/usePostData";
function HomePost() {
  const url = "https://b2xclusive.onrender.com/api/v1/post/posts";
  const { isLoading, isError, data } = usePostData("homeposts", url);

  if (isError)
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
      <div className="grid md:grid-cols-2 gap-4 py-4 w-full">
        {data?.data?.data?.slice(0, 6).map((post) => (
          <RecentPost key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}

export default HomePost;
