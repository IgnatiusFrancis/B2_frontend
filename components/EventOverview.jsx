"use client";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaComment, FaCommentDots, FaEllipsisV, FaEye } from "react-icons/fa";
import pld from "@/public/pld.jpeg";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

function EventOverview({ id, title, image, createdAt, subtitle }) {
  const [showActions, setShowActions] = useState(false);
  const [token, setToken] = useState(""); // State to hold the token
  console.log(title);
  useEffect(() => {
    const storedToken = localStorage.getItem("b2exclusiveadmin");
    if (storedToken) {
      const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");
      setToken(cleanedToken);
      console.log(cleanedToken);
    } else {
      console.error("Bearer token not found");
    }
  }, []);

  const handleDelete = async () => {
    toast.warning("deleting post...", {
      autoClose: false,
      position: "top-center",
    });

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `https://b2xclusive.onrender.com/api/v1/event/delete/${id}`,
        config,
      );
      toast.dismiss();

      toast.success(`Post Deleted successfully`, {
        position: "top-center",
      });

      setTimeout(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Failed delete post", error.message);
      toast.dismiss();
      toast.error(`Failed to delete post`, {
        position: "top-center",
      });
    }
  };
  return (
    <>
      <div className="w-full p-2 flex items-center border border-gray-100 rounded-se rounded-ss">
        <div className="w-7/12 flex items-center gap-2">
          <div className="w-[30px] h-[30px] rounded-full">
            <Image
              src={image ? image[0]?.url : pld}
              width={1000}
              height={1000}
              alt="alb"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className={`text-xs `}>
              {title?.split(" ").slice(0, 4).join(" ")}
            </h1>
            <p className="text-xs text-gray-400">
              {subtitle?.split(" ").slice(0, 6).join(" ") || "Event Subtitle"}
            </p>
          </div>
        </div>
        <p className="w-3/12 text-xs">{createdAt?.split("T")[0]}</p>
        <div
          className="w-1/12 text-xs relative cursor-pointer "
          onClick={() => setShowActions(!showActions)}
        >
          <FaEllipsisV className={`text-xs text-center`} />
          {showActions ? (
            <div className="w-full border right-0 top-5 rounded-lg absolute bg-white flex flex-col ">
              <Link
                href={`/admin/contents/edit/events/${id}`}
                className="hover:bg-primarycolor hover:rounded-lg hover:text-white p-2 text-xs cursor-pointer"
              >
                Edit Event
              </Link>
              <p
                onClick={handleDelete}
                className="hover:bg-primarycolor hover:rounded-lg hover:text-white p-2 text-xs cursor-pointer"
              >
                Delete Event
              </p>
            </div>
          ) : (
            ""
          )}{" "}
        </div>
      </div>
    </>
  );
}

export default EventOverview;
