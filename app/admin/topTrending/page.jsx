"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import {
  CheckCircle2,
  CircleIcon,
  RefreshCcw,
  Search,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import action from "@/app/actions";

const UPLOAD_TIMEOUT = 10000;

const TopArtists = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedVideos.length === 0) {
      toast.error("Select at least one music");
      return;
    }

    setUploading(true);

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${baseUrl}/artist/top/artists`,
        { topArtistIds: selectedVideos },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // withCredentials: true,
          timeout: UPLOAD_TIMEOUT,
        }
      );

      await action("topArtists");
      toast.success("Uodated Successfully");
      router.push("/admin");
    } catch (error) {
      console.error("Upload error:", error);

      toast.error(
        error?.response?.data?.message || "Failed to update latest artists"
      );
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoadingVideos(true);
      try {
        const response = await axios.get(`${baseUrl}/artist/artists`);
        const fetchedVideos = response?.data?.data || [];

        setVideos(fetchedVideos);
        setFilteredVideos(fetchedVideos);
      } catch (error) {
        console.error("Unable to fetch artists:", error);
        toast.error("Failed to fetch artists");
      } finally {
        setIsLoadingVideos(false);
      }
    };

    fetchVideos();
  }, [baseUrl]);

  useEffect(() => {
    const filtered = videos.filter((video) =>
      video.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVideos(filtered);
  }, [searchTerm, videos]);

  const handleVideoSelect = (videoId) => {
    setSelectedVideos([videoId]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <h1 className="text-3xl font-bold tracking-tight">
            Artist of The Week
          </h1>
          <p className="text-blue-100 mt-2">
            Select and update your artist of the week
          </p>
        </div>

        <div className="p-6">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search videos by title or artist"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {isLoadingVideos ? (
              <div className="flex justify-center items-center py-10">
                <RefreshCcw className="animate-spin text-blue-500" size={32} />
              </div>
            ) : filteredVideos.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                <XCircle className="mx-auto mb-4 text-red-400" size={48} />
                No Artist found
              </div>
            ) : (
              filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className={`
    flex items-center space-x-4 p-4 rounded-lg cursor-pointer
    transition-all duration-300
    ${
      selectedVideos.includes(video.id)
        ? "bg-blue-50 border-2 border-blue-500"
        : "hover:bg-gray-100 border-2 border-transparent"
    }
  `}
                  onClick={() => handleVideoSelect(video.id)}
                >
                  {selectedVideos.includes(video.id) ? (
                    <CheckCircle2 className="text-blue-500" />
                  ) : (
                    <CircleIcon className="text-gray-300" />
                  )}

                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <Image
                        src={video.url}
                        alt={`${video.title} thumbnail`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-800">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {video?.name || "Unknown Artist"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={uploading || selectedVideos.length === 0}
            className="
              w-full mt-6 py-4 rounded-lg text-white font-bold
              transition-all duration-300
              bg-gradient-to-r from-blue-500 to-purple-600
              hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2
            "
          >
            {uploading ? (
              <>
                <RefreshCcw className="animate-spin" />
                Updating...
              </>
            ) : (
              `Update ${selectedVideos.length} Trending Video${
                selectedVideos.length !== 1 ? "s" : ""
              }`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopArtists;
