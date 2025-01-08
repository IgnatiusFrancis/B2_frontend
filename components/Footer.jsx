


"use client";
import Link from "next/link";
import {
  FaFacebook,
  FaLinkedin,
  FaSoundcloud,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";


function Footer() {


  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-200 py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-700 pb-8">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">© 2024 B2EXCLUSIVE</p>
            <p className="text-sm">All Rights Reserved</p>
          </div>
          <div className="flex gap-6 text-xl">
            <Link href={"#"} className="hover:text-primarycolor">
              <FaFacebook />
            </Link>
            <Link href={"#"} className="hover:text-primarycolor">
              <FaTwitter />
            </Link>
            <Link href={"#"} className="hover:text-primarycolor">
              <FaLinkedin />
            </Link>
            <Link href={"#"} className="hover:text-primarycolor">
              <FaYoutube />
            </Link>
            <Link href={"#"} className="hover:text-primarycolor">
              <FaSoundcloud />
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href={"#"}
            className="text-sm hover:text-primarycolor transition-colors"
          >
            Home
          </Link>
          <Link
            href={"#"}
            className="text-sm hover:text-primarycolor transition-colors"
          >
            Blogs
          </Link>
          <Link
            href={"#"}
            className="text-sm hover:text-primarycolor transition-colors"
          >
            Musics
          </Link>
          <Link
            href={"#"}
            className="text-sm hover:text-primarycolor transition-colors"
          >
            Videos
          </Link>
          <Link
            href={"#"}
            className="text-sm hover:text-primarycolor transition-colors"
          >
            About Us
          </Link>
          <Link
            href={"#"}
            className="text-sm hover:text-primarycolor transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
