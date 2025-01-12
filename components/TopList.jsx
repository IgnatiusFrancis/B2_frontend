// // "use client";

// // import React, { useState } from "react";
// // import { FaPlay, FaPause, FaDownload } from "react-icons/fa";
// // import { MoreVertical } from "lucide-react";
// // import Image from "next/image";
// // import { useContext } from "react";
// // import { ThemeContext } from "@/context/ThemeContext";

// // const TopList = ({ topArtists }) => {
// //   const [expandedId, setExpandedId] = useState(null);
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const { theme } = useContext(ThemeContext);
// //   const [audio, setAudio] = useState(null);
// //   const [currentTrack, setCurrentTrack] = useState(null);
// //   const toggleExpand = (id) => {
// //     setExpandedId(expandedId === id ? null : id); 
// //   };

// //   const handlePlayPause = (audioUrl) => {
// //     if (audio && audio.src !== audioUrl?.replace("http://", "https://")) {
// //       audio.pause(); // Pause the current audio
// //       setAudio(null); // Clear the current audio
// //       setIsPlaying(false); // Reset the playing state
// //     }

// //     if (!audio || audio.src !== audioUrl?.replace("http://", "https://")) {
// //       const newAudio = new Audio(audioUrl?.replace("http://", "https://"));
// //       setAudio(newAudio);

// //       newAudio.addEventListener("ended", () => setIsPlaying(false));
// //       newAudio.play();
// //       setIsPlaying(true);
// //     } else {
// //       if (isPlaying) {
// //         audio.pause();
// //         setIsPlaying(false);
// //       } else {
// //         audio.play();
// //         setIsPlaying(true);
// //       }
// //     }
// //   };

// //   const SongCard = ({ artist }) => (
// //     <div className="border-b transition-transform duration-300 hover:shadow-md mb-1">
// //       {/* Main Artist Row */}
// //       <div
// //         className={`px-6 py-4 flex justify-between items-center ${theme}-bgg bg-white rounded-lg`}
// //       >
// //         <div className="flex items-center gap-4">
// //           {/* Artist Image */}
// //           <div className="w-[70px] h-[70px] flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-200">
// //             <Image
// //               src={artist?.url}
// //               alt={artist?.name}
// //               width={70}
// //               height={70}
// //               className="w-full h-full object-cover rounded-full"
// //             />
// //           </div>
// //           {/* Artist Info */}
// //           <div>
// //             <h1 className={`font-bold text-xl ${theme}-text`}>
// //               {artist?.name}
// //             </h1>
// //             <p className="text-xs text-gray-500">{artist?.bio}</p>
// //           </div>
// //         </div>

// //         {/* Action Buttons */}
// //         <div className="flex items-center gap-4">
// //           <button
// //             onClick={() => toggleExpand(artist?.id)}
// //             className="focus:outline-none hover:rotate-90 transition-transform duration-300"
// //           >
// //             <MoreVertical className="h-5 w-5 text-gray-600" />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Dropdown Menu */}
// //       <div
// //         className={`overflow-hidden transition-all duration-500 ${
// //           expandedId === artist.id ? "max-h-[500px]" : "max-h-0"
// //         }`}
// //       >
// //         <div className="bg-gray-50 px-6 py-3">
// //           {artist?.track && artist?.track?.length > 0 ? (
// //             <div className="max-h-60 overflow-y-auto scrollbar-thin">
// //               {artist?.track.map((track, index) => (
// //                 <div
// //                   key={index}
// //                   className="py-2 flex justify-between items-center gap-4 text-sm text-gray-700 border-b last:border-b-0 hover:bg-gray-100 transition-colors duration-300"
// //                 >
// //                   <div className="flex items-center gap-3">
// //                     {/* Play/Pause Button */}
// //                     <button
// //                       onClick={() => handlePlayPause(track?.audioUrl)}
// //                       className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
// //                     >
// //                       {isPlaying && currentTrack === track?.audioUrl ? (
// //                         <FaPause />
// //                       ) : (
// //                         <FaPlay />
// //                       )}
// //                     </button>
// //                     <span>{track?.title}</span>
// //                   </div>
// //                   {/* Download Button */}
// //                   <a
// //                     download={track?.audioUrl}
// //                     href={`https://b2xclusive.onrender.com/api/v1/track/download?type=audio&key=${track?.key}&id=${track?.id}`}
// //                     className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300"
// //                   >
// //                     <FaDownload />
// //                   </a>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <p className="text-gray-500">No tracks available</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="py-4 grid grid-cols-2 md:flex md:flex-col gap-4 ">
// //       {topArtists?.map((artist) => (
// //         <SongCard key={artist?.id} artist={artist} />
// //       ))}
// //     </div>
// //   );
// // };

