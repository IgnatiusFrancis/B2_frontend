// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ThemeContext } from "@/context/ThemeContext";
// import { useContext } from "react";
// import Tiptap from "@/components/TipTap";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// function EditMusic({ params }) {
//   const { musicId } = params;

//   const [allArtist, setALlArtist] = useState([]);

//   const router = useRouter();
//   const { showSideBar } = useContext(ThemeContext);
//   const [uploadingPost, setuploadingPost] = useState(false);

//   const [file, setFile] = useState(null);
//   const [imagefile, setImageFile] = useState(null);
//   const [content, setContent] = useState("");

//   const handleContentChange = (cont) => {
//     setContent(cont);
//   };

//   const [singleMusic, setSingleMusic] = useState({
//     title: "",
//     subTitle: "",
//     artistId: "",
//     duration: "",
//     thumbnail: "",
//     description: "",
//   });

//   const [token, setToken] = useState(""); // State to hold the token

//   useEffect(() => {
//     const storedToken = localStorage.getItem("b2xclusiveadmin");
//     if (storedToken) {
//       const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");
//       setToken(cleanedToken);
//     } else {
//       console.error("Bearer token not found");
//     }
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
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

//         const musicresponse = await axios.get(
//           `https://b2xclusive.onrender.com/api/v1/track/audio/${musicId}`,
//         );
//         const postData = musicresponse?.data?.data;
//         setSingleMusic(postData);
//       } catch (error) {
//         console.log(error, "Unable to fetch artists");
//       }
//     };

//     fetchData();
//   }, [token, musicId]);

//   useEffect(() => {
//     setSingleMusic((prevPost) => ({
//       ...prevPost,
//       audios: file,
//       thumbnail: imagefile,
//       description: content,
//     }));
//   }, [file, imagefile, content]);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setuploadingPost(true);
//     try {
//       let formData = new FormData(e.target);
//       formData.append("description", content);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       const musicResponse = await axios.patch(
//         `https://b2xclusive.onrender.com/api/v1/track/audio/update/${musicId}`,
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
//       toast.error(error?.response?.data?.message || "Failed to upload music", {
//         position: "top-center",
//       });
//     } finally {
//       setuploadingPost(false); // Reset uploadingPost state
//     }
//   };

//   return (
//     <>
//       <section className={`${showSideBar ? "w-10/12" : "w-full"} p-4 md:p-8 `}>
//         <form
//           onSubmit={onSubmit}
//           className={`flex text-xs flex-col gap-8 items-start`}
//         >
//           <div className="flex flex-col gap-2 w-full">
//             <label>Music Title</label>
//             <input
//               value={singleMusic.title}
//               onChange={(e) =>
//                 setSingleMusic({ ...singleMusic, title: e.target.value })
//               }
//               type="text"
//               name="title"
//               placeholder="Loading..."
//               className=" w-full bg-transparent rounded-lg text-lg md:text-2xl  outline-none"
//             />
//           </div>
//           <div className="flex gap-4 w-full flex-col md:flex-row md:items-center">
//             <div className="flex flex-col md:w-6/12">
//               <label htmlFor="">Subtitle </label>
//               <input
//                 value={singleMusic.subTitle}
//                 name="subTitle"
//                 onChange={(e) =>
//                   setSingleMusic({ ...singleMusic, subTitle: e.target.value })
//                 }
//                 type="text"
//                 placeholder="Loading..."
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//               />
//             </div>

//             <div className="flex flex-col md:w-3/12">
//               <label htmlFor="">Artists </label>
//               <select
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//                 name="artistId"
//                 value={singleMusic.artistId}
//                 id=""
//                 onChange={(e) =>
//                   setSingleMusic({ ...singleMusic, artistId: e.target.value })
//                 }
//               >
//                 <option value="null">Select Artist</option>
//                 {allArtist?.map((artist) => (
//                   <option key={artist.id} value={artist.id}>
//                     {artist.name}
//                   </option>
//                 ))}
//               </select>{" "}
//             </div>

//             <div className="flex flex-col md:w-3/12">
//               <label htmlFor="">Duration </label>
//               <input
//                 value={singleMusic.duration}
//                 name="duration"
//                 onChange={(e) =>
//                   setSingleMusic({ ...singleMusic, duration: e.target.value })
//                 }
//                 type="text"
//                 placeholder="Loading..."
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
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
//               />
//             </div>
//           </div>
//           {imagefile && imagefile ? (
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
//             singleMusic?.image && (
//               <div className="w-full">
//                 <div className="w-full h-[300px]">
//                   <Image
//                     src={singleMusic?.image?.url}
//                     width={1000}
//                     height={1000}
//                     alt="post"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <p className={``}>Selected File: {singleMusic.image?.url}</p>
//               </div>
//             )
//           )}
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
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 w-full">
//             <label htmlFor="">Music Descriptions</label>
//             <Tiptap
//               content={singleMusic.description}
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
//               "Update music"
//             )}
//           </button>
//         </form>
//       </section>
//     </>
//   );
// }

