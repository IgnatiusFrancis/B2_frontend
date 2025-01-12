
"use client";
function B2XLogo () {
  return (
    <div className="w-32 h-32 hover:scale-105 transition-transform duration-300">
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full animate-spin-slow"
        style={{
          animation: 'spin 10s linear infinite'
        }}
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
        
        {/* Inner circle with fill for text background */}
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
          style={{
            fontSize: '52px',
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontWeight: '900',
            letterSpacing: '-2px'
          }}
        >
          B2X
        </text>

        {/* Decorative lines */}
        <path
          d="M 40,100 L 160,100"
          stroke="url(#gradientStroke)"
          strokeWidth="2"
          opacity="0.3"
        />
        <path
          d="M 100,40 L 100,160"
          stroke="url(#gradientStroke)"
          strokeWidth="2"
          opacity="0.3"
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          
          <linearGradient id="gradientFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#DB2777" />
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

export default B2XLogo;