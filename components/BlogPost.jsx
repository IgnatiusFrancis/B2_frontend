"use client";
import Image from "next/image";

import pld from "@/public/pld.jpeg";
import Link from "next/link";

function BlogPost({ id, title, subtitle, image, updatedAt, author }) {
  const imageUrl = image && image.length > 0 ? image[0]?.url : pld;

  return (
    <>
      <Link
        href={`blogs/${id}`}
        className={` bg-white hover:text-primarycolor transition transition-all duration-500 `}
      >
        <div className="hidden md:block w-full h-[150px] md:h-[300px]">
          <Image
            src={imageUrl}
            width={1000}
            height={1000}
            alt="alb"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 flex flex-col gap-4 w-full">
          <div className="flex gap-2 items-center">
            <div className="w-[20px] h-[20px]">
              <Image
                src={"/alb.jpeg"}
                width={1000}
                height={1000}
                alt="jpe"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h1 className={` md:text-base text-[11px]`}>{author?.userName}</h1>
            <p
              className={`text-primarycolor font-bold md:text-base text-[11px]`}
            >
              Follow
            </p>
          </div>
          <p className={` text-sm md:text-4xl font-bold`}>{title}</p>
          <h1 className={`text-[10px] md:text-base`}>{subtitle}</h1>
          <div className="flex  items-center md:gap-4 gap-2">
            <h1 className={` md:text-base text-[11px]`}>
              {updatedAt?.split("T")[0]}
            </h1>
            <h1 className={` md:text-base text-[11px]`}>6 Mins read</h1>

            <Link
              href={`blogs/${id}`}
              className="text-primarycolor text-[10px] md:text-base"
            >
              Read More
            </Link>
          </div>
        </div>
      </Link>
    </>
  );
}

export default BlogPost;
