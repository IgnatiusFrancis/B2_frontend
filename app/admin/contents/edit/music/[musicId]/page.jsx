"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2, Music, Upload } from "lucide-react";
import Tiptap from "@/components/TipTap";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";
import action from "@/app/actions";

function EditMusic({ params }) {
  const { musicId } = params;
  const router = useRouter();
  const { showSideBar } = useContext(ThemeContext);

  const [allArtist, setAllArtist] = useState([]);
  const [singleMusic, setSingleMusic] = useState({
    title: "",
    subTitle: "",
    artistId: "",
    duration: "",
    thumbnail: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [imagefile, setImageFile] = useState(null);
  const [content, setContent] = useState("");
  const [uploadingPost, setUploadingPost] = useState(false);

  const handleContentChange = (cont) => {
    setContent(cont);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://xclusive.onrender.com/api/v1/artist/artists`
        );
        setAllArtist(response?.data?.data);

        const musicresponse = await axios.get(
          `https://xclusive.onrender.com/api/v1/track/audio/${musicId}`
        );
        const postData = musicresponse?.data?.data;
        setSingleMusic(postData);
      } catch (error) {
        console.error(error, "Unable to fetch artists");
      }
    };

    fetchData();
  }, [musicId]);

  useEffect(() => {
    setSingleMusic((prevPost) => ({
      ...prevPost,
      audios: file,
      thumbnail: imagefile,
      description: content,
    }));
  }, [file, imagefile, content]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploadingPost(true);
    try {
      let formData = new FormData(e.target);
      formData.append("description", content);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const musicResponse = await axios.patch(
        `https://xclusive.onrender.com/api/v1/track/audio/update/${musicId}`,
        formData,
        config
      );

      await action("audios");
      router.push("/admin/contents");
      toast.success(musicResponse?.data?.message, {
        position: "top-center",
      });
    } catch (error) {
      console.error("Failed to upload music", error.message);
      toast.error(error?.response?.data?.message || "Failed to upload music", {
        position: "top-center",
      });
    } finally {
      setUploadingPost(false);
    }
  };
  console.log(singleMusic);
  return (
    <div
      className={`${showSideBar ? "w-10/12" : "w-full"} max-w-4xl mx-auto p-6`}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Music</h1>
        <p className="text-gray-600 mt-2">Update music track details</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        {/* Title Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Track Title
            </label>
            <input
              value={singleMusic.title}
              onChange={(e) =>
                setSingleMusic({ ...singleMusic, title: e.target.value })
              }
              type="text"
              name="title"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg"
              placeholder="Enter track title"
              // required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                value={singleMusic.subTitle}
                name="subTitle"
                onChange={(e) =>
                  setSingleMusic({ ...singleMusic, subTitle: e.target.value })
                }
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Enter subtitle"
                // required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Artist</label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                name="artistId"
                value={singleMusic.artistId}
                onChange={(e) =>
                  setSingleMusic({ ...singleMusic, artistId: e.target.value })
                }
                // required
              >
                <option value="">Select an artist</option>
                {allArtist?.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input
                value={singleMusic.duration}
                name="duration"
                onChange={(e) =>
                  setSingleMusic({ ...singleMusic, duration: e.target.value })
                }
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="e.g. 3:45"
                // required
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
                onChange={(e) => setImageFile(e.target.files[0])}
                className="hidden"
                id="thumbnail-upload"
                name="thumbnail"
                accept="image/*"
              />
              <label htmlFor="thumbnail-upload" className="cursor-pointer">
                {imagefile ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={URL.createObjectURL(imagefile)}
                      alt="Cover preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : singleMusic?.image?.url ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={singleMusic.image.url}
                      alt="Current cover"
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
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                id="audio-upload"
                name="audios"
                accept="audio/*"
              />
              <label htmlFor="audio-upload" className="cursor-pointer">
                <div className="flex flex-col items-center py-8">
                  <Music
                    className={`w-12 h-12 mb-2 ${
                      file ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                  <p className="text-sm text-gray-600">
                    {file ? file.name : "Click to upload audio file"}
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
            content={singleMusic.description}
            onChange={handleContentChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploadingPost}
          className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center gap-2"
        >
          {uploadingPost ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Track"
          )}
        </button>
      </form>
    </div>
  );
}

export default EditMusic;
