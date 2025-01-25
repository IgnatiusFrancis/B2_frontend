"use client";
import Image from "next/image";

import pld from "@/public/pld.jpeg";
import Link from "next/link";

function BlogPost({ id, title, subtitle, url, updatedAt, author }) {
  const imageUrl = url ? url : pld;

  return (
    <div className="group transform hover:-translate-y-2 transition-all duration-500">
      <Link
        href={`blogs/${id}`}
        className=" bg-gray-800/50 rounded-lg shadow-lg overflow-hidden block h-full hover:shadow-xl transition-all duration-500"
      >
        <div className="hidden md:block w-full h-[200px]">
          <Image
            src={imageUrl}
            width={1000}
            height={1000}
            alt="blog cover"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-6 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-[24px] h-[24px]">
              <Image
                src={"/alb.jpeg"}
                width={1000}
                height={1000}
                alt="author"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="text-sm text-gray-600">{author?.userName}</span>
            {/* <span className="text-gray-200 font-medium text-sm ml-auto">
              Follow
            </span> */}
          </div>

          <h2 className="text-xl font-bold line-clamp-2 group-hover:text-primarycolor transition-colors duration-300 text-gray-200">
            {title}
          </h2>

          <p className="text-gray-600 text-sm line-clamp-2">{subtitle}</p>

          <div className="flex items-center gap-4 mt-auto pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              {new Date(updatedAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-sm text-gray-500">6 min read</span>
            <span className="text-gray-200 text-sm ml-auto">Read More →</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BlogPost;
