"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

function EditArtist({ params }) {
  const { artistId } = params;
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [uploadingPost, setuploadingPost] = useState(false);

  const [singleArtist, setsingleArtist] = useState({
    name: "",
    bio: "",
    image: [],
  });

  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchSingleArtist = async () => {
      try {
        const response = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/artist/${artistId}`,
        );
        const postData = response?.data?.data;
        setsingleArtist({
          ...postData,
          image: Array.isArray(postData.image)
            ? postData.image
            : [postData.image],
        });
      } catch (error) {
        console.log("Error fetching artist:", error.message);
      }
    };
    fetchSingleArtist();

    const storedToken = localStorage.getItem("b2xclusiveadmin");
    if (storedToken) {
      const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");
      setToken(cleanedToken);
    } else {
      console.error("Bearer token not found");
    }
  }, [artistId]);

  // Update the artist state with new file
  useEffect(() => {
    setsingleArtist((prevArtist) => ({
      ...prevArtist,
      file: file,
    }));
  }, [file]);
  const onSubmit = async (e) => {
    e.preventDefault();
    setuploadingPost(true);
    try {
      const formData = new FormData(e.target);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.patch(
        `https://b2xclusive.onrender.com/api/v1/artist/update/${artistId}`,
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
      toast.error(error.response?.data?.message || "Failed to upload post", {
        position: "top-center",
      });
    } finally {
      setuploadingPost(false);
    }
  };
  return (
    <>
      <form
        onSubmit={onSubmit}
        className={`flex flex-col gap-4 text-xs w-full items-start md:p-8 p-4`}
      >
        <div className="flex flex-col gap-2 w-full">
          <label>Artist Name</label>
          <input
            name="name"
            value={singleArtist.name}
            onChange={(e) =>
              setsingleArtist({ ...singleArtist, name: e.target.value })
            }
            type="text"
            placeholder="Loading..."
            className=" w-full bg-transparent rounded-lg text-lg md:text-2xl  outline-none"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label>Artists Picture</label>
          <input
            multiple
            name="file"
            type="file"
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
            singleArtist?.image?.length > 0 && (
              <div className="w-full">
                <div className="w-full h-[300px]">
                  <Image
                    src={singleArtist?.image[0]?.url}
                    width={1000}
                    height={1000}
                    alt="post"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className={``}>
                  Selected File: {singleArtist?.image[0]?.url}
                </p>
              </div>
            )
          )}
        </div>

        <div className="flex gap-4 w-full items-center">
          <div className="flex flex-col w-full gap-2 ">
            <label>Artist Bio</label>

            <textarea
              name="bio"
              id=""
              value={singleArtist.bio}
              onChange={(e) =>
                setsingleArtist({ ...singleArtist, bio: e.target.value })
              }
              type="text"
              placeholder="Loading..."
              className="p-4 w-full bg-transparent rounded-lg border-gray-200 border outline-none"
            ></textarea>
          </div>
        </div>
        <button
          type="submit" // Use handlePost instead of handleingPost
          className={`${uploadingPost ? "bg-orange-100" : "bg-primarycolor"} text-[14px] flex justify-center px-3 py-2 rounded-lg md:py-4 md:px-8 text-white`}
        >
          {uploadingPost ? (
            <AiOutlineLoading3Quarters className="text-primarycolor text-center text-xl font-bold animate-spin infinite" />
          ) : (
            "Update Artist"
          )}
        </button>
      </form>
    </>
  );
}

export default EditArtist;
