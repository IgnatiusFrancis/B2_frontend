"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Tiptap from "@/components/TipTap";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";

// Constants remain the same
const MAX_FILE_SIZE = 500 * 1024 * 1024;
const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024;
const UPLOAD_TIMEOUT = 3600000;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function AddEvent() {
  const router = useRouter();
  const [uploadingEvent, setUploadingEvent] = useState(false);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [fileErrors, setFileErrors] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [event, setEvent] = useState({
    title: "",
    subTitle: "",
    location: "",
    date: "",
    description: content,
  });

  useEffect(() => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      files: file,
      description: content,
    }));
  }, [file, content]);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploadingEvent(true);
    setUploadProgress(0);
    try {
      let formData = new FormData(e.target);
      formData.append("description", event.description);

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
        "https://b2xclusive.onrender.com/api/v1/event/create",
        formData,
        config
      );
      toast.success(response.data.message, { position: "top-center" });
    } catch (error) {
      console.error("Failed to add event", error.message);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.errorResponse?.message,
        { position: "top-center" }
      );
    } finally {
      setUploadingEvent(false);
      setUploadProgress(0);
      setEvent({
        title: "",
        subTitle: "",
        location: "",
        date: "",
        description: content,
      });
      setContent("");
      setFile(null);
    }
  };

  return (
    <section className="w-full flex justify-center py-12">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <form className="flex flex-col gap-8 items-start" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2 w-full">
            <label>Event Title</label>
            <input
              value={event.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              type="text"
              name="title"
              placeholder="Enter Event Title"
              className="w-full bg-transparent rounded-lg text-2xl outline-none p-4 border border-gray-200"
              required
            />
          </div>

          <div className="flex w-full gap-4 md:flex-row flex-col">
            <div className="flex flex-col md:w-6/12">
              <label>Subtitle</label>
              <input
                value={event.subTitle}
                onChange={(e) =>
                  setEvent({ ...event, subTitle: e.target.value })
                }
                name="subTitle"
                type="text"
                placeholder="Optional"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
              />
            </div>

            <div className="flex flex-col md:w-3/12">
              <label>Date</label>
              <input
                value={event.date}
                name="date"
                onChange={(e) => setEvent({ ...event, date: e.target.value })}
                type="date"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>

            <div className="flex flex-col md:w-3/12">
              <label>Location</label>
              <input
                value={event.location}
                name="location"
                onChange={(e) =>
                  setEvent({ ...event, location: e.target.value })
                }
                type="text"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label>Upload Event Image</label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              multiple
              name="files"
              className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
              required
            />
          </div>

          {file && (
            <div className="w-full">
              <div className="w-full h-[300px]">
                <Image
                  src={URL.createObjectURL(file)}
                  width={1000}
                  height={1000}
                  alt="post"
                  className="w-full h-full object-cover"
                />
              </div>
              <p>Selected File: {file.name}</p>
            </div>
          )}

          <div className="flex flex-col gap-2 w-full">
            <label>Event Description</label>
            <Tiptap content={content} onChange={handleContentChange} />
          </div>

          {/* Upload Progress */}
          {uploadingEvent && uploadProgress > 0 && (
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
              uploadingEvent
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            }`}
            disabled={uploadingEvent || fileErrors.length > 0}
          >
            {uploadingEvent ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>uploadingEvent ({uploadProgress}%)</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Create Event</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddEvent;
