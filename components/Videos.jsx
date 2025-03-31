"use client";
import Image from "next/image";
import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";
import pld from "@/public/pld.jpeg";

function Videos({ id, slug, title, artist, subtitle, createdAt, url }) {
  return (
    <div className="group transform hover:-translate-y-2 transition-all duration-500">
      <Link
        prefetch={true}
        href={`/videoshome/${slug || id}`}
        className="bg-white rounded-lg shadow-lg overflow-hidden block h-full hover:shadow-xl transition-all duration-500"
      >
        {/* Image Section */}
        <div className="relative w-full h-[200px] md:h-[250px] lg:h-[300px]">
          <Image
            src={url || pld}
            width={1000}
            height={1000}
            alt="album thumbnail"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FaPlayCircle className="text-white text-4xl" />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-2">
          {/* Title */}
          <h1 className="font-bold text-lg md:text-2xl truncate">{title}</h1>

          {/* Artist and Date */}
          <div className="flex justify-between text-sm md:text-base text-gray-600 mt-2">
            <p>{artist?.name || "Unknown Artist"}</p>
            <span className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm md:text-base mt-2 line-clamp-2">
            {subtitle ||
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Videos;
