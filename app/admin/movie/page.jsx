"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  Link,
  Plus,
  Trash2,
} from "lucide-react";
import action from "@/app/actions";

// Constants remain the same
const MAX_FILE_SIZE = 500 * 1024 * 1024;
const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024;
const UPLOAD_TIMEOUT = 3600000;
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function AddMovies() {
  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileErrors, setFileErrors] = useState([]);
  const [uploadMethod, setUploadMethod] = useState("file"); // "file" or "link"
  const [downloadLinks, setDownloadLinks] = useState([
    { url: "", episodeDescription: "", episodeTitle: "" },
  ]);

  const [movieData, setMovieData] = useState({
    MovieTitle: "",
    movieDescription: "",
    //duration: "",
    type: "SINGLE",
    genre: "",
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
    setMovieData((prev) => ({ ...prev, [name]: value }));
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

  // Handle download link changes
  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...downloadLinks];
    updatedLinks[index][field] = value;
    setDownloadLinks(updatedLinks);
  };

  // Add new download link
  const addDownloadLink = () => {
    setDownloadLinks([
      ...downloadLinks,
      { url: "", episodeDescription: "", episodeTitle: "" },
    ]);
  };

  // Remove download link
  const removeDownloadLink = (index) => {
    const updatedLinks = downloadLinks.filter((_, i) => i !== index);
    setDownloadLinks(updatedLinks);
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

    if (uploadMethod === "file" && !videos.length) {
      toast.error("Please select at least one video file");
      return;
    }

    if (
      uploadMethod === "link" &&
      (!downloadLinks.length || downloadLinks.some((link) => !link.url))
    ) {
      toast.error("Please provide at least one valid download link");
      return;
    }

    if (!thumbnail) {
      toast.error("Please select a thumbnail image");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    Object.entries(movieData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, value);
      }
    });

    // Add upload method to form data
    formData.append("uploadMethod", uploadMethod);

    // Add download links if using link method
    if (uploadMethod === "link") {
      formData.append("downloadLinks", JSON.stringify(downloadLinks));
    }

    if (thumbnail) formData.append("thumbnail", thumbnail);

    // Only append videos if using file upload method
    if (uploadMethod === "file") {
      videos.forEach((video) => formData.append("movies", video));
    }

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
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
        `${baseUrl}/track/createMovie`,
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

  const showSeasonFields =
    movieData.type === "SEASONAL" || movieData.type === "SERIES";
  const showEpisodeFields = movieData.type === "SEASONAL";

  const renderConditionalFields = () => {
    if (!showSeasonFields) return null;

    return (
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Layers className="w-5 h-5" />
          Season Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Season Title
            </label>
            <input
              type="text"
              required
              name="seasonTitle"
              value={movieData.seasonTitle}
              onChange={handleInputChange}
              placeholder="Enter season title"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div> */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Season Title
            </label>
            <select
              required
              name="seasonTitle"
              value={movieData.seasonTitle}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">Select Season</option>
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i + 1} value={`Season ${i + 1}`}>
                  S0{i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Season Description (Optional)
            </label>
            <textarea
              name="seasonDescription"
              value={movieData.seasonDescription}
              onChange={handleInputChange}
              placeholder="Enter season description"
              rows={4}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* {showEpisodeFields && (
          <div className="space-y-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Type className="w-5 h-5" />
              Episode Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Episode Title
                </label>
                <input
                  type="text"
                  name="episodeTitle"
                  value={movieData.episodeTitle}
                  onChange={handleInputChange}
                  placeholder="Enter episode title"
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Episode Description (Optional)
                </label>
                <textarea
                  name="episodeDescription"
                  value={movieData.episodeDescription}
                  onChange={handleInputChange}
                  placeholder="Enter episode description"
                  rows={4}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>
        )} */}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Film className="w-8 h-8 text-blue-600" />
            Add New Movie
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload your movie content and details below.
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
          {/* Main Content Card */}
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Movie Title
                  </label>
                  <input
                    type="text"
                    name="MovieTitle"
                    value={movieData.MovieTitle}
                    onChange={handleInputChange}
                    placeholder="Enter movie title"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Movie Description
                  </label>
                  <textarea
                    name="movieDescription"
                    value={movieData.movieDescription}
                    onChange={handleInputChange}
                    placeholder="Enter movie description"
                    rows={4}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="duration"
                        value={movieData.duration}
                        onChange={handleInputChange}
                        placeholder="2:30"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div> */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <div className="relative">
                      <Film className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <select
                        name="type"
                        value={movieData.type}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                        required
                      >
                        <option value="SINGLE">Single</option>
                        <option value="SEASONAL">Series</option>
                        {/* <option value="SERIES">Series</option> */}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genres
                  </label>
                  <input
                    type="text"
                    name="genre"
                    placeholder="Action, Drama, Comedy"
                    value={movieData.genre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Release Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="releaseDate"
                      value={movieData.releaseDate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="language"
                      value={movieData.language}
                      onChange={handleInputChange}
                      placeholder="English"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trailer URL
                  </label>
                  <div className="relative">
                    <PlayCircle className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="trailerUrl"
                      value={movieData.trailerUrl}
                      onChange={handleInputChange}
                      placeholder="https://youtube.com/..."
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conditional Fields */}
          {renderConditionalFields()}

          {/* Upload Method Selection */}
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Content Upload Method
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div
                className={`w-full sm:w-1/2 cursor-pointer p-4 border-2 rounded-xl flex items-center gap-3 ${
                  uploadMethod === "file"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => setUploadMethod("file")}
              >
                <Upload
                  className={`w-5 h-5 ${
                    uploadMethod === "file" ? "text-blue-500" : "text-gray-400"
                  }`}
                />
                <div>
                  <h3 className="font-medium text-gray-900">File Upload</h3>
                  <p className="text-sm text-gray-500">
                    Upload video files directly to our server
                  </p>
                </div>
              </div>
              <div
                className={`w-full sm:w-1/2 cursor-pointer p-4 border-2 rounded-xl flex items-center gap-3 ${
                  uploadMethod === "link"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => setUploadMethod("link")}
              >
                <Link
                  className={`w-5 h-5 ${
                    uploadMethod === "link" ? "text-blue-500" : "text-gray-400"
                  }`}
                />
                <div>
                  <h3 className="font-medium text-gray-900">Download Links</h3>
                  <p className="text-sm text-gray-500">
                    Provide external download links
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Upload Card */}
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Thumbnail
            </h2>
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

          {/* Conditional rendering based on upload method */}
          {uploadMethod === "file" ? (
            /* Video Upload Card */
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Video Files
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6">
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, "videos")}
                  className="hidden"
                  id="video-upload"
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
          ) : (
            /* Download Links Card */
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Episode Information
                </h2>
                <button
                  type="button"
                  onClick={addDownloadLink}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add More</span>
                </button>
              </div>
              <div className="space-y-4">
                {downloadLinks.map((link, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-grow space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Download URL
                        </label>
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) =>
                            handleLinkChange(index, "url", e.target.value)
                          }
                          placeholder="https://example.com/movie.mp4"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          required
                        />
                      </div>
                      {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Episode Title
                        </label>
                        <input
                          type="text"
                          required
                          value={link.episodeTitle}
                          onChange={(e) =>
                            handleLinkChange(
                              index,
                              "episodeTitle",
                              e.target.value
                            )
                          }
                          placeholder="Enter episode title"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div> */}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Episode Title
                        </label>
                        <select
                          required
                          value={link.episodeTitle}
                          onChange={(e) =>
                            handleLinkChange(
                              index,
                              "episodeTitle",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value="">Select Episode</option>
                          {Array.from({ length: 30 }, (_, i) => (
                            <option key={i + 1} value={`Episode ${i + 1}`}>
                              Episode {i + 1}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Episode Description (Optional)
                        </label>
                        {/* <input
                          type="text"
                          value={link.episodeDescription}
                          onChange={(e) =>
                            handleLinkChange(
                              index,
                              "episodeDescription",
                              e.target.value
                            )
                          }
                          placeholder="Enter episode description"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        /> */}

                        <textarea
                          name="episodeDescription"
                          value={link.episodeDescription}
                          onChange={(e) =>
                            handleLinkChange(
                              index,
                              "episodeDescription",
                              e.target.value
                            )
                          }
                          placeholder="Enter episode description"
                          rows={4}
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                    {downloadLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDownloadLink(index)}
                        className="mt-8 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

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
                <span>Create Movie</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMovies;
