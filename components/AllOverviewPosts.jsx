// AllOverviewPost.jsx
"use client";
import { useMemo, useState } from "react";
import PostContent from "./PostContent";
import NoContentAvailable from "./NoAvailableContent";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function AllOverviewPost({ posts = [] }) {
  const dataPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(posts.length / dataPerPage);

  const currentPosts = useMemo(() => {
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    return posts.slice(indexOfFirstData, indexOfLastData);
  }, [currentPage, posts]);

  if (!posts || posts.length === 0) {
    return (
      <NoContentAvailable
        title="No posts Found"
        message="It seems there are no posts available at the moment. Please check back later."
      />
    );
  }

  return (
    <div className="flex flex-col">
      <div className="divide-y divide-gray-100">
        {currentPosts?.map((post) => (
          <PostContent key={post?.id} {...post} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 p-4">
        <button
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "border border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default AllOverviewPost;
