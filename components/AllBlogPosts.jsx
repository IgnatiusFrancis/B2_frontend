"use client";
import { useEffect, useState } from "react";
import BlogPost from "./BlogPost";
import NoContentAvailable from "./NoAvailableContent";

function AllBlogPosts({ data: posts }) {
  const postsPerPage = 9; // Changed to 9 for 3x3 grid
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const newPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPosts(newPosts);
  }, [currentPage, posts]);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (!posts || posts.length === 0) {
    return (
      <NoContentAvailable
        title="No Posts Found"
        message="It seems there are no posts available at the moment. Please check back later."
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts?.map((post, index) => (
          <div
            key={post.id}
            className="opacity-1 animate-[fadeInUp_0.5s_ease-out_forwards] "
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <BlogPost
              id={post.id}
              title={post.title}
              subtitle={post.subtitle}
              url={post.url}
              updatedAt={post.updatedAt}
              author={post.author}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12 gap-2">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 rounded-md text-sm font-medium
              ${
                currentPage === index + 1
                  ? "bg-primarycolor text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md bg-primarycolor text-white text-sm font-medium hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllBlogPosts;
