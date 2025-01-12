"use client";
// import React, { useEffect, useState } from 'react';
// import { Music, Mic2, Radio, Headphones, Vinyl } from 'lucide-react';

// const NoContentDesign = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [activeNote, setActiveNote] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveNote(prev => (prev + 1) % 5);
//     }, 500);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-gradient-to-b from-white to-gray-50">
//       {/* Main Animation Container */}
//       <div className="relative w-full max-w-2xl aspect-video bg-white rounded-2xl shadow-xl overflow-hidden">
//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 opacity-10">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute animate-float"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 5}s`,
//                 transform: `rotate(${Math.random() * 360}deg)`
//               }}
//             >
//               {i % 2 === 0 ? '♪' : '♫'}
//             </div>
//           ))}
//         </div>

//         {/* Central Content */}
//         <div className="relative h-full flex flex-col items-center justify-center gap-8 p-8">
//           {/* Animated Record Player */}
//           <div className="relative w-32 h-32">
//             <div className={`absolute inset-0 rounded-full border-4 border-gray-800 ${isPlaying ? 'animate-spin' : ''}`}>
//               <div className="absolute inset-2 rounded-full bg-gradient-to-r from-gray-900 to-gray-800">
//                 <div className="absolute inset-8 rounded-full bg-primarycolor" />
//               </div>
//             </div>
            
//             {/* Music Notes Animation */}
//             <div className="absolute -right-4 -top-4 flex gap-2">
//               {[...Array(5)].map((_, i) => (
//                 <div
//                   key={i}
//                   className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                     activeNote === i ? 'bg-primarycolor scale-150' : 'bg-gray-300 scale-100'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Text Content */}
//           <div className="text-center space-y-4">
//             <h2 className="text-3xl font-bold text-gray-800">
//               The Stage is Set
//             </h2>
//             <p className="text-gray-600 max-w-md">
//               New hits dropping soon! Stay tuned for the latest music and entertainment updates.
//             </p>
//           </div>

//           {/* Interactive Icons */}
//           <div className="flex gap-8 mt-4">
//             <Headphones 
//               className="w-8 h-8 text-gray-600 hover:text-primarycolor transition-colors cursor-pointer hover:scale-110" 
//               onClick={() => setIsPlaying(!isPlaying)}
//             />
//             <Music className="w-8 h-8 text-gray-600 hover:text-primarycolor transition-colors cursor-pointer hover:scale-110" />
//             <Radio className="w-8 h-8 text-gray-600 hover:text-primarycolor transition-colors cursor-pointer hover:scale-110" />
//             <Mic2 className="w-8 h-8 text-gray-600 hover:text-primarycolor transition-colors cursor-pointer hover:scale-110" />
//           </div>
//         </div>

//         {/* Animated Equalizer Bars */}
//         <div className="absolute bottom-0 left-0 right-0 h-8 flex items-end justify-center gap-1 px-4">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="w-2 bg-primarycolor rounded-t-sm animate-equalizer"
//               style={{
//                 height: `${Math.random() * 100}%`,
//                 animationDelay: `${i * 0.1}s`
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoContentDesign;


// import React, { useEffect, useState } from 'react';
// import { Music, Headphones, Mic2, Radio, Play, Pause } from 'lucide-react';

// const B2XclusiveAnimation = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [activeBeat, setActiveBeat] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveBeat(prev => (prev + 1) % 8);
//     }, 300);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
//       {/* Floating Music Notes */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(30)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute text-primarycolor opacity-20 animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               fontSize: `${Math.random() * 20 + 10}px`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${Math.random() * 3 + 2}s`
//             }}
//           >
//             {['♪', '♫', '♬', '♭', '♮'][Math.floor(Math.random() * 5)]}
//           </div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="relative min-h-screen flex flex-col items-center justify-center p-8">
//         {/* Brand Logo Animation */}
//         <div className="text-center mb-12">
//           <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primarycolor to-blue-400 animate-pulse">
//             B2
//             <span className="inline-block animate-bounce">X</span>
//             clusive
//           </h1>
//           <div className="mt-4 text-xl text-gray-400">Music & Entertainment</div>
//         </div>

//         {/* Central Animation */}
//         <div className="relative w-full max-w-4xl aspect-[16/9] rounded-3xl bg-gradient-to-r from-gray-800 to-gray-900 p-8 shadow-2xl">
//           {/* Animated DJ Character */}
//           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//             <div className="relative w-48 h-48">
//               {/* DJ Head */}
//               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-gray-700 to-gray-800">
//                 <div className="absolute bottom-4 w-full flex justify-center gap-8">
//                   {/* Headphones */}
//                   <div className="w-24 h-3 rounded-full bg-primarycolor absolute -left-2" />
//                   <div className="w-24 h-3 rounded-full bg-primarycolor absolute -right-2" />
//                 </div>
//               </div>
              
