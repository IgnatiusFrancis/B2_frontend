// // components/ArtistVideos.js
// import Image from "next/image";
// import Link from "next/link";

// export default function ArtistVideos({ videos }) {
//   if (!videos || videos.length === 0) {
//     return (
//       <div className="py-8 text-center">
//         <p className="text-gray-500">No videos available for this artist.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
//       {videos.map((video) => (
//         <div key={video.id} className="relative group cursor-pointer">
//           <Link href={`/video/${video.id}`}>
//             <div className="relative h-48 w-full">
//               <Image
//                 src={video.thumbnail || "/placeholder-video.jpg"}
//                 alt={video.title}
//                 fill
//                 className="object-cover rounded-lg"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" />
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <svg
//                   className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M8 5v14l11-7z" />
//                 </svg>
//               </div>
//             </div>
//             <h3 className="mt-2 text-sm font-medium">{video.title}</h3>
//             <p className="text-xs text-gray-500">{video.views} views</p>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }


// components/ArtistVideos.js
import Image from "next/image";
import Link from "next/link";

export default function ArtistVideos({ videos }) {
  if (!videos || videos.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No videos available for this artist.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
      {videos.map((video) => (
        <div key={video.id} className="relative group cursor-pointer">
          <Link href={`/video/${video.id}`}>
            <div className="relative h-48 w-full">
              <Image
                src={video.thumbnail || "/placeholder-video.jpg"}
                alt={video.title}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-medium line-clamp-2">{video.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-gray-500">{video.views} views</p>
                <span className="text-xs text-gray-500">•</span>
                <p className="text-xs text-gray-500">{video.duration}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}