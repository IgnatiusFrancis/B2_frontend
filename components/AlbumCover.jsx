"use client";
import React from "react";
import Image from "next/image";
import { Play, Heart } from "lucide-react";

const AlbumCover = ({ album }) => {
  const { title, url } = album;
  const artist = album?.artist?.name;

  return (
    <div className="group relative h-[250px] md:h-[400px] overflow-hidden rounded-xl">
      {/* Album Image */}
      <Image
        src={url || "/albumcover.jpeg"}
        width={1000}
        height={1000}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Album Info - Slides up on Hover */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex justify-between items-end">
          <div className="text-white">
            <h1 className="text-lg font-bold mb-1">{title}</h1>
            <p className="text-sm text-gray-300">{artist}</p>
          </div>
          <button className="text-white hover:scale-110 transition-transform duration-200">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlbumCover;
