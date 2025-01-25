"use client";

import { useState, useMemo } from "react";
import Artist from "./Artist";
import NoContentAvailable from "./NoAvailableContent";

function AllArtists({ data: artists = [] }) {
  const artistsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(artists.length / artistsPerPage);

  const currentArtists = useMemo(() => {
    const indexOfLastArtist = currentPage * artistsPerPage;
    const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
    return artists.slice(indexOfFirstArtist, indexOfLastArtist);
  }, [currentPage, artists]);

  if (!artists || artists.length === 0) {
    return (
      <NoContentAvailable
        title="No Artists Found"
        message="It seems there are no artists available at the moment. Please check back later."
      />
    );
  }

  return (
    <div>
      <section className="md:w-5/6 p-8 mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentArtists.map((artist) => (
          <Artist
            key={artist.id}
            id={artist.id}
            name={artist.name}
            url={artist.url}
            bio={artist.bio}
          />
        ))}
      </section>

      {totalPages > 1 && (
        <div className="flex justify-center py-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border border-gray-500 text-gray-200 px-4 py-2 rounded-md mr-2"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`border border-gray-500 text-gray-500 px-4 py-2 rounded-md mr-2 ${
                currentPage === index + 1 ? "bg-gray-100" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-primarycolor text-white px-4 py-2 rounded-md ml-2"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default AllArtists;
