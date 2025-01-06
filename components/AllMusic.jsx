"use client";

import { useEffect, useState } from "react";
import ArtistAlbum from "./ArtistAlbum";

function AllMusic({ data: audios }) {
  if (!audios || audios.length === 0) {
    return (
      <div>
        <p className="text-gray-500 font-bold">No Audio Music Available</p>
      </div>
    );
  }
  const audiosPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentAudio, setCurrentAudio] = useState(audios);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const indexOfLastAudio = currentPage * audiosPerPage;
    const indexOfFirstAudio = indexOfLastAudio - audiosPerPage;
    const newAudio = audios.slice(indexOfFirstAudio, indexOfLastAudio);
    setCurrentAudio(newAudio);
  }, [currentPage, audios]);

  const totalPages = Math.ceil(audios.length / audiosPerPage);

  return (
    <>
      <div>
        <section className="w-full p-2 md:w-5/6 md:mx-auto md:flex flex-col gap-2">
          {currentAudio?.map((music) => (
            <ArtistAlbum 
            key={music.id}
          id={music.id}
          title={music.title}
          image={music.image}
          artist={music.artist}
          subtitle={music.subtitle}
          audioUrl={music.audioUrl}
          publicId={music.publicId}
          createdAt={music.createdAt}
            /> 
          ))}
        </section>

        <div className="flex justify-center py-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2 ${
                currentPage === index + 1 ? "bg-gray-100" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-primarycolor text-white px-4 py-2 rounded-md ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AllMusic;
