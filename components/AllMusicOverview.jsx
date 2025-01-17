// AllMusicOverview.jsx
"use client";
import { useMemo, useState } from "react";
import MusicOverview from "@/components/MusicOverview";
import NoContentAvailable from "./NoAvailableContent";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function AllMusicOverview({ audios = [] }) {
  const dataPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(audios.length / dataPerPage);

  const currentAudios = useMemo(() => {
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    return audios.slice(indexOfFirstData, indexOfLastData);
  }, [currentPage, audios]);

  if (!audios || audios.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="divide-y divide-gray-100">
        {currentAudios?.map((music) => (
          <MusicOverview key={music?.id} {...music} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 p-4">
        <button
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-lg transition-colors ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "border border-gray-200 hover:bg-gray-50"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default AllMusicOverview;
