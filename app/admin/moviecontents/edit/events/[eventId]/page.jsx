// // // "use client";
// // // import { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { ThemeContext } from "@/context/ThemeContext";
// // // import { useContext } from "react";
// // // import Tiptap from "@/components/TipTap";
// // // import { AiOutlineLoading3Quarters } from "react-icons/ai";
// // // import { toast } from "react-toastify";
// // // import { useRouter } from "next/navigation";
// // // import Image from "next/image";
// // // function EditEvent({ params }) {
// // //   const { eventId } = params;
// // //   const [allOrganizers, setAllOrganizers] = useState([]);
// // //   const [singlevent, setsingleEvent] = useState({
// // //     title: "",
// // //     subTitle: "",
// // //     organisers: [],
// // //     date: "",
// // //     location: "",
// // //   });

// // //   const router = useRouter();
// // //   const { showSideBar } = useContext(ThemeContext);
// // //   const [uploadingPost, setuploadingPost] = useState(false);

// // //   const [file, setFile] = useState(null);
// // //   const [imagefile, setImageFile] = useState(null);
// // //   const [content, setContent] = useState("");

// // //   const handleContentChange = (cont) => {
// // //     setContent(cont);
// // //   };

// // //   const [token, setToken] = useState(""); // State to hold the token

// // //   useEffect(() => {
// // //     const storedToken = localStorage.getItem("b2xclusiveadmin");
// // //     if (storedToken) {
// // //       const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");
// // //       setToken(cleanedToken);
// // //     } else {
// // //       console.error("Bearer token not found");
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const response = await axios.get(
// // //           `https://b2xclusive.onrender.com/api/v1/event/organisers`,
// // //           {
// // //             headers: {
// // //               Authorization: `Bearer ${token}`,
// // //             },
// // //           },
// // //         );
// // //         setAllOrganizers(response?.data?.data);

// // //         const eventresponse = await axios.get(
// // //           `https://b2xclusive.onrender.com/api/v1/event/${eventId}`,
// // //           {
// // //             headers: {
// // //               Authorization: `Bearer ${token}`,
// // //             },
// // //           },
// // //         );
// // //         setsingleEvent(eventresponse?.data?.data);
// // //       } catch (error) {
// // //         console.log(error, "Unable to fetch Organizers");
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [eventId, token]);

// // //   useEffect(() => {
// // //     setsingleEvent((prevPost) => ({
// // //       ...prevPost,
// // //       files: file,
// // //     }));
// // //   }, [file]);

// // //   const onSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setuploadingPost(true);
// // //     try {
// // //       let formData = new FormData(e.target);
// // //       formData.append("description", singlevent.description);
// // //       const config = {
// // //         headers: {
// // //           Authorization: `Bearer ${token}`,
// // //           "Content-Type": "multipart/form-data",
// // //         },
// // //       };

// // //       const eventResponse = await axios.patch(
// // //         `https://b2xclusive.onrender.com/api/v1/event/update/${eventId}`,
// // //         formData,
// // //         config,
// // //       );
// // //       toast.success(eventResponse?.data?.message, {
// // //         position: "top-center",
// // //       });

// // //       setTimeout(() => {
// // //         router.push("/admin");
// // //       }, 3000);
// // //     } catch (error) {
// // //       console.error("Failed to add Event", error.message);
// // //       toast.error(error?.response?.data?.message || "Failed to add event", {
// // //         position: "top-center",
// // //       });
// // //     } finally {
// // //       setuploadingPost(false); // Reset uploadingPost state
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <section className={` w-full md:10/12 p-2 `}>
// // //         <form
// // //           onSubmit={onSubmit}
// // //           className={`flex flex-col text-xs gap-4 items-start`}
// // //         >
// // //           <div className="flex flex-col gap-2 w-full">
// // //             <label>Event Title</label>
// // //             <input
// // //               value={singlevent.title}
// // //               onChange={(e) =>
// // //                 setsingleEvent({ ...singlevent, title: e.target.value })
// // //               }
// // //               type="text"
// // //               name="title"
// // //               placeholder="Loading.."
// // //               className=" w-full bg-transparent rounded-lg text-lg md:text-2xl  outline-none"
// // //             />
// // //           </div>
// // //           <div className="flex gap-4 flex-col md:flex-row w-full md:items-center">
// // //             <div className="flex flex-col md:w-6/12">
// // //               <label htmlFor="">Subtitle </label>
// // //               <input
// // //                 value={singlevent.subTitle}
// // //                 onChange={(e) =>
// // //                   setsingleEvent({ ...singlevent, subTitle: e.target.value })
// // //                 }
// // //                 type="text"
// // //                 placeholder="Loading..."
// // //                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
// // //               />
// // //             </div>

