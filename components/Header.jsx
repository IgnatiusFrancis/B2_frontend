"use client";

import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import Marquee from "react-fast-marquee";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaSoundcloud,
  FaUser,
  FaLock,
} from "react-icons/fa";
import { RiMenu4Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import LoginComponent from "./LoginComponent";
import { MdCancel } from "react-icons/md";
import B2XMicDropLogo from "./Logo2";
import axios from "axios";

const B2XLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="md:w-20 md:h-20 w-10 h-10 relative cursor-pointer transition-transform duration-300 hover:scale-105"
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
            fontSize: "52px",
            fontFamily: "Arial Black, Arial, sans-serif",
            fontWeight: "900",
            letterSpacing: "-2px",
          }}
        >
          B2
        </text>

        <g
          transform="translate(85, 40) scale(0.8)"
          className={`transition-transform duration-1000 ${
            isHovered ? "translate-y-20" : ""
          }`}
        >
          <path
            d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"
            fill="url(#gradientFill)"
            className={`transform origin-bottom transition-transform duration-1000 ${
              isHovered ? "rotate-45" : ""
            }`}
          />
        </g>

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
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#F472B6" />
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

function Header() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userId] = useState(null);
  const { user, signin, profileOptions, setUser } = useContext(ThemeContext);
  const baseUrl =
    process.env.B2XCLUSIVE_APP_BASE_URL ||
    "https://xclusive.onrender.com/api/v1";

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/auth/user/me`, {
          withCredentials: true,
        });

        if (response.data) {
          setUser(response.data.data.user.userName);
        }
      } catch (error) {
        //console.error("Error fetching user data:", error);
        setUser(null);
      }
    };

    // Call initializeUser only if the user is not already logged in
    if (!user) {
      initializeUser();
    }
  }, [baseUrl, setUser, user]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${baseUrl}/auth/user/logout`,
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("userName");
      setUser(null);

      window.location.href = "/";

      toast.success("Logout Successful", { position: "top-center" });
    } catch (error) {
      console.error("Error signing out:", error.message);
      toast.error("Unable to logout user", { position: "top-center" });
    }
  };

  const navlinks = useMemo(
    () => [
      { id: 1, nav: "Home", link: "/" },
      { id: 2, nav: "Blogs", link: "/blogs" },
      { id: 3, nav: "Events", link: "/upcomingevents" },
      { id: 4, nav: "Artists", link: "/artists" },
      { id: 5, nav: "Musics", link: "/musics" },
      { id: 6, nav: "Videos", link: "/videoshome" },
      { id: 7, nav: "Movies", link: "/movieshome" },
      { id: 8, nav: "About Us", link: "/about" },
      { id: 9, nav: "Contact Us", link: "/contact" },
    ],
    []
  );

  const breakingNews = useMemo(
    () => [
      "Welcome to B2xclusive..",
      "Again, police invite NLC president...",
      "Female travellers' tales of sexual assault...",
      "Why Lagos constructions keep crashing...",
      "Victor Osimhen humiliated by Chelsea transfer...",
    ],
    []
  );

  return (
    <>
      {showLogin && (
        <div className="bg-[#00000090] backdrop-blur-sm z-[99] flex items-center fixed left-0 right-0 top-0 bottom-0">
          <div className="relative w-3/6 mx-auto">
            <MdCancel
              onClick={() => setShowLogin(false)}
              className="absolute right-32 top-10 z-[50] text-2xl cursor-pointer"
            />
            <LoginComponent />
          </div>
        </div>
      )}

      {/* Breaking News Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 overflow-hidden">
        <div className="md:w-3/4 w-full mx-auto flex items-center gap-2 p-3">
          <div className="bg-white/20 backdrop-blur-sm p-2 md:w-3/12 w-full flex justify-center rounded-full">
            <p className="text-[10px] text-white font-bold uppercase animate-pulse">
              Breaking News
            </p>
          </div>
          <div className="flex-1">
            <Marquee pauseOnHover={true} speed={50}>
              {breakingNews.map((news, idx) => (
                <p key={idx} className="text-sm text-white font-medium">
                  {news}
                </p>
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white shadow-sm">
        <div className="w-full md:w-3/4 mx-auto p-4">
          <div className="flex flex-col gap-6 md:flex-row md:gap-0 md:justify-between items-center">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <p className="text-sm font-bold text-gray-600">Follow us</p>
              <div className="flex gap-3">
                {[
                  { icon: FaFacebook, color: "text-blue-600" },
                  { icon: FaTwitter, color: "text-blue-400" },
                  { icon: FaLinkedin, color: "text-blue-700" },
                  { icon: FaYoutube, color: "text-red-600" },
                  { icon: FaSoundcloud, color: "text-orange-500" },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href="#"
                    className={`${social.color} hover:scale-125 transition-transform duration-300`}
                  >
                    <social.icon />
                  </Link>
                ))}
              </div>
            </div>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <B2XLogo />
              {/* <B2XMicDropLogo /> */}
              <h1 className="md:text-4xl text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                XCLUSIVE
              </h1>
            </div>

            {/* User Options */}
            <div className="flex items-center gap-4">
              {user ? (
                <div onClick={profileOptions} className="relative">
                  {signin && (
                    <div className="absolute top-8 right-0 bg-white w-48 border flex flex-col z-30 shadow-lg rounded-lg overflow-hidden">
                      {/* <Link
                        href={`/${userId}`}
                        className="p-3 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white transition-colors duration-300"
                      >
                        Account
                      </Link> */}
                      <div
                        onClick={handleLogout}
                        className="p-3 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white transition-colors duration-300 cursor-pointer"
                      >
                        Logout
                      </div>
                    </div>
                  )}
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg transition-shadow duration-300">
                    <FaUser />
                    <p>My Profile</p>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg transition-shadow duration-300"
                >
                  <FaLock />
                  <p>Login</p>
                </button>
              )}
              <RiMenu4Fill
                className="md:hidden w-10 h-10 p-2 text-gray-600 hover:text-purple-600 transition-colors duration-300"
                onClick={() => setShowMenu(!showMenu)}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex md:flex-wrap mt-6 p-4 justify-center bg-white rounded-lg shadow-md">
            {navlinks.map((link) => (
              <Link
                key={link.id}
                href={link.link}
                className="text-gray-600 text-sm font-medium py-2 px-4 rounded-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-300"
              >
                {link.nav}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white w-64 h-full p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <B2XLogo />
              <MdCancel
                onClick={() => setShowMenu(false)}
                className="text-2xl cursor-pointer"
              />
            </div>
            {navlinks.map((link) => (
              <Link
                key={link.id}
                href={link.link}
                className="text-gray-600 hover:text-purple-600 transition-colors duration-300"
                onClick={() => setShowMenu(false)}
              >
                {link.nav}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
