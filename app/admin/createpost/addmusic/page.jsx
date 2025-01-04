"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Tiptap from "@/components/TipTap";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
function AddMusic() {
  const [allArtist, setALlArtist] = useState([]);
  const [gettingArtist, setGettingArtist] = useState(false);
  const [gettingArtisterror, setGettingArtisterror] = useState(false);

  const router = useRouter();
  const [uploadingPost, setuploadingPost] = useState(false);

  const [file, setFile] = useState(null);
  const [imagefile, setImageFile] = useState(null);
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

  const [music, setMusic] = useState({
    title: "",
    subTitle: "",
    description: content,
    duration: "",
    artistId: "",
  });
  useEffect(() => {
    setMusic((prevPost) => ({
      ...prevPost,
      audios: file,
      thumbnail: imagefile,
      description: content,
    }));
  }, [file, content, imagefile]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setuploadingPost(true);
    try {
      let formData = new FormData(e.target);
      formData.append("description", music.description);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const musicResponse = await axios.put(
        "https://b2xclusive.onrender.com/api/v1/track/createAudio",
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
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.errorResponse?.message,
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
      <section className={` `}>
        <form
          onSubmit={onSubmit}
          className={`flex text-xs flex-col gap-8 items-start`}
        >
          <div className="flex flex-col gap-2 w-full">
            <label>Music Title</label>
            <input
              value={music.title}
              onChange={(e) => setMusic({ ...music, title: e.target.value })}
              type="text"
              name="title"
              placeholder="Enter Music Title"
              className=" w-full bg-transparent rounded-lg text-2xl  outline-none"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:items-center ">
            <div className="flex flex-col md:w-6/12">
              <label htmlFor="">Subtitle </label>
              <input
                value={music.subTitle}
                onChange={(e) =>
                  setMusic({ ...music, subTitle: e.target.value })
                }
                type="text"
                name="subTitle"
                placeholder="Enter subtitle"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>

            <div className="flex flex-col md:w-3/12">
              <label htmlFor="artist-select">Artists</label>
              <select
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                name="artistId"
                id="artist-select"
                onChange={(e) =>
                  setMusic({ ...music, artistId: e.target.value })
                }
                required
              >
                <option value="null">
                  {gettingArtist
                    ? "Loading..."
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
              </select>
              {gettingArtisterror && (
                <p className="text-primarycolor text-xs mt-2">
                  Failed to get all artists
                </p>
              )}
            </div>

            <div className="flex flex-col md:w-3/12">
              <label htmlFor="">Duration </label>
              <input
                value={music.duration}
                name="duration"
                onChange={(e) =>
                  setMusic({ ...music, duration: e.target.value })
                }
                type="text"
                placeholder="Enter music duration"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>
          </div>
          <div className="flex gap-4 w-full items-center">
            <div className="flex flex-col w-full">
              <label htmlFor="">Upload Music Cover </label>
              <input
                onChange={(e) => setImageFile(e.target.files[0])}
                type="file"
                multiple
                name="thumbnail"
                placeholder="Upload File"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>
          </div>
          {imagefile ? (
            <div className="w-full">
              <div className="w-full h-[300px]">
                <Image
                  src={URL.createObjectURL(imagefile)}
                  width={1000}
                  height={1000}
                  alt="post"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className={``}>Selected File: {imagefile.name}</p>
            </div>
          ) : (
            <p>No file selected</p>
          )}{" "}
          <div className="flex gap-4 w-full items-center">
            <div className="flex flex-col w-full">
              <label htmlFor="">Upload Music </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                multiple
                name="audios"
                placeholder="Upload File"
                className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="">Music Descriptions</label>
            <Tiptap
              content={content}
              onChange={(newContent) => handleContentChange(newContent)}
            />
          </div>
          <button
            type="submit"
            // Use handlePost instead of handleingPost
            className={`${uploadingPost ? "bg-orange-100" : "bg-primarycolor"} text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
          >
            {uploadingPost ? (
              <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin infinite" />
            ) : (
              "Create Music"
            )}
          </button>
        </form>
      </section>
    </>
  );
}

export default AddMusic;
