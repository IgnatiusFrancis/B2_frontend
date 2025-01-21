"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { Loader2 } from "lucide-react";
import pld from "@/public/pld.jpeg";
import Image from "next/image";

const UPLOAD_TIMEOUT = 10000;

const TopArtists = () => {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [artists, setArtists] = useState([]);
  const [isLoadingArtists, setIsLoadingArtists] = useState(false);

  // Array to store selected artist IDs
  const [selectedArtists, setSelectedArtists] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedArtists.length === 0) {
      toast.error("Please select at least one artist");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const formData = {
      topArtistIds: selectedArtists,
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
        "https://b2xclusive.onrender.com/api/v1/artist/top/artists",
        formData,
        config
      );

      await action("topArtists");
      toast.success("Successfully updated top artists");
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
        toast.error("Failed to update top artists");
      }
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Fetch artists
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingArtists(true);
      try {
        const response = await axios.get(
          "https://b2xclusive.onrender.com/api/v1/artist/artists"
        );

        setArtists(response?.data?.data || []);
      } catch (error) {
        console.error("Unable to fetch artists:", error);
        toast.error("Failed to fetch artists");
      } finally {
        setIsLoadingArtists(false);
      }
    };

    fetchData();
  }, []);

  const handleArtistSelect = (artistId) => {
    setSelectedArtists(
      (prev) =>
        prev.includes(artistId)
          ? prev.filter((id) => id !== artistId) // Remove artist if already selected
          : [...prev, artistId] // Add artist if not already selected
    );
  };

  return (
    <div className="w-full flex justify-center py-12">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-8">Add Top Artists</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Artists
            </label>

            <div className="space-y-4">
              {isLoadingArtists ? (
                <p>Loading artists...</p>
              ) : artists.length === 0 ? (
                <p>No artists available</p>
              ) : (
                artists.map((artist) => (
                  <div
                    key={artist.id}
                    className="flex items-center space-x-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      id={artist.id}
                      value={artist.id}
                      onChange={() => handleArtistSelect(artist.id)}
                      checked={selectedArtists.includes(artist.id)}
                    />
                    <label
                      htmlFor={artist.id}
                      className="flex items-center cursor-pointer space-x-3 peer-checked:font-bold"
                    >
                      {/* Circular artist image */}
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition">
                        <Image
                          src={artist.url || pld}
                          alt={`${artist.name} image`}
                          className="w-full h-full object-cover"
                          width={1000}
                          height={1000}
                        />
                      </div>

                      <span className="text-gray-700">{artist.name}</span>
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
              "Update Top Artists"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TopArtists;
