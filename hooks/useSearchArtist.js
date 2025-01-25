"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchComponent({
  data,
  ContentContainer,
  searchFields,
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
    <section>
      {/* Search Container */}
      <div className="w-full px-4 md:px-8 mb-4">
        <div className="mx-auto md:w-4/6 rounded-full flex items-center border px-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search here"
            className="flex-1 bg-transparent p-4 text-white outline-none w-full"
          />
          <button className="rounded-full text-white  bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 flex items-center md:text-base text-[12px] py-2 gap-1 px-4 mx-4">
            <FaSearch /> Search
          </button>
        </div>
      </div>

      {/* Render Content */}
      {ContentContainer && <ContentContainer data={filteredData} />}
    </section>
  );
}
