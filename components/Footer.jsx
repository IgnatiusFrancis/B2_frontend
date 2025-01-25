"use client";
import Link from "next/link";
import {
  FaFacebook,
  FaLinkedin,
  FaSoundcloud,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-200 py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-700 pb-8">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">© 2024 B2TRENDS</p>
            <p className="text-sm">All Rights Reserved</p>
          </div>
          <div className="flex gap-6 text-xl">
            <Link
              href={
                "https://www.facebook.com/share/1RNuYmnfbq/?mibextid=wwXIfr"
              }
              className="hover:text-primarycolor"
            >
              <FaFacebook />
            </Link>
            <Link
              href={"https://wa.me/message/DTRMTVSWSEOAP1"}
              className="hover:text-primarycolor"
            >
              <FaWhatsapp />
            </Link>
            <Link
              href={
                "https://www.instagram.com/b2xclusive?igsh=ZG01eTAxZ2cxaG5p"
              }
              className="hover:text-primarycolor"
            >
              <FaInstagram />
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href={"/"}
            className="text-sm hover:text-primarycolor transition-colors"
          >
            Home
          </Link>
          <Link
            href={"/blogs"}
            className="text-sm hover:text-primarycolor transition-colors"
          >
            Blogs
          </Link>
          <Link
            href={"/upcomingevents"}
            className="text-sm hover:text-primarycolor transition-colors"
          >
            Events
          </Link>
          <Link
            href={"/artists"}
            className="text-sm hover:text-primarycolor transition-colors"
          >
            Artists
          </Link>
          <Link
            href={"/musics"}
            className="text-sm hover:text-primarycolor transition-colors"
          >
            Musics
          </Link>
          <Link
            href={"/videoshome"}
            className="text-sm hover:text-primarycolor transition-colors"
          >
            Videos
          </Link>
          <Link
            href={"/movieshome"}
            className="text-sm hover:text-primarycolor transition-colors"
          >
            Movies
          </Link>
          <Link
            href={"/about"}
            className="text-sm hover:text-primarycolor transition-colors"
          >
            About Us
          </Link>
          <Link
            href={"/contact"}
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
