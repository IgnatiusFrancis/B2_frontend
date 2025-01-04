"use client";
import Image from "next/image";
import Button from "./Button";
import pld from "@/public/pld.jpeg";
import Link from "next/link";
function Event({ id, title, image, location, date }) {
  return (
    <>
      <div
        className={` flex justify-between hover:bg-gray-100 bg-white transition-colors duration-500 cursor-pointer hover:text-primarycolor`}
      >
        <div className="h-[100px] w-2/12 hidden md:block">
          <Image
            src={image[0].url || pld}
            width={1000}
            height={1000}
            alt="alb"
            className="w-full h-full object-cover"
          />
        </div>

        <div className=" flex  w-full justify-between md:w-10/12 p-4 items-center">
          <div className="">
            <p className={` font-bold md:text-xl text-[14px]`}>{title}</p>
            <p className={` text-[14px] `}>{location}</p>
          </div>

          <div className="hidden md:block">
            <p className="font-bold ">{date?.split("T")[0]}</p>
          </div>
          <Link
            href={`/upcomingevents/${id}`}
            className="text-[14px] px-3 py-2 md:py-2 md:px-8 bg-primarycolor text-white"
          >
            View Event
          </Link>
        </div>
      </div>
    </>
  );
}

export default Event;
