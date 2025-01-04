"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import Button from "@/components/Button";
import Tiptap from "@/components/TipTap";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

function EditBlog({ params }) {
  const { blogpostId } = params;
  const router = useRouter();
  const { theme, showSideBar } = useContext(ThemeContext);
  const [uploadingPost, setuploadingPost] = useState(false);

  const [singlePost, setSinglePost] = useState({
    title: "",
    subtitle: "",
    description: "",
    tags: [],
    categories: [],
  });

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const response = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/post/${blogpostId}`,
        );
        const postData = response?.data?.data;
        setSinglePost(postData);
      } catch (error) {
        console.log("Error fetching single post:", error.message);
      }
    };
    fetchSinglePost();
  }, [blogpostId]);
  const [file, setFile] = useState(null);
  const post = singlePost.description;

  const [content, setContent] = useState(post);

  const handleContentChange = (cont) => {
    setContent(cont);
  };

  const [token, setToken] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    setuploadingPost(true);
    try {
      const formData = new FormData(e.target);
      formData.append("description", singlePost.description);

      const storedToken = localStorage.getItem("b2xclusiveadmin");
      if (storedToken) {
        const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");
        setToken(cleanedToken);
        console.log(token);
      } else {
        console.error("Bearer token not found");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.patch(
        `https://b2xclusive.onrender.com/api/v1/post/update/${blogpostId}`,
        formData,
        config,
      );

      toast.success(response.data.message, {
        position: "top-center",
      });

      setTimeout(() => {
        router.push("/admin/contents");
      }, 3000);
    } catch (error) {
      console.error("Failed to upload post", error.message);
      toast.error(error.response?.data?.message || "Failed to update post", {
        position: "top-center",
      });
    } finally {
      setuploadingPost(false);
    }
  };

  return (
    <>
      <section className={` md:p-4 p-2 `}>
        <form
          className={`flex flex-col gap-4 text-xs  items-start`}
          onSubmit={onSubmit}
        >
          <div className="flex flex-col gap-2 w-full">
            <label>Blog Title</label>
            <input
              value={singlePost.title}
              onChange={(e) =>
                setSinglePost({ ...singlePost, title: e.target.value })
              }
              type="text"
              name="title"
              placeholder="Loading..."
              className=" w-full bg-transparent rounded-lg text-lg md:text-2xl  outline-none"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label>Blog header Image</label>
            <input
              type="file"
              multiple
              name="files"
              onChange={(e) => setFile(e.target.files[0])}
              className="p-2 w-full bg-transparent rounded-lg  outline-none"
            />
            {/* Optional: Display the file name */}
            {file && file ? (
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
                <p className={``}>Selected File: {file.name}</p>
              </div>
            ) : (
              singlePost?.image?.length > 0 && (
                <div className="w-full">
                  <div className="w-full h-[300px]">
                    <Image
                      src={singlePost.image[0].url}
                      width={1000}
                      height={1000}
                      alt="post"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className={``}>Selected File: {singlePost.image[0].url}</p>
                </div>
              )
            )}
          </div>

          <div className="md:flex gap-4 w-full items-center">
            <div className="flex flex-col gap-2 md:w-7/12">
              <label>Post subtitle</label>
              <input
                name="subtitle"
                value={singlePost.subtitle}
                onChange={(e) =>
                  setSinglePost({ ...singlePost, subtitle: e.target.value })
                }
                type="text"
                placeholder="Loading..."
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
              />
            </div>

            <div className="flex flex-col md:w-3/12">
              <label>
                Categories{" "}
                <span className="text-gray-500">
                  Seprate categories with &quot;,&quot;
                </span>{" "}
              </label>
              <input
                value={singlePost.categories.join(",")}
                onChange={(e) =>
                  setSinglePost({
                    ...singlePost,
                    categories: e.target.value.split(","),
                  })
                }
                name="categories[]"
                type="text"
                placeholder="Loading..."
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
              />
            </div>

            <div className="flex flex-col md:w-2/12">
              <label htmlFor="">
                Tags{" "}
                <span className="text-gray-500">
                  Seprate tags with &quot;,&quot;
                </span>
              </label>
              <input
                value={singlePost.tags.join(",")}
                onChange={(e) =>
                  setSinglePost({
                    ...singlePost,
                    tags: e.target.value.split(","),
                  })
                }
                name="tags[]"
                type="text"
                placeholder="Loading..."
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Post Descriptions</label>
            <Tiptap
              content={singlePost.description}
              onChange={(newContent) => handleContentChange(newContent)}
            />
          </div>

          <button
            type="submit"
            className={`${uploadingPost ? "bg-orange-100" : "bg-primarycolor"} text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
          >
            {uploadingPost ? (
              <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin infinite" />
            ) : (
              "Update post"
            )}
          </button>
        </form>
      </section>
    </>
  );
}

export default EditBlog;