//               {/* Turntable */}
//               <div className="absolute top-32 left-1/2 -translate-x-1/2">
//                 <div className={`w-40 h-40 rounded-full border-4 border-primarycolor ${isPlaying ? 'animate-spin' : ''}`}>
//                   <div className="absolute inset-2 rounded-full bg-gray-800">
//                     <div className="absolute inset-4 rounded-full border-2 border-gray-600" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Beat Visualizer */}
//           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
//             {[...Array(8)].map((_, i) => (
//               <div
//                 key={i}
//                 className={`w-3 h-16 rounded-full transition-all duration-200 ${
//                   activeBeat === i ? 'bg-primarycolor h-32' : 'bg-gray-600 h-16'
//                 }`}
//               />
//             ))}
//           </div>

//           {/* Control Icons */}
//           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-8">
//             <Radio className="w-6 h-6 text-gray-400 hover:text-primarycolor transition-colors cursor-pointer" />
//             <Mic2 className="w-6 h-6 text-gray-400 hover:text-primarycolor transition-colors cursor-pointer" />
//             <button
//               onClick={() => setIsPlaying(!isPlaying)}
//               className="w-12 h-12 rounded-full bg-primarycolor flex items-center justify-center hover:bg-opacity-80 transition-colors"
//             >
//               {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
//             </button>
//             <Music className="w-6 h-6 text-gray-400 hover:text-primarycolor transition-colors cursor-pointer" />
//             <Headphones className="w-6 h-6 text-gray-400 hover:text-primarycolor transition-colors cursor-pointer" />
//           </div>
//         </div>

//         {/* Coming Soon Text */}
//         <div className="mt-12 text-center">
//           <h2 className="text-2xl font-semibold text-gray-300">New Beats Dropping Soon</h2>
//           <p className="mt-4 text-gray-400 max-w-md">
//             Get ready for exclusive music content and entertainment updates
//           </p>
//         </div>

//         {/* Circular Beat Rings */}
//         {[...Array(3)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primarycolor opacity-20 animate-ping"
//             style={{
//               width: `${(i + 1) * 200}px`,
//               height: `${(i + 1) * 200}px`,
//               animationDelay: `${i * 0.5}s`,
//               animationDuration: '3s'
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default B2XclusiveAnimation;



// import React, { useEffect, useState } from 'react';
// import { Music, Headphones, Mic2, Radio, Play, Pause } from 'lucide-react';

// const B2XclusiveAnimation = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [activeBeat, setActiveBeat] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveBeat(prev => (prev + 1) % 8);
//     }, 300);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full max-w-xl mx-auto p-6">
//       <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-2xl overflow-hidden shadow-xl">
//         {/* Floating Music Notes */}
//         <div className="absolute inset-0 overflow-hidden">
//           {[...Array(15)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute text-primarycolor opacity-20 animate-float"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 fontSize: `${Math.random() * 12 + 8}px`,
//                 animationDelay: `${Math.random() * 5}s`,
//                 animationDuration: `${Math.random() * 3 + 2}s`
//               }}
//             >
//               {['♪', '♫', '♬'][Math.floor(Math.random() * 3)]}
//             </div>
//           ))}
//         </div>

//         {/* Main Content */}
//         <div className="relative flex flex-col items-center p-6">
//           {/* Brand Logo Animation */}
//           <div className="text-center mb-6">
//             <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primarycolor to-blue-400 animate-pulse">
//               B2
//               <span className="inline-block animate-bounce">X</span>
//               clusive
//             </h1>
//             <div className="mt-2 text-sm text-gray-400">Music & Entertainment</div>
//           </div>

//           {/* Central Animation */}
//           <div className="relative w-full aspect-[16/9] rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-lg">
//             {/* Animated DJ Character */}
//             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//               <div className="relative w-32 h-32">
//                 {/* DJ Head */}
//                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-r from-gray-700 to-gray-800">
//                   <div className="absolute bottom-3 w-full flex justify-center gap-6">
//                     {/* Headphones */}
//                     <div className="w-16 h-2 rounded-full bg-primarycolor absolute -left-2" />
//                     <div className="w-16 h-2 rounded-full bg-primarycolor absolute -right-2" />
//                   </div>
//                 </div>
                
