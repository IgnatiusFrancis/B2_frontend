"use client";
import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaPlayCircle, FaPlus } from "react-icons/fa";
import pld from "@/public/pld.jpeg";
function Videos({ id, title, artist, subtitle, createdAt, thumbnail }) {
  return (
    <>
      <Link
        href={`/videoshome/${id}`}
        className="md:flex md:items-center  bg-white w-full"
      >
        <div className="w-full  md:w-1/2 h-[300px] md:h-[200px] relative ">
          <Image
            src={thumbnail?.url || pld}
            width={1000}
            height={1000}
            alt="alb"
            className="w-full h-full object-cover"
          />
          <div className="bg-[#00000084] absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center ">
            <FaPlayCircle className="text-white text-3xl" />
          </div>
        </div>

        <div className=" p-4 w-full md:w-1/2">
          <h1 className={` font-bold text-2xl`}>{title}</h1>

          <div className="flex justify-between ">
            <p className={``}>{artist?.name} </p>
            <p>{createdAt?.split("T")[0]}</p>
          </div>

          <p className="text-gray-600 text-xs">
            {subtitle
              ? subtitle?.split(" ").slice(0, 20).join(" ")
              : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, ..... "}{" "}
          </p>
        </div>
      </Link>
    </>
  );
}

export default Videos;
