// "use client";
// import Image from "next/image";
// import { toast } from "react-toastify";
// import { FaComment, FaCommentDots, FaEllipsisV, FaEye } from "react-icons/fa";
// import pld from "@/public/pld.jpeg";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import axios from "axios";

// function EventOverview({ id, title, image, createdAt, subtitle }) { 
//   const [showActions, setShowActions] = useState(false);
//   const [token, setToken] = useState(""); // State to hold the token
//   console.log(title);
//   useEffect(() => {
//     const storedToken = localStorage.getItem("b2exclusiveadmin");
//     if (storedToken) {
//       const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");
//       setToken(cleanedToken);
//       console.log(cleanedToken);
//     } else {
//       console.error("Bearer token not found");
//     }
//   }, []);

//   const handleDelete = async () => {
//     toast.warning("deleting post...", {
//       autoClose: false,
//       position: "top-center",
//     });

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const response = await axios.delete(
//         `https://b2xclusive.onrender.com/api/v1/event/delete/${id}`,
//         config,
//       );
//       toast.dismiss();

//       toast.success(`Post Deleted successfully`, {
//         position: "top-center",
//       });

//       setTimeout(() => {
//         window.location.reload();
//       });
//     } catch (error) {
//       console.error("Failed delete post", error.message);
//       toast.dismiss();
//       toast.error(`Failed to delete post`, {
//         position: "top-center",
//       });
//     }
//   };
//   return (
//     <>
//       <div className="w-full p-2 flex items-center border border-gray-100 rounded-se rounded-ss">
//         <div className="w-7/12 flex items-center gap-2">
//           <div className="w-[30px] h-[30px] rounded-full">
//             <Image
//               src={image ? image[0]?.url : pld}
//               width={1000}
//               height={1000}
//               alt="alb"
//               className="w-full h-full object-cover rounded-lg"
//             />
//           </div>
//           <div>
//             <h1 className={`text-xs `}>
//               {title?.split(" ").slice(0, 4).join(" ")}
//             </h1>
//             <p className="text-xs text-gray-400">
//               {subtitle?.split(" ").slice(0, 6).join(" ") || "Event Subtitle"}
//             </p>
//           </div>
//         </div>
//         <p className="w-3/12 text-xs">{createdAt?.split("T")[0]}</p>
//         <div
//           className="w-1/12 text-xs relative cursor-pointer "
//           onClick={() => setShowActions(!showActions)}
//         >
//           <FaEllipsisV className={`text-xs text-center`} />
//           {showActions ? (
//             <div className="w-full border right-0 top-5 rounded-lg absolute bg-white flex flex-col ">
//               <Link
//                 href={`/admin/contents/edit/events/${id}`}
//                 className="hover:bg-primarycolor hover:rounded-lg hover:text-white p-2 text-xs cursor-pointer"
//               >
//                 Edit Event
//               </Link>
//               <p
//                 onClick={handleDelete}
//                 className="hover:bg-primarycolor hover:rounded-lg hover:text-white p-2 text-xs cursor-pointer"
//               >
//                 Delete Event
//               </p>
//             </div>
//           ) : (
//             ""
//           )}{" "}
//         </div>
//       </div>
//     </>
//   );
// }

// export default EventOverview;



// EventOverview.jsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaEllipsisV } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import pld from "@/public/pld.jpeg";

function EventOverview({ id, title, url, createdAt, subtitle }) {
  const [showActions, setShowActions] = useState(false);
  const [token, setToken] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("b2exclusiveadmin");
      if (storedToken) {
        const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");
        setToken(cleanedToken);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  const handleDelete = async () => {
    if (!token) {
      toast.error("Authentication required", {
        position: "top-center",
      });
      return;
    }

    try {
      setIsDeleting(true);
      toast.warning("Deleting event...", {
        autoClose: false,
        position: "top-center",
      });

      await axios.delete(
        `https://b2xclusive.onrender.com/api/v1/event/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.dismiss();
      toast.success("Event deleted successfully", {
        position: "top-center",
      });

      // Give toast time to show before reload
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to delete event", {
        position: "top-center",
      });
    } finally {
      setIsDeleting(false);
      setShowActions(false);
    }
  };

  const truncateText = (text, wordCount) => {
    if (!text) return "";
    return text.split(" ").slice(0, wordCount).join(" ");
  };

  return (
    <div className="w-full p-4 flex items-center border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="w-7/12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={url || pld}
            width={40}
            height={40}
            alt={title || "Event image"}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <h1 className="text-sm font-medium text-gray-800 truncate">
            {truncateText(title, 4)}
          </h1>
          <p className="text-xs text-gray-500 truncate">
            {truncateText(subtitle, 6) || "Event Subtitle"}
          </p>
        </div>
      </div>

      <div className="w-3/12 text-sm text-gray-600">
        {new Date(createdAt).toLocaleDateString("en-US", {
                      weekday: "long", 
                      year: "numeric",
                      month: "long", 
                      day: "numeric",
                    })}
      </div>

      <div className="w-2/12 relative">
        <button
          onClick={() => setShowActions(!showActions)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Show actions"
        >
          <FaEllipsisV className="text-gray-600" />
        </button>

        {showActions && (
          <div className="absolute right-0 top-full mt-1 w-36 border rounded-lg bg-white shadow-lg z-10">
            <Link
              href={`/admin/contents/edit/events/${id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-t-lg"
            >
              Edit Event
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg text-left"
            >
              {isDeleting ? "Deleting..." : "Delete Event"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventOverview;