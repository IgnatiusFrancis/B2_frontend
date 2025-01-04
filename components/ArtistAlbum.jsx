"use client";

import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { useContext, useState } from "react";
import { FaDownload, FaHamburger, FaPlay, FaPlus } from "react-icons/fa";
import ArtistSong from "./ArtistSong";
import Link from "next/link";
import pld from "@/public/pld.jpeg";
import axios from "axios";
function ArtistAlbum({
  id,
  title,
  image,
  subTitle,
  audioUrl,
  createdAt,
  publicId,
  artist,
}) {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 w-full ">
        <section className={`flex w-full`}>
          <div className="w-20 h-20 ">
            <Image
              src={image?.url || pld}
              width={1000}
              height={1000}
              alt="artist"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-white flex justify-between items-center p-2 w-full">
            <div className="flex w-4/6">
              <h1 className="font-bold text-[12px] md:text-[16px] w-3/6">
                {title}
              </h1>
              <p className=" md:text-base text-[10px] w-2/6">{artist.name}</p>
              <p className=" text-sm w-1/6">
                {subTitle?.split(" ").slice(0, 5).join(" ")}
              </p>
            </div>
            <div className="flex gap-3 px-4">
              <FaPlay
                onClick={() => setShowPlayer(!showPlayer)}
                className="text-lg cursor-pointer md:block "
              />
              <a
                target="_blank"
                download={audioUrl}
                href={`https://b2xclusive.onrender.com/api/v1/track/download?type=audio&publicId=${publicId}&id=${id}`}
              >
                <FaDownload className="text-lg cursor-pointer  md:block " />
              </a>
            </div>
          </div>
        </section>
        {showPlayer ? (
          <audio
            className="bg-white"
            src={audioUrl.replace("http://", "https://")}
            controls
          />
        ) : (
          ""
        )}{" "}
      </div>
    </>
  );
}

export default ArtistAlbum;
