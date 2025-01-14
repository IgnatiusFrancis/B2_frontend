"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Tiptap from "@/components/TipTap";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";

function AddMovies() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [uploading, setUploading] = useState(false);

  const [movieData, setMovieData] = useState({
    MovieTitle: "",
    movieDescription: "",
    duration: "",
    type: "SINGLE", // Default type
    genre: [], // Array of genres
    releaseDate: "",
    language: "",
    episodeTitle: "",
    episodeDescription: "",
    seasonTitle: "",
    seasonDescription: "",
    trailerUrl: "",
  });

  const [videos, setVideos] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (e) => {
    const genres = e.target.value.split(",").map((g) => g.trim());
    setMovieData((prev) => ({ ...prev, genre: genres }));
  };

  const handleFileChange = (e, type) => {
    const files = e.target.files;
    if (type === "thumbnail") {
      setThumbnail(files[0]);
    } else if (type === "videos") {
      setVideos(Array.from(files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("MovieTitle", movieData.MovieTitle);
    formData.append("movieDescription", movieData.movieDescription);
    formData.append("duration", movieData.duration);
    formData.append("type", movieData.type);
    formData.append("releaseDate", movieData.releaseDate);
    formData.append("language", movieData.language);
    formData.append("episodeTitle", movieData.episodeTitle);
    formData.append("episodeDescription", movieData.episodeDescription);
    formData.append("seasonTitle", movieData.seasonTitle);
    formData.append("seasonDescription", movieData.seasonDescription);
    formData.append("trailerUrl", movieData.trailerUrl);

    movieData.genre.forEach((genre) => formData.append("genre[]", genre));
    if (thumbnail) formData.append("thumbnail", thumbnail);
    videos.forEach((video) => formData.append("videos", video));

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        "https://b2xclusive.onrender.com/api/v1/movies",
        formData,
        config
      );

      toast.success("Movie created successfully!", { position: "top-center" });
      router.push("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create movie", {
        position: "top-center",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Information */}
        <div className="space-y-4">
          <input
            type="text"
            name="MovieTitle"
            value={movieData.MovieTitle}
            onChange={handleInputChange}
            placeholder="Movie Title"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <textarea
            name="movieDescription"
            value={movieData.movieDescription}
            onChange={handleInputChange}
            placeholder="Movie Description"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="duration"
            value={movieData.duration}
            onChange={handleInputChange}
            placeholder="Duration (e.g., 2:30)"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <select
            name="type"
            value={movieData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="SINGLE">Single</option>
            <option value="SEASONAL">Seasonal</option>
            <option value="SERIES">Series</option>
          </select>
          <input
            type="text"
            name="genre"
            placeholder="Genres (comma-separated)"
            onChange={handleGenreChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="date"
            name="releaseDate"
            value={movieData.releaseDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="language"
            value={movieData.language}
            onChange={handleInputChange}
            placeholder="Language"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="space-y-2">
          <label className="block font-medium">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "thumbnail")}
            className="w-full"
          />
        </div>

        {/* Video Upload */}
        <div className="space-y-2">
          <label className="block font-medium">Video Files</label>
          <input
            type="file"
            multiple
            accept="video/*"
            onChange={(e) => handleFileChange(e, "videos")}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 rounded-lg text-white ${
            uploading ? "bg-gray-400" : "bg-blue-600"
          }`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
}

export default AddMovies;
