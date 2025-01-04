"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Tiptap from "@/components/TipTap";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

function AddVideos() {
  const router = useRouter();
  const [allArtist, setALlArtist] = useState([]);
  const [gettingArtist, setGettingArtist] = useState(false);
  const [gettingArtisterror, setGettingArtisterror] = useState(false);

  const [uploadingPost, setuploadingPost] = useState(false);

  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");

  const handleContentChange = (cont) => {
    setContent(cont);
  };

  const [token, setToken] = useState(""); // State to hold the token

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
          // Optionally, you can remove the expired token from localStorage
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
    const fetchData = async () => {
      setGettingArtist(true);
      try {
        const response = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/artist/artists`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setALlArtist(response?.data?.data);
      } catch (error) {
        console.log(error, "Unable to fetch artists");
        setGettingArtisterror(true);
      } finally {
        setGettingArtist(false);
      }
    };

    fetchData();
  }, [token]);

  const [video, setVideo] = useState({
    title: "",
    duration: "",
    subTitle: "",
    description: content,
    artistId: "",
    tags: [],
    categories: [],
  });
  useEffect(() => {
    setVideo((prevPost) => ({
      ...prevPost,
      videos: file,
      thumbnail: thumbnail,
      description: content,
    }));
  }, [file, content, thumbnail]);

  const onsubmit = async (e) => {
    e.preventDefault();
    setuploadingPost(true);
    try {
      let formData = new FormData(e.target);
      formData.append("description", video.description);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const videoResponse = await axios.put(
        "https://b2xclusive.onrender.com/api/v1/track/createVideo",
        formData,
        config,
      );
      toast.success(videoResponse?.data?.message, {
        position: "top-center",
      });

      setTimeout(() => {
        router.push("/admin");
      }, 3000);
    } catch (error) {
      console.error("Failed to upload video", error.message);
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.errorResponse?.message,
        {
          position: "top-center",
        },
      );
    } finally {
      setuploadingPost(false); // Reset uploadingPost state
    }
  };

  return (
    <>
      <section className={``}>
        <form
          onSubmit={onsubmit}
          className={`flex flex-col gap-4 text-xs items-start`}
        >
          <div className="flex flex-col gap-2 w-full">
            <label>Video Title</label>
            <input
              value={video.title}
              onChange={(e) => setVideo({ ...video, title: e.target.value })}
              type="text"
              name="title"
              placeholder="Enter Video Title"
              className=" w-full bg-transparent rounded-lg text-2xl  outline-none"
              required
            />
          </div>
          <div className="flex gap-4 w-full items-center">
            <div className="flex flex-col w-6/12">
              <label htmlFor="">Artists </label>
              <select
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                name="artistId"
                id=""
                onChange={(e) =>
                  setVideo({ ...video, artisId: e.target.value })
                }
                required
              >
                <option value="null">
                  {gettingArtist
                    ? "Loading"
                    : gettingArtisterror
                      ? "Failed to load artists"
                      : "Select Artist"}
                </option>
                {!gettingArtist &&
                  !gettingArtisterror &&
                  allArtist?.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
              </select>{" "}
            </div>

            <div className="flex flex-col w-6/12">
              <label htmlFor="">Duration </label>
              <input
                value={video.duration}
                name="duration"
                onChange={(e) =>
                  setVideo({ ...video, duration: e.target.value })
                }
                type="text"
                placeholder="Enter video duration"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>
          </div>
          <div className="md:flex gap-4 w-full items-center">
            <div className="flex flex-col gap-2 md:w-7/12">
              <label>Video subtitle</label>
              <input
                name="subTitle"
                value={video.subTitle}
                onChange={(e) =>
                  setVideo({ ...video, subTitle: e.target.value })
                }
                type="text"
                placeholder="Enter video Title"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2 md:w-3/12">
              <label>
                Categories{" "}
                <span className="text-gray-500">
                  Seprate categories with &quot;,&quot;
                </span>{" "}
              </label>
              <input
                value={video.categories}
                onChange={(e) =>
                  setVideo({ ...video, categories: e.target.value.split(",") })
                }
                name="categories[]"
                type="text"
                placeholder="Enter video Title"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2 md:w-2/12">
              <label htmlFor="">
                Tags{" "}
                <span className="text-gray-500">
                  Seprate tags with &quot;,&quot;
                </span>
              </label>
              <input
                value={video.tags}
                onChange={(e) =>
                  setVideo({ ...video, tags: e.target.value.split(",") })
                }
                name="tags[]"
                type="text"
                placeholder="Enter Blog Title"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>
          </div>
          <div className="flex gap-4 w-full items-center">
            <div className="flex flex-col w-full">
              <label htmlFor="">
                Upload Video Thumbnail (.jpg, .png only){" "}
              </label>
              <input
                onChange={(e) => setThumbnail(e.target.files[0])}
                type="file"
                multiple
                name="thumbnail"
                placeholder="Upload File"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>
          </div>
          {thumbnail ? (
            <div className="w-full">
              <div className="w-full h-[300px]">
                <Image
                  src={URL.createObjectURL(thumbnail)}
                  width={1000}
                  height={1000}
                  alt="post"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className={``}>Selected File: {thumbnail.name}</p>
            </div>
          ) : (
            <p>No file selected</p>
          )}{" "}
          <div className="flex gap-4 w-full items-center">
            <div className="flex flex-col w-full">
              <label htmlFor="">Upload Video</label>
              <input
                name="videos"
                multiple
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                placeholder="Upload video"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Video Descriptions</label>
            <Tiptap
              content={content}
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
              "Create Video"
            )}
          </button>
        </form>
      </section>
    </>
  );
}

export default AddVideos;
