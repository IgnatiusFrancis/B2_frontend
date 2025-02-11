"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { usePathname } from "next/navigation";

const B2XLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="md:w-16 md:h-16 w-14 h-14 relative cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="url(#gradientStroke)"
          strokeWidth="6"
          className="animate-pulse"
        />
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="url(#gradientBg)"
          opacity="0.1"
        />
        <text
          x="100"
          y="108"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="url(#gradientFill)"
          style={{
            fontSize: "75px",
            fontFamily: "Arial Black, Arial, sans-serif",
            fontWeight: "900",
            letterSpacing: "-2px",
            // Increased text opacity and brightness
            fillOpacity: "0.9",
          }}
        >
          B2
        </text>
        <defs>
          <linearGradient
            id="gradientStroke"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="gradientFill">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F0F0FF" />
            <stop offset="100%" stopColor="#E6E6FA" />
          </linearGradient>
          <linearGradient id="gradientBg">
            <stop offset="0%" stopColor="#4B5563" />
            <stop offset="100%" stopColor="#1F2937" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

function StickyHeader({ breakingNews }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navlinks = [
    { id: 1, nav: "Home", link: "/" },
    { id: 2, nav: "Blogs", link: "/blogs" },
    { id: 3, nav: "Events", link: "/upcomingevents" },
    { id: 4, nav: "Artists", link: "/artists" },
    { id: 5, nav: "Musics", link: "/musics" },
    { id: 6, nav: "Videos", link: "/videoshome" },
    { id: 7, nav: "Movies", link: "/movieshome" },
    { id: 8, nav: "About Us", link: "/about" },
    { id: 9, nav: "Contact Us", link: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Breaking News Section with Logo */}
      <div
        className={`
          bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 
          overflow-hidden 
          transition-all duration-300
          ${scrolled ? "opacity-0 h-0" : "opacity-100 h-auto"}
        `}
      >
        <div className="md:w-3/4 w-full mx-auto flex items-center gap-4 p-3">
          <div className="flex items-center gap-2">
            <B2XLogo />
            <h1 className="md:text-3xl text-xl font-black text-white">
              TRENDS
            </h1>
          </div>
          <div className="flex-1">
            <Marquee pauseOnHover={true} speed={50}>
              {breakingNews?.map((news, idx) => (
                <p key={idx} className="text-sm text-white font-medium p-2">
                  {news.title}
                </p>
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      {/* Header Section with Sticky Navigation */}
      <div
        className={`
          bg-white/90 backdrop-blur-md shadow-md 
          transition-all duration-300 
          ${scrolled ? "sticky top-0" : ""}
        `}
      >
        <div className="w-full md:w-3/4 mx-auto p-4">
          {/* Navigation */}
          {/* <nav className="flex flex-wrap mt-6 p-4 md:justify-between justify-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-md">
            {navlinks.map((link) => (
              <Link
                key={link.id}
                href={link.link}
                className="text-gray-300 text-sm font-medium py-2 px-4 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white"
              >
                {link.nav}
              </Link>
            ))}
          </nav> */}

          {/* Navigation */}
          <nav className="flex flex-wrap mt-6 p-4 md:justify-between justify-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-md">
            {navlinks.map((link) => (
              <Link
                key={link.id}
                href={link.link}
                className={`
            text-gray-300 
            text-sm 
            font-medium 
            py-2 
            px-4 
            rounded-full 
            transition-all 
            duration-300
            ${
              pathname === link.link ||
              (pathname === "/" && link.nav === "Home")
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                : "hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white"
            }
          `}
              >
                {link.nav}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default StickyHeader;
