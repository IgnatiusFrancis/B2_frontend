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
import TopMusic from "@/components/TopMusic";
import NoContentDesign from "@/components/NoContent";

export default function SearchClient({
  data,
  ContentContainer,
  searchFields,
  topArtists,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (query) => {
    setSearchTerm(query);
    const filtered = data.filter((item) =>
      searchFields.some((field) =>
        item[field]?.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black">
      <section className="w-full md:w-5/6 mx-auto p-6 ">
        {/* Search Container - aligned with content width */}
        <div className="w-full px-4 md:px-8 mb-4">
          <div className="w-full md:w-4/6 rounded-full flex items-center border px-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search here"
              className="flex-1 bg-transparent p-4 text-black outline-none w-full"
            />
            <button className="rounded-full text-white  bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 flex items-center md:text-base text-[12px] py-2 gap-1 px-4 mx-4">
              <FaSearch /> Search
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="w-full px-4 md:px-8">
          <section className="flex flex-col md:flex-row gap-4">
            {/* Main Content */}
            <div className="w-full md:w-4/6">
              {/* Render Content */}
              {ContentContainer && <ContentContainer data={filteredData} />}
            </div>

            {/* Sidebar */}
            <aside className="md:w-1/3 space-y-10 sticky top-16 h-full">
              {/* Top Artists */}
              <div className="bg-gray-800/50 rounded-xl shadow-lg p-6">
                <CategoriesHeading title="Top 5 Artists" />
                <div className="grid grid-cols-1 gap-4 mt-6">
                  {topArtists?.map((artist, index) => (
                    <TopMusic
                      key={artist.id}
                      topArtists={artist}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              <div className="hidden md:block">
                <CategoriesHeading title={"Feel The Beat"} />
                <div className="w-full">
                  <NoContentDesign />
                </div>
              </div>
            </aside>
          </section>
        </div>
      </section>
    </div>
  );
}