// // //             <div className="flex flex-col md:w-3/12">
// // //               <label htmlFor="">Organizers </label>
// // //               <select
// // //                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
// // //                 name="organisersId[]"
// // //                 id=""
// // //                 value={singlevent?.organisers[0]?.id}
// // //                 onChange={(e) =>
// // //                   setsingleEvent({
// // //                     ...singlevent,
// // //                     organisersId: e.target.value,
// // //                   })
// // //                 }
// // //               >
// // //                 <option value="null">Select Organizer</option>
// // //                 {allOrganizers?.map((organizer) => (
// // //                   <option key={organizer.id} value={organizer.id}>
// // //                     {organizer.name}
// // //                   </option>
// // //                 ))}
// // //               </select>{" "}
// // //             </div>

// // //             <div className="flex flex-col md:w-3/12">
// // //               <label htmlFor="">Date </label>
// // //               <input
// // //                 value={singlevent.date}
// // //                 name="date"
// // //                 onChange={(e) =>
// // //                   setsingleEvent({ ...singlevent, date: e.target.value })
// // //                 }
// // //                 type="date"
// // //                 placeholder="Loading..."
// // //                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
// // //               />
// // //             </div>
// // //             <div className="flex flex-col md:w-3/12">
// // //               <label htmlFor="">Location </label>
// // //               <input
// // //                 value={singlevent.location}
// // //                 name="location"
// // //                 onChange={(e) =>
// // //                   setsingleEvent({ ...singlevent, location: e.target.value })
// // //                 }
// // //                 type="text"
// // //                 placeholder="Loading..."
// // //                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
// // //               />
// // //             </div>
// // //           </div>
// // //           <div className="flex gap-4 w-full items-center">
// // //             <div className="flex flex-col w-full">
// // //               <label htmlFor="">Upload Event Image</label>
// // //               <input
// // //                 onChange={(e) => setFile(e.target.files[0])}
// // //                 type="file"
// // //                 multiple
// // //                 name="files"
// // //                 placeholder="Upload File"
// // //                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
// // //               />
// // //             </div>
// // //           </div>
// // //           {file && file ? (
// // //             <div className="w-full">
// // //               <div className="w-full h-[300px]">
// // //                 <Image
// // //                   src={URL.createObjectURL(file)}
// // //                   width={1000}
// // //                   height={1000}
// // //                   alt="post"
// // //                   className="w-full h-full object-cover"
// // //                 />
// // //               </div>
// // //               <p className={``}>Selected File: {file.name}</p>
// // //             </div>
// // //           ) : (
// // //             singlevent?.image?.length > 0 && (
// // //               <div className="w-full">
// // //                 <div className="w-full h-[300px]">
// // //                   <Image
// // //                     src={singlevent?.image[0]?.url}
// // //                     width={1000}
// // //                     height={1000}
// // //                     alt="post"
// // //                     className="w-full h-full object-cover"
// // //                   />
// // //                 </div>
// // //                 <p className={``}>Selected File: {singlevent.image[0].url}</p>
// // //               </div>
// // //             )
// // //           )}
// // //           <div className="flex flex-col gap-2 w-full">
// // //             <label htmlFor="">Event Descriptions</label>
// // //             <Tiptap
// // //               content={singlevent.description}
// // //               onChange={(newContent) => handleContentChange(newContent)}
// // //             />
// // //           </div>
// // //           <button
// // //             type="submit"
// // //             // Use handlePost instead of handleingPost
// // //             className={`${uploadingPost ? "bg-orange-100" : "bg-primarycolor"} text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
// // //           >
// // //             {uploadingPost ? (
// // //               <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin infinite" />
// // //             ) : (
// // //               "Update Event"
// // //             )}
// // //           </button>
// // //         </form>
// // //       </section>
// // //     </>
// // //   );
// // // }

