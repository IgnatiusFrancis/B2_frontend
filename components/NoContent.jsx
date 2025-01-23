"use client";

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
