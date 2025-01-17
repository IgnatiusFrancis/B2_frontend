"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "@/context/ThemeContext";
import Tiptap from "@/components/TipTap";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

function EditEvent({ params }) {
  const { eventId } = params;
  const [organizers, setOrganizers] = useState([]);
  const [eventData, setEventData] = useState({
    title: "",
    subTitle: "",
    // organisers: [],
    date: "",
    location: "",
    description: "",
    files: [],
    image: [],
  });

  const validateFile = (file) => {
    const errors = [];

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      errors.push(
        `${file.name}: Invalid file type. Only JPEG, PNG, and WebP images are allowed.`
      );
    }
    if (file.size > MAX_FILE_SIZE) {
      errors.push(
        `${file.name}: File too large (max ${MAX_FILE_SIZE / (1024 * 1024)}MB)`
      );
    }
    return errors;
  };

  const router = useRouter();
  const { showSideBar } = useContext(ThemeContext);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const formData = new FormData(e.target);
      formData.append("description", content || eventData.description);

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
      };

      const response = await axios.patch(
        `https://b2xclusive.onrender.com/api/v1/event/update/${eventId}`,
        formData,
        config
      );
      toast.success(response?.data?.message, { position: "top-center" });

      // router.push("/admin");
      // setTimeout(() => {
      //   router.push("/admin");
      // }, 3000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update event", {
        position: "top-center",
      });
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

        {/* Organizers */}
        {/* <div>
          <label className="block text-sm font-semibold mb-1">Organizer</label>
          <select
            className="w-full bg-gray-100 rounded-lg border p-3 outline-none"
            name="organisersId[]"
            value={eventData?.organisers[0]?.id || ""}
            onChange={(e) =>
              setEventData({ ...eventData, organisersId: e.target.value })
            }
          >
            <option value="">Select Organizer</option>
            {organizers?.map((organizer) => (
              <option key={organizer.id} value={organizer.id}>
                {organizer.name}
              </option>
            ))}
          </select>
        </div> */}

        {/* Date and Location */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Event Date
            </label>
            <input
              value={eventData.date}
              name="date"
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
          <label className="block text-sm font-semibold mb-1">
            Event Image
          </label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            name="files"
            className="w-full bg-gray-100 rounded-lg border p-3 outline-none"
          />
          {file && (
            <div className="mt-4">
              <Image
                src={URL.createObjectURL(file)}
                width={1000}
                height={1000}
                alt="Selected Event Image"
                className="w-full h-64 object-cover rounded-lg"
              />
              <p className="mt-2 text-sm">Selected File: {file.name}</p>
            </div>
          )}
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

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white ${
              uploading ? "bg-gray-400 cursor-not-allowed" : "bg-primarycolor"
            } flex items-center justify-center`}
            disabled={uploading}
          >
            {uploading ? (
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
            ) : (
              "Save Event"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEvent;