// // export default TopList;



// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { FaPlay, FaPause, FaDownload } from "react-icons/fa";
// import { MoreVertical } from "lucide-react";
// import Image from "next/image";
// import { useContext } from "react";
// import { ThemeContext } from "@/context/ThemeContext";

// const TopList = ({ topArtists }) => {
//   const [expandedId, setExpandedId] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [audio, setAudio] = useState(null);
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const [currentTrackName, setCurrentTrackName] = useState("");
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const audioRef = useRef(null); // Reference for the audio element
//   const { theme } = useContext(ThemeContext);

//   const toggleExpand = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   const handlePlayPause = (audioUrl, trackName) => {
//     const sanitizedUrl = audioUrl?.replace("http://", "https://");

//     if (audio && audio.src !== sanitizedUrl) {
//       audio.pause();
//       setIsPlaying(false);
//     }

//     if (!audio || audio.src !== sanitizedUrl) {
//       const newAudio = new Audio(sanitizedUrl);
//       setAudio(newAudio);
//       setCurrentTrack(sanitizedUrl);
//       setCurrentTrackName(trackName);

//       newAudio.addEventListener("timeupdate", () => setCurrentTime(newAudio.currentTime));
//       newAudio.addEventListener("loadedmetadata", () => setDuration(newAudio.duration));
//       newAudio.addEventListener("ended", () => setIsPlaying(false));

//       newAudio.play();
//       setIsPlaying(true);
//     } else {
//       if (isPlaying) {
//         audio.pause();
//         setIsPlaying(false);
//       } else {
//         audio.play();
//         setIsPlaying(true);
//       }
//     }
//   };

//   const handleSeek = (event) => {
//     if (audio) {
//       const newTime = (event.target.value / 100) * duration;
//       audio.currentTime = newTime;
//       setCurrentTime(newTime);
//     }
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
//   };

//   const SongCard = ({ artist }) => (
//     <div className="border-b transition-transform duration-300 hover:shadow-md mb-1">
//       {/* Main Artist Row */}
//       <div
//         className={`px-6 py-4 flex justify-between items-center ${theme}-bgg bg-white rounded-lg`}
//       >
//         <div className="flex items-center gap-4">
//           {/* Artist Image */}
//           <div className="w-[70px] h-[70px] flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-200">
//             <Image
//               src={artist?.url}
//               alt={artist?.name || "Artist image"}
//               width={70}
//               height={70}
//               className="w-full h-full object-cover rounded-full"
//             />
//           </div>
//           {/* Artist Info */}
//           <div>
//             <h1 className={`font-bold text-xl ${theme}-text`}>
//               {artist?.name}
//             </h1>
//             <p className="text-xs text-gray-500">{artist?.bio}</p>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => toggleExpand(artist?.id)}
//             className="focus:outline-none hover:rotate-90 transition-transform duration-300"
//           >
//             <MoreVertical className="h-5 w-5 text-gray-600" />
//           </button>
//         </div>
//       </div>

//       {/* Dropdown Menu */}
//       <div
//         className={`overflow-hidden transition-all duration-500 ${
//           expandedId === artist.id ? "max-h-[500px]" : "max-h-0"
//         }`}
//       >
//         <div className="bg-gray-50 px-6 py-3">
//           {artist?.track && artist?.track?.length > 0 ? (
//             <div className="max-h-60 overflow-y-auto scrollbar-thin">
//               {artist?.track.map((track, index) => (
//                 <div
//                   key={index}
//                   className="py-2 flex justify-between items-center gap-4 text-sm text-gray-700 border-b last:border-b-0 hover:bg-gray-100 transition-colors duration-300"
//                 >
//                   <div className="flex items-center gap-3">
//                     {/* Play/Pause Button */}
//                     <button
//                       onClick={() =>
//                         handlePlayPause(track?.audioUrl, track?.title)
//                       }
//                       className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
//                     >
//                       {isPlaying && currentTrack === track?.audioUrl ? (
//                         <FaPause />
//                       ) : (
//                         <FaPlay />
//                       )}
//                     </button>
//                     <span>{track?.title}</span>
//                   </div>
//                   {/* Download Button */}
//                   <a
//                     download={track?.audioUrl}
//                     href={`https://b2xclusive.onrender.com/api/v1/track/download?type=audio&key=${track?.key}&id=${track?.id}`}
//                     className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300"
//                   >
//                     <FaDownload />
//                   </a>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No tracks available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="py-4">
//       {currentTrackName && (
//         <div className="p-4 mb-4 bg-gray-100 rounded-lg shadow-lg">
//           <p className="font-bold text-lg">{currentTrackName}</p>
//           <div className="flex items-center gap-4 mt-2">
//             <span>{formatTime(currentTime)}</span>
//             <input
//               type="range"
//               value={(currentTime / duration) * 100 || 0}
//               onChange={handleSeek}
//               className="flex-1"
//             />
//             <span>{formatTime(duration)}</span>
//           </div>
//         </div>
//       )}
//       <div className="grid grid-cols-2 md:flex md:flex-col gap-4">
//         {topArtists?.map((artist) => (
//           <SongCard key={artist?.id} artist={artist} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopList;





