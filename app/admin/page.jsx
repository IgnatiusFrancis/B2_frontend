// "use client";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { FaBlog, FaDownload, FaEye, FaUser } from "react-icons/fa";
// import { ThemeContext } from "@/context/ThemeContext";
// import Post from "@/components/Post";
// import Followers from "@/components/Followers";
// import Charts from "@/components/Charts";
// import pld from "@/public/pld.jpeg";
// import { CiMail, CiMusicNote1 } from "react-icons/ci";
// import { MdOutlineEmojiEvents } from "react-icons/md";

// function Overview() {
//   const { showSideBar } = useContext(ThemeContext);
//   const [allPosts, setAllPosts] = useState([]);
//   const [allArtist, setAllArtist] = useState([]);
//   const [allUsers, setAllUsers] = useState([]);

//   const [token, setToken] = useState("");
//   const role = "user";

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const storedToken = localStorage.getItem("b2xclusiveadmin");
//         if (storedToken) {
//           const cleanedToken = storedToken.replace(/^['"](.*)['"]$/, "$1");
//           setToken(cleanedToken);

//           const postResponse = await axios.get(
//             `https://b2xclusive.onrender.com/api/v1/post/posts`,
//             {
//               headers: {
//                 Authorization: `Bearer ${cleanedToken}`,
//               },
//             },
//           );
//           setAllPosts(postResponse.data.data);

//           const artistResponse = await axios.get(
//             `https://b2xclusive.onrender.com/api/v1/artist/artists`,
//             {
//               headers: {
//                 Authorization: `Bearer ${cleanedToken}`,
//               },
//             },
//           );
//           setAllArtist(artistResponse.data.data);

//           const usersResponse = await axios.get(
//             `https://b2xclusive.onrender.com/api/v1/users/allUsers?role=${role}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${cleanedToken}`,
//               },
//             },
//           );
//           setAllUsers(usersResponse.data.data);
//         } else {
//           console.error("Bearer token not found");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//       }
//     };

//     fetchPost();
//   }, [role]);

//   return (
//     <>
//       <section
//         className={` w-full md:w-10/12  p-2  md:p-4 flex flex-col gap-2`}
//       >
//         <h1 className={`text-xl`}>Overview</h1>

//         {/* Render total counts */}
//         <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
//           {/* Total Posts */}
//           <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
//             <div className="flex justify-between">
//               <h1 className={`text-[10px] md:text-xs`}>Total Posts</h1>
//               <FaBlog className={`text-xs`} />
//             </div>
//             <div>
//               <div className="flex">
//                 <h1 className={`font-bold text-xl`}>{allPosts.length}</h1>
//               </div>
//               <p className="text-gray-300 text-[9px] md:text-[11px]">
//                 Of all time
//               </p>
//             </div>
//           </div>

//           {/* Total Users */}
//           <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
//             <div className="flex justify-between">
//               <h1 className={`text-[10px] md:text-xs`}>Total Users</h1>
//               <FaUser className={`text-xs`} />
//             </div>
//             <div>
//               <div className="flex">
//                 <h1 className={` font-bold text-xl`}>{allUsers.length}</h1>
//               </div>
//               <p className="text-gray-300 text-[9px] md:text-[11px]">
//                 Of all time
//               </p>
//             </div>
//           </div>

//           {/* Total Artists */}
//           <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
//             <div className="flex justify-between">
//               <h1 className={`text-[10px] md:text-xs`}>Total Artists</h1>
//               <CiMusicNote1 className={`text-xs`} />
//             </div>
//             <div>
//               <div className="flex">
//                 <h1 className={`font-bold text-xl`}>{allArtist.length}</h1>
//               </div>
//               <p className="text-gray-300 text-[9px] md:text-[11px]">
//                 Of all time
//               </p>
//             </div>
//           </div>

//           {/* Total Events */}
//           <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
//             <div className="flex justify-between">
//               <h1 className={`text-[10px] md:text-xs`}>Total Events</h1>
//               <MdOutlineEmojiEvents className={`text-xs`} />
//             </div>
//             <div>
//               <div className="flex">
//                 <h1 className={` font-bold text-xl`}>50</h1>
//               </div>
//               <p className="text-gray-300 text-[9px] md:text-[11px]">
//                 Of all time
//               </p>
//             </div>
//           </div>

