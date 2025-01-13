// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Tiptap from "@/components/TipTap";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { jwtDecode } from "jwt-decode";
// function AddMusic() {
//   const [allArtist, setALlArtist] = useState([]);
//   const [gettingArtist, setGettingArtist] = useState(false);
//   const [gettingArtisterror, setGettingArtisterror] = useState(false);

//   const router = useRouter();
//   const [uploadingPost, setuploadingPost] = useState(false);

//   const [file, setFile] = useState(null);
//   const [imagefile, setImageFile] = useState(null);
//   const [content, setContent] = useState("");

//   const handleContentChange = (cont) => {
//     setContent(cont);
//   };

//   const [token, setToken] = useState(""); // State to hold the token

//   const [isTokenExpired, setIsTokenExpired] = useState(false);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("b2xclusiveadmin");
//     if (storedToken) {
//       const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");

//       try {
//         const decodedToken = jwtDecode(cleanedToken);
//         const currentTime = Date.now() / 1000; // Current time in seconds

//         if (decodedToken.exp < currentTime) {
//           console.error("Token is expired");
//           toast.error("Invalid or Expired token, please sign in", {
//             position: "top-center",
//           });
//           setIsTokenExpired(true);
//           // Optionally, you can remove the expired token from localStorage
//           localStorage.removeItem("b2xclusiveadmin");
//           router.push("/login");
//         } else {
//           setToken(cleanedToken);
//           setIsTokenExpired(false);
//         }
//       } catch (error) {
//         console.error("Invalid token:", error);
//       }
//     } else {
//       console.error("Bearer token not found");
//     }
//   }, [router]);
//   useEffect(() => {
//     const fetchData = async () => {
//       setGettingArtist(true);
//       try {
//         const response = await axios.get(
//           `https://b2xclusive.onrender.com/api/v1/artist/artists`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );
//         setALlArtist(response?.data?.data);
//       } catch (error) {
//         console.log(error, "Unable to fetch artists");
//         setGettingArtisterror(true);
//       } finally {
//         setGettingArtist(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   const [music, setMusic] = useState({
//     title: "",
//     subTitle: "",
//     description: content,
//     duration: "",
//     artistId: "",
//   });
//   useEffect(() => {
//     setMusic((prevPost) => ({
//       ...prevPost,
//       audios: file,
//       thumbnail: imagefile,
//       description: content,
//     }));
//   }, [file, content, imagefile]);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setuploadingPost(true);
//     try {
//       let formData = new FormData(e.target);
//       formData.append("description", music.description);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       const musicResponse = await axios.put(
//         "https://b2xclusive.onrender.com/api/v1/track/createAudio",
//         formData,
//         config,
//       );
//       toast.success(musicResponse?.data?.message, {
//         position: "top-center",
//       });

//       setTimeout(() => {
//         router.push("/admin");
//       }, 3000);
//     } catch (error) {
//       console.error("Failed to upload music", error.message);
//       toast.error(
//         error?.response?.data?.message ||
//           error?.response?.data?.errorResponse?.message,
//         {
//           position: "top-center",
//         },
//       );
//     } finally {
//       setuploadingPost(false); // Reset uploadingPost state
//     }
//   };

//   return (
//     <>
//       <section className={` `}>
//         <form
//           onSubmit={onSubmit}
//           className={`flex text-xs flex-col gap-8 items-start`}
//         >
//           <div className="flex flex-col gap-2 w-full">
//             <label>Music Title</label>
//             <input
//               value={music.title}
//               onChange={(e) => setMusic({ ...music, title: e.target.value })}
//               type="text"
//               name="title"
//               placeholder="Enter Music Title"
//               className=" w-full bg-transparent rounded-lg text-2xl  outline-none"
//               required
//             />
//           </div>
//           <div className="flex flex-col md:flex-row gap-4 w-full md:items-center ">
//             <div className="flex flex-col md:w-6/12">
//               <label htmlFor="">Subtitle </label>
//               <input
//                 value={music.subTitle}
//                 onChange={(e) =>
//                   setMusic({ ...music, subTitle: e.target.value })
//                 }
//                 type="text"
//                 name="subTitle"
//                 placeholder="Enter subtitle"
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//                 required
//               />
//             </div>

//             <div className="flex flex-col md:w-3/12">
//               <label htmlFor="artist-select">Artists</label>
//               <select
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//                 name="artistId"
//                 id="artist-select"
//                 onChange={(e) =>
//                   setMusic({ ...music, artistId: e.target.value })
//                 }
//                 required
//               >
//                 <option value="null">
//                   {gettingArtist
//                     ? "Loading..."
//                     : gettingArtisterror
//                       ? "Failed to load artists"
//                       : "Select Artist"}
//                 </option>
//                 {!gettingArtist &&
//                   !gettingArtisterror &&
//                   allArtist?.map((artist) => (
//                     <option key={artist.id} value={artist.id}>
//                       {artist.name}
//                     </option>
//                   ))}
//               </select>
//               {gettingArtisterror && (
//                 <p className="text-primarycolor text-xs mt-2">
//                   Failed to get all artists
//                 </p>
//               )}
//             </div>