// export default EditMusic;



"use client";
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader2, Music, Upload } from 'lucide-react';
import Tiptap from "@/components/TipTap";
import Image from 'next/image';
import { ThemeContext } from '@/context/ThemeContext';

function EditMusic({ params }) {
  const { musicId } = params;
  const router = useRouter();
  const { showSideBar } = useContext(ThemeContext);
  
  const [allArtist, setAllArtist] = useState([]);
  const [singleMusic, setSingleMusic] = useState({
    title: '',
    subTitle: '',
    artistId: '',
    duration: '',
    thumbnail: '',
    description: '',
  });
  const [file, setFile] = useState(null);
  const [imagefile, setImageFile] = useState(null);
  const [content, setContent] = useState('');
  const [uploadingPost, setUploadingPost] = useState(false);
  const [token, setToken] = useState('');


  const handleContentChange = (cont) => {
        setContent(cont);
      };

 

  useEffect(() => {
    const storedToken = localStorage.getItem("b2xclusiveadmin");
    if (storedToken) {
      const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");
      setToken(cleanedToken);
    } else {
      console.error("Bearer token not found");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/artist/artists`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setAllArtist(response?.data?.data);

        const musicresponse = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/track/audio/${musicId}`,
        );
        const postData = musicresponse?.data?.data;
        setSingleMusic(postData);
      } catch (error) {
        console.error(error, "Unable to fetch artists");
      }
    };

    fetchData();
  }, [token, musicId]);

  useEffect(() => {
    setSingleMusic((prevPost) => ({
      ...prevPost,
      audios: file,
      thumbnail: imagefile,
      description: content,
    }));
  }, [file, imagefile, content]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploadingPost(true);
    try {
      let formData = new FormData(e.target);
      formData.append("description", content);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const musicResponse = await axios.patch(
        `https://b2xclusive.onrender.com/api/v1/track/audio/update/${musicId}`,
        formData,
        config,
      );
      toast.success(musicResponse?.data?.message, {
        position: "top-center",
      });

      setTimeout(() => {
        router.push("/admin");
      }, 3000);
    } catch (error) {
      console.error("Failed to upload music", error.message);
      toast.error(error?.response?.data?.message || "Failed to upload music", {
        position: "top-center",
      });
    } finally {
      setUploadingPost(false);
    }
  };
console.log(singleMusic)
  return (
    <div className={`${showSideBar ? "w-10/12" : "w-full"} max-w-4xl mx-auto p-6`}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Music</h1>
        <p className="text-gray-600 mt-2">Update music track details</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        {/* Title Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Track Title</label>
            <input
              value={singleMusic.title}
              onChange={(e) => setSingleMusic({ ...singleMusic, title: e.target.value })}
              type="text"
              name="title"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-lg"
              placeholder="Enter track title"
              required
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                value={singleMusic.subTitle}
                name="subTitle"
                onChange={(e) => setSingleMusic({ ...singleMusic, subTitle: e.target.value })}
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Enter subtitle"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Artist</label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                name="artistId"
                value={singleMusic.artistId}
                onChange={(e) => setSingleMusic({ ...singleMusic, artistId: e.target.value })}
                required
              >
                <option value="">Select an artist</option>
                {allArtist?.map((artist) => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input
                value={singleMusic.duration}
                name="duration"
                onChange={(e) => setSingleMusic({ ...singleMusic, duration: e.target.value })}
                type="text"
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
                onChange={(e) => setImageFile(e.target.files[0])}
                className="hidden"
                id="thumbnail-upload"
                name="thumbnail"
                accept="image/*"
              />
              <label htmlFor="thumbnail-upload" className="cursor-pointer">
                {imagefile ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={URL.createObjectURL(imagefile)}
                      alt="Cover preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : singleMusic?.image?.url ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image
                      src={singleMusic.image.url}
                      alt="Current cover"
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
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                id="audio-upload"
                name="audios"
                accept="audio/*"
              />
              <label htmlFor="audio-upload" className="cursor-pointer">
                <div className="flex flex-col items-center py-8">
                  <Music className={`w-12 h-12 mb-2 ${file ? 'text-blue-500' : 'text-gray-400'}`} />
                  <p className="text-sm text-gray-600">
                    {file ? file.name : 'Click to upload audio file'}
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
            content={singleMusic.description} 
            onChange={handleContentChange}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploadingPost}
          className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center gap-2"
        >
          {uploadingPost ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Updating...
            </>
          ) : (
            'Update Track'
          )}
        </button>
      </form>
    </div>
  );
}

export default EditMusic;