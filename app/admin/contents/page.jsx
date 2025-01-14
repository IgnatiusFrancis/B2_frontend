// import { FaBlog, FaComment, FaEye, FaUser } from "react-icons/fa";
// import AllArtistOverview from "@/components/AllArtistOverview";
// import AllVideosOverview from "@/components/AllVideosOverview";
// import AllEventOverview from "@/components/AllEventOverview";
// import AllOverviewPost from "@/components/AllOverviewPosts";
// import { CiMusicNote1, CiVideoOn } from "react-icons/ci";
// import { MdOutlineEmojiEvents } from "react-icons/md";
// import AllMusicOverview from "@/components/AllMusicOverview";
// import { getAudios, getPosts, getVideos } from "@/lib/api";
// async function Contents() {
//     const [posts, audios, videos] = await Promise.all([
//       getPosts(),
//       getAudios(),
//       getVideos(),
//     ]);
//   return (
//     <>
//       <section className={`w-full md:w-10/12 flex flex-col gap-2  p-4 `}>
//         <h1 className={` text-xl `}>Contents</h1>

//         <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
//           <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
//             <div className="flex justify-between">
//               <h1 className={`text-[10px] md:text-xs`}>Total Blogs</h1>
//               <FaBlog className={`text-xs`} />
//             </div>

//             <div>
//               <div className="flex">
//                 <h1 className={`font-bold text-xl`}>423</h1>
//               </div>
//             </div>
//           </div>

//           <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
//             <div className="flex justify-between">
//               <h1 className={`text-[10px] md:text-xs`}>Total Music</h1>
//               <CiMusicNote1 className={`text-xs`} />
//             </div>

//             <div>
//               <div className="flex">
//                 <h1 className={` font-bold text-xl`}>20</h1>
//               </div>
//             </div>
//           </div>

//           <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
//             <div className="flex justify-between">
//               <h1 className={`text-[10px] md:text-xs`}>Total Videos</h1>
//               <CiVideoOn className={`text-xs`} />
//             </div>

//             <div>
//               <div className="flex">
//                 <h1 className={` font-bold text-xl`}>408</h1>
//               </div>
//             </div>
//           </div>

//           <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
//             <div className="flex justify-between">
//               <h1 className={`text-[10px] md:text-xs`}>Total Events</h1>
//               <MdOutlineEmojiEvents className={`text-xs`} />
//             </div>

//             <div>
//               <div className="flex">
//                 <h1 className={` font-bold text-xl`}>50</h1>
//               </div>
//             </div>
//           </div>

//           <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
//             <div className="flex justify-between">
//               <h1 className={`text-[10px] md:text-xs`}>Total Artist</h1>
//               <FaUser className={`text-xs`} />
//             </div>

//             <div>
//               <div className="flex">
//                 <h1 className={` font-bold text-xl`}>50</h1>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex w-full gap-2 ">
//           <div className="w-full md:min-h-72">
//             <div className="w-full p-2 flex border border-gray-100 rounded-se rounded-ss">
//               <div className="w-6/12">
//                 <h1 className={` text-xs`}>Blogs</h1>
//               </div>
//               <div className="w-6/12 flex gap-2">
//                 <h1 className={` w-1/4 text-xs`}>Views</h1>

//                 <h1 className={` w-1/4 text-xs`}>Comments</h1>
//                 <h1 className={` w-1/4 text-xs`}>Date</h1>
//                 <h1 className={` w-1/4 text-xs`}>Action</h1>
//               </div>
//             </div>

//             <AllOverviewPost posts={posts}/>
//           </div>
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <div className="w-full p-2  border border-gray-100 rounded-se rounded-ss">
//               <div className="w-full flex">
//                 <div className="w-5/12">
//                   <h1 className={` text-xs`}>Music</h1>
//                 </div>
//                 <h1 className={` w-2/12 text-xs`}>Duration</h1>
//                 <h1 className={` w-3/12 text-xs`}>Date</h1>
//                 <h1 className={` w-2/12 text-xs`}>Action</h1>
//               </div>
//             </div>
//             <AllMusicOverview audios={audios}/>
//           </div>

//           <div>
//             <div className="w-full p-2  border border-gray-100 rounded-se rounded-ss">
//               <div className="w-full flex">
//                 <div className="w-5/12">
//                   <h1 className={` text-xs`}>Videos</h1>
//                 </div>
//                 <h1 className={` w-2/12 text-xs`}>Duration</h1>
//                 <h1 className={` w-3/12 text-xs`}>Date</h1>
//                 <h1 className={` w-2/12 text-xs`}>Action</h1>
//               </div>
//             </div>
//             <AllVideosOverview videos={videos}/>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Contents;

// Contents.jsx
import { FaBlog, FaComment, FaUser } from "react-icons/fa";
import { CiMusicNote1, CiVideoOn } from "react-icons/ci";
import { MdOutlineEmojiEvents } from "react-icons/md";
import AllMusicOverview from "@/components/AllMusicOverview";
import AllVideosOverview from "@/components/AllVideosOverview";
import AllOverviewPost from "@/components/AllOverviewPosts";
import { getAudios, getPosts, getVideos } from "@/lib/api";

async function Contents() {
  const [posts, audios, videos] = await Promise.all([
    getPosts(),
    getAudios(),
    getVideos(),
  ]);

  const stats = [
    { title: "Total Blogs", value: 423, icon: FaBlog },
    { title: "Total Music", value: 20, icon: CiMusicNote1 },
    { title: "Total Videos", value: 408, icon: CiVideoOn },
    { title: "Total Events", value: 50, icon: MdOutlineEmojiEvents },
    { title: "Total Artists", value: 50, icon: FaUser },
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
    </div>
  );
}
export default Contents;