//           <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
//             <div className="flex justify-between">
//               <h1 className={`text-[10px] md:text-xs`}>Total Views</h1>
//               <FaEye className={`text-xs`} />
//             </div>
//             <div>
//               <div className="flex">
//                 <h1 className={` font-bold text-xl`}>50</h1>
//               </div>
//               <p className="text-gray-300 text-[9px] md:text-[11px]">
//                 Of all time
//               </p>
//             </div>
//           </div>

//           <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
//             <div className="flex justify-between">
//               <h1 className={`text-[10px] md:text-xs`}>Total Downloads</h1>
//               <FaDownload className={`text-xs`} />
//             </div>
//             <div>
//               <div className="flex">
//                 <h1 className={` font-bold text-xl`}>50</h1>
//               </div>
//               <p className="text-gray-300 text-[9px] md:text-[11px]">
//                 Of all time
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Render charts and recent user content */}
//         <section className="w-full md:flex gap-4">
//           <div className="md:w-3/5">
//             <Charts />
//           </div>
//           <div className="w-full md:w-2/5 rounded-lg">
//             <h1 className={`text-sm my-2`}>Recent 5 Users</h1>
//             <div className="border flex justify-between border-gray-100 rounded-ss rounded-se p-2">
//               <h1 className={` w-3/5 text-xs`}>Users</h1>
//               <div className="flex w-2/5 ">
//                 <p className={`w-1/2 text-xs `}>Role</p>

//                 <p className={`w-1/2 text-xs`}>Date</p>
//               </div>{" "}
//             </div>
//             {allUsers.slice(0, 5).map((user) => (
//               <div
//                 key={user.id}
//                 className="border  flex justify-between border-gray-100 p-2"
//               >
//                 <div className="flex  w-3/5 gap-2 items-center">
//                   <div className="w-[30px] h-[30px] rounded-full">
//                     <Image
//                       src={user.image || pld}
//                       width={1000}
//                       height={1000}
//                       alt="user"
//                       className="w-full h-full object-cover rounded-full"
//                     />
//                   </div>
//                   <div className="">
//                     <h1 className={`md:text-xs text-[12px]`}>
//                       {user.userName}
//                     </h1>
//                     <p className="text-green-500 md:text-xs text-[12px]">
//                       {user.email}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex  w-2/5">
//                   <p className={`w-1/2 md:text-xs text-[12px]`}>{user.role}</p>
//                   <p className={`w-1/2 md:text-xs text-[12px]`}>
//                     {user.createdAt.split("T")[0]}
//                   </p>
//                 </div>{" "}
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Render recent posts and artists */}
//         <section className="md:flex-row flex flex-col gap-4">
//           <div className="w-full md:w-4/6">
//             <h1 className={`text-sm my-2`}>Recent 5 Posts</h1>
//             <div className="border flex justify-between border-gray-100 rounded-se rounded-ss p-2">
//               <h1 className={` w-3/5 text-xs`}>Post Title</h1>
//               <div className="flex w-2/5  gap-8">
//                 <h1 className={`text-xs w-1/2`}>Views</h1>
//                 <h1 className={`text-xs w-1/2`}>Date</h1>
//               </div>
//             </div>
//             {allPosts?.map((post) => (
//               <Post key={post.id} {...post} />
//             ))}
//           </div>
//           <div className="w-full md:w-2/6 rounded-lg">
//             <h1 className={`text-sm my-2`}>Recent 5 Artists</h1>
//             <div className="border flex justify-between border-gray-100 rounded-ss rounded-se p-2">
//               <h1 className={` text-sm w-3/4 `}>Artist</h1>
//               <p className={` text-sm w-1/4 `}>Date</p>
//             </div>
//             {allArtist?.slice(0, 5).map((artist) => (
//               <div key={artist.id}>
//                 <div className="border flex justify-between items-center border-gray-100  p-2">
//                   <div className="flex w-3/4 gap-2 items-center">
//                     <div className="w-[30px] h-[30px] rounded-full">
//                       <Image
//                         src={artist?.url || pld}
//                         width={1000}
//                         height={1000}
//                         alt="alb"
//                         className="w-full h-full object-cover rounded-full"
//                       />
//                     </div>

