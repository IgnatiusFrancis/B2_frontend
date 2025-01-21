"use client";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ArtistCard from "./ArtistCard";
import NoContentAvailable from "./NoAvailableContent";
import ArtistContent from "./ArtistContent";

const AllArtistOverview = ({ artists = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 8;

  const { currentArtists, totalPages } = useMemo(() => {
    const indexOfLast = currentPage * artistsPerPage;
    const indexOfFirst = indexOfLast - artistsPerPage;

    return {
      currentArtists: artists.slice(indexOfFirst, indexOfLast),
      totalPages: Math.ceil(artists.length / artistsPerPage),
    };
  }, [currentPage, artists]);

  if (!artists?.length) {
    return (
      <NoContentAvailable
        title="No artists Found"
        message="Create artists and come back"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentArtists.map((artist) => (
          <ArtistContent key={artist.id} {...artist} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              const isCurrentPage = currentPage === pageNum;
              const isNearCurrent = Math.abs(currentPage - pageNum) <= 2;
              const isEndPage = pageNum === 1 || pageNum === totalPages;

              if (!isNearCurrent && !isEndPage) {
                if (pageNum === 2 || pageNum === totalPages - 1) {
                  return (
                    <span key={i} className="px-4 py-2">
                      ...
                    </span>
                  );
                }
                return null;
              }

              return (
                <button
                  key={i}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`
                    px-4 py-2 rounded-lg transition-colors
                    ${
                      isCurrentPage
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllArtistOverview;
