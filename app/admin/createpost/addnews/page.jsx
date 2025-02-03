"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2, Upload } from "lucide-react";
import action from "@/app/actions";

const SECTIONS = [
  { label: "Headline 1 content", value: "HEADER_1" },
  { label: "Headline 2 content", value: "HEADER_2" },
  { label: "Headline 3 content", value: "HEADER_3" },
  { label: "Headline 4 content", value: "HEADER_4" },
  { label: "Headline 5 content", value: "HEADER_5" },
  { label: "Headline 6 content", value: "HEADER_6" },
];

function AddNews() {
  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [section, setSection] = useState("HEADER_1");

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const newsData = {
        title: title,
      };

      const response = await axios.put(
        `${baseUrl}/hero-section/breaking-news/${section}`,
        newsData,
        { withCredentials: true }
      );

      await action("heroSection");
      toast.success(response.data?.message || "News added successfully!");
      setTitle("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="w-full flex justify-center py-12">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
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

          {/* News Title */}
          <div className="flex flex-col gap-2 w-full">
            <label className="font-medium">News Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter news title"
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
                <span>Submit News</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddNews;
