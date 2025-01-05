
"use client";

import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import Marquee from "react-fast-marquee";
import {
  FaBlog,
  FaFacebook,
  FaHamburger,
  FaLinkedin,
  FaLock,
  FaSoundcloud,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { toast } from "react-toastify";
import LoginComponent from "./LoginComponent";
import { MdCancel } from "react-icons/md";

function Header() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [userId, setUserId] = useState(null);

  const { user, signin, profileOptions } = useContext(ThemeContext);

  // Fetch userId from localStorage once on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("b2exclusiveuserid")?.replace(/^"|"$/g, "");
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("b2xclusiveuser");
      localStorage.removeItem("b2xclusiveuserid");
      toast.success("Logout Successful", { position: "top-center" });
      router.push("/"); // Redirect instead of reload
    } catch (error) {
      console.error("Error signing out:", error.message);
      toast.error("Unable to logout user", { position: "top-center" });
    }
  };

  const navlinks = useMemo(() => [
    { id: 1, nav: "Home", link: "/" },
    { id: 2, nav: "Blogs", link: "/blogs" },
    { id: 3, nav: "Events", link: "/upcomingevents" },
    { id: 4, nav: "Artists", link: "/artists" },
    { id: 5, nav: "Musics", link: "/musics" },
    { id: 6, nav: "Videos", link: "/videoshome" },
    { id: 7, nav: "Movies", link: "/movieshome" },
    { id: 8, nav: "About Us", link: "/about" },
    { id: 9, nav: "Contact Us", link: "/contact" },
  ], []);

  const breakingNews = useMemo(() => [
    "Wike Threatens PDP Govs Supporting Fubara, Vows to Instigate Crises in Their States",
    "Again, police invite NLC president, secretary over terrorism claim",
    "Female travellers’ tales of sexual assault on Lagos bridges",
    "Nigeria building collapses: Why Lagos constructions keep crashing down",
    "Victor Osimhen humiliated by Chelsea transfer snub as Antonio Conte makes brutal decision",
  ], []);

  return (
    <>
      {/* Login Modal */}
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
      <div className="p-4 relative bg-red">
        <div className="md:w-3/4 mx-auto flex items-center gap-2">
          <div className="bg-primarycolor p-2 w-3/12 flex justify-center">
            <p className="text-[10px] text-white">Breaking News</p>
          </div>
          <div>
            <Marquee pauseOnHover={true}>
              {breakingNews.map((news, idx) => (
                <p key={idx} className="text-sm mx-4">{news}</p>
              ))}
            </Marquee>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white p-8 relative flex flex-col">
        <div className="w-full md:w-3/4 mx-auto">
          <div className="flex flex-col gap-6 md:flex-row md:gap-0 md:justify-between">
            {/* Social Links */}
            <div className="flex justify-center items-center gap-3">
              <p className="text-sm font-bold">Follow us</p>
              <Link href="#"><FaFacebook /></Link>
              <Link href="#"><FaTwitter /></Link>
              <Link href="#"><FaLinkedin /></Link>
              <Link href="#"><FaYoutube /></Link>
              <Link href="#"><FaSoundcloud /></Link>
            </div>

            {/* Logo */}
            <div>
              <h1 className="md:text-3xl font-bold text-center">B2XCLUSIVE</h1>
            </div>

            {/* User Options */}
            <div className="flex items-center gap-3">
              {user ? (
                <div onClick={profileOptions} className="relative z-50">
                  {signin && (
                    <div className="absolute top-8 bg-white w-full border flex flex-col z-30">
                      <Link href={`/${userId}`} className="p-2 hover:bg-primarycolor hover:text-white">Account</Link>
                      <div onClick={handleLogout} className="p-2 hover:bg-primarycolor hover:text-white cursor-pointer">Logout</div>
                    </div>
                  )}
                  <Link href="#" className="flex items-center gap-2">
                    <FaUser />
                    <p>My Profile</p>
                  </Link>
                </div>
              ) : (
                <div onClick={() => setShowLogin(true)} className="cursor-pointer flex items-center gap-2">
                  <FaLock />
                  <p>Login</p>
                </div>
              )}
              <FaHamburger className="md:hidden w-[40px] h-[40px] p-2" onClick={() => setShowMenu(!showMenu)} />

              {showMenu ? (
                  <div
                    className={`bg-white z-50 absolute right-0 flex flex-col  w-[150px] m-2" `}
                  >
                    <div
                      className={`border-b-2  md:text-base text-[11px] p-4  hover:bg-primarycolor`}
                      onClick={() => {
                        router.push("/");
                        setShowMenu(false);
                      }}
                    >
                      Home
                    </div>
                    <div
                      className={` border-b-2  md:text-base text-[11px] p-4  hover:bg-primarycolor`}
                      onClick={() => {
                        router.push("/blogs");
                        setShowMenu(false);
                      }}
                    >
                      Blogs
                    </div>

                    <div
                      className={` border-b-2 md:text-base text-[11px] p-4  hover:bg-primarycolor`}
                      onClick={() => {
                        router.push("/upcomingevents");
                        setShowMenu(false);
                      }}
                    >
                      Event
                    </div>
                    <div
                      className={` border-b-2 md:text-base text-[11px] p-4  hover:bg-primarycolor`}
                      onClick={() => {
                        router.push("/artists");
                        setShowMenu(false);
                      }}
                    >
                      Artists
                    </div>
                    <div
                      className={` border-b-2 md:text-base text-[11px] p-4  hover:bg-primarycolor`}
                      onClick={() => {
                        router.push("/musics");
                        setShowMenu(false);
                      }}
                    >
                      Musics
                    </div>
                    <div
                      className={` border-b-2  md:text-base text-[11px] p-4  hover:bg-primarycolor`}
                      onClick={() => {
                        router.push("/videoshome");
                        setShowMenu(false);
                      }}
                    >
                      Videos
                    </div>
                    <div
                      className={` border-b-2  md:text-base text-[11px] p-4  hover:bg-primarycolor`}
                      onClick={() => {
                        router.push("/movieshome");
                        setShowMenu(false);
                      }}
                    >
                      Movies
                    </div>
                    <div
                      className={` border-b-2  md:text-base text-[11px] p-4  hover:bg-primarycolor`}
                      onClick={() => {
                        router.push("/about");
                        setShowMenu(false);
                      }}
                    >
                      About Us
                    </div>
                    <div
                      className={` border-b-2  md:text-base text-[11px] p-4  hover:bg-primarycolor`}
                      onClick={() => {
                        router.push("/contact");
                        setShowMenu(false);
                      }}
                    >
                      Contact Us
                    </div>
                  </div>
                ) : (
                  ""
                )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div
            className={` z-30 hidden md:flex py-3 px-20 absolute left-0 right-0 -bottom-14 w-3/4 mx-auto justify-between bg-white`}
          >
     
             {navlinks.map(link => (
              <Link
                key={link.id}
                href={link.link}
                prefetch={true}
                className="text-black text-sm py-1 px-2 hover:bg-primarycolor hover:text-white"
              >
                {link.nav}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMenu && (
          <div className="bg-white z-50 absolute right-0 flex flex-col w-[150px] m-2">
            {navlinks.map(link => (
              <div
                key={link.id}
                prefetch={true}
                className="border-b-2 text-sm p-4 hover:bg-primarycolor"
                onClick={() => {
                  router.push(link.link);
                  setShowMenu(false);
                }}
              >
                {link.nav}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Header;