//                     <div className="">
//                       <h1 className={` md:text-xs text-[12px] `}>
//                         {artist?.name}
//                       </h1>
//                       <p className="text-green-500 md:text-xs text-[12px] ">
//                         {artist?.bio?.split(" ").slice(0, 5).join(" ")}....
//                       </p>
//                     </div>
//                   </div>

//                   <p className={` md:text-xs w-1/4 text-[12px] `}>
//                     {artist?.createdAt?.split("T")[0]}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </section>
//     </>
//   );
// }

// export default Overview;

"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "@/context/ThemeContext";
import {
  Activity,
  Users,
  Music2,
  Calendar,
  Eye,
  Download,
  TrendingUp,
  Clock,
} from "lucide-react";

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
    <div className="flex items-center justify-between space-x-4">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex items-center gap-2 mt-2">
          <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
          {trend && (
            <span className="text-sm text-green-500 flex items-center">
              <TrendingUp size={16} />
              {trend}%
            </span>
          )}
        </div>
      </div>
      <div className="p-3 bg-purple-100 rounded-full">
        <Icon className="w-6 h-6 text-purple-600" />
      </div>
    </div>
  </div>
);

const UserCard = ({ user }) => (
  <div className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors rounded-lg">
    <div className="relative w-10 h-10">
      <Image
        src={user.image || "/placeholder.jpg"}
        alt={user.userName}
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-sm text-gray-800">{user.userName}</h3>
      <p className="text-xs text-gray-500">{user.email}</p>
    </div>
    <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-600 rounded-full">
      {user.role}
    </span>
  </div>
);

function ModernDashboard() {
  const { showSideBar } = useContext(ThemeContext);
  const [allPosts, setAllPosts] = useState([]);
  const [allArtists, setAllArtists] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const storedToken = localStorage
          .getItem("b2xclusiveadmin")
          ?.replace(/^['"](.*)['"]$/, "$1");

        if (!storedToken) {
          throw new Error("Authentication token not found");
        }

        const headers = { Authorization: `Bearer ${storedToken}` };
        const baseURL = "https://b2xclusive.onrender.com/api/v1";

        const [postsRes, artistsRes, usersRes] = await Promise.all([
          axios.get(`${baseURL}/post/posts`, { headers }),
          axios.get(`${baseURL}/artist/artists`, { headers }),
          axios.get(`${baseURL}/users/allUsers?role=user`, { headers }),
        ]);

        setAllPosts(postsRes.data.data);
        setAllArtists(artistsRes.data.data);
        setAllUsers(usersRes.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { title: "Total Posts", value: allPosts.length, icon: Activity, trend: 12 },
    { title: "Active Users", value: allUsers.length, icon: Users, trend: 8 },
    { title: "Artists", value: allArtists.length, icon: Music2, trend: 15 },
    { title: "Events", value: 50, icon: Calendar },
    { title: "Total Views", value: "125K", icon: Eye, trend: 24 },
    { title: "Downloads", value: "32K", icon: Download, trend: 18 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
        <div className="flex">
          <div className="flex-1">
            <p className="font-bold text-red-800">Error</p>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Recent Users */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Activity Overview
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={allPosts.slice(-7).map((post) => ({
                  name: new Date(post.createdAt).toLocaleDateString(),
                  views: Math.floor(Math.random() * 1000),
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Users</h2>
          <div className="space-y-4">
            {allUsers.slice(0, 5).map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>

      {/* Posts and Artists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Latest Posts</h2>
          <div className="space-y-4">
            {allPosts.slice(0, 5).map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-gray-800">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {Math.floor(Math.random() * 1000)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Top Artists</h2>
          <div className="space-y-4">
            {allArtists.slice(0, 5).map((artist) => (
              <div
                key={artist.id}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Image
                  src={artist.url || "/placeholder.jpg"}
                  alt={artist.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-gray-800">
                    {artist.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {artist.bio?.split(" ").slice(0, 5).join(" ")}...
                  </p>
                </div>
                <Music2 className="w-4 h-4 text-purple-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModernDashboard;
