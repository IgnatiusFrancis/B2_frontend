// "use client";
// import Image from "next/image";
// import { toast } from "react-toastify";
// import { FaComment, FaCommentDots, FaEllipsisV, FaEye } from "react-icons/fa";
// import pld from "@/public/pld.jpeg";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import axios from "axios";
// function ArtistContent({ id, name, url, bio, createdAt }) {
//   const [showActions, setShowActions] = useState(false);
//   const [token, setToken] = useState(""); // State to hold the token
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
//         `https://b2xclusive.onrender.com/api/v1/artist/delete/${id}`,
//         config,
//       );
//       toast.dismiss();

//       toast.success(`Artist Deleted successfully`, {
//         position: "top-center",
//       });

//       setTimeout(() => {
//         window.location.reload();
//       });
//     } catch (error) {
//       console.error("Failed delete artist", error.message);
//       toast.dismiss();
//       toast.error(`Failed to delete artist`, {
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
//               src={url || pld}
//               width={1000}
//               height={1000}
//               alt="alb"
//               className="w-full h-full object-cover rounded-lg"
//             />
//           </div>
//           <div>
//             <h1 className={`text-xs`}>{name}</h1>
//             <p className="text-xs text-gray-400">
//               {bio?.split(" ").slice(0, 3).join(" ")}
//             </p>
//           </div>
//         </div>
//         <h1 className={` w-3/12 text-xs `}>{createdAt?.split("T")[0]}</h1>
//         <div
//           className="w-2/12 relative cursor-pointer "
//           onClick={() => setShowActions(!showActions)}
//         >
//           <FaEllipsisV className={` text-center`} />
//           {showActions ? (
//             <div className="w-full border right-0 top-5 rounded-lg absolute bg-white flex flex-col ">
//               <Link
//                 href={`/admin/contents/edit/artist/${id}`}
//                 className="hover:bg-primarycolor hover:rounded-lg hover:text-white p-2 text-xs cursor-pointer"
//               >
//                 Edit Artist
//               </Link>
//               <p
//                 onClick={handleDelete}
//                 className="hover:bg-primarycolor hover:rounded-lg hover:text-white p-2 text-xs cursor-pointer"
//               >
//                 Delete Artist
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

// export default ArtistContent;




"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { MoreVertical, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';

const ArtistCard = ({ id, name, url, bio, createdAt }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    if (!window.confirm('Are you sure you want to delete this artist?')) {
      return;
    }

    setIsDeleting(true);
    const toastId = toast.loading('Deleting artist...', {
      position: "top-center"
    });

    try {
      const token = localStorage.getItem("b2exclusiveadmin")?.replace(/^['"](.*)['"]$/, "$1");
      
      if (!token) {
        throw new Error('Authentication required');
      }

      await axios.delete(
        `https://b2xclusive.onrender.com/api/v1/artist/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.update(toastId, {
        render: "Artist deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });

      // Optionally trigger a refresh or update local state
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error('Delete error:', error);
      toast.update(toastId, {
        render: error.response?.data?.message || "Failed to delete artist",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setIsDeleting(false);
    }
  }, [id]);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square relative">
        <Image
          src={url}
          alt={name}
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {bio}
            </p>
          </div>

          <Menu as="div" className="relative">
            <Menu.Button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </Menu.Button>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={`/admin/contents/edit/artist/${id}`}
                        className={`
                          flex items-center gap-2 px-4 py-2 text-sm rounded-md
                          ${active ? 'bg-gray-100' : ''}
                        `}
                      >
                        <Edit className="w-4 h-4" />
                        Edit Artist
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={`
                          flex items-center gap-2 px-4 py-2 text-sm rounded-md w-full text-red-600
                          ${active ? 'bg-red-50' : ''}
                          ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                      >
                        <Trash2 className="w-4 h-4" />
                        {isDeleting ? 'Deleting...' : 'Delete Artist'}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Added  {new Date(createdAt).toLocaleDateString("en-US", {
                      weekday: "long", 
                      year: "numeric",
                      month: "long", 
                      day: "numeric",
                    })}
        </div> 
      </div>
    </div>
  );
};

export default ArtistCard;