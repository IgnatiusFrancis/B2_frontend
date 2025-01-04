"use client";

import { FaFileDownload } from "react-icons/fa";
import { useState } from "react";

const SingleMovie = ({ movie }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 font-bold text-xl">No Movie Found</p>
      </div>
    );
  }

  const embedYouTubeUrl = (url) => {
    if (!url) return "";
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      const data = movie.movie;

      // Construct the download URL with the specified format
      const downloadUrl = `https://b2xclusive.onrender.com/api/v1/track/download?type=episode&key=${data.episode[0].key}&id=${data.episode[0].id}`;

      // Create a hidden anchor element to trigger the download
      const link = document.createElement("a");
      link.href = downloadUrl;

      // Trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const data = movie.movie;

  return (
    <div>
      <div className="w-[90%] md:w-5/6 mx-auto my-10 aspect-video">
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src={embedYouTubeUrl(data.trailerUrl)}
          title={`${data.title} Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <section className="w-[90%] md:w-5/6 mx-auto my-10">
        <div className="space-y-4">
          <h2 className="md:text-2xl text-xl font-bold">Synopsis</h2>
          <p className="text-gray-600">
            {data.description || "No synopsis available."}
          </p>
        </div>

        <div className="space-y-4 my-10">
          <h2 className="md:text-2xl text-xl font-bold">
            Download link for {data.title}
          </h2>
          <button
            className={`md:w-[40%] w-full py-5 ${
              isDownloading ? "bg-green-400" : "bg-green-600"
            } text-white flex justify-center items-center gap-2 rounded-2xl border-none transition-colors`}
            onClick={handleDownload}
            disabled={isDownloading}
          >
            <FaFileDownload />
            {isDownloading ? "Initiating Download..." : "Download"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default SingleMovie;
