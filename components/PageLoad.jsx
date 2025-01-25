"use client";

import { motion } from "framer-motion";

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 opacity-75 rounded-full animate-ping"></div>
          <div className="relative w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="w-16 h-16 text-white"
              animate={{
                rotate: 360,
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <path d="M50 10 L70 50 L50 90 L30 50 Z" fill="currentColor" />
            </motion.svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