//             <div className="flex flex-col md:w-3/12">
//               <label htmlFor="">Duration </label>
//               <input
//                 value={music.duration}
//                 name="duration"
//                 onChange={(e) =>
//                   setMusic({ ...music, duration: e.target.value })
//                 }
//                 type="text"
//                 placeholder="Enter music duration"
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//                 required
//               />
//             </div>
//           </div>
//           <div className="flex gap-4 w-full items-center">
//             <div className="flex flex-col w-full">
//               <label htmlFor="">Upload Music Cover </label>
//               <input
//                 onChange={(e) => setImageFile(e.target.files[0])}
//                 type="file"
//                 multiple
//                 name="thumbnail"
//                 placeholder="Upload File"
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//                 required
//               />
//             </div>
//           </div>
//           {imagefile ? (
//             <div className="w-full">
//               <div className="w-full h-[300px]">
//                 <Image
//                   src={URL.createObjectURL(imagefile)}
//                   width={1000}
//                   height={1000}
//                   alt="post"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className={``}>Selected File: {imagefile.name}</p>
//             </div>
//           ) : (
//             <p>No file selected</p>
//           )}{" "}
//           <div className="flex gap-4 w-full items-center">
//             <div className="flex flex-col w-full">
//               <label htmlFor="">Upload Music </label>
//               <input
//                 onChange={(e) => setFile(e.target.files[0])}
//                 type="file"
//                 multiple
//                 name="audios"
//                 placeholder="Upload File"
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//                 required
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 w-full">
//             <label htmlFor="">Music Descriptions</label>
//             <Tiptap
//               content={content}
//               onChange={(newContent) => handleContentChange(newContent)}
//             />
//           </div>
//           <button
//             type="submit"
//             // Use handlePost instead of handleingPost
//             className={`${uploadingPost ? "bg-orange-100" : "bg-primarycolor"} text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
//           >
//             {uploadingPost ? (
//               <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin infinite" />
//             ) : (
//               "Create Music"
//             )}
//           </button>
//         </form>
//       </section>
//     </>
//   );
// }

// export default AddMusic;




"use client";
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Loader2, Music, Upload } from 'lucide-react';
import Tiptap from "@/components/TipTap";

const AddMusic = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState([]);
  const [isLoadingArtists, setIsLoadingArtists] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    description: '',
    duration: '',
    artistId: '',
    audioFile: null,
    thumbnailFile: null
  });

  // Token validation
  const validateToken = useCallback(async () => {
    const token = localStorage.getItem('b2xclusiveadmin');
    if (!token) {
      toast.error('Please sign in to continue');
      router.push('/login');
      return null;
    }

    try {
      const cleanToken = token.replace(/^['"](.*)['"]$/, '$1');
      const decoded = jwtDecode(cleanToken);
      
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem('b2xclusiveadmin');
        toast.error('Session expired. Please sign in again');
        router.push('/login');
        return null;
      }
      
      return cleanToken;
    } catch (error) {
      console.error('Token validation error:', error);
      toast.error('Authentication error');
      router.push('/login');
      return null;
    }
  }, [router]);

  // Fetch artists
  const fetchArtists = useCallback(async (token) => {
    setIsLoadingArtists(true);
    try {
      const response = await axios.get(
        'https://b2xclusive.onrender.com/api/v1/artist/artists',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setArtists(response.data.data);
    } catch (error) {
      toast.error('Failed to load artists');
      console.error('Artist fetch error:', error);
    } finally {
      setIsLoadingArtists(false);
    }
  }, []);

  useEffect(() => {
    const initializeComponent = async () => {
      const token = await validateToken();
      if (token) {
        fetchArtists(token);
      }
    };
    initializeComponent();
  }, [validateToken, fetchArtists]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = await validateToken();
      if (!token) return;

      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'audioFile') {
          submitData.append('audios', formData.audioFile);
        } else if (key === 'thumbnailFile') {
          submitData.append('thumbnail', formData.thumbnailFile);
        } else {
          submitData.append(key, formData[key]);
        }
      });

      const response = await axios.put(
        'https://b2xclusive.onrender.com/api/v1/track/createAudio',
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success(response.data.message);
      router.push('/admin');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to create music');
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Add New Music</h1>
        <p className="text-gray-600 mt-2">Upload and publish new music tracks</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Track Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg"
              placeholder="Enter track title"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                type="text"
                value={formData.subTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subTitle: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Enter subtitle"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Artist</label>
              <select
                value={formData.artistId}
                onChange={(e) => setFormData(prev => ({ ...prev, artistId: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
                disabled={isLoadingArtists}
              >
                <option value="">Select an artist</option>
                {artists.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="e.g. 3:45"
                required
              />
            </div>
          </div>
        </div>

        {/* Media Upload Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Thumbnail Upload */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <label className="block text-sm font-medium mb-4">Cover Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                onChange={(e) => setFormData(prev => ({ ...prev, thumbnailFile: e.target.files[0] }))}
                className="hidden"
                id="thumbnail-upload"
                accept="image/*"
              />
              <label htmlFor="thumbnail-upload" className="cursor-pointer">
                {formData.thumbnailFile ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={URL.createObjectURL(formData.thumbnailFile)}
                      alt="Cover preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload cover image</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Audio Upload */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <label className="block text-sm font-medium mb-4">Audio File</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                onChange={(e) => setFormData(prev => ({ ...prev, audioFile: e.target.files[0] }))}
                className="hidden"
                id="audio-upload"
                accept="audio/*"
              />
              <label htmlFor="audio-upload" className="cursor-pointer">
                <div className="flex flex-col items-center py-8">
                  <Music className={`w-12 h-12 mb-2 ${formData.audioFile ? 'text-blue-500' : 'text-gray-400'}`} />
                  <p className="text-sm text-gray-600">
                    {formData.audioFile ? formData.audioFile.name : 'Click to upload audio file'}
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <label className="block text-sm font-medium mb-4">Track Description</label>
          <Tiptap
            content={formData.description}
            onChange={(newContent) => setFormData(prev => ({ ...prev, description: newContent }))}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Publishing...
            </>
          ) : (
            'Publish Track'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddMusic;