"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Tiptap from "@/components/TipTap";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";
import action from "@/app/actions";

// Constants remain the same
const MAX_FILE_SIZE = 500 * 1024 * 1024;
const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024;
const UPLOAD_TIMEOUT = 3600000;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function AddAlbum() {
  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileErrors, setFileErrors] = useState([]);

  const [content, setContent] = useState("");

  const [event, setEvent] = useState({
    title: "",

    description: content,
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

  useEffect(() => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      description: content,
    }));
  }, [content]);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (fileErrors.length > 0) {
      toast.error("Please fix file errors before submitting");
      return;
    }

    if (!thumbnail) {
      toast.error("Please select a post image");
      return;
    }

    if (!content.trim()) {
      toast.error("Post Description is required");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    try {
      const submitData = new FormData();
      submitData.append("title", event.title);
      submitData.append("description", content);

      submitData.append("file", thumbnail);

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
        `${baseUrl}/track/create-album`,
        submitData,
        config
      );
      await action("albums");

      toast.success(response.data.message, { position: "top-center" });
    } catch (error) {
      console.error("Failed to add event", error.message);
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          toast.error(
            "Upload timed out. Please try with smaller files or check your connection"
          );
        } else if (error.response?.status === 413) {
          toast.error("Files too large for server. Please reduce file sizes");
        } else if (error.response) {
          toast.error(
            error.response.data?.message ||
              error?.response?.data?.errorResponse?.message ||
              "Server error occurred"
          );
        } else if (error.request) {
          toast.error("Network error. Please check your connection");
        } else {
          toast.error("An unexpected error occurred");
        }
      } else {
        toast.error("Failed to create album");
      }
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setEvent({
        title: "",

        description: "",
      });
      setContent("");
      setThumbnail(null);
      setThumbnailPreview(null);
      setFileErrors([]);
    }
  };

  return (
    <section className="w-full flex justify-center py-12">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <form className="flex flex-col gap-8 items-start" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2 w-full">
            <label>Advert Title</label>
            <input
              value={event.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              type="text"
              name="title"
              placeholder="Enter Album Title"
              className="w-full bg-transparent rounded-lg text-2xl outline-none p-4 border border-gray-200"
              required
            />
          </div>

          <div className="flex w-full flex-col gap-2">
            <label>Advert Image</label>
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

          <div className="flex flex-col gap-2 w-full">
            <label>Advert Description</label>
            <Tiptap content={content} onChange={handleContentChange} />
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
                <span>Create Album</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddAlbum;
