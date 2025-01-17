"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { Loader2 } from "lucide-react";
import pld from "@/public/pld.jpeg";
import Image from "next/image";

const UPLOAD_TIMEOUT = 10000;

const TrendingVideos = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);

  // Array to store selected artist IDs
  const [selectedVideos, setselectedVideos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedVideos.length === 0) {
      toast.error("Please select at least one video");
      return;
    }

    setUploading(true);

    const formData = {
      trendingVideoIds: selectedVideos,
    };

    try {
      const storedUser = localStorage.getItem("b2xclusiveadmin");

      // Parse the stored JSON and extract the token
      const token = storedUser ? JSON.parse(storedUser) : null;
      if (!token) {
        console.error("No token found in the stored user object");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: UPLOAD_TIMEOUT,
      };

      await axios.put(
        "https://b2xclusive.onrender.com/api/v1/track/trending/videos",
        formData,
        config
      );

      toast.success("Successfully updated trending videos");
      router.push("/admin");
    } catch (error) {
      console.error("Upload error:", error);

      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          toast.error(
            "Upload timed out. Please try with smaller files or check your connection"
          );
        } else if (error.response) {
          toast.error(error.response.data?.message || "Server error occurred");
        } else if (error.request) {
          toast.error("Network error. Please check your connection");
        } else {
          toast.error("An unexpected error occurred");
        }
      } else {
        toast.error("Failed to update top videos");
      }
    } finally {
      setUploading(false);
    }
  };

  // Fetch videos
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingVideos(true);
      try {
        const response = await axios.get(
          "https://b2xclusive.onrender.com/api/v1/track/videos"
        );

        setVideos(response?.data?.data.videos || []);
      } catch (error) {
        console.error("Unable to fetch videos:", error);
        toast.error("Failed to fetch videos");
      } finally {
        setIsLoadingVideos(false);
      }
    };

    fetchData();
  }, []);

  const handleVideosSelect = (videoId) => {
    setselectedVideos((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  };

  return (
    <div className="w-full flex justify-center py-12">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-8">Trending Videos</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Videos
            </label>

            <div className="space-y-4">
              {isLoadingVideos ? (
                <p>Loading videos...</p>
              ) : videos.length === 0 ? (
                <p>No videos available</p>
              ) : (
                videos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      id={video.id}
                      value={video.id}
                      onChange={() => handleVideosSelect(video.id)}
                      checked={selectedVideos.includes(video.id)}
                    />
                    <label
                      htmlFor={video.id}
                      className="flex items-center cursor-pointer space-x-3 peer-checked:font-bold"
                    >
                      {/* Circular video image */}
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition">
                        <Image
                          src={video.url || pld}
                          alt={`${video.name} image`}
                          className="w-full h-full object-cover"
                          width={1000}
                          height={1000}
                        />
                      </div>

                      <span className="text-gray-700">{video.title}</span>
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Top Videos"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrendingVideos;
