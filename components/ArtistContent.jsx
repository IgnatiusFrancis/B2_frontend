// "use client";
// import { useState, useCallback } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { MoreVertical, Edit, Trash2, ExternalLink } from "lucide-react";
// import { Menu, Transition } from "@headlessui/react";

// const ArtistCard = ({ id, name, url, bio, createdAt }) => {
//   const [isDeleting, setIsDeleting] = useState(false);

//   const handleDelete = useCallback(async () => {
//     if (!window.confirm("Are you sure you want to delete this artist?")) {
//       return;
//     }

//     setIsDeleting(true);
//     const toastId = toast.loading("Deleting artist...", {
//       position: "top-center",
//     });

//     try {
//       const token = localStorage
//         .getItem("b2exclusiveadmin")
//         ?.replace(/^['"](.*)['"]$/, "$1");

//       if (!token) {
//         throw new Error("Authentication required");
//       }

//       await axios.delete(
//         `https://b2xclusive.onrender.com/api/v1/artist/delete/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       toast.update(toastId, {
//         render: "Artist deleted successfully",
//         type: "success",
//         isLoading: false,
//         autoClose: 2000,
//       });

//       // Optionally trigger a refresh or update local state
//       setTimeout(() => window.location.reload(), 2000);
//     } catch (error) {
//       console.error("Delete error:", error);
//       toast.update(toastId, {
//         render: error.response?.data?.message || "Failed to delete artist",
//         type: "error",
//         isLoading: false,
//         autoClose: 3000,
//       });
//     } finally {
//       setIsDeleting(false);
//     }
//   }, [id]);

//   return (
//     <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
//       <div className="aspect-square relative">
//         <Image
//           src={url}
//           alt={name}
//           fill
//           className="object-cover"
//           loading="lazy"
//         />
//       </div>

//       <div className="p-4">
//         <div className="flex items-start justify-between">
//           <div>
//             <h3 className="font-medium">{name}</h3>
//             <p className="text-sm text-gray-600 mt-1 line-clamp-2">{bio}</p>
//           </div>

//           <Menu as="div" className="relative">
//             <Menu.Button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
//               <MoreVertical className="w-5 h-5 text-gray-600" />
//             </Menu.Button>

//             <Transition
//               enter="transition duration-100 ease-out"
//               enterFrom="transform scale-95 opacity-0"
//               enterTo="transform scale-100 opacity-100"
//               leave="transition duration-75 ease-out"
//               leaveFrom="transform scale-100 opacity-100"
//               leaveTo="transform scale-95 opacity-0"
//             >
//               <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                 <div className="p-1">
//                   <Menu.Item>
//                     {({ active }) => (
//                       <Link
//                         href={`/admin/contents/edit/artist/${id}`}
//                         className={`
//                           flex items-center gap-2 px-4 py-2 text-sm rounded-md
//                           ${active ? "bg-gray-100" : ""}
//                         `}
//                       >
//                         <Edit className="w-4 h-4" />
//                         Edit Artist
//                       </Link>
//                     )}
//                   </Menu.Item>

//                   <Menu.Item>
//                     {({ active }) => (
//                       <button
//                         onClick={handleDelete}
//                         disabled={isDeleting}
//                         className={`
//                           flex items-center gap-2 px-4 py-2 text-sm rounded-md w-full text-red-600
//                           ${active ? "bg-red-50" : ""}
//                           ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}
//                         `}
//                       >
//                         <Trash2 className="w-4 h-4" />
//                         {isDeleting ? "Deleting..." : "Delete Artist"}
//                       </button>
//                     )}
//                   </Menu.Item>
//                 </div>
//               </Menu.Items>
//             </Transition>
//           </Menu>
//         </div>

//         <div className="mt-4 text-xs text-gray-500">
//           Added{" "}
//           {new Date(createdAt).toLocaleDateString("en-US", {
//             weekday: "long",
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArtistCard;

"use client";
import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import ConfirmationModal from "./confirmationModal";

const ArtistCard = ({ id, name, url, bio, createdAt }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsDeleting(true);
    const toastId = toast.loading("Deleting artist...", {
      position: "top-center",
    });

    try {
      const storedUser = localStorage.getItem("b2xclusiveadmin");
      const token = storedUser ? JSON.parse(storedUser) : null;

      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      await axios.delete(
        `https://b2xclusive.onrender.com/api/v1/artist/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.update(toastId, {
        render: "Artist deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.error("Delete error:", error);
      toast.update(toastId, {
        render: error.response?.data?.message || "Failed to delete artist",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
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
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{bio}</p>
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
                          ${active ? "bg-gray-100" : ""}
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
                        onClick={() => setIsModalOpen(true)}
                        className={`
                          flex items-center gap-2 px-4 py-2 text-sm rounded-md w-full text-red-600
                          ${active ? "bg-red-50" : ""}
                        `}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Artist
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Added{" "}
          {new Date(createdAt).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this artist? This action cannot be undone."
      />
    </div>
  );
};

export default ArtistCard;