// // // export default EditEvent;



// // "use client";

// // import { useEffect, useState, useContext } from "react";
// // import axios from "axios";
// // import { ThemeContext } from "@/context/ThemeContext";
// // import Tiptap from "@/components/TipTap";
// // import { AiOutlineLoading3Quarters } from "react-icons/ai";
// // import { toast } from "react-toastify";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";

// // function EditEvent({ params }) {
// //   const { eventId } = params;
// //   const [organizers, setOrganizers] = useState([]);
// //   const [eventData, setEventData] = useState({
// //     title: "",
// //     subTitle: "",
// //     organisers: [],
// //     date: "",
// //     location: "",
// //     description: "",
// //     files: [],
// //     image: [],
// //   });

// //   const router = useRouter();
// //   const { showSideBar } = useContext(ThemeContext);
// //   const [uploading, setUploading] = useState(false);

// //   const [file, setFile] = useState(null);
// //   const [content, setContent] = useState("");
// //   const [token, setToken] = useState("");

// //   useEffect(() => {
// //     const storedToken = localStorage.getItem("b2xclusiveadmin");
// //     if (storedToken) {
// //       const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");
// //       setToken(cleanedToken);
// //     } else {
// //       console.error("Bearer token not found");
// //     }
// //   }, []);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const organizerResponse = await axios.get(
// //           `https://b2xclusive.onrender.com/api/v1/event/organisers`,
// //           { headers: { Authorization: `Bearer ${token}` } }
// //         );
// //         setOrganizers(organizerResponse?.data?.data);

// //         const eventResponse = await axios.get(
// //           `https://b2xclusive.onrender.com/api/v1/event/${eventId}`,
// //           { headers: { Authorization: `Bearer ${token}` } }
// //         );
// //         setEventData(eventResponse?.data?.data);
// //       } catch (error) {
// //         console.error("Unable to fetch data", error);
// //       }
// //     };

// //     fetchData();
// //   }, [eventId, token]);

// //   useEffect(() => {
// //     setEventData((prevData) => ({
// //       ...prevData,
// //       files: file,
// //     }));
// //   }, [file]);

// //   const handleContentChange = (newContent) => setContent(newContent);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setUploading(true);
// //     try {
// //       const formData = new FormData(e.target);
// //       formData.append("description", eventData.description);

// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "multipart/form-data",
// //         },
// //       };

// //       const response = await axios.patch(
// //         `https://b2xclusive.onrender.com/api/v1/event/update/${eventId}`,
// //         formData,
// //         config
// //       );
// //       toast.success(response?.data?.message, { position: "top-center" });

// //       setTimeout(() => {
// //         router.push("/admin");
// //       }, 3000);
// //     } catch (error) {
// //       toast.error(error?.response?.data?.message || "Failed to update event", {
// //         position: "top-center",
// //       });
// //     } finally {
// //       setUploading(false);
// //     }
// //   };

// //   return (
// //     <section className="w-full md:10/12 p-2">
// //       <form onSubmit={handleSubmit} className="flex flex-col text-xs gap-4 items-start">
// //         <div className="flex flex-col gap-2 w-full">
// //           <label>Event Title</label>
// //           <input
// //             value={eventData.title}
// //             onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
// //             type="text"
// //             name="title"
// //             placeholder="Enter title"
// //             className="w-full bg-transparent rounded-lg text-lg md:text-2xl outline-none"
// //           />
// //         </div>

// //         <div className="flex gap-4 flex-col md:flex-row w-full md:items-center">
// //           <div className="flex flex-col md:w-6/12">
// //             <label>Subtitle</label>
// //             <input
// //               value={eventData.subTitle}
// //               onChange={(e) => setEventData({ ...eventData, subTitle: e.target.value })}
// //               type="text"
// //               placeholder="Enter subtitle"
// //               className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
// //             />
// //           </div>

