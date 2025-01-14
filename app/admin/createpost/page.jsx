// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Tiptap from "@/components/TipTap";
// import Image from "next/image";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { toast } from "react-toastify";

// import { useRouter } from "next/navigation";

// function CreatePost() {
//   const router = useRouter();
//   const [uploadingPost, setuploadingPost] = useState(false);

//   const [file, setFile] = useState(null);
//   const [content, setContent] = useState("");

//   const handleContentChange = (cont) => {
//     setContent(cont);
//   };

//   const [post, setPost] = useState({
//     title: "",
//     subtitle: "",
//     description: content,
//     tags: [],
//     categories: [],
//   });

//   // Update the artist state with new file
//   useEffect(() => {
//     setPost((prevPost) => ({
//       ...prevPost,
//       files: file,
//       description: content,
//     }));
//   }, [file, content]);
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

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setuploadingPost(true); // Reset uploadingPost state
//     try {
//       let formData = new FormData(e.target);
//       formData.append("description", post.description);
//       console.log(e.target);
//       console.log(formData.get("description"));
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       };
//       console.log(formData);
//       const postResponse = await axios.put(
//         "https://b2xclusive.onrender.com/api/v1/post/create",
//         formData,
//         config,
//       );
//       toast.success(postResponse.data.message, {
//         position: "top-center",
//       });

//       setTimeout(() => {
//         router.push("/admin");
//       }, 3000);
//     } catch (error) {
//       console.error("Failed to upload post", error.message);
//       toast.error(error.response.data.message || "Failed to upload post", {
//         position: "top-center",
//       });
//     } finally {
//       setuploadingPost(false); // Reset uploadingPost state
//     }
//   };

//   return (
//     <>
//       <section className={`w-full  `}>
//         <form
//           className={`text-xs flex flex-col gap-8  items-start`}
//           onSubmit={onSubmit}
//         >
//           <div className="flex flex-col gap-2 w-full">
//             <label>Blog Title</label>
//             <input
//               value={post.title}
//               onChange={(e) => setPost({ ...post, title: e.target.value })}
//               type="text"
//               name="title"
//               placeholder="Enter Blog Title"
//               className=" w-full bg-transparent rounded-lg text-2xl  outline-none"
//             />
//           </div>
//           <div className="flex w-full flex-col gap-2">
//             <label>Blog header Image</label>
//             <input
//               type="file"
//               multiple
//               name="files"
//               onChange={(e) => setFile(e.target.files[0])}
//               className="p-2 w-full bg-transparent rounded-lg  outline-none"
//             />
//             {/* Optional: Display the file name */}
//             {file && (
//               <div className="w-full">
//                 <div className="w-full h-[300px]">
//                   <Image
//                     src={URL.createObjectURL(file)}
//                     width={1000}
//                     height={1000}
//                     alt="post"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <p className={``}>Selected File: {file.name}</p>
//               </div>
//             )}{" "}
//           </div>

//           <div className="md:flex gap-4 w-full items-center">
//             <div className="flex flex-col gap-2 md:w-7/12">
//               <label>Blog subtitle</label>
//               <input
//                 name="subtitle"
//                 value={post.subtitle}
//                 onChange={(e) => setPost({ ...post, subtitle: e.target.value })}
//                 type="text"
//                 placeholder="Enter Blog subtitle"
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//               />
//             </div>

//             <div className="flex flex-col gap-2 md:w-3/12">
//               <label>
//                 Categories{" "}
//                 <span className="text-gray-500">
//                   Seprate categories with &quot;,&quot;
//                 </span>{" "}
//               </label>
//               <input
//                 value={post.categories}
//                 onChange={(e) =>
//                   setPost({ ...post, categories: e.target.value.split(",") })
//                 }
//                 name="categories[]"
//                 type="text"
//                 placeholder="Blog categories"
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//               />
//             </div>

//             <div className="flex flex-col gap-2 md:w-2/12">
//               <label htmlFor="">
//                 Tags{" "}
//                 <span className="text-gray-500">
//                   Seprate tags with &quot;,&quot;
//                 </span>
//               </label>
//               <input
//                 value={post.tags}
//                 onChange={(e) =>
//                   setPost({ ...post, tags: e.target.value.split(",") })
//                 }
//                 name="tags[]"
//                 type="text"
//                 placeholder="Blog tags"
//                 className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
//               />
//             </div>
//           </div>

