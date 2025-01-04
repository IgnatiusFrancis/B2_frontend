"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
function Comments() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className={`p-4 flex gap-4 ${theme}-text`}>
        <div className="w-[200px]  md:w-[50px] h-[50px]">
          <Image
            src={"/alb.jpeg"}
            width={1000}
            height={1000}
            alt="alb"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <h1
              className={`font-bold text-md md:text-base text-[12px] ${theme}-text`}
            >
              Brain Deo
            </h1>
            <p className={`${theme}-text md:text-base text-[10px]`}>
              15-10-2024
            </p>
          </div>
          <p className={`md:text-base text-[10px] ${theme}-text`}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
            cumque voluptates aperiam tempora nostrum adipisci voluptatem
            numquam dolorem a quisquam?
          </p>
          <Link
            href={"#"}
            className="text-primarycolor md:text-base text-[10px]"
          >
            Reply
          </Link>

          <div className={`p-4 flex gap-4 ${theme}-text`}>
            <div className="w-[200px]  md:w-[50px] h-[50px]">
              <Image
                src={"/alb.jpeg"}
                width={1000}
                height={1000}
                alt="alb"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <h1
                  className={`font-bold text-md md:text-base text-[12px] ${theme}-text`}
                >
                  Brain Deo
                </h1>
                <p className={`${theme}-text md:text-base text-[10px]`}>
                  15-10-2024
                </p>
              </div>
              <p className={`md:text-base text-[10px] ${theme}-text`}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                cumque voluptates aperiam tempora nostrum adipisci voluptatem
                numquam dolorem a quisquam?
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Comments;
