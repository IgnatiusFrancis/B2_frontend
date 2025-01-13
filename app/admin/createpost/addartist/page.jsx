// "use client";
// import { useCallback, useEffect, useState } from 'react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { Loader2, Upload } from 'lucide-react';

// const AddArtists = () => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     bio: '',
//     file: null
//   });

//   const validateToken = useCallback(async () => {
//     const token = localStorage.getItem('b2xclusiveadmin');
//     if (!token) {
//       toast.error('Please sign in to continue');
//       router.push('/login');
//       return null;
//     }

//     try {
//       const cleanToken = token.replace(/^['"](.*)['"]$/, '$1');
//       const decoded = jwtDecode(cleanToken);
      
//       if (decoded.exp < Date.now() / 1000) {
//         localStorage.removeItem('b2xclusiveadmin');
//         toast.error('Session expired. Please sign in again');
//         router.push('/login');
//         return null;
//       }
      
//       return cleanToken;
//     } catch (error) {
//       console.error('Token validation error:', error);
//       toast.error('Authentication error');
//       router.push('/login');
//       return null;
//     }
//   }, [router]);

//   useEffect(() => {
//     validateToken();
//   }, [validateToken]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, file }));
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const token = await validateToken();
//       if (!token) return;

//       const submitData = new FormData();
//       submitData.append('name', formData.name);
//       submitData.append('bio', formData.bio);
//       if (formData.file) {
//         submitData.append('file', formData.file);
//       }

//       const response = await axios.put(
//         'https://b2xclusive.onrender.com/api/v1/artist/create',
//         submitData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       toast.success(response.data.message);
//       router.push('/admin');
//     } catch (error) {
//       toast.error(error?.response?.data?.message || 'Failed to create artist');
//       console.error('Submission error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-8">Add New Artist</h1>
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-sm font-medium mb-2">Artist Name</label>
//           <input
//             type="text"
//             value={formData.name}
//             onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
//             className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
//             placeholder="Enter artist name"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">Artist Photo</label>
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="hidden"
//               id="file-upload"
//               accept="image/*"
//             />
//             <label htmlFor="file-upload" className="cursor-pointer">
//               {previewUrl ? (
//                 <div className="relative w-full h-64 rounded-lg overflow-hidden">
//                   <Image
//                     src={previewUrl}
//                     alt="Preview"
//                     fill
//                     className="object-cover"
//                   />
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center">
//                   <Upload className="w-12 h-12 text-gray-400 mb-2" />
//                   <p className="text-sm text-gray-600">Click to upload image</p>
//                 </div>
//               )}
//             </label>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-2">Artist Bio</label>
//           <textarea
//             value={formData.bio}
//             onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
//             className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all min-h-[150px]"
//             placeholder="Enter artist biography"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center gap-2"
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="w-5 h-5 animate-spin" />
//               Creating...
//             </>
//           ) : (
//             'Create Artist'
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddArtists;


"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Loader2, Upload } from "lucide-react";

const AddArtists = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    file: null,
  });

  const validateToken = useCallback(async () => {
    const token = localStorage.getItem("b2xclusiveadmin");
    if (!token) {
      toast.error("Please sign in to continue");
      router.push("/login");
      return null;
    }

    try {
      const cleanToken = token.replace(/^['"](.*)['"]$/, "$1");
      const decoded = jwtDecode(cleanToken);

      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("b2xclusiveadmin");
        toast.error("Session expired. Please sign in again");
        router.push("/login");
        return null;
      }

      return cleanToken;
    } catch (error) {
      console.error("Token validation error:", error);
      toast.error("Authentication error");
      router.push("/login");
      return null;
    }
  }, [router]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = await validateToken();
      if (!token) return;

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("bio", formData.bio);
      if (formData.file) {
        submitData.append("file", formData.file);
      }

      const response = await axios.put(
        "https://b2xclusive.onrender.com/api/v1/artist/create",
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
      router.push("/admin");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create artist");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center py-12">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-8">Add New Artist</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Artist Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="Enter artist name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Artist Photo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept="image/*"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {previewUrl ? (
                  <div className="relative w-full h-64 rounded-lg overflow-hidden">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload image</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Artist Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all min-h-[150px]"
              placeholder="Enter artist biography"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Artist"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArtists;
