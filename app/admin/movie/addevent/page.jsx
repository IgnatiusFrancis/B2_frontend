// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Tiptap from "@/components/TipTap";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { jwtDecode } from "jwt-decode";

// function AddEvent() {
//   const [allOrganizers, setAllOrganizers] = useState([]);
//   const [gettingOrganizers, setGettingOrganizers] = useState(false);
//   const [gettingOrganizerserror, setGettingOrganizerserror] = useState(false);

//   const router = useRouter();
//   const [uploadingPost, setuploadingPost] = useState(false);

//   const [file, setFile] = useState(null);
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
//       setGettingOrganizers(true);
//       try {
//         const response = await axios.get(
//           `https://b2xclusive.onrender.com/api/v1/event/organisers`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );
//         setAllOrganizers(response?.data?.data);
//       } catch (error) {
//         console.log(error, "Unable to fetch Organizers");
//         setGettingOrganizerserror(true);
//       } finally {
//         setGettingOrganizers(false);
//       }
//     };

//     fetchData();
//   }, [token]);

//   const [event, setEvent] = useState({
//     title: "",
//     subTitle: "",
//     location: "",
//     date: "",
//     description: content,
//     organisersId: [],
//   });
//   useEffect(() => {
//     setEvent((prevPost) => ({
//       ...prevPost,
//       files: file,
//       description: content,
//     }));
//   }, [file, content]);

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setuploadingPost(true);
//     try {
//       let formData = new FormData(e.target);
//       formData.append("description", event.description);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       const eventResponse = await axios.put(
//         "https://b2xclusive.onrender.com/api/v1/event/create",
//         formData,
//         config,
//       );
//       toast.success(eventResponse?.data?.message, {
//         position: "top-center",
//       });

//       setTimeout(() => {
//         router.push("/admin");
//       }, 3000);
//     } catch (error) {
//       console.error("Failed to add Event", error.message);
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
//           className={`flex text-xs flex-col gap-4 items-start`}
//         >
//           <div className="flex flex-col gap-2 w-full">
//             <label>Event Title</label>
//             <input
//               value={event.title}
//               onChange={(e) => setEvent({ ...event, title: e.target.value })}
//               type="text"
//               name="title"
//               placeholder="Enter Event Title"
//               className=" w-full bg-transparent rounded-lg text-2xl  outline-none"
//               required
//             />
//           </div>
//           <div className="flex gap-4 w-full md:flex-row flex-col md:items-center">
//             <div className="flex flex-col md:w-6/12">
//               <label htmlFor="">Subtitle </label>
//               <input
//                 value={event.subTitle}
//                 onChange={(e) =>
//                   setEvent({ ...event, subTitle: e.target.value })
//                 }
//                 name="subTitle"
//                 type="text"
//                 placeholder="Enter subtitle"
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//                 required
//               />
//             </div>

//             <div className="flex flex-col md:w-3/12">
//               <label htmlFor="">Organizers </label>
//               <select
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//                 name="organisersId[]"
//                 required
//                 id=""
//                 onChange={(e) =>
//                   setEvent({ ...event, organisersId: e.target.value })
//                 }
//               >
//                 <option value="null">
//                   {gettingOrganizers
//                     ? "Loading..."
//                     : gettingOrganizerserror
//                       ? "failed to load organizers"
//                       : "Select Organizers"}
//                 </option>
//                 {!gettingOrganizers &&
//                   !gettingOrganizerserror &&
//                   allOrganizers?.map((organizer) => (
//                     <option key={organizer.id} value={organizer.id}>
//                       {organizer.name}
//                     </option>
//                   ))}
//               </select>{" "}
//             </div>

//             <div className="flex flex-col md:w-3/12">
//               <label htmlFor="">Date </label>
//               <input
//                 value={event.date}
//                 name="date"
//                 onChange={(e) => setEvent({ ...event, date: e.target.value })}
//                 type="date"
//                 placeholder="Enter music duration"
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//                 required
//               />
//             </div>
//             <div className="flex flex-col md:w-3/12">
//               <label htmlFor="">Location and Full Address </label>
//               <input
//                 value={event.location}
//                 name="location"
//                 onChange={(e) =>
//                   setEvent({ ...event, location: e.target.value })
//                 }
//                 type="text"
//                 placeholder="Enter music location"
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//                 required
//               />
//             </div>
//           </div>
//           <div className="flex gap-4 w-full items-center">
//             <div className="flex flex-col w-full">
//               <label htmlFor="">Upload Event Image</label>
//               <input
//                 onChange={(e) => setFile(e.target.files[0])}
//                 type="file"
//                 multiple
//                 name="files"
//                 placeholder="Upload File"
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//                 required
//               />
//             </div>
//           </div>
//           {file ? (
//             <div className="w-full">
//               <div className="w-full h-[300px]">
//                 <Image
//                   src={URL.createObjectURL(file)}
//                   width={1000}
//                   height={1000}
//                   alt="post"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className={``}>Selected File: {file.name}</p>
//             </div>
//           ) : (
//             <p>No file selected</p>
//           )}{" "}
//           <div className="flex flex-col gap-2 w-full">
//             <label htmlFor="">Event Descriptions</label>
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
//               "Create Event"
//             )}
//           </button>
//         </form>
//       </section>
//     </>
//   );
// }

