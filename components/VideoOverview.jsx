"use client";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaComment, FaCommentDots, FaEllipsisV, FaEye } from "react-icons/fa";
import pld from "@/public/pld.jpeg";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { FaEllipsisVertical } from "react-icons/fa6";
import action from "@/app/actions";
import ConfirmationModal from "./confirmationModal";
function VideoOverview({
  id,
  title,
  url,
  duration,
  createdAt,
  subtitle,
  artist,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const baseUrl =
    process.env.NEXT_PUBLIC_B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    const toastId = toast.loading("Deleting video...", {
      position: "top-center",
    });

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/track/video/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await action("videos");

      toast.update(toastId, {
        render: "Video deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast.update(toastId, {
        render: error.response?.data?.message || "Failed to delete video",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };
  return (
    <div className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-gray-50 transition-colors">
      <div className="col-span-6 flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={url || pld}
            width={1000}
            height={1000}
            alt="alb"
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-medium truncate">
            {title?.split(" ").slice(0, 4).join(" ")}
          </h3>
          <p className="text-xs text-gray-500 truncate">
            {subtitle?.split(" ").slice(0, 6).join(" ")}
          </p>
        </div>
      </div>

      <div className="col-span-1 text-sm text-gray-600">
        <span className="text-sm text-gray-600"> {duration || "00:00"}</span>
      </div>

      <div className="col-span-2 flex justify-center items-center gap-2">
        <span className="text-sm text-gray-600">{artist?.name}</span>
      </div>

      <div className="col-span-2 text-center">
        <span className="text-sm text-gray-600">
          {new Date(createdAt).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <div
        className="col-span-1 flex justify-center relative"
        ref={dropdownRef}
      >
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FaEllipsisVertical className="text-gray-400" />
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10 py-1">
            <Link
              href={`/admin/contents/edit/video/${id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Edit Video
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isDeleting}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete Video"}
            </button>
          </div>
        )}
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this video? This action cannot be undone."
      />
    </div>
  );
}

export default VideoOverview;
