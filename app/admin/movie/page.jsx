// "use client";
// import { useCallback, useEffect, useState } from "react";
// import axios from "axios";
// import Tiptap from "@/components/TipTap";
// import Image from "next/image";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import { Upload } from "lucide-react";
// import { jwtDecode } from "jwt-decode";

// function AddMovies() {
//   const router = useRouter();
//   const [uploading, setUploading] = useState(false);

//   const [movieData, setMovieData] = useState({
//     MovieTitle: "",
//     movieDescription: "",
//     duration: "",
//     type: "SINGLE", // Default type
//     genre: [], // Array of genres
//     releaseDate: "",
//     language: "",
//     episodeTitle: "",
//     episodeDescription: "",
//     seasonTitle: "",
//     seasonDescription: "",
//     trailerUrl: "",
//   });

//   const [videos, setVideos] = useState([]);
//   const [thumbnail, setThumbnail] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setMovieData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleGenreChange = (e) => {
//     const genres = e.target.value.split(",").map((g) => g.trim());
//     setMovieData((prev) => ({ ...prev, genre: genres }));
//   };

//   const handleFileChange = (e, type) => {
//     const files = e.target.files;
//     if (type === "thumbnail") {
//       setThumbnail(files[0]);
//     } else if (type === "videos") {
//       setVideos(files[0]);
//     }
//   };

//   const validateToken = useCallback(async () => {
//     if (typeof window === "undefined") return null;

//     const token = localStorage.getItem("b2xclusiveadmin");
//     if (!token) {
//       toast.error("Please sign in to continue");
//       router.push("/login");
//       return null;
//     }

//     try {
//       const cleanToken = token.replace(/^['"](.*)['"]$/, "$1");
//       const decoded = jwtDecode(cleanToken);

//       if (decoded.exp < Date.now() / 1000) {
//         localStorage.removeItem("b2xclusiveadmin");
//         toast.error("Session expired. Please sign in again");
//         router.push("/login");
//         return null;
//       }

//       return cleanToken;
//     } catch (error) {
//       toast.error("Authentication error");
//       router.push("/login");
//       return null;
//     }
//   }, [router]);

//   useEffect(() => {
//     validateToken();
//   }, [validateToken]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUploading(true);

//     const formData = new FormData();
//     formData.append("MovieTitle", movieData.MovieTitle);
//     formData.append("movieDescription", movieData.movieDescription);
//     formData.append("duration", movieData.duration);
//     formData.append("type", movieData.type);
//     formData.append("releaseDate", movieData.releaseDate);
//     formData.append("language", movieData.language);
//     formData.append("episodeTitle", movieData.episodeTitle);
//     formData.append("episodeDescription", movieData.episodeDescription);
//     formData.append("seasonTitle", movieData.seasonTitle);
//     formData.append("seasonDescription", movieData.seasonDescription);
//     formData.append("trailerUrl", movieData.trailerUrl);

//     movieData.genre.forEach((genre) => formData.append("genre[]", genre));
//     if (thumbnail) formData.append("thumbnail", thumbnail);
//     videos.forEach((video) => formData.append("movies", video));

//     try {
//       // const token = localStorage.getItem("b2xclusiveadmin");
//       // if (!token) {
//       //   toast.error("Please sign in to continue");
//       //   router.push("/login");
//       //   return null;
//       // }

//       const token = await validateToken();
//       if (!token) return;

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//         timeout: 300000,
//         onUploadProgress: (progressEvent) => {
//           const progress = Math.round(
//             (progressEvent.loaded / progressEvent.total) * 100
//           );
//           console.log(`Upload Progress: ${progress}%`);
//         },
//       };

//       // const response = await axios.put(
//       //   "https://b2xclusive.onrender.com/api/v1/track/createMovie",
//       //   formData,
//       //   config
//       // );
//       console.log("Making request...");
//       const response = await axios.put(
//         "https://b2xclusive.onrender.com/api/v1/track/createMovie",
//         formData,
//         config
//       );
//       console.log("Response:", response);

