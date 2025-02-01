"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2, Upload } from "lucide-react";
import action from "@/app/actions";

const SECTIONS = [
  { label: "Blogs", value: "BLOGS" },
  { label: "Events", value: "EVENTS" },
  { label: "Musics", value: "MUSICS" },
  { label: "Videos", value: "VIDEOS" },
];

function AddHeroSection() {
  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [section, setSection] = useState("BLOGS");

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (!imageUrl) {
        toast.error("Please provide an image URL.");
        setUploading(false);
        return;
      }

      const heroSectionData = {
        img: imageUrl,
        text: title,
        subtext: subTitle || "",
      };

      const response = await axios.patch(
        `${baseUrl}/hero-section/${section}`,
        heroSectionData,
        { withCredentials: true }
      );

      await action("heroSection");
      toast.success(
        response.data.message || "Hero section updated successfully!"
      );
      setTitle("");
      setSubTitle("");
      setImageUrl("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="w-full flex justify-center py-12">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <form className="flex flex-col gap-6 items-start" onSubmit={onSubmit}>
          {/* Section Selector */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Section</label>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            >
              {SECTIONS.map((sec) => (
                <option key={sec.value} value={sec.value}>
                  {sec.label}
                </option>
              ))}
            </select>
          </div>

          {/* Main Text */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Main Text</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter main text"
              className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Subtext */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Subtext</label>
            <input
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              type="text"
              placeholder="Enter subtext"
              className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            />
          </div>

          {/* Image URL Input */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">Image URL</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              type="text"
              placeholder="Enter image URL"
              className="w-full p-4 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-all transform ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            }`}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Update Hero Section</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddHeroSection;
