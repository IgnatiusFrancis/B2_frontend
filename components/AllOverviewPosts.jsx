// "use client";

// import { useMemo, useState } from "react";
// import PostContent from "./PostContent";
// import NoContentAvailable from "./NoAvailableContent";

// function AllOverviewPost({ posts = [] }) {

//   const dataPerPage = 8;
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(posts.length / dataPerPage);

//   const currentposts = useMemo(() => {
//     const indexOfLastData = currentPage * dataPerPage;
//     const indexOfFirstData = indexOfLastData - dataPerPage;
//     return posts.slice(indexOfFirstData, indexOfLastData);
//   }, [currentPage, posts]);

//   if (!posts || posts.length === 0) {
//     return (
//       <NoContentAvailable
//         title="No posts Found"
//         message="It seems there are no posts available at the moment. Please check back later."
//       />
//     );
//   }

//   return (
//     <>
//       <div>
//         {currentposts?.map((post) => (
//           <PostContent key={post?.id} {...post} />
//         ))}

//         <div className="flex justify-center mt-4 gap-2">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2"
//           >
//             Previous
//           </button>
//           {Array.from({ length: totalPages }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentPage(index + 1)}
//               className={`border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2 ${
//                 currentPage === index + 1 ? "bg-gray-100" : ""
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="bg-primarycolor text-white px-4 py-2 rounded-md ml-2"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AllOverviewPost;

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
