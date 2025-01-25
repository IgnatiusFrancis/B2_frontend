"use client";
import Image from "next/image";
import Link from "next/link";
import pld from "@/public/pld.jpeg";

function RecentPost({ id, title, updatedAt, url }) {
  const imageUrl = url ? url : pld;

  return (
    <Link
      href={`/blogs/${id}`}
      prefetch={true}
      className="relative group flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
    >
      {/* Image Section */}
      <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-primarycolor transition-all duration-300">
        <Image
          src={imageUrl}
          width={1000}
          height={1000}
          alt={title || "Blog Post"}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-between flex-1">
        <h1 className="font-bold text-md text-gray-800 group-hover:text-primarycolor transition-colors duration-300">
          {title || "Untitled Post"}
        </h1>
        <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
          Click to read more
        </p>
      </div>

      {/* Date Label */}
      {updatedAt && (
        <div className="absolute bottom-2 right-2  bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
          {new Date(updatedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      )}
    </Link>
  );
}

export default RecentPost;