//                 {/* Turntable */}
//                 <div className="absolute top-20 left-1/2 -translate-x-1/2">
//                   <div className={`w-24 h-24 rounded-full border-3 border-primarycolor ${isPlaying ? 'animate-spin' : ''}`}>
//                     <div className="absolute inset-2 rounded-full bg-gray-800">
//                       <div className="absolute inset-3 rounded-full border-2 border-gray-600" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Beat Visualizer */}
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
//               {[...Array(8)].map((_, i) => (
//                 <div
//                   key={i}
//                   className={`w-2 transition-all duration-200 ${
//                     activeBeat === i ? 'bg-primarycolor h-16' : 'bg-gray-600 h-8'
//                   } rounded-full`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="flex gap-6 mt-4">
//             <Radio className="w-5 h-5 text-gray-400 hover:text-primarycolor transition-colors cursor-pointer" />
//             <Mic2 className="w-5 h-5 text-gray-400 hover:text-primarycolor transition-colors cursor-pointer" />
//             <button
//               onClick={() => setIsPlaying(!isPlaying)}
//               className="w-8 h-8 rounded-full bg-primarycolor flex items-center justify-center hover:bg-opacity-80 transition-colors"
//             >
//               {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//             </button>
//             <Music className="w-5 h-5 text-gray-400 hover:text-primarycolor transition-colors cursor-pointer" />
//             <Headphones className="w-5 h-5 text-gray-400 hover:text-primarycolor transition-colors cursor-pointer" />
//           </div>

//           {/* Coming Soon Text */}
//           <div className="mt-4 text-center">
//             <h2 className="text-lg font-semibold text-gray-300">New Beats Dropping Soon</h2>
//             <p className="mt-2 text-sm text-gray-400">
//               Get ready for exclusive content
//             </p>
//           </div>
//         </div>

//         {/* Circular Beat Rings */}
//         {[...Array(2)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primarycolor opacity-20 animate-ping"
//             style={{
//               width: `${(i + 1) * 120}px`,
//               height: `${(i + 1) * 120}px`,
//               animationDelay: `${i * 0.5}s`,
//               animationDuration: '3s'
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default B2XclusiveAnimation;




import React, { useEffect, useState } from "react";
import { Music, Headphones, Mic2, Radio, Play, Pause } from "lucide-react";

const B2XclusiveAnimation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeBeat, setActiveBeat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBeat((prev) => (prev + 1) % 8);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" flex flex-col gap-1 pt-4 ">
      <div className="relative bg-white text-gray-900 rounded-2xl overflow-hidden shadow-xl">
        {/* Floating Music Notes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-primarycolor opacity-10 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 12 + 8}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            >
              {["♪", "♫", "♬"][Math.floor(Math.random() * 3)]}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative flex flex-col items-center p-6">
          {/* Brand Logo Animation */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primarycolor to-blue-400 animate-pulse">
              B2
              <span className="inline-block animate-bounce">X</span>
              clusive
            </h1>
            <div className="mt-2 text-sm text-gray-500">
              Music & Entertainment
            </div>
          </div>

          {/* Central Animation */}
          <div className="relative w-full aspect-[16/9] rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 p-4 shadow-lg">
            {/* Animated DJ Character */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-32 h-32">
                {/* DJ Head */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-r from-gray-300 to-gray-400">
                  <div className="absolute bottom-3 w-full flex justify-center gap-6">
                    {/* Headphones */}
                    <div className="w-16 h-2 rounded-full bg-primarycolor absolute -left-2" />
                    <div className="w-16 h-2 rounded-full bg-primarycolor absolute -right-2" />
                  </div>
                </div>

                {/* Turntable */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2">
                  <div
                    className={`w-24 h-24 rounded-full border-3 border-primarycolor ${
                      isPlaying ? "animate-spin" : ""
                    }`}
                  >
                    <div className="absolute inset-2 rounded-full bg-gray-200">
                      <div className="absolute inset-3 rounded-full border-2 border-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Beat Visualizer */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 transition-all duration-200 ${
                    activeBeat === i
                      ? "bg-primarycolor h-16"
                      : "bg-gray-400 h-8"
                  } rounded-full`}
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-6 mt-4">
            <Radio className="w-5 h-5 text-gray-500 hover:text-primarycolor transition-colors cursor-pointer" />
            <Mic2 className="w-5 h-5 text-gray-500 hover:text-primarycolor transition-colors cursor-pointer" />
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-primarycolor flex items-center justify-center hover:bg-opacity-80 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
            <Music className="w-5 h-5 text-gray-500 hover:text-primarycolor transition-colors cursor-pointer" />
            <Headphones className="w-5 h-5 text-gray-500 hover:text-primarycolor transition-colors cursor-pointer" />
          </div>

          {/* Coming Soon Text */}
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold text-gray-700">
              New Beats Dropping Soon
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Get ready for exclusive content
            </p>
          </div>
        </div>

        {/* Circular Beat Rings */}
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primarycolor opacity-20 animate-ping"
            style={{
              width: `${(i + 1) * 120}px`,
              height: `${(i + 1) * 120}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default B2XclusiveAnimation;
