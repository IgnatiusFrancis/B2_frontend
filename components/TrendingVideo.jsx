"use client";
import Image from "next/image";
import pld from "@/public/pld.jpeg";
import Link from "next/link";

function TrendingVideos({ id, title, date, url, artist }) {
  const imageUrl = url ? url : pld;

  return (
    <Link href={`/videoshome/${id}`}>
      <div className="group relative bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
        {/* Artist Label/Badge */}
        {artist.isTopArtist && (
          <div className="absolute top-2 right-2  bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
            Trending
          </div>
        )}

        {/* Card Content */}
        <div className="flex items-center gap-4">
          {/* Circular Image with hover effect */}
          <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-primarycolor transition-all duration-300">
            <Image
              src={imageUrl}
              width={1000}
              height={1000}
              alt={artist.name || "Artist"}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Artist and Video Information */}
          <div className="flex flex-col justify-between">
            <h1 className="font-bold text-lg text-gray-800 group-hover:text-primarycolor transition-colors duration-300">
              {title?.split(" ").slice(0, 3).join(" ") || "Test Title"}
            </h1>
            <p className="text-sm text-gray-600">
              {artist.name || "Unknown Artist"}
            </p>
            {/* <p className="text-xs text-gray-500">{date?.split("T")[0] || "Unknown Date"}</p> */}
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-3 text-sm text-gray-700">
          {artist.bio?.split(" ").slice(0, 20).join(" ") || "No bio available"}
          ...
        </div>
      </div>
    </Link>
  );
}

export default TrendingVideos;
