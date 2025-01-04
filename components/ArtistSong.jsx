"use client";
import Image from "next/image";
import { FaDownload, FaHamburger, FaPlay } from "react-icons/fa";
import Link from "next/link";
import pld from "@/public/pld.jpeg";
import { useState } from "react";

import { LuLoader2 } from "react-icons/lu";
import { VscLoading } from "react-icons/vsc";
function ArtistSong({ title, image, artist, createdAt, audioUrl, duration }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const handleDownload = async () => {
    try {
      setDownloading(true);
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${title}.mp3`;
      anchor.click();

      // Clean up by revoking the URL object
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download audio:", error);
      // Handle error
    } finally {
      setDownloading(false); // Reset downloading state to false after download completes
    }
  };
  return (
    <>
      <div>
        <div
          className={` bg-white flex md:flex-row flex-col gap-4 md:items-center  border-b border-gray-50`}
        >
          <div className={`bg-gray-50 md:block hidden p-3`}>
            <div className="w-[50px] h-[50px] rounded-full">
              <Image
                src={image?.url || pld}
                width={1000}
                height={1000}
                alt="alb"
                className="w-full h-full rounded-full"
              />
            </div>
          </div>
          <div className={` flex gap-4 md:w-6/12 items-center `}>
            <FaPlay
              className="cursor-pointer "
              onClick={() => setShowPlayer(!showPlayer)}
            />
            <h1 className={` font-bold`}>{title}</h1>
          </div>

          <div className="flex gap-4 md:w-3/12 ">
            <h1 className={``}>{artist?.name}</h1>
            <h1 className={``}>{duration || "00:00"}</h1>
          </div>

          <div className="flex gap-4 items-center md:w-3/12 ">
            <h1 className={` md:block hidden`}>{createdAt.split("T")[0]}</h1>
            {downloading ? (
              <VscLoading className="animate-spin " />
            ) : (
              <FaDownload onClick={handleDownload} className="cursor-pointer" />
            )}
          </div>
        </div>
        {showPlayer ? <audio className="" src={audioUrl} controls /> : ""}{" "}
      </div>{" "}
    </>
  );
}

export default ArtistSong;
