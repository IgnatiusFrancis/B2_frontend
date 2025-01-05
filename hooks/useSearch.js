"use client";

import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaSearch, FaTwitter, FaYoutube } from "react-icons/fa";
import AllBlogPosts from "@/components/AllBlogPosts";
import CategoriesHeading from "@/components/CategoriesHeading";
import TopPlaylist from "@/components/TopPlaylist";

export default function SearchClient({ posts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(posts);

  // Handle search input change
  const handleSearch = (query) => {
    setSearchTerm(query);

    // Filter posts based on search term (in title and author fields)
    const filtered = posts.filter((post) =>
      ["title", "author"].some((field) =>
        post[field]?.toString().toLowerCase().includes(query.toLowerCase())
      )
    );

    setFilteredData(filtered);
  };

  return (
    <section className="w-full md:w-5/6 mx-auto p-4">
      <div className="flex gap-4 w-full">
        <div className="md:w-4/6 rounded-full flex items-center z-10 border">
          {/* Input for search */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search here"
            className="w-11/12 bg-transparent p-4 text-black outline-none"
          />
          <button className="rounded-full text-white bg-primarycolor flex items-center md:text-base text-[12px] py-2 gap-1 px-4 mr-2">
            <FaSearch /> Search
          </button>
        </div>
      </div>

      {/* Show filtered posts or fallback to default posts */}
      <section className="mt-8">
        {filteredData.length > 0 ? (
            <section className="w-full md:w-5/6 mx-auto p-4">
            <div className="flex gap-4 w-full">
          <section className=" md:w-5/6 md:p-8 mx-auto md:flex md:gap-4">
          <div className="w-full md:w-full">
            <div>
              <AllBlogPosts posts={filteredData}/>
            </div>
          </div>
          <div className=" p-4 md:w-2/5">
            <CategoriesHeading title={"Top Playlists"} />
  
            <div className="grid grid-cols-2 md:flex md:flex-col gap-2">
              <TopPlaylist /> 
              <TopPlaylist />
              <TopPlaylist />
              <TopPlaylist />
            </div>
  
            <div className="my-8 w-full h-[3px] bg-primarycolor"></div>
  
            <CategoriesHeading title={"Get Connected"} />
  
            <div className="flex justify-between p-4">
              <FaFacebook className={`text-3xl `} />
              <FaTwitter className={` text-3xl `} />
              <FaLinkedin className={`text-3xl `} />
              <FaYoutube className={` text-3xl `} />
              <FaInstagram className={` text-3xl `} />
              <FaPinterest className={` text-3xl `} />
            </div>
  
            <div className="my-8 w-full h-[3px] bg-primarycolor"></div>
  
            {/* <CategoriesHeading title={"Recent Posts"} /> */}
  
            {/* <div className=" flex flex-col gap-1 pt-4 ">
              <div>
                <HomeRecentPost />
              </div>{" "}
            </div> */}
          </div>
        </section>
        </div>
        </section>
        ) : (
          <AllBlogPosts posts={posts} />
        )}
      </section>
    </section>
  );
}
