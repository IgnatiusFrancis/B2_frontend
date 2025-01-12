"use client";
import Image from "next/image";

import pld from "@/public/pld.jpeg";
import Link from "next/link";

function BlogPost({ id, title, subtitle, url, updatedAt, author }) {
  const imageUrl = url ?url: pld; 

  // return (
  //   <>
  //     <Link
  //       href={`blogs/${id}`}
  //       className={` bg-white hover:text-primarycolor transition-all duration-500 `}
  //     >
  //       <div className="hidden md:block w-full h-[150px] md:h-[300px]">
  //         <Image
  //           src={imageUrl}
  //           width={1000}
  //           height={1000}
  //           alt="alb"
  //           className="w-full h-full object-cover"
  //         />
  //       </div>

  //       <div className="p-4 flex flex-col gap-4 w-full">
  //         <div className="flex gap-2 items-center">
  //           <div className="w-[20px] h-[20px]">
  //             <Image
  //               src={"/alb.jpeg"}
  //               width={1000}
  //               height={1000} 
  //               alt="jpe"
  //               className="w-full h-full object-cover rounded-full"
  //             />
  //           </div>
  //           <h1 className={` md:text-base text-[11px]`}>{author?.userName}</h1>
  //           <p
  //             className={`text-primarycolor font-bold md:text-base text-[11px]`}
  //           >
  //             Follow
  //           </p>
  //         </div>
  //         <p className={` text-sm md:text-4xl font-bold`}>{title}</p>
  //         <h1 className={`text-[10px] md:text-base`}>{subtitle}</h1>
  //         <div className="flex  items-center md:gap-4 gap-2">
  //           <h1 className={` md:text-base text-[11px]`}>
  //             {updatedAt?.split("T")[0]}
  //           </h1>
  //           <h1 className={` md:text-base text-[11px]`}>6 Mins read</h1>

  //           <Link
  //             href={`blogs/${id}`}
  //             className="text-primarycolor text-[10px] md:text-base"
  //           >
  //             Read More
  //           </Link>
  //         </div>
  //       </div>
  //     </Link>
  //   </>
  // );

console.log( id, title, subtitle, url, updatedAt, author )

  return (
    <div className="group transform hover:-translate-y-2 transition-all duration-500">
      <Link
        href={`blogs/${id}`}
        className="bg-white rounded-lg shadow-lg overflow-hidden block h-full hover:shadow-xl transition-all duration-500"
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
            <span className="text-primarycolor font-medium text-sm ml-auto">
              Follow
            </span>
          </div>
          
          <h2 className="text-xl font-bold line-clamp-2 group-hover:text-primarycolor transition-colors duration-300">
            {title}
          </h2>
          
          <p className="text-gray-600 text-sm line-clamp-2">{subtitle}</p>
          
          <div className="flex items-center gap-4 mt-auto pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-500">
              {updatedAt?.split("T")[0]}
            </span>
            <span className="text-sm text-gray-500">6 min read</span>
            <span className="text-primarycolor text-sm ml-auto">Read More →</span>
          </div>
        </div>
      </Link>
    </div>
  );





}

export default BlogPost;
