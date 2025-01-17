// Contents.jsx
import { FaBlog, FaComment, FaUser } from "react-icons/fa";
import { CiMusicNote1, CiVideoOn } from "react-icons/ci";
import { MdOutlineEmojiEvents, MdOutlineEventSeat } from "react-icons/md";
import AllMusicOverview from "@/components/AllMusicOverview";
import AllVideosOverview from "@/components/AllVideosOverview";
import AllOverviewPost from "@/components/AllOverviewPosts";
import {
  getAlbums,
  getArtists,
  getAudios,
  getEvents,
  getPosts,
  getVideos,
} from "@/lib/api";
import { Album } from "lucide-react";
import AllEventOverview from "@/components/AllEventOverviewPage";
import AllEventOverviewPage from "@/components/AllEventOverviewPage";

async function Contents() {
  const [posts, audios, videos, albums, events] = await Promise.all([
    getPosts(),
    getAudios(),
    getVideos(),
    getAlbums(),
    getEvents(),
  ]);

  // value: movies.SINGLE.length,
  const stats = [
    { title: "Total Blogs", value: posts.length, icon: FaBlog },
    { title: "Total Music", value: audios.length, icon: CiMusicNote1 },
    { title: "Total Videos", value: videos.length, icon: CiVideoOn },
    { title: "Total Events", value: events.length, icon: MdOutlineEventSeat },
    { title: "Total Albums", value: albums.length, icon: Album },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Contents</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow transition-all hover:shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">{stat.title}</span>
              <stat.icon className="text-gray-400 text-xl" />
            </div>
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Blog Posts Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 p-4 border-b">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
            <div className="col-span-6">Content</div>
            <div className="col-span-1 text-center">Views</div>
            <div className="col-span-2 text-center">Artist</div>
            <div className="col-span-2 text-center">Date</div>
            <div className="col-span-1 text-center">Actions</div>
          </div>
        </div>
        <div>
          <AllOverviewPost posts={posts} />
        </div>
      </div>

      {/* Music Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 p-4 border-b">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
            <div className="col-span-6">Music</div>
            <div className="col-span-1 text-center">Duration</div>
            <div className="col-span-2 text-center">Artist</div>
            <div className="col-span-2 text-center">Date</div>
            <div className="col-span-1 text-center">Actions</div>
          </div>
        </div>
        <div>
          <AllMusicOverview audios={audios} />
        </div>
      </div>

      {/* Videos Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 p-4 border-b">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
            <div className="col-span-6">Videos</div>
            <div className="col-span-1">Duration</div>
            <div className="col-span-2 text-center">Artist</div>
            <div className="col-span-2 text-center">Date</div>
            <div className="col-span-1 text-center">Actions</div>
          </div>
        </div>
        <div>
          <AllVideosOverview videos={videos} />
        </div>
      </div>

      {/* Event Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-gray-50 p-4 border-b">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
            <div className="col-span-6">Events</div>
            <div className="col-span-1 text-center">Comment</div>
            <div className="col-span-2 text-center">Location</div>
            <div className="col-span-2 text-center">Date</div>
            <div className="col-span-1 text-center">Actions</div>
          </div>
        </div>
        <div>{<AllEventOverviewPage events={events} />}</div>
      </div>
    </div>
  );
}
export default Contents;