"use client";

import React, { useState, useContext, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaDownload } from "react-icons/fa";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";

// Waveform Component
const Waveform = ({ isPlaying }) => {
  const bars = 200; 
  
  return (
    <div className="flex items-center gap-[2px] h-4 mx-2">
      {[...Array(bars)].map((_, i) => (
        <div
          key={i}
          className={`w-[2px] bg-blue-500 rounded-full transition-all duration-150 ${
            isPlaying ? 'animate-waveform' : 'h-1'
          }`}
          style={{
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
};

const TopList = ({ topArtists }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const { theme } = useContext(ThemeContext);
  const audioRef = useRef(null);

  useEffect(() => {
    // Cleanup function to handle component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handlePlayPause = (track) => {
    if (!track?.audioUrl) return;

    const audioUrl = track.audioUrl.replace("http://", "https://");

    if (audioRef.current) {
      if (currentTrackId === track.id) {
        // Same track - toggle play/pause
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      } else {
        // Different track - switch to new track
        audioRef.current.pause();
        audioRef.current = new Audio(audioUrl);
        audioRef.current.addEventListener("ended", () => {
          setIsPlaying(false);
          setCurrentTrackId(null);
        });
        audioRef.current.play();
        setIsPlaying(true);
        setCurrentTrackId(track.id);
      }
    } else {
      // First time playing - create new audio
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTrackId(null);
      });
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentTrackId(track.id);
    }
  };

  const SongCard = ({ artist }) => (
    <div className="border-b transition-transform duration-300 hover:shadow-md mb-1">
      {/* Main Artist Row */}
      <div
        className={`px-6 py-4 flex justify-between items-center ${theme}-bgg bg-white rounded-lg`}
      >
        <div className="flex items-center gap-4">
          {/* Artist Image */}
          <div className="w-[70px] h-[70px] flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-200">
            <Image
              src={artist?.url}
              alt={artist?.name}
              width={70}
              height={70}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {/* Artist Info */}
          <div>
            <h1 className={`font-bold text-xl ${theme}-text`}>
              {artist?.name}
            </h1>
            <p className="text-xs text-gray-500">{artist?.bio}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleExpand(artist?.id)}
            className="focus:outline-none hover:rotate-90 transition-transform duration-300"
          >
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          expandedId === artist.id ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="bg-gray-50 px-6 py-3">
          {artist?.track && artist?.track?.length > 0 ? (
            <div className="max-h-60 overflow-y-auto scrollbar-thin">
              {artist?.track.map((track) => (
                <div
                  key={track.id}
                  className="py-2 flex justify-between items-center gap-4 text-sm text-gray-700 border-b last:border-b-0 hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {/* Play/Pause Button */}
                    <button
                      onClick={() => handlePlayPause(track)}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
                    >
                      {isPlaying && currentTrackId === track.id ? (
                        <FaPause className="w-3 h-3" />
                      ) : (
                        <FaPlay className="w-3 h-3" />
                      )}
                    </button>
                    <span>{track?.title}</span>
                    {/* Waveform visualization */}
                    {currentTrackId === track.id && (
                      <Waveform isPlaying={isPlaying} />
                    )}
             
                  </div>
  
                  {/* Download Button */}
                  <a
                    href={`https://b2xclusive.onrender.com/api/v1/track/download?type=audio&key=${track?.key}&id=${track?.id}`}
                    download
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300"
                  >
                    <FaDownload className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tracks available</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-4 grid grid-cols-2 md:flex md:flex-col gap-4">
      {topArtists?.map((artist) => (
        <SongCard key={artist?.id} artist={artist} />
      ))}
    </div>
  );
};

export default TopList;
