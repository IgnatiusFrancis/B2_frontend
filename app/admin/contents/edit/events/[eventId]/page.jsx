"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "@/context/ThemeContext";
import Tiptap from "@/components/TipTap";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Upload } from "lucide-react";

// Constants remain the same
const MAX_FILE_SIZE = 500 * 1024 * 1024;
const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024;
const UPLOAD_TIMEOUT = 3600000;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function EditEvent({ params }) {
  const { eventId } = params;
  const [eventData, setEventData] = useState({
    title: "",
    subTitle: "",
    date: "",
    location: "",
    description: "",
  });

  const router = useRouter();
  const { showSideBar } = useContext(ThemeContext);
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileErrors, setFileErrors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const organizerResponse = await axios.get(
        //   `https://b2xclusive.onrender.com/api/v1/event/organisers`
        // );
        // setOrganizers(organizerResponse?.data?.data);

        const eventResponse = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/event/${eventId}`
        );

        setEventData(eventResponse?.data?.data);
      } catch (error) {
        console.error("Unable to fetch data", error);
      }
    };

    fetchData();
  }, [eventId]);

  const handleContentChange = (newContent) => setContent(newContent);

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
    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData(e.target);
      formData.append("description", content || eventData.description);

      if (thumbnail) {
        formData.append("files", thumbnail);
      } else {
        formData.append("files", eventData?.url || "");
      }

      const storedUser = localStorage.getItem("b2xclusiveadmin");
      const token = storedUser ? JSON.parse(storedUser) : null;

      if (!token) {
        console.error("No token found in the stored user object");
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

      const response = await axios.patch(
        `https://b2xclusive.onrender.com/api/v1/event/update/${eventId}`,
        formData,
        config
      );
      toast.success(response?.data?.message, { position: "top-center" });
      router.push("/admin/events");
    } catch (error) {
      console.error("Failed to upload post", error);
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          toast.error("Upload timed out. Please try again");
        } else if (error.response?.status === 413) {
          toast.error("File too large for server. Please reduce file size");
        } else {
          toast.error(error.response?.data?.message || "Failed to update post");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 space-y-6"
      >
        {/* Title and Subtitle */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Event Title
            </label>
            <input
              value={eventData.title}
              onChange={(e) =>
                setEventData({ ...eventData, title: e.target.value })
              }
              type="text"
              name="title"
              placeholder="Enter event title"
              className="w-full bg-gray-100 rounded-lg border p-3 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Event Subtitle
            </label>
            <input
              value={eventData.subTitle}
              onChange={(e) =>
                setEventData({ ...eventData, subTitle: e.target.value })
              }
              type="text"
              name="subTitle"
              placeholder="Enter event subtitle"
              className="w-full bg-gray-100 rounded-lg border p-3 outline-none"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Event Date
            </label>
            <input
              value={eventData.date}
              name="date"
              required={true}
              onChange={(e) =>
                setEventData({ ...eventData, date: e.target.value })
              }
              type="date"
              className="w-full bg-gray-100 rounded-lg border p-3 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Event Location
            </label>
            <input
              value={eventData.location}
              name="location"
              onChange={(e) =>
                setEventData({ ...eventData, location: e.target.value })
              }
              type="text"
              placeholder="Enter event location"
              className="w-full bg-gray-100 rounded-lg border p-3 outline-none"
            />
          </div>
        </div>

        {/* Image Upload */}

        <div>
          <label className="block text-sm font-medium mb-2">Event Image</label>
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
                    //fill
                    width={1000}
                    height={1000}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm">
                      Click to change thumbnail
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src={eventData?.url}
                    alt="Existing Image"
                    // fill
                    width={1000}
                    height={1000}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm">
                      Click to change thumbnail
                    </p>
                  </div>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Event Description
          </label>
          <Tiptap
            content={eventData.description}
            onChange={handleContentChange}
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
              <span>update Event</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default EditEvent;
