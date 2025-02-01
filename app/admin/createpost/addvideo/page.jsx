"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Tiptap from "@/components/TipTap";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Film, Loader2, Upload } from "lucide-react";
import action from "@/app/actions";

// Constants remain the same
const MAX_FILE_SIZE = 500 * 1024 * 1024;
const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024;
const UPLOAD_TIMEOUT = 3600000;
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function AddVideos() {
  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";
  const router = useRouter();
  const [allArtist, setALlArtist] = useState([]);
  const [gettingArtist, setGettingArtist] = useState(false);
  const [gettingArtisterror, setGettingArtisterror] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileErrors, setFileErrors] = useState([]);
  const [videos, setVideos] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [content, setContent] = useState("");

  const handleContentChange = (cont) => {
    setContent(cont);
  };

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

  const handleFileChange = (e, type) => {
    const files = e.target.files;
    setFileErrors([]);

    if (type === "thumbnail") {
      const errors = validateFiles([files[0]], "image");
      if (errors.length > 0) {
        setFileErrors(errors);
        return;
      }
      const file = files[0];
      setFormData((prev) => ({ ...prev, thumbnailFile: file }));
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    } else if (type === "videos") {
      const errors = validateFiles(files, "video");
      if (errors.length > 0) {
        setFileErrors(errors);
        return;
      }
      setFormData((prev) => ({
        ...prev,
        videoFile: Array.from(files),
      }));
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

  useEffect(() => {
    const fetchData = async () => {
      setGettingArtist(true);
      try {
        const response = await axios.get(`${baseUrl}/artist/artists`);
        setALlArtist(response?.data?.data);
      } catch (error) {
        console.log(error, "Unable to fetch artists");
        setGettingArtisterror(true);
      } finally {
        setGettingArtist(false);
      }
    };

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    description: "",
    duration: "",
    artistId: "",
    videoFile: null,
    thumbnailFile: null,
  });

  const onsubmit = async (e) => {
    e.preventDefault();
    if (fileErrors.length > 0) {
      toast.error("Please fix file errors before submitting");
      return;
    }

    if (!formData.videoFile?.length) {
      toast.error("Please select at least one video file");
      return;
    }

    if (!formData.thumbnailFile) {
      toast.error("Please select a thumbnail image");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("subTitle", formData.subTitle);
      submitData.append("description", content);
      submitData.append("duration", formData.duration);
      submitData.append("artistId", formData.artistId);
      submitData.append("thumbnail", formData.thumbnailFile);

      formData.videoFile.forEach((video) => submitData.append("videos", video));

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
        },
      };

      const response = await axios.put(
        `${baseUrl}/track/createVideo`,
        submitData,
        config
      );

      await action("videos");
      toast.success(response?.data?.message, { position: "top-center" });
    } catch (error) {
      console.error("Failed to upload video", error.message);
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.errorResponse?.message,
        {
          position: "top-center",
        }
      );
    } finally {
      setUploading(false);
      setUploadProgress(0);

      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subTitle: "",
      description: "",
      duration: "",
      artistId: "",
      videoFile: null,
      thumbnailFile: null,
    });
    setContent("");
    setThumbnailPreview(null);
    setVideos([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Add New Video</h1>
        <p className="text-gray-600 mt-2">
          Upload and publish new video content
        </p>
      </div>

      <form onSubmit={onsubmit} className="space-y-8">
        {/* Title Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Video Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg"
              placeholder="Enter video title"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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
                disabled={gettingArtist}
              >
                <option value="">Select an artist</option>
                {allArtist.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, duration: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Optional"
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
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "thumbnail")}
                className="hidden"
                id="thumbnail-upload"
                accept="image/*"
              />
              <label htmlFor="thumbnail-upload" className="cursor-pointer">
                {thumbnailPreview ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
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

          {/* Video Upload */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <label className="block text-sm font-medium mb-4">Video File</label>
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

        {/* Description Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <label className="block text-sm font-medium mb-4">Description</label>
          <Tiptap value={content} onChange={handleContentChange} />
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
  );
}

export default AddVideos;
