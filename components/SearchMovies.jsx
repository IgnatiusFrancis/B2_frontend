"use client";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const SearchMovies = ({ onSearch, onClearSearch }) => {
  const [searchTerm, setSearchTerm] = useState(""); 
// check this later 
// ./components/SearchMovies.jsx
// 38:6  Warning: React Hook useEffect has a missing dependency: 'onClearSearch'. Either include it or remove the dependency array. If 'onClearSearch' changes too often, find the parent component that defines it and wrap that definition in useCallback.  react-hooks/exhaustive-deps
// ./components/SingleEventClient.jsx
// 133:63  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities


const fetchSearchResults = async () => {
    if (searchTerm.trim() === "") {
      onClearSearch(); // Reset to default components when input is empty
      return;
    }

    const url = `https://b2xclusive.onrender.com/api/v1/track/search?page=1&limit=10&search=${encodeURIComponent(
      searchTerm
    )}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "Success") {
        onSearch(data.data.movies || []);
      } else {
        console.error("Error fetching search results:", data.message);
        onSearch([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      onSearch([]);
    }
  };

  // Use effect to listen for changes in the searchTerm
  useEffect(() => {
    if (searchTerm.trim() === "") {
      onClearSearch(); // Reset to default components when input is empty
    }
  }, [searchTerm]); // Trigger only when searchTerm changes

  return (
    <section className="w-full md:w-5/6 mx-auto p-4">
      <div className="md:w-4/6 rounded-full flex items-center border border-gray-300">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search here"
          className="w-11/12 bg-transparent p-4 outline-none text-gray-700"
        />
        <button
          onClick={fetchSearchResults}
          className="rounded-full text-white bg-primarycolor flex items-center md:text-base text-[12px] py-2 gap-1 px-4 mr-2 hover:bg-primarycolor-dark transition"
        >
          <FaSearch /> Search
        </button>
      </div>
    </section>
  );
};

export default SearchMovies;
