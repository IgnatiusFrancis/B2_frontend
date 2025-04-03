"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, Loader2, Music, Upload } from "lucide-react";
import Tiptap from "@/components/TipTap";
import action from "@/app/actions";

// Constants remain the same
const MAX_FILE_SIZE = 500 * 1024 * 1024;
const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024;
const UPLOAD_TIMEOUT = 3600000;
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const AddMusic = () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";
  const router = useRouter();
  const [artists, setArtists] = useState([]);
  const [isLoadingArtists, setIsLoadingArtists] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileErrors, setFileErrors] = useState([]);
  const [uploadMethod, setUploadMethod] = useState("file"); // "file" or "link"
  const [downloadLinks, setDownloadLinks] = useState([{ url: "" }]);

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    description: "",
    artistId: "",
    audioFile: null,
    thumbnailFile: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingArtists(true);
      try {
        const response = await axios.get(`${baseUrl}/artist/artists`);

        setArtists(response.data.data);
      } catch (error) {
        console.log(error, "Unable to fetch Movies");
        setMovies(true);
      } finally {
        setIsLoadingArtists(false);
      }
    };

    fetchData();
  }, [baseUrl]);

  // Handle download link changes
  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...downloadLinks];
    updatedLinks[index][field] = value;
    setDownloadLinks(updatedLinks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fileErrors.length > 0) {
      toast.error("Please fix file errors before submitting");
      return;
    }

    // if (!formData.audioFile) {
    //   toast.error("Please select at least one audio file");
    //   return;
    // }

    if (!formData.thumbnailFile) {
      toast.error("Please select a thumbnail image");
      return;
    }

    if (!formData.description) {
      toast.error("Description is required");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const submitData = new FormData();
      // Object.keys(formData).forEach((key) => {
      //   if (key === "audioFile") {
      //     submitData.append("audios", formData.audioFile);
      //   } else if (key === "thumbnailFile") {
      //     submitData.append("thumbnail", formData.thumbnailFile);
      //   } else {
      //     submitData.append(key, formData[key]);
      //   }
      // });

      // Append form data dynamically
      Object.keys(formData).forEach((key) => {
        if (key === "audioFile" && uploadMethod === "file") {
          submitData.append("audios", formData.audioFile);
        } else if (key === "thumbnailFile") {
          submitData.append("thumbnail", formData.thumbnailFile);
        } else {
          submitData.append(key, formData[key]);
        }
      });

      // Append downloadLinks if uploadMethod is 'link'
      if (uploadMethod === "link") {
        submitData.append("downloadLinks", JSON.stringify(downloadLinks));
      }

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
        `${baseUrl}/track/createAudio`,
        submitData,
        config
      );

      await action("audios");

      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
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
        toast.error("Failed to create audio");
      }
    } finally {
      setUploading(false);
      setUploadProgress(0);

      setFormData({
        title: "",
        subTitle: "",
        description: "",
        artistId: "",
        audioFile: null,
        thumbnailFile: null,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Add New Music</h1>
        <p className="text-gray-600 mt-2">
          Upload and publish new music tracks
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Track Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg"
              placeholder="Enter track title"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                type="text"
                value={formData.subTitle}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, subTitle: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Artist</label>
              <select
                value={formData.artistId}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, artistId: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
                disabled={isLoadingArtists}
              >
                <option value="">Select an artist</option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <label className="block text-sm font-medium mb-4">Description</label>
          <Tiptap
            content={formData.description}
            onChange={(newContent) =>
              setFormData((prev) => ({ ...prev, description: newContent }))
            }
          />
        </div>

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
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <label className="block text-sm font-medium mb-4">Cover Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <input
              type="file"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  thumbnailFile: e.target.files[0],
                }))
              }
              className="hidden"
              id="thumbnail-upload"
              accept="image/*"
            />
            <label htmlFor="thumbnail-upload" className="cursor-pointer">
              {formData.thumbnailFile ? (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <Image
                    src={URL.createObjectURL(formData.thumbnailFile)}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center py-8">
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload cover image
                  </p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Conditional rendering based on upload method */}
        {uploadMethod === "file" ? (
          /* Video Upload Card */

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <label className="block text-sm font-medium mb-4">Audio File</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    audioFile: e.target.files[0],
                  }))
                }
                className="hidden"
                id="audio-upload"
                // accept="audio/*"
                accept="audio/mp3,audio/wav,audio/mpeg,audio/aac,audio/ogg,audio/m4a,  audio/flac,"
              />
              <label htmlFor="audio-upload" className="cursor-pointer">
                <div className="flex flex-col items-center py-8">
                  <Music
                    className={`w-12 h-12 mb-2 ${
                      formData.audioFile ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                  <p className="text-sm text-gray-600">
                    {formData.audioFile
                      ? formData.audioFile.name
                      : "Click to upload audio file"}
                  </p>
                </div>
              </label>
            </div>
          </div>
        ) : (
          /* Download Links Card */
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                External Link
              </h2>
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
                  </div>
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
              <span>Create Music</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddMusic;
