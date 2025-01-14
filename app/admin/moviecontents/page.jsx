// Contents.jsx
import { FaBlog, FaComment, FaUser } from "react-icons/fa";
import { CiMusicNote1, CiVideoOn } from "react-icons/ci";
import { MdOutlineEmojiEvents } from "react-icons/md";

import { fetchMovies, getMovies } from "@/lib/api";
import AllOverviewMovie from "@/components/allMovieOverview";

async function Contents() {
  const [movies, moviesArray] = await Promise.all([fetchMovies(), getMovies()]);

  const stats = [
    {
      title: "Total Movies",
      value: moviesArray.length,
      icon: FaBlog,
    },
    {
      title: "Total Single Movie",
      value: movies.SINGLE.length,
      icon: CiMusicNote1,
    },
    {
      title: "Total Seasonal Movie",
      value: movies.SEASONAL.length,
      icon: CiVideoOn,
    },
    {
      title: "Total Series Movie",
      value: movies.SERIES.length,
      icon: MdOutlineEmojiEvents,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Movie Section</h1>
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
            <div className="col-span-6">Movie</div>
            <div className="col-span-1 text-center">Type</div>
            <div className="col-span-2 text-center">Downloads</div>
            <div className="col-span-2 text-center">Date</div>
            <div className="col-span-1 text-center">Actions</div>
          </div>
        </div>
        <div>
          <AllOverviewMovie moviesArray={moviesArray} />
        </div>
      </div>
    </div>
  );
}
export default Contents;
