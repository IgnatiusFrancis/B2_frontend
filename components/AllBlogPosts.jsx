"use client";
import { useEffect, useState } from "react";
import BlogPost from "./BlogPost";
import NoContentAvailable from "./NoAvailableContent";

function AllBlogPosts({ data: posts }) {

  if (!posts || posts.length === 0) {
    return (
      <NoContentAvailable
        title="No Posts Found"
        message="It seems there are no posts available at the moment. Please check back later."
      />
    );
  }

  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState(posts);

  // Handle page change and filter posts based on the current page
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Update the current posts based on the selected page
  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const newPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPosts(newPosts); 
  }, [currentPage, posts]); // Recalculate posts whenever currentPage or posts change

  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <>
      <div>
        <div className="p-4 md:p-0 grid gap-4">
        {currentPosts?.map((post) => (
          <BlogPost  
          key={post.id}
          id={post.id}
          title={post.title}
          url={post.url}
          location={post.location}
          date={post.date}
          /> 
        ))}
        </div>

        <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border text-[10px] md:text-base border-gray-500 text-gray-500 px-2 md:px-4 md:py-2 rounded-md mr-2"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`border border-gray-500 text-primarycolor md:text-base text-[10px] px-4 py-2 rounded-md mx-1 ${
              currentPage === index + 1 ? "bg-gray-100" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-primarycolor text-white px-4 py-2 md:text-base text-[10px] rounded-md ml-2"
        >
          Next
        </button>
      </div>
      </div>
    </>
  );
}

export default AllBlogPosts;
