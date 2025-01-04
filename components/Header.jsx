"use client";

import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
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
  function menushow() {
    setShowMenu(!showMenu);
  }

  const [showLogin, setShowLogin] = useState(false);

  const { user, signin, profileOptions } = useContext(ThemeContext);

  const navlinks = [
    {
      id: 1,
      nav: "Home",
      link: "/",
    },
    {
      id: 2,
      nav: "Blogs",
      link: "/blogs",
    },
    {
      id: 3,
      nav: "Events",
      link: "/upcomingevents",
    },
    {
      id: 4,
      nav: "Artists",
      link: "/artists",
    },
    {
      id: 5,
      nav: "Musics",
      link: "/musics",
    },

    {
      id: 6,
      nav: "Videos",
      link: "/videoshome",
    },
    {
      id: 7,
      nav: "Movies",
      link: "/movieshome",
    },
    {
      id: 8,
      nav: "About Us",
      link: "/about",
    },
    {
      id: 9,
      nav: "Contact Us",
      link: "/contact",
    },
  ];

  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("b2exclusiveuserid")?.replace(/^"|"$/g, "")
      : null;

  const handleLogout = () => {
    try {
      if (localStorage.getItem("b2xclusiveuser") !== null) {
        localStorage.setItem("b2xclusiveuser", null);
        localStorage.setItem("b2xclusiveuserid", null);
        toast.success(`Logout Successfull`, { position: "top-center" });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.warn(`No user data found`, { position: "top-center" });
      }
    } catch (error) {
      console.log("Error signing out", error.message);
      toast.error(`Unable to logout user`, { position: "top-center" });
    }
  };
  return (
    <>
      {showLogin ? (
        <div className=" bg-[#00000090]  backdrop-blur-sm z-[99] flex items-center fixed left-0 right-0 top-0 bottom-0">
          <div className=" relative w-3/6 mx-auto">
            <MdCancel
              onClick={() => setShowLogin(false)}
              className="absolute right-32 top-10 z-[50] text-2xl cursor-pointer"
            />
            <LoginComponent />
          </div>{" "}
        </div>
      ) : (
        ""
      )}

      <div className={`p-4 relative bg-red `}>
        <div className={`md:w-3/4 mx-auto flex items-center gap-2`}>
          <div className="bg-primarycolor p-2 w-3/12 flex justify-center  ">
            <p className={` text-[10px] text-white`}>Breaking News</p>
          </div>
          <div className="">
            <marquee behavior="" direction="left">
              <div className="flex gap-8">
                <p className="text-sm">
                  {" "}
                  Wike Threatens PDP Govs Supporting Fubara, Vows to Instigate
                  Crises in Their
                </p>
                <p className="text-sm">
                  {" "}
                  Again, police invite NLC president, secretary over terrorism
                  claim
                </p>
                <p className="text-sm">
                  {" "}
                  Female travellers’ tales of sexual assault on Lagos bridges
                </p>
                <p className="text-sm">
                  {" "}
                  Nigeria building collapses: Why Lagos constructions keep
                  crashing down
                </p>
                <p className="text-sm">
                  {" "}
                  Victor Osimhen humiliated by Chelsea transfer snub as Antonio
                  Conte makes brutal decision{" "}
                </p>
              </div>{" "}
            </marquee>
          </div>{" "}
        </div>
      </div>

      <div className="bg-white p-8 relative flex flex-col">
        <div className="w-full md:w-3/4 mx-auto">
          <div className="flex flex-col gap-6 md:flex-row md:gap-0 md:justify-between">
            <div className="flex justify-center items-center gap-3">
              <p
                className={`
                 text-sm font-bold `}
              >
                Follow us
              </p>
              <Link href={"#"} className={`text-sm`}>
                <FaFacebook />
              </Link>
              <Link href={"#"} className={`text-sm`}>
                <FaTwitter />
              </Link>
              <Link href={"#"} className={`text-sm`}>
                <FaLinkedin />
              </Link>
              <Link href={"#"} className={`text-sm`}>
                <FaYoutube />
              </Link>
              <Link href={"#"} className={`text-sm`}>
                <FaSoundcloud />
              </Link>
            </div>
            <div>
              <h1 className={`md:text-3xl font-bold text-center `}>
                B2XCLUSIVE
              </h1>
            </div>
            <div
              className={` flex  justify-between md:items-center gap-3 md:justify-normal `}
            >
              <div className="flex items-center gap-3">
                <Link href={"#"}>
                  <FaBlog />
                </Link>
                {user === null ? (
                  <div
                    onClick={() => setShowLogin(true)}
                    className=" cursor-pointer flex items-center gap-2"
                  >
                    <FaLock className={``} />
                    <p className={`md:text-base text-[11px]`}>Login</p>
                  </div>
                ) : (
                  <div onClick={profileOptions} className="relative z-50">
                    {signin ? (
                      <div className="absolute top-8 bg-white w-full flex border flex-col z-30 ">
                        <Link
                          className="md:text-base p-2 hover:bg-primarycolor hover:text-white text-[11px]"
                          href={`/${userId}`}
                        >
                          Account
                        </Link>
                        <div
                          onClick={handleLogout}
                          className="md:text-base p-2 hover:bg-primarycolor hover:text-white cursor-pointer text-[11px]"
                        >
                          Logout
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <Link href={"#"} className="flex items-center gap-2">
                      <FaUser className={``} />
                      <p className={`md:text-base text-[11px]`}>My Profile</p>
                    </Link>
                  </div>
                )}
              </div>

              <div className="relative">
                <FaHamburger
                  className={`md:hidden w-[40px] h-[40px] p-2 `}
                  onClick={menushow}
                />

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
          </div>

          <div
            className={` z-30 hidden md:flex py-3 px-20 absolute left-0 right-0 -bottom-14 w-3/4 mx-auto justify-between bg-white`}
          >
            {navlinks.map((link) => (
              <Link
                key={link.id}
                className={` text-black text-sm py-1 px-2  hover:bg-primarycolor hover:text-white cursor-pointer`}
                href={link.link}
              >
                {link.nav}
              </Link>
            ))}{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