//           <div className="flex flex-col gap-2 w-full">
//             <label htmlFor="">Post Description</label>
//             <Tiptap
//               content={content}
//               onChange={(newContent) => handleContentChange(newContent)}
//             />
//           </div>

//           <button
//             type="submit"
//             className={`${uploadingPost ? "bg-orange-100" : "bg-primarycolor"} text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
//           >
//             {uploadingPost ? (
//               <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin infinite" />
//             ) : (
//               "Create post"
//             )}
//           </button>
//         </form>
//       </section>
//     </>
//   );
// }

// export default CreatePost;

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Tiptap from "@/components/TipTap";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function CreatePost() {
  const router = useRouter();
  const [uploadingPost, setUploadingPost] = useState(false);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [post, setPost] = useState({
    title: "",
    subtitle: "",
    description: content,
    tags: [],
    categories: [],
  });

  useEffect(() => {
    setPost((prevPost) => ({
      ...prevPost,
      files: file,
      description: content,
    }));
  }, [file, content]);

  const [token, setToken] = useState("");

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

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploadingPost(true);
    try {
      let formData = new FormData(e.target);
      formData.append("description", post.description);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const postResponse = await axios.put(
        "https://b2xclusive.onrender.com/api/v1/post/create",
        formData,
        config
      );
      toast.success(postResponse.data.message, {
        position: "top-center",
      });

      setTimeout(() => {
        router.push("/admin");
      }, 3000);
    } catch (error) {
      console.error("Failed to upload post", error.message);
      toast.error(error.response.data.message || "Failed to upload post", {
        position: "top-center",
      });
    } finally {
      setUploadingPost(false);
    }
  };

  return (
    <>
      <section className="w-full flex justify-center py-12">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
          <form className="flex flex-col gap-8 items-start" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2 w-full">
              <label>Blog Title</label>
              <input
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                type="text"
                name="title"
                placeholder="Enter Blog Title"
                className="w-full bg-transparent rounded-lg text-2xl outline-none p-4 border border-gray-200"
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <label>Blog header Image</label>
              <input
                type="file"
                multiple
                name="files"
                onChange={(e) => setFile(e.target.files[0])}
                className="p-2 w-full bg-transparent rounded-lg outline-none border border-gray-200"
              />
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
                  <p className="text-sm text-gray-500 mt-2">
                    Selected File: {file.name}
                  </p>
                </div>
              )}
            </div>

            <div className="md:flex gap-4 w-full items-center">
              <div className="flex flex-col gap-2 md:w-7/12">
                <label>Blog subtitle</label>
                <input
                  name="subtitle"
                  value={post.subtitle}
                  onChange={(e) =>
                    setPost({ ...post, subtitle: e.target.value })
                  }
                  type="text"
                  placeholder="Enter Blog subtitle"
                  className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                />
              </div>

              <div className="flex flex-col gap-2 md:w-3/12">
                <label>
                  Categories{" "}
                  <span className="text-gray-500">
                    Separate categories with ","
                  </span>{" "}
                </label>
                <input
                  value={post.categories}
                  onChange={(e) =>
                    setPost({ ...post, categories: e.target.value.split(",") })
                  }
                  name="categories[]"
                  type="text"
                  placeholder="Blog categories"
                  className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                />
              </div>

              <div className="flex flex-col gap-2 md:w-2/12">
                <label>
                  Tags{" "}
                  <span className="text-gray-500">Separate tags with ","</span>
                </label>
                <input
                  value={post.tags}
                  onChange={(e) =>
                    setPost({ ...post, tags: e.target.value.split(",") })
                  }
                  name="tags[]"
                  type="text"
                  placeholder="Blog tags"
                  className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="">Post Description</label>
              <Tiptap
                content={content}
                onChange={(newContent) => handleContentChange(newContent)}
              />
            </div>

            <button
              type="submit"
              className={`${
                uploadingPost ? "bg-orange-100" : "bg-primarycolor"
              } text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
            >
              {uploadingPost ? (
                <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin infinite" />
              ) : (
                "Create post"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default CreatePost;
