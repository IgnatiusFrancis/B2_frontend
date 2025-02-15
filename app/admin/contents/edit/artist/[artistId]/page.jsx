"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import action from "@/app/actions";

function EditArtist({ params }) {
  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";
  const { artistId } = params;
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [uploadingPost, setUploadingPost] = useState(false);
  const [singleArtist, setSingleArtist] = useState({
    name: "",
    bio: "",
    image: [],
  });

  useEffect(() => {
    const fetchSingleArtist = async () => {
      try {
        const response = await axios.get(`${baseUrl}/artist/${artistId}`);
        const postData = response?.data?.data;
        setSingleArtist({
          ...postData,
          image: Array.isArray(postData.image)
            ? postData.image
            : [postData.image],
        });
      } catch (error) {
        console.error("Error fetching artist:", error.message);
      }
    };
    fetchSingleArtist();
  }, [artistId]);

  useEffect(() => {
    setSingleArtist((prevArtist) => ({
      ...prevArtist,
      file: file,
    }));
  }, [file]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploadingPost(true);
    try {
      const formData = new FormData(e.target);
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      // const config = {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   withCredentials: true,
      // };

      const response = await axios.patch(
        `${baseUrl}/artist/update/${artistId}`,
        formData,
        config
      );

      await action("artists");

      router.push("/admin/events");
      toast.success(response.data.message, { position: "top-center" });
    } catch (error) {
      console.error("Failed to upload post", error.message);
      toast.error(error.response?.data?.message || "Failed to upload post", {
        position: "top-center",
      });
    } finally {
      setUploadingPost(false);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Artist</h1>
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-lg shadow-lg p-6 space-y-6"
      >
        {/* Artist Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Artist Name
          </label>
          <input
            name="name"
            value={singleArtist.name}
            onChange={(e) =>
              setSingleArtist({ ...singleArtist, name: e.target.value })
            }
            type="text"
            placeholder="Enter artist name"
            className="w-full bg-gray-100 rounded-lg border p-3 outline-none"
          />
        </div>

        {/* Artist Picture */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Artist Picture
          </label>
          <input
            multiple
            name="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full bg-gray-100 rounded-lg border p-3 outline-none"
          />
          {file && (
            <div className="mt-4">
              <Image
                src={URL.createObjectURL(file)}
                width={1000}
                height={1000}
                alt="Selected File"
                className="w-full h-64 object-cover rounded-lg"
              />
              <p className="mt-2 text-sm">Selected File: {file.name}</p>
            </div>
          )}
          {!file && singleArtist?.url?.length > 0 && (
            <div className="mt-4">
              <Image
                src={singleArtist?.url}
                width={1000}
                height={1000}
                alt="Existing Image"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Artist Bio */}
        <div>
          <label className="block text-sm font-semibold mb-1">Artist Bio</label>
          <textarea
            name="bio"
            value={singleArtist.bio}
            onChange={(e) =>
              setSingleArtist({ ...singleArtist, bio: e.target.value })
            }
            placeholder="Enter artist bio"
            className="w-full bg-gray-100 rounded-lg border p-3 outline-none h-32"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white ${
            uploadingPost ? "bg-gray-400 cursor-not-allowed" : "bg-primarycolor"
          } flex items-center justify-center`}
          disabled={uploadingPost}
        >
          {uploadingPost ? (
            <AiOutlineLoading3Quarters className="animate-spin mr-2" />
          ) : (
            "Update Artist"
          )}
        </button>
      </form>
    </div>
  );
}

export default EditArtist;
