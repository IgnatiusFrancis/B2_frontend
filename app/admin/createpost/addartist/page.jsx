"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { Loader2, Upload } from "lucide-react";
import action from "@/app/actions";

// Constants remain the same
const MAX_FILE_SIZE = 500 * 1024 * 1024;
const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024;
const UPLOAD_TIMEOUT = 3600000;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const AddArtists = () => {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileErrors, setFileErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

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
      setThumbnail(files[0]);
      const previewUrl = URL.createObjectURL(files[0]);
      setThumbnailPreview(previewUrl);
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

    if (!thumbnail) {
      toast.error("Please select artist image");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("bio", formData.bio);
      if (thumbnail) form.append("file", thumbnail);

      const storedUser = localStorage.getItem("b2xclusiveadmin");
      const token = storedUser ? JSON.parse(storedUser) : null;

      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

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
        "https://b2xclusive.onrender.com/api/v1/artist/create",
        form,
        config
      );

      await action("artists");
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to upload artist", error);
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          toast.error("Upload timed out. Please try again");
        } else if (error.response?.status === 413) {
          toast.error("File too large for server. Please reduce file size");
        } else {
          toast.error(
            error.response?.data?.message || "Failed to create artist"
          );
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setUploading(false);
      setUploadProgress(0);

      setFormData({
        name: "",
        bio: "",
      });
      setThumbnail(null);
      setThumbnailPreview(null);
      setFileErrors([]);
    }
  };

  return (
    <div className="w-full flex justify-center py-12">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-8">Add New Artist</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Artist Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Enter artist name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Artist Photo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
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

          <div>
            <label className="block text-sm font-medium mb-2">Artist Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all min-h-[150px]"
              placeholder="Enter artist biography"
              required
            />
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
                <span>Create Artist</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArtists;
