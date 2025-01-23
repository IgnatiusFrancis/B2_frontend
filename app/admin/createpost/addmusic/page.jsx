"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Loader2, Music, Upload } from "lucide-react";
import Tiptap from "@/components/TipTap";
import action from "@/app/actions";

// Constants remain the same
const MAX_FILE_SIZE = 500 * 1024 * 1024;
const MAX_THUMBNAIL_SIZE = 5 * 1024 * 1024;
const UPLOAD_TIMEOUT = 3600000;
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const AddMusic = () => {
  const router = useRouter();
  const [artists, setArtists] = useState([]);
  const [isLoadingArtists, setIsLoadingArtists] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileErrors, setFileErrors] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    description: "",
    duration: "",
    artistId: "",
    audioFile: null,
    thumbnailFile: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingArtists(true);
      try {
        const response = await axios.get(
          "https://xclusive.onrender.com/api/v1/artist/artists"
        );

        setArtists(response.data.data);
      } catch (error) {
        console.log(error, "Unable to fetch Movies");
        setMovies(true);
      } finally {
        setIsLoadingArtists(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fileErrors.length > 0) {
      toast.error("Please fix file errors before submitting");
      return;
    }

    if (!formData.audioFile) {
      toast.error("Please select at least one audio file");
      return;
    }

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
      Object.keys(formData).forEach((key) => {
        if (key === "audioFile") {
          submitData.append("audios", formData.audioFile);
        } else if (key === "thumbnailFile") {
          submitData.append("thumbnail", formData.thumbnailFile);
        } else {
          submitData.append(key, formData[key]);
        }
      });

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
        "https://xclusive.onrender.com/api/v1/track/createAudio",
        submitData,
        config
      );

      await action("audios");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create music");
      console.error("Submission error:", error);
    } finally {
      setUploading(false);
      setUploadProgress(0);

      setFormData({
        title: "",
        subTitle: "",
        description: "",
        duration: "",
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
              Cover Image
            </label>
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

          {/* Audio Upload */}
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
                accept="audio/*"
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
        </div>

        {/* Description Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <label className="block text-sm font-medium mb-4">
            Track Description
          </label>
          <Tiptap
            content={formData.description}
            onChange={(newContent) =>
              setFormData((prev) => ({ ...prev, description: newContent }))
            }
          />
        </div>

        {/* Submit Button */}

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
