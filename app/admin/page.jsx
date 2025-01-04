"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaBlog, FaDownload, FaEye, FaUser } from "react-icons/fa";
import { ThemeContext } from "@/context/ThemeContext";
import Post from "@/components/Post";
import Followers from "@/components/Followers";
import Charts from "@/components/Charts";
import pld from "@/public/pld.jpeg";
import { CiMail, CiMusicNote1 } from "react-icons/ci";
import { MdOutlineEmojiEvents } from "react-icons/md";

function Overview() {
  const { showSideBar } = useContext(ThemeContext);
  const [allPosts, setAllPosts] = useState([]);
  const [allArtist, setAllArtist] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [token, setToken] = useState("");
  const role = "user";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const storedToken = localStorage.getItem("b2xclusiveadmin");
        if (storedToken) {
          const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");
          setToken(cleanedToken);

          const postResponse = await axios.get(
            `https://b2xclusive.onrender.com/api/v1/post/posts`,
            {
              headers: {
                Authorization: `Bearer ${cleanedToken}`,
              },
            },
          );
          setAllPosts(postResponse.data.data);

          const artistResponse = await axios.get(
            `https://b2xclusive.onrender.com/api/v1/artist/artists`,
            {
              headers: {
                Authorization: `Bearer ${cleanedToken}`,
              },
            },
          );
          setAllArtist(artistResponse.data.data);

          const usersResponse = await axios.get(
            `https://b2xclusive.onrender.com/api/v1/users/allUsers?role=${role}`,
            {
              headers: {
                Authorization: `Bearer ${cleanedToken}`,
              },
            },
          );
          setAllUsers(usersResponse.data.data);
        } else {
          console.error("Bearer token not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchPost();
  }, [role]);

  return (
    <>
      <section
        className={` w-full md:w-10/12  p-2  md:p-4 flex flex-col gap-2`}
      >
        <h1 className={`text-xl`}>Overview</h1>

        {/* Render total counts */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {/* Total Posts */}
          <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
            <div className="flex justify-between">
              <h1 className={`text-[10px] md:text-xs`}>Total Posts</h1>
              <FaBlog className={`text-xs`} />
            </div>
            <div>
              <div className="flex">
                <h1 className={`font-bold text-xl`}>{allPosts.length}</h1>
              </div>
              <p className="text-gray-300 text-[9px] md:text-[11px]">
                Of all time
              </p>
            </div>
          </div>

          {/* Total Users */}
          <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
            <div className="flex justify-between">
              <h1 className={`text-[10px] md:text-xs`}>Total Users</h1>
              <FaUser className={`text-xs`} />
            </div>
            <div>
              <div className="flex">
                <h1 className={` font-bold text-xl`}>{allUsers.length}</h1>
              </div>
              <p className="text-gray-300 text-[9px] md:text-[11px]">
                Of all time
              </p>
            </div>
          </div>

          {/* Total Artists */}
          <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
            <div className="flex justify-between">
              <h1 className={`text-[10px] md:text-xs`}>Total Artists</h1>
              <CiMusicNote1 className={`text-xs`} />
            </div>
            <div>
              <div className="flex">
                <h1 className={`font-bold text-xl`}>{allArtist.length}</h1>
              </div>
              <p className="text-gray-300 text-[9px] md:text-[11px]">
                Of all time
              </p>
            </div>
          </div>

          {/* Total Events */}
          <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
            <div className="flex justify-between">
              <h1 className={`text-[10px] md:text-xs`}>Total Events</h1>
              <MdOutlineEmojiEvents className={`text-xs`} />
            </div>
            <div>
              <div className="flex">
                <h1 className={` font-bold text-xl`}>50</h1>
              </div>
              <p className="text-gray-300 text-[9px] md:text-[11px]">
                Of all time
              </p>
            </div>
          </div>

          <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
            <div className="flex justify-between">
              <h1 className={`text-[10px] md:text-xs`}>Total Views</h1>
              <FaEye className={`text-xs`} />
            </div>
            <div>
              <div className="flex">
                <h1 className={` font-bold text-xl`}>50</h1>
              </div>
              <p className="text-gray-300 text-[9px] md:text-[11px]">
                Of all time
              </p>
            </div>
          </div>

          <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
            <div className="flex justify-between">
              <h1 className={`text-[10px] md:text-xs`}>Total Downloads</h1>
              <FaDownload className={`text-xs`} />
            </div>
            <div>
              <div className="flex">
                <h1 className={` font-bold text-xl`}>50</h1>
              </div>
              <p className="text-gray-300 text-[9px] md:text-[11px]">
                Of all time
              </p>
            </div>
          </div>
        </div>

        {/* Render charts and recent user content */}
        <section className="w-full md:flex gap-4">
          <div className="md:w-3/5">
            <Charts />
          </div>
          <div className="w-full md:w-2/5 rounded-lg">
            <h1 className={`text-sm my-2`}>Recent 5 Users</h1>
            <div className="border flex justify-between border-gray-100 rounded-ss rounded-se p-2">
              <h1 className={` w-3/5 text-xs`}>Users</h1>
              <div className="flex w-2/5 ">
                <p className={`w-1/2 text-xs `}>Role</p>

                <p className={`w-1/2 text-xs`}>Date</p>
              </div>{" "}
            </div>
            {allUsers.slice(0, 5).map((user) => (
              <div
                key={user.id}
                className="border  flex justify-between border-gray-100 p-2"
              >
                <div className="flex  w-3/5 gap-2 items-center">
                  <div className="w-[30px] h-[30px] rounded-full">
                    <Image
                      src={user.image || pld}
                      width={1000}
                      height={1000}
                      alt="user"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="">
                    <h1 className={`md:text-xs text-[12px]`}>
                      {user.userName}
                    </h1>
                    <p className="text-green-500 md:text-xs text-[12px]">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex  w-2/5">
                  <p className={`w-1/2 md:text-xs text-[12px]`}>{user.role}</p>
                  <p className={`w-1/2 md:text-xs text-[12px]`}>
                    {user.createdAt.split("T")[0]}
                  </p>
                </div>{" "}
              </div>
            ))}
          </div>
        </section>

        {/* Render recent posts and artists */}
        <section className="md:flex-row flex flex-col gap-4">
          <div className="w-full md:w-4/6">
            <h1 className={`text-sm my-2`}>Recent 5 Posts</h1>
            <div className="border flex justify-between border-gray-100 rounded-se rounded-ss p-2">
              <h1 className={` w-3/5 text-xs`}>Post Title</h1>
              <div className="flex w-2/5  gap-8">
                <h1 className={`text-xs w-1/2`}>Views</h1>
                <h1 className={`text-xs w-1/2`}>Date</h1>
              </div>
            </div>
            {allPosts?.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </div>
          <div className="w-full md:w-2/6 rounded-lg">
            <h1 className={`text-sm my-2`}>Recent 5 Artists</h1>
            <div className="border flex justify-between border-gray-100 rounded-ss rounded-se p-2">
              <h1 className={` text-sm w-3/4 `}>Artist</h1>
              <p className={` text-sm w-1/4 `}>Date</p>
            </div>
            {allArtist?.slice(0, 5).map((artist) => (
              <div key={artist.id}>
                <div className="border flex justify-between items-center border-gray-100  p-2">
                  <div className="flex w-3/4 gap-2 items-center">
                    <div className="w-[30px] h-[30px] rounded-full">
                      <Image
                        src={artist?.image?.url || pld}
                        width={1000}
                        height={1000}
                        alt="alb"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    <div className="">
                      <h1 className={` md:text-xs text-[12px] `}>
                        {artist?.name}
                      </h1>
                      <p className="text-green-500 md:text-xs text-[12px] ">
                        {artist?.bio?.split(" ").slice(0, 5).join(" ")}....
                      </p>
                    </div>
                  </div>

                  <p className={` md:text-xs w-1/4 text-[12px] `}>
                    {artist?.createdAt?.split("T")[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

export default Overview;