//       toast.success("Movie created successfully!", { position: "top-center" });
//       router.push("/admin");
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response?.data?.message || "Failed to create movie", {
//         position: "top-center",
//       });
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Add New Movie</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* General Information */}
//         <div className="space-y-4">
//           <input
//             type="text"
//             name="MovieTitle"
//             value={movieData.MovieTitle}
//             onChange={handleInputChange}
//             placeholder="Movie Title"
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />
//           <textarea
//             name="movieDescription"
//             value={movieData.movieDescription}
//             onChange={handleInputChange}
//             placeholder="Movie Description"
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />
//           <input
//             type="text"
//             name="duration"
//             value={movieData.duration}
//             onChange={handleInputChange}
//             placeholder="Duration (e.g., 2:30)"
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />
//           <select
//             name="type"
//             value={movieData.type}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           >
//             <option value="SINGLE">Single</option>
//             <option value="SEASONAL">Seasonal</option>
//             <option value="SERIES">Series</option>
//           </select>
//           <input
//             type="text"
//             name="genre"
//             placeholder="Genres (comma-separated)"
//             onChange={handleGenreChange}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//           <input
//             type="date"
//             name="releaseDate"
//             value={movieData.releaseDate}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 border rounded-lg"
//             // required
//           />
//           <input
//             type="text"
//             name="language"
//             value={movieData.language}
//             onChange={handleInputChange}
//             placeholder="Language"
//             className="w-full px-4 py-2 border rounded-lg"
//             // required
//           />
//           <input
//             type="text"
//             name="trailerUrl"
//             value={movieData.trailerUrl}
//             onChange={handleInputChange}
//             placeholder="trailerUrl"
//             className="w-full px-4 py-2 border rounded-lg"
//             required
//           />
//         </div>

//         {/* Thumbnail Upload */}
//         <div className="space-y-2">
//           <label className="block font-medium">Thumbnail</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleFileChange(e, "thumbnail")}
//             className="w-full"
//           />
//         </div>

//         {/* Video Upload */}
//         <div className="space-y-2">
//           <label className="block font-medium">Video Files</label>
//           <input
//             type="file"
//             multiple
//             accept="video/*"
//             onChange={(e) => handleFileChange(e, "videos")}
//             className="w-full"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className={`w-full py-2 rounded-lg text-white ${
//             uploading ? "bg-gray-400" : "bg-blue-600"
//           }`}
//           disabled={uploading}
//         >
//           {uploading ? "Uploading..." : "Create Movie"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddMovies;

"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Tiptap from "@/components/TipTap";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  Film,
  Globe,
  Loader2,
  PlayCircle,
  Upload,
  X,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";

// Constants
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB for videos
const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024; // 5MB for thumbnail
const UPLOAD_TIMEOUT = 3600000; // 1 hour timeout for large uploads
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function AddMovies() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileErrors, setFileErrors] = useState([]);

  const [movieData, setMovieData] = useState({
    MovieTitle: "",
    movieDescription: "",
    duration: "",
    type: "SINGLE",
    genre: [],
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

  const handleGenreChange = (e) => {
    const genres = e.target.value
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);
    setMovieData((prev) => ({ ...prev, genre: genres }));
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

  const validateToken = useCallback(async () => {
    if (typeof window === "undefined") return null;

    const token = localStorage.getItem("b2xclusiveadmin");
    if (!token) {
      toast.error("Please sign in to continue");
      router.push("/login");
      return null;
    }

    try {
      const cleanToken = token.replace(/^['"](.*)['"]$/, "$1");
      const decoded = jwtDecode(cleanToken);

      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("b2xclusiveadmin");
        toast.error("Session expired. Please sign in again");
        router.push("/login");
        return null;
      }

      return cleanToken;
    } catch (error) {
      toast.error("Authentication error");
      router.push("/login");
      return null;
    }
  }, [router]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

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
    Object.entries(movieData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, value);
      }
    });

    if (thumbnail) formData.append("thumbnail", thumbnail);
    videos.forEach((video) => formData.append("movies", video));

    try {
      const token = await validateToken();
      if (!token) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
        "https://b2xclusive.onrender.com/api/v1/track/createMovie",
        formData,
        config
      );

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Movie</h1>
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

        <form onSubmit={handleSubmit} className="space-y-8">
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
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
                  </div>

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
                        <option value="SEASONAL">Seasonal</option>
                        <option value="SERIES">Series</option>
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
                    onChange={handleGenreChange}
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

          {/* Video Upload Card */}
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

          {/* Upload Progress */}
          {uploading && uploadProgress > 0 && (
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300 ease-in-out"
                style={{ width: `${uploadProgress}%` }}
              >
                <div className="h-full animate-pulse bg-blue-500/50"></div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-colors ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={uploading || fileErrors.length > 0}
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Uploading ({uploadProgress}%)</span>
              </>
            ) : (
              "Create Movie"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMovies;
