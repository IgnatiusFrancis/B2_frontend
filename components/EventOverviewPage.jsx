"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEllipsisVertical } from "react-icons/fa6";
import pld from "@/public/pld.jpeg";
import ConfirmationModal from "./confirmationModal";
import action from "@/app/actions";

function EventOverviewPage({ id, title, url, location, date, subtitle }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const baseUrl =
    process.env.B2XCLUSIVE_APP_BASE_URL ||
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
    const toastId = toast.loading("Deleting event...", {
      position: "top-center",
    });

    try {
      await axios.delete(`${baseUrl}/event/delete/${id}`, {
        withCredentials: true,
      });

      await action("events");

      toast.update(toastId, {
        render: "Event deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      //setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Delete error:", error);
      toast.update(toastId, {
        render: error.response?.data?.message || "Failed to delete event",
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
          <Image src={url || pld} alt={title} fill className="object-cover" />
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

      <div className="col-span-1 flex justify-center">
        <span className="text-sm text-gray-600">{"NA" || "00:00"}</span>
      </div>

      <div className="col-span-2 flex justify-center items-center gap-2">
        <span className="text-sm text-gray-600">{location}</span>
      </div>

      <div className="col-span-2 text-center">
        <span className="text-sm text-gray-600">
          {new Date(date).toLocaleDateString("en-US", {
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
              href={`/admin/contents/edit/events/${id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Edit me
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isDeleting}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete Event"}
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
        description="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  );
}

export default EventOverviewPage;
