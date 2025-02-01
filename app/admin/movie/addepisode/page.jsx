"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import {
  Calendar,
  Clock,
  Film,
  Globe,
  Loader2,
  PlayCircle,
  Upload,
  X,
  Layers,
  Type,
  LinkIcon,
} from "lucide-react";
import action from "@/app/actions";

// Constants remain the same
const MAX_FILE_SIZE = 500 * 1024 * 1024;
const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024;
const UPLOAD_TIMEOUT = 3600000;
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function AddEpisode() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileErrors, setFileErrors] = useState([]);
  const [getMovies, setMovies] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";

  const [seasonData, setSeasonData] = useState({
    movieId: "",
    seasonId: "",
    duration: "",
    episodeTitle: "",
    episodeDescription: "",
    trailerUrl: "",
  });

  const [videos, setVideos] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const validateFiles = (files, type) => {
    const errors = [];
    const allowedTypes =
      type === "video" ? ALLOWED_VIDEO_TYPES : ALLOWED_IMAGE_TYPES;
    const maxSize = type === "video" ? MAX_FILE_SIZE : MAX_THUMBNAIL_SIZE;

    Array.from(files).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type`);
      }
      if (file.size > maxSize) {
        errors.push(
          `${file.name}: File too large (max ${maxSize / (1024 * 1024)}MB)`
        );
      }
    });

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSeasonData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const files = e.target.files;
    setFileErrors([]);

    if (type === "thumbnail") {
      const errors = validateFiles([files[0]], "image");
      if (errors.length > 0) {
        setFileErrors(errors);
        return;
      }
      setThumbnail(files[0]);
      const previewUrl = URL.createObjectURL(files[0]);
      setThumbnailPreview(previewUrl);
    } else if (type === "videos") {
      const errors = validateFiles(files, "video");
      if (errors.length > 0) {
        setFileErrors(errors);
        return;
      }
      setVideos(Array.from(files));
    }
  };

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileErrors.length > 0) {
      toast.error("Please fix file errors before submitting");
      return;
    }

    if (!videos.length) {
      toast.error("Please select at least one video file");
      return;
    }

    if (!thumbnail) {
      toast.error("Please select a thumbnail image");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    Object.entries(seasonData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, value);
      }
    });

    if (thumbnail) formData.append("thumbnail", thumbnail);
    videos.forEach((video) => formData.append("episodes", video));

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        timeout: UPLOAD_TIMEOUT,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
          if (progress < 100) {
            toast.info(`Upload Progress: ${progress}%`, {
              toastId: "uploadProgress",
              autoClose: false,
            });
          } else {
            toast.dismiss("uploadProgress");
          }
        },
      };

      const response = await axios.put(
        `${baseUrl}/track/episode`,
        formData,
        config
      );

      await action("movies");
      toast.success("Movie created successfully!");
      router.push("/admin");
    } catch (error) {
      console.error("Upload error:", error);

      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          toast.error(
            "Upload timed out. Please try with smaller files or check your connection"
          );
        } else if (error.response?.status === 413) {
          toast.error("Files too large for server. Please reduce file sizes");
        } else if (error.response) {
          toast.error(error.response.data?.message || "Server error occurred");
        } else if (error.request) {
          toast.error("Network error. Please check your connection");
        } else {
          toast.error("An unexpected error occurred");
        }
      } else {
        toast.error("Failed to create movie");
      }
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setMovies(true);
      try {
        const response = await axios.get(`${baseUrl}/track/seasons`);

        setAllMovies(response?.data?.data.seasons);
      } catch (error) {
        console.error(error, "Unable to fetch Movies");
        setMovies(true);
      } finally {
        setMovies(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Film className="w-8 h-8 text-blue-600" />
            Add New Episode
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Add a new episode to an existing movie or series.
          </p>
        </div>

        {/* Error Display */}
        {fileErrors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <h3 className="text-red-800 font-medium mb-2">File Errors</h3>
            <ul className="space-y-1">
              {fileErrors.map((error, index) => (
                <li
                  key={index}
                  className="text-sm text-red-600 flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Movie ID Field */}
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Movies
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

                  <select
                    value={seasonData.movieId}
                    onChange={(e) =>
                      setSeasonData({ ...seasonData, movieId: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                    disabled={getMovies}
                  >
                    <option value="">Select a movie</option>
                    {allMovies.map((movie) => (
                      <option key={movie.id} value={movie.id}>
                        {movie.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Season Information */}
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Season Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Season
                </label>
                <select
                  value={seasonData.seasonId}
                  onChange={(e) =>
                    setSeasonData({ ...seasonData, seasonId: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                  disabled={getMovies}
                >
                  <option value="">Select a season</option>

                  {/* Filter to get only the seasons of the selected movie */}
                  {allMovies
                    .filter((movie) => movie.id === seasonData.movieId) // Filter by the selected movie ID
                    .flatMap((movie) =>
                      movie.seasons.map((season) => (
                        <option key={season.id} value={season.id}>
                          {season.seasonTitle}
                        </option>
                      ))
                    )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="duration"
                    value={seasonData.duration}
                    onChange={handleInputChange}
                    placeholder="4:20"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Episode Information */}
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Type className="w-5 h-5" />
              Episode Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Episode Title
                </label>
                <input
                  type="text"
                  name="episodeTitle"
                  value={seasonData.episodeTitle}
                  onChange={handleInputChange}
                  placeholder="Enter episode title"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Episode Description
                </label>
                <textarea
                  name="episodeDescription"
                  value={seasonData.episodeDescription}
                  onChange={handleInputChange}
                  placeholder="Enter episode description"
                  rows={4}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Media Upload Section */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Thumbnail Upload */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium mb-4">
                Video Thumbnail
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "thumbnail")}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="cursor-pointer block text-center"
                >
                  {thumbnailPreview ? (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <Image
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm">
                          Click to change thumbnail
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-600">
                        Click to upload thumbnail
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum size: 5MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Video Upload */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium mb-4">
                Video File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  className="hidden"
                  id="video-upload"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, "videos")}
                />
                <label htmlFor="video-upload" className="cursor-pointer block">
                  {videos.length > 0 ? (
                    <div className="space-y-3">
                      {videos.map((video, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <Film className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-700 truncate max-w-xs">
                              {video.name}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {(video.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                      ))}
                      <p className="text-center text-sm text-gray-500 mt-4">
                        Click to add more videos
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Upload className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-sm text-gray-600">
                        Click to upload videos
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Maximum size: 500MB per file
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {uploading && uploadProgress > 0 && (
            <div className="relative w-full bg-gray-100 rounded-full h-4 overflow-hidden">
              <div
                className="absolute inset-0 bg-blue-600 transition-all duration-300 ease-in-out"
                style={{ width: `${uploadProgress}%` }}
              >
                <div className="h-full animate-pulse bg-blue-500/50"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-white drop-shadow">
                  {uploadProgress}%
                </span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            }`}
            disabled={uploading || fileErrors.length > 0}
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Uploading ({uploadProgress}%)</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Create Season</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEpisode;
