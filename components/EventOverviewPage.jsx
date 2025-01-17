"use client";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaEllipsisVertical } from "react-icons/fa6";
import pld from "@/public/pld.jpeg";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { FaComment } from "react-icons/fa";

function EventOverviewPage({ id, title, url, location, date, subtitle }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dropdownRef = useRef(null);

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

    try {
      const storedUser = localStorage.getItem("b2xclusiveadmin");
      const token = storedUser ? JSON.parse(storedUser) : null;

      if (!token) {
        console.error("No token found in the stored user object");
        return;
      }

      await axios.delete(
        `https://b2xclusive.onrender.com/api/v1/event/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.dismiss();
      toast.success("Event deleted successfully", {
        position: "top-center",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Failed to delete event:", error.message);
      toast.dismiss();
      toast.error("Failed to delete event", {
        position: "top-center",
      });
    } finally {
      setIsDeleting(false);
      setShowDropdown(false);
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
              Edit Event
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete Event"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventOverviewPage;
