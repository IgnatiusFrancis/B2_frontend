"use client";

import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSearch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import AllBlogPosts from "@/components/AllBlogPosts";
import CategoriesHeading from "@/components/CategoriesHeading";
import TopPlaylist from "@/components/TopPlaylist";

export default function SearchClient({ posts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(posts);

  const handleSearch = (query) => {
    setSearchTerm(query);
    const filtered = posts.filter((post) =>
      ["title", "author"].some((field) =>
        post[field]?.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
    <section className="w-full md:w-5/6 mx-auto p-6">
      {/* Search Container - aligned with content width */}
      <div className="w-full px-4 md:px-8 mb-4">
        <div className="w-full md:w-4/6 rounded-full flex items-center border">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search here"
            className="flex-1 bg-transparent p-4 text-black outline-none w-full"
          />
          <button className="rounded-full text-white bg-primarycolor flex items-center md:text-base text-[12px] py-2 gap-1 px-4 mx-4">
            <FaSearch /> Search
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full px-4 md:px-8">
        <section className="flex flex-col md:flex-row gap-4">
          {/* Main Content */}
          <div className="w-full md:w-4/6">
            <AllBlogPosts posts={filteredData.length > 0 ? filteredData : posts} />
          </div>

          {/* Sidebar */}
          <aside className="w-full md:w-2/6">
            <CategoriesHeading title="Top Playlists" />
            <div className="grid grid-cols-2 md:flex md:flex-col gap-2">
              <TopPlaylist />
              <TopPlaylist />
              <TopPlaylist />
              <TopPlaylist />
            </div>

            <div className="my-8 w-full h-[3px] bg-primarycolor"></div>

            <CategoriesHeading title="Get Connected" />
            <div className="flex justify-between p-4">
              <FaFacebook className="text-3xl" />
              <FaTwitter className="text-3xl" />
              <FaLinkedin className="text-3xl" />
              <FaYoutube className="text-3xl" />
              <FaInstagram className="text-3xl" />
              <FaPinterest className="text-3xl" />
            </div>

            <div className="my-8 w-full h-[3px] bg-primarycolor"></div>
          </aside>
        </section>
      </div>
    </section>
  );
}