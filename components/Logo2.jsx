"use client";
import React, { useState } from 'react';
import { Mic } from 'lucide-react';

function B2XMicDropLogo  () {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="w-32 h-32 relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full animate-spin-slow"
      >
        {/* Outer circle */}
        <circle 
          cx="100" 
          cy="100" 
          r="90" 
          fill="none" 
          stroke="url(#gradientStroke)" 
          strokeWidth="6"
          className="animate-pulse"
        />
        
        {/* Inner circle with fill */}
        <circle 
          cx="100" 
          cy="100" 
          r="70" 
          fill="url(#gradientBg)"
          opacity="0.1"
        />

        {/* B2X Text */}
        <text
          x="100"
          y="108"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="url(#gradientFill)"
          className="animate-pulse"
          style={{
            fontSize: '52px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontWeight: '900',
            letterSpacing: '-2px'
          }}
        >
          B2X
        </text>

        {/* Microphone Icon */}
        <g 
          transform="translate(85, 40) scale(0.8)"
          className={`transition-transform duration-1000 ${
            isHovered ? 'translate-y-20' : ''
          }`}
        >
          <path
            d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
            fill="url(#gradientFill)"
            className={`transform origin-bottom transition-transform duration-1000 ${
              isHovered ? 'rotate-45' : ''
            }`}
          />
          <path
            d="M19 10v2a7 7 0 0 1-14 0v-2"
            stroke="url(#gradientFill)"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="12"
            y1="19"
            x2="12"
            y2="23"
            stroke="url(#gradientFill)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          
          <linearGradient id="gradientFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>

          <linearGradient id="gradientBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4B5563" />
            <stop offset="100%" stopColor="#1F2937" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Add to tailwind.config.js:
// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'spin-slow': 'spin 10s linear infinite',
//       },
//     },
//   },
// }

export default B2XMicDropLogo;