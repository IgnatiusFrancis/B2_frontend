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
  Music,
  Video,
} from "lucide-react";
import pld from "@/public/pld.jpeg";
import { MdMovie } from "react-icons/md";

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
        src={user.image || pld}
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
  const [allMovies, setAllMovies] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [allAudios, setAllAudios] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const storedUser = localStorage.getItem("user");
        const token = storedUser ? JSON.parse(storedUser) : null;

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const headers = { Authorization: `Bearer ${token}` };
        const baseURL = "https://b2xclusive.onrender.com/api/v1";

        const [
          postsRes,
          artistsRes,
          usersRes,
          movies,
          videos,
          audios,
          topArtists,
        ] = await Promise.all([
          axios.get(`${baseURL}/post/posts`, { headers }),
          axios.get(`${baseURL}/artist/artists`, { headers }),
          axios.get(`${baseURL}/users/allUsers`, { headers }),
          axios.get(`${baseURL}/track/movies`, { headers }),
          axios.get(`${baseURL}/track/videos`, { headers }),
          axios.get(`${baseURL}/track/audios`, { headers }),
          axios.get(`${baseURL}/artist/top/artists`, { headers }),
        ]);

        setAllPosts(postsRes.data.data);
        setAllArtists(artistsRes.data.data);
        setAllUsers(usersRes.data.data);
        setAllMovies(movies.data.data.movies);
        setAllVideos(videos.data.data.videos);
        setAllAudios(audios.data.data.audios);
        setTopArtists(topArtists.data.data);
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
    { title: "Movies", value: allMovies.length, icon: MdMovie },
    { title: "Videos", value: allVideos.length, icon: Video, trend: 24 },
    { title: "Audios", value: allAudios.length, icon: Music, trend: 18 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen mx-auto">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 mx-auto">
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
          <Clock className="w-4 h-4 text-red-500" />
          <span className="text-sm text-red-500">
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
                {/* <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {Math.floor(Math.random() * 1000)}
                  </span>
                </div> */}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Top Artists</h2>
          <div className="space-y-4">
            {topArtists.slice(0, 5).map((artist) => (
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
