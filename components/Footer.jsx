"use client";
import Link from "next/link";
import {
  FaFacebook,
  FaLinkedin,
  FaSoundcloud,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import FlickerFeed from "@/components/FlickrFeed";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div className="bg-primarycolor p-20 ">
        <div className="flex flex-col items-center">
          <p className="text-white">© 2024 B2EXCLUSIVE. All Right Reserved. </p>
          <div className="flex">
            <Link
              className="text-white  rounded-lg text-[11px] py-1 px-2  hover:bg-primarycolor"
              href={"#"}
            >
              Home
            </Link>
            <Link
              className="text-white text-[11px] py-1 px-2  hover:bg-primarycolor rounded-lg"
              href={"#"}
            >
              Blogs
            </Link>
            <Link
              className="text-white text-[11px] py-1 px-2  hover:bg-primarycolor rounded-lg"
              href={"#"}
            >
              Musics
            </Link>
            <Link
              className="text-white text-[11px] py-1 px-2  hover:bg-primarycolor rounded-lg"
              href={"#"}
            >
              Videos
            </Link>
            <Link
              className="text-white text-[11px] py-1 px-2  hover:bg-primarycolor rounded-lg"
              href={"#"}
            >
              About Us
            </Link>
            <Link
              className="text-white text-[11px] py-1 px-2  hover:bg-primarycolor rounded-lg"
              href={"#"}
            >
              Contact Us
            </Link>
            {/* <Link */}
            {/*   className="text-white text-[11px] py-1 px-2  hover:bg-primarycolor rounded-lg" */}
            {/*   href={"/adminlogin"} */}
            {/* > */}
            {/*   Admin */}
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