// //           <div className="flex flex-col md:w-3/12">
// //             <label>Organizers</label>
// //             <select
// //               className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
// //               name="organisersId[]"
// //               value={eventData?.organisers[0]?.id || ""}
// //               onChange={(e) => setEventData({ ...eventData, organisersId: e.target.value })}
// //             >
// //               <option value="null">Select Organizer</option>
// //               {organizers?.map((organizer) => (
// //                 <option key={organizer.id} value={organizer.id}>
// //                   {organizer.name}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div className="flex flex-col md:w-3/12">
// //             <label>Date</label>
// //             <input
// //               value={eventData.date}
// //               name="date"
// //               onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
// //               type="date"
// //               placeholder="Enter date"
// //               className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
// //             />
// //           </div>

// //           <div className="flex flex-col md:w-3/12">
// //             <label>Location</label>
// //             <input
// //               value={eventData.location}
// //               name="location"
// //               onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
// //               type="text"
// //               placeholder="Enter location"
// //               className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
// //             />
// //           </div>
// //         </div>

// //         <div className="flex flex-col w-full">
// //           <label>Upload Event Image</label>
// //           <input
// //             onChange={(e) => setFile(e.target.files[0])}
// //             type="file"
// //             multiple
// //             name="files"
// //             placeholder="Upload File"
// //             className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
// //           />
// //         </div>

// //         {file ? (
// //           <div className="w-full">
// //             <div className="w-full h-[300px]">
// //               <Image
// //                 src={URL.createObjectURL(file)}
// //                 width={1000}
// //                 height={1000}
// //                 alt="Selected file"
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>
// //             <p>Selected File: {file.name}</p>
// //           </div>
// //         ) : eventData?.image?.length > 0 ? (
// //           <div className="w-full">
// //             <div className="w-full h-[300px]">
// //               <Image
// //                 src={eventData?.image[0]?.url}
// //                 width={1000}
// //                 height={1000}
// //                 alt="Event image"
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>
// //             <p>Selected File: {eventData.image[0].url}</p>
// //           </div>
// //         ) : null}

// //         <div className="flex flex-col gap-2 w-full">
// //           <label>Event Descriptions</label>
// //           <Tiptap content={eventData.description} onChange={handleContentChange} />
// //         </div>

// //         <button
// //           type="submit"
// //           className={`${uploading ? "bg-orange-100" : "bg-primarycolor"} text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
// //         >
// //           {uploading ? (
// //             <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin infinite" />
// //           ) : (
// //             "Update Event"
// //           )}
// //         </button>
// //       </form>
// //     </section>
// //   );
// // }

// // export default EditEvent; 



// "use client";

// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { ThemeContext } from "@/context/ThemeContext";
// import Tiptap from "@/components/TipTap";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Users, Calendar, Search } from 'lucide-react';

// function EditEvent({ params }) {
//   const { eventId } = params;
//   const [organizers, setOrganizers] = useState([]);
//   const [eventData, setEventData] = useState({
//     title: "",
//     subTitle: "",
//     organisers: [],
//     date: "",
//     location: "",
//     description: "",
//     files: [],
//     image: [],
//   });

//   const router = useRouter();
//   const { showSideBar } = useContext(ThemeContext);
//   const [uploading, setUploading] = useState(false);

//   const [file, setFile] = useState(null);
//   const [content, setContent] = useState("");
//   const [token, setToken] = useState("");

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
//         const organizerResponse = await axios.get(
//           `https://b2xclusive.onrender.com/api/v1/event/organisers`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setOrganizers(organizerResponse?.data?.data);

//         const eventResponse = await axios.get(
//           `https://b2xclusive.onrender.com/api/v1/event/${eventId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setEventData(eventResponse?.data?.data);
//       } catch (error) {
//         console.error("Unable to fetch data", error);
//       }
//     };

//     fetchData();
//   }, [eventId, token]);

//   useEffect(() => {
//     setEventData((prevData) => ({
//       ...prevData,
//       files: file,
//     }));
//   }, [file]);