// export default AddEvent;



"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Tiptap from "@/components/TipTap";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

function AddEvent() {
  const router = useRouter();
  const [uploadingEvent, setUploadingEvent] = useState(false);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [event, setEvent] = useState({
    title: "",
    subTitle: "",
    location: "",
    date: "",
    description: content,
    organisersId: [],
  });
  const [allOrganizers, setAllOrganizers] = useState([]);
  const [gettingOrganizers, setGettingOrganizers] = useState(false);
  const [gettingOrganizersError, setGettingOrganizersError] = useState(false);
  const [token, setToken] = useState("");
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("b2xclusiveadmin");
    if (storedToken) {
      const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");

      try {
        const decodedToken = jwtDecode(cleanedToken);
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decodedToken.exp < currentTime) {
          console.error("Token is expired");
          toast.error("Invalid or Expired token, please sign in", {
            position: "top-center",
          });
          setIsTokenExpired(true);
          localStorage.removeItem("b2xclusiveadmin");
          router.push("/login");
        } else {
          setToken(cleanedToken);
          setIsTokenExpired(false);
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("Bearer token not found");
    }
  }, [router]);

  useEffect(() => {
    const fetchOrganizers = async () => {
      setGettingOrganizers(true);
      try {
        const response = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/event/organisers`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAllOrganizers(response?.data?.data);
      } catch (error) {
        console.error("Unable to fetch Organizers", error);
        setGettingOrganizersError(true);
      } finally {
        setGettingOrganizers(false);
      }
    };

    if (token) fetchOrganizers();
  }, [token]);

  useEffect(() => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      files: file,
      description: content,
    }));
  }, [file, content]);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploadingEvent(true);
    try {
      let formData = new FormData(e.target);
      formData.append("description", event.description);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.put(
        "https://b2xclusive.onrender.com/api/v1/event/create",
        formData,
        config
      );
      toast.success(response.data.message, { position: "top-center" });

      setTimeout(() => {
        router.push("/admin");
      }, 3000);
    } catch (error) {
      console.error("Failed to add event", error.message);
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.errorResponse?.message,
        { position: "top-center" }
      );
    } finally {
      setUploadingEvent(false);
    }
  };

  return (
    <section className="w-full flex justify-center py-12">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <form className="flex flex-col gap-8 items-start" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2 w-full">
            <label>Event Title</label>
            <input
              value={event.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              type="text"
              name="title"
              placeholder="Enter Event Title"
              className="w-full bg-transparent rounded-lg text-2xl outline-none p-4 border border-gray-200"
              required
            />
          </div>

          <div className="flex w-full gap-4 md:flex-row flex-col">
            <div className="flex flex-col md:w-6/12">
              <label>Subtitle</label>
              <input
                value={event.subTitle}
                onChange={(e) =>
                  setEvent({ ...event, subTitle: e.target.value })
                }
                name="subTitle"
                type="text"
                placeholder="Enter subtitle"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>

            <div className="flex flex-col md:w-3/12">
              <label>Organizers</label>
              <select
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                name="organisersId[]"
                required
                onChange={(e) =>
                  setEvent({ ...event, organisersId: e.target.value })
                }
              >
                <option value="null">
                  {gettingOrganizers
                    ? "Loading..."
                    : gettingOrganizersError
                    ? "Failed to load organizers"
                    : "Select Organizers"}
                </option>
                {!gettingOrganizers &&
                  !gettingOrganizersError &&
                  allOrganizers?.map((organizer) => (
                    <option key={organizer.id} value={organizer.id}>
                      {organizer.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-col md:w-3/12">
              <label>Date</label>
              <input
                value={event.date}
                name="date"
                onChange={(e) => setEvent({ ...event, date: e.target.value })}
                type="date"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>

            <div className="flex flex-col md:w-3/12">
              <label>Location</label>
              <input
                value={event.location}
                name="location"
                onChange={(e) =>
                  setEvent({ ...event, location: e.target.value })
                }
                type="text"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label>Upload Event Image</label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              multiple
              name="files"
              className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
              required
            />
          </div>

          {file && (
            <div className="w-full">
              <div className="w-full h-[300px]">
                <Image
                  src={URL.createObjectURL(file)}
                  width={1000}
                  height={1000}
                  alt="post"
                  className="w-full h-full object-cover"
                />
              </div>
              <p>Selected File: {file.name}</p>
            </div>
          )}

          <div className="flex flex-col gap-2 w-full">
            <label>Event Description</label>
            <Tiptap content={content} onChange={handleContentChange} />
          </div>

          <button
            type="submit"
            className={`${
              uploadingEvent ? "bg-orange-100" : "bg-primarycolor"
            } text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
          >
            {uploadingEvent ? (
              <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin infinite" />
            ) : (
              "Create Event"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddEvent;
