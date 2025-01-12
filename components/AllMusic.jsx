"use client";

import { useEffect, useState } from "react";
import ArtistAlbum from "./ArtistAlbum";
import { motion } from "framer-motion";
import NoContentAvailable from "./NoAvailableContent";

function AllMusic({ data: audios }) {
  const audiosPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentAudio, setCurrentAudio] = useState([]);

  useEffect(() => {
    if (audios && audios.length > 0) {
      const indexOfLastAudio = currentPage * audiosPerPage;
      const indexOfFirstAudio = indexOfLastAudio - audiosPerPage;
      const newAudio = audios.slice(indexOfFirstAudio, indexOfLastAudio);
      setCurrentAudio(newAudio);
    } else {
      setCurrentAudio([]);
    }
  }, [currentPage, audios]);

  const totalPages = audios ? Math.ceil(audios.length / audiosPerPage) : 0;

  if (!audios || audios.length === 0) {
    return (
      <NoContentAvailable
        title="No Songs Found"
        message="There are no songs available at the moment. Please check back later."
      />
    );
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {currentAudio.length === 0 ? (
        <div>
          {/* <p className="text-gray-500 font-bold">No Audio Music Available</p> */}
        </div>
      ) : (
        <section className="w-full p-2 md:w-5/6 md:mx-auto md:flex flex-col gap-2">
          {currentAudio.map((music, index) => (
            <motion.div
              key={music.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1, // Stagger the animation for each card
                type: "spring",
                stiffness: 100,
              }}
            >
              <ArtistAlbum
                key={music.id}
                id={music.id}
                title={music.title}
                url={music.url}
                artist={music.artist}
                subtitle={music.subtitle}
                audioUrl={music.audioUrl}
                publicId={music.publicId}
                createdAt={music.createdAt}
              />
            </motion.div>
          ))}
        </section>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center py-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border text-[10px] md:text-base border-gray-500 text-gray-500 px-2 md:px-4 md:py-2 rounded-md 
              hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              // Show first page, last page, current page, and one page before and after current
              const shouldShow =
                pageNumber === 1 ||
                pageNumber === totalPages ||
                Math.abs(pageNumber - currentPage) <= 1;

              if (!shouldShow) {
                if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <span key={index} className="px-2">
                      ...
                    </span>
                  );
                }
                return null;
              }

              return (
                <button
                  key={index}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`border border-gray-500 text-[10px] md:text-base px-3 md:px-4 md:py-2 rounded-md
                    hover:bg-gray-50 transition-colors
                    ${
                      currentPage === pageNumber
                        ? "bg-gray-100 font-medium"
                        : "text-gray-500"
                    }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-primarycolor text-white text-[10px] md:text-base px-2 md:px-4 md:py-2 rounded-md
              hover:bg-primarycolor/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default AllMusic;