//   const handleContentChange = (newContent) => setContent(newContent);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUploading(true);
//     try {
//       const formData = new FormData(e.target);
//       formData.append("description", eventData.description);

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       const response = await axios.patch(
//         `https://b2xclusive.onrender.com/api/v1/event/update/${eventId}`,
//         formData,
//         config
//       );
//       toast.success(response?.data?.message, { position: "top-center" });

//       setTimeout(() => {
//         router.push("/admin");
//       }, 3000);
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to update event", {
//         position: "top-center",
//       });
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <header className="mb-8">
//         <h1 className="text-2xl font-bold mb-2">Edit Event</h1>
//         <div className="flex items-center gap-4 text-gray-600">
//           <div className="flex items-center gap-2">
//             <Users className="w-4 h-4" />
//             <span>{organizers.length} Organizers</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Calendar className="w-4 h-4" />
//             <span>1 Event</span>
//           </div>
//         </div>
//       </header>

//       <form onSubmit={handleSubmit} className="grid gap-8">
//         {/* Event Title */}
//         <section className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b">
//             <h2 className="text-lg font-semibold">Event Title</h2>
//           </div>
//           <div className="p-6">
//             <input
//               value={eventData.title}
//               onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
//               type="text"
//               name="title"
//               placeholder="Enter event title"
//               className="w-full bg-transparent rounded-lg text-lg outline-none"
//             />
//           </div>
//         </section>

//         {/* Event Subtitle and Organizers */}
//         <section className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b">
//             <h2 className="text-lg font-semibold">Event Details</h2>
//           </div>
//           <div className="grid gap-6 p-6 md:grid-cols-2">
//             <div>
//               <label>Subtitle</label>
//               <input
//                 value={eventData.subTitle}
//                 onChange={(e) => setEventData({ ...eventData, subTitle: e.target.value })}
//                 type="text"
//                 placeholder="Enter subtitle"
//                 className="w-full bg-transparent rounded-lg border-gray-200 border p-4 outline-none"
//               />
//             </div>
//             <div>
//               <label>Organizers</label>
//               <select
//                 className="w-full bg-transparent rounded-lg border-gray-200 border p-4 outline-none"
//                 name="organisersId[]"
//                 value={eventData?.organisers[0]?.id || ""}
//                 onChange={(e) => setEventData({ ...eventData, organisersId: e.target.value })}
//               >
//                 <option value="null">Select Organizer</option>
//                 {organizers?.map((organizer) => (
//                   <option key={organizer.id} value={organizer.id}>
//                     {organizer.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </section>

//         {/* Date and Location */}
//         <section className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b">
//             <h2 className="text-lg font-semibold">Event Timing and Location</h2>
//           </div>
//           <div className="grid gap-6 p-6 md:grid-cols-2">
//             <div>
//               <label>Date</label>
//               <input
//                 value={eventData.date}
//                 name="date"
//                 onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
//                 type="date"
//                 className="w-full bg-transparent rounded-lg border-gray-200 border p-4 outline-none"
//               />
//             </div>
//             <div>
//               <label>Location</label>
//               <input
//                 value={eventData.location}
//                 name="location"
//                 onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
//                 type="text"
//                 placeholder="Enter location"
//                 className="w-full bg-transparent rounded-lg border-gray-200 border p-4 outline-none"
//               />
//             </div>
//           </div>
//         </section>

//         {/* Upload Image */}
//         <section className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b">
//             <h2 className="text-lg font-semibold">Upload Event Image</h2>
//           </div>
//           <div className="p-6">
//             <input
//               onChange={(e) => setFile(e.target.files[0])}
//               type="file"
//               multiple
//               name="files"
//               className="w-full bg-transparent rounded-lg border-gray-200 border p-4 outline-none"
//             />
//           </div>
//           {file && (
//             <div className="w-full p-6">
//               <Image
//                 src={URL.createObjectURL(file)}
//                 width={1000}
//                 height={1000}
//                 alt="Event Image"
//                 className="w-full h-[300px] object-cover"
//               />
//               <p>Selected File: {file.name}</p>
//             </div>
//           )}
//         </section>

//         {/* Event Description */}
//         <section className="bg-white rounded-lg shadow">
//           <div className="p-6 border-b">
//             <h2 className="text-lg font-semibold">Event Description</h2>
//           </div>
//           <div className="p-6">
//             <Tiptap content={eventData.description} onChange={handleContentChange} />
//           </div>
//         </section>

//         {/* Submit Button */}
//         <section className="p-6">
//           <button
//             type="submit"
//             className={`${uploading ? "bg-orange-100" : "bg-primarycolor"} text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
//           >
//             {uploading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Save Event"}
//           </button>
//         </section>
//       </form>
//     </div>
//   );
// }

// export default EditEvent;



"use client";

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "@/context/ThemeContext";
import Tiptap from "@/components/TipTap";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

function EditEvent({ params }) {
  const { eventId } = params;
  const [organizers, setOrganizers] = useState([]);
  const [eventData, setEventData] = useState({
    title: "",
    subTitle: "",
    organisers: [],
    date: "",
    location: "",
    description: "",
    files: [],
    image: [],
  });

  const router = useRouter();
  const { showSideBar } = useContext(ThemeContext);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [token, setToken] = useState("");

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
        const organizerResponse = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/event/organisers`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrganizers(organizerResponse?.data?.data);

        const eventResponse = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/event/${eventId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEventData(eventResponse?.data?.data);
      } catch (error) {
        console.error("Unable to fetch data", error);
      }
    };

    fetchData();
  }, [eventId, token]);

  const handleContentChange = (newContent) => setContent(newContent);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const formData = new FormData(e.target);
      formData.append("description", content || eventData.description);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.patch(
        `https://b2xclusive.onrender.com/api/v1/event/update/${eventId}`,
        formData,
        config
      );
      toast.success(response?.data?.message, { position: "top-center" });

      setTimeout(() => {
        router.push("/admin");
      }, 3000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update event", {
        position: "top-center",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Title and Subtitle */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Event Title</label>
            <input
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              type="text"
              name="title"
              placeholder="Enter event title"
              className="w-full bg-gray-100 rounded-lg border p-3 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Event Subtitle</label>
            <input
              value={eventData.subTitle}
              onChange={(e) => setEventData({ ...eventData, subTitle: e.target.value })}
              type="text"
              name="subTitle"
              placeholder="Enter event subtitle"
              className="w-full bg-gray-100 rounded-lg border p-3 outline-none"
            />
          </div>
        </div>

        {/* Organizers */}
        <div>
          <label className="block text-sm font-semibold mb-1">Organizer</label>
          <select
            className="w-full bg-gray-100 rounded-lg border p-3 outline-none"
            name="organisersId[]"
            value={eventData?.organisers[0]?.id || ""}
            onChange={(e) => setEventData({ ...eventData, organisersId: e.target.value })}
          >
            <option value="">Select Organizer</option>
            {organizers?.map((organizer) => (
              <option key={organizer.id} value={organizer.id}>
                {organizer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date and Location */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Event Date</label>
            <input
              value={eventData.date}
              name="date"
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              type="date"
              className="w-full bg-gray-100 rounded-lg border p-3 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Event Location</label>
            <input
              value={eventData.location}
              name="location"
              onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
              type="text"
              placeholder="Enter event location"
              className="w-full bg-gray-100 rounded-lg border p-3 outline-none"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold mb-1">Event Image</label>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            name="files"
            className="w-full bg-gray-100 rounded-lg border p-3 outline-none"
          />
          {file && (
            <div className="mt-4">
              <Image
                src={URL.createObjectURL(file)}
                width={1000}
                height={1000}
                alt="Selected Event Image"
                className="w-full h-64 object-cover rounded-lg"
              />
              <p className="mt-2 text-sm">Selected File: {file.name}</p>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1">Event Description</label>
          <Tiptap content={eventData.description} onChange={handleContentChange} />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white ${
              uploading ? "bg-gray-400 cursor-not-allowed" : "bg-primarycolor"
            } flex items-center justify-center`}
            disabled={uploading}
          >
            {uploading ? <AiOutlineLoading3Quarters className="animate-spin mr-2" /> : "Save Event"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEvent;
