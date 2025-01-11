"use client";
import CategoriesHeading from "@/components/CategoriesHeading";
import Comments from "@/components/Comments";
import RecentPost from "@/components/RecentPost";
import TicketOrder from "@/components/TicketOrder";
import TopMusic from "@/components/TopMusic";
import TopPlaylist from "@/components/TopPlaylist"; 

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import img1 from "@/public/alb.jpeg";

import {
  FaClock,
  FaComment,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSoundcloud,
  FaTwitter,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/Button";
import pld from "@/public/pld.jpeg";
import { useContext, useEffect, useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { ThemeContext } from "@/context/ThemeContext";
function SingleEventPage({ params }) {
  const { user } = useContext(ThemeContext);
  const { eventId } = params;
  const [event, setEvent] = useState([]);
  const [showComment, setShowComment] = useState(false);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `https://b2xclusive.onrender.com/api/v1/event/${eventId}`,
        );

        setEvent(response?.data);
        const eventDate = new Date(response?.data?.data?.date); // Set your event date here
        const currentTime = new Date();
        const timeDiff = eventDate - currentTime;

        if (timeDiff > 0) {
          const totalSeconds = Math.floor(timeDiff / 1000);

          const days = Math.floor(totalSeconds / (3600 * 24));
          const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = Math.floor(totalSeconds % 60);

          setCountdown({ days, hours, minutes, seconds });

          const timer = setInterval(() => {
            const newTimeDiff = eventDate - new Date();
            if (newTimeDiff > 0) {
              const newTotalSeconds = Math.floor(newTimeDiff / 1000);

              const newDays = Math.floor(newTotalSeconds / (3600 * 24));
              const newHours = Math.floor(
                (newTotalSeconds % (3600 * 24)) / 3600,
              );
              const newMinutes = Math.floor((newTotalSeconds % 3600) / 60);
              const newSeconds = Math.floor(newTotalSeconds % 60);

              setCountdown({
                days: newDays,
                hours: newHours,
                minutes: newMinutes,
                seconds: newSeconds,
              });
            } else {
              clearInterval(timer);
            }
          }, 1000);
        }
      } catch (error) {
        console.error("Failed to fetch event", error.message);
        // Handle error
      }
    };
    fetchdata();
  }, [eventId]);

  if (!event) {
    return (
      <div className="w-full flex justify-center mt-20 ">
        <VscLoading className="text-4xl animate-spin" />
      </div>
    ); // Add a loading state if blog is null
  }

  return (
    <>
      <SectionHeader title={event?.data?.title} desc={"event"} />

      <section className="w-full md:w-5/6 mx-auto md:flex md:gap-8 p-4">
        <div className="w-full md:w-4/6">
          <div className="relative mt-4">
            <Image
              src={event?.data?.image[0]?.url || pld}
              width={1000}
              height={1000}
              alt="conf"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center p-4 md:p-44">
              <div className="flex flex-col items-center">
                <h1 className={` text-4xl font-bold`}>{countdown.days}</h1>
                <p className={``}>Days</p>
              </div>

              <p className={``}>:</p>

              <div className="flex flex-col items-center">
                <h1 className={` text-4xl font-bold`}>{countdown.hours}</h1>
                <p className={``}>Hours</p>
              </div>

              <p className={``}>:</p>

              <div className="flex flex-col items-center">
                <h1 className={` text-4xl font-bold`}>{countdown.minutes}</h1>
                <p className={``}>Minutes</p>
              </div>

              <p className={``}>:</p>
              <div className="flex flex-col items-center">
                <h1 className={` text-4xl font-bold`}>{countdown.seconds}</h1>
                <p className={``}>Seconds</p>
              </div>
            </div>
          </div>
          <div className="w-full  mx-auto flex flex-col gap-4 items-center p-4">
            <CategoriesHeading title={"Upcoming Events"} />

            <div
              className={`hidden md:flex md:justify-center gap-8 items-center p-4  rounded-lg `}
            >
              <div className="flex gap-2">
                <Link href={"#"} className={` text-sm `}>
                  <FaFacebook />
                </Link>
                <Link href={"#"} className={` text-sm `}>
                  <FaTwitter />
                </Link>
                <Link href={"#"} className={` text-sm $`}>
                  <FaLinkedin />
                </Link>
                <Link href={"#"} className={` text-sm `}>
                  <FaYoutube />
                </Link>
                <Link href={"#"} className={` text-sm `}>
                  <FaSoundcloud />
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <FaUser className={` text-sm `} />
                <p className={``}>{event?.data?.organisers[0]?.name}</p>
              </div>

              <div className="flex items-center gap-1">
                <FaComment className={` text-sm `} />
                <p className={``}>44 Commnents</p>
              </div>

              <div className="flex items-center gap-1">
                <FaClock className={` text-sm `} />
                <p className={``}>{event?.data?.date.split("T")[0]}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-8 p-4">
            <div className="w-full h-[300px]">
              <Image
                src={event?.data?.image[0]?.url || pld}
                height={1000}
                width={1000}
                alt="img"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-[300px]">
              <Image
                src={event?.data?.image[0]?.url || pld}
                height={1000}
                width={1000}
                alt="img"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: event?.data?.description }} />{" "}
          <Button title={"View Event"} />
          <div className="w-full h-[500px] py-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d126844.06348606381!2d3.3488896!3d6.537216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1710857933472!5m2!1sen!2sng"
              width="1000"
              height="1000"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover"
            ></iframe>
          </div>
          <div className="relative h-[200px] my-4">
            <Image
              src={img1}
              width={1000}
              height={1000}
              alt="conf"
              className="w-full h-full object-cover opacity-5"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between items-center p-20">
              <div className="flex flex-col items-center">
                <h1 className={` text-4xl font-bold`}>{countdown.days}</h1>
                <p className={``}>Days</p>
              </div>

              <p className={``}>:</p>

              <div className="flex flex-col items-center">
                <h1 className={` text-4xl font-bold`}>{countdown.hours}</h1>
                <p className={``}>Hours</p>
              </div>

              <p className={``}>:</p>

              <div className="flex flex-col items-center">
                <h1 className={` text-4xl font-bold`}>{countdown.minutes}</h1>
                <p className={``}>Minutes</p>
              </div>

              <p className={``}>:</p>
              <div className="flex flex-col items-center">
                <h1 className={` text-4xl font-bold`}>{countdown.seconds}</h1>
                <p className={``}>Seconds</p>
              </div>
            </div>
          </div>
          <CategoriesHeading title={"Organisers of this event"} />
          <div className="grid grid-cols-3 gap-8 my-4">
            <div className=" h-[150px] md:h-[400px] relative">
              <Image
                src={event?.data?.organisers[0]?.url || pld}
                width={1000}
                height={1000}
                alt="album"
                className="w-ful h-full object-cover"
              ></Image>

              <div className="absolute bottom-0 left-0 right-0 bg-[#0000006d] p-4 ">
                <div className="relative flex justify-center">
                  <div className="flex flex-col items-center">
                    <h1 className="text-white text-lg font-bold">
                      {event?.data?.organisers[0]?.name}{" "}
                    </h1>
                    <p className="text-white text-sm">Organiser</p>
                    <div className="flex text-white gap-4">
                      <FaInstagram />
                      <FaLinkedin />
                      <FaTwitter />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CategoriesHeading title={"Comments"} />
          <div className={`p-4 flex gap-4 `}>
            <div className="w-[200px]  md:w-[50px] h-[50px]">
              <Image
                src={"/alb.jpeg"}
                width={1000}
                height={1000}
                alt="alb"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <h1 className={`font-bold text-md md:text-base text-[12px] `}>
                  Brain Deo
                </h1>
                <p className={` md:text-base text-[10px]`}>15-10-2024</p>
              </div>
              <p className={`md:text-base text-[10px] `}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
                cumque voluptates aperiam tempora nostrum adipisci voluptatem
                numquam dolorem a quisquam?
              </p>
              <div
                onClick={() => setShowComment(true)}
                className="text-primarycolor md:text-base text-[10px]"
              >
                Reply
              </div>

              <div className={`p-4 flex gap-4 `}>
                <div className="w-[200px]  md:w-[50px] h-[50px]">
                  <Image
                    src={"/alb.jpeg"}
                    width={1000}
                    height={1000}
                    alt="alb"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <h1
                      className={`font-bold text-md md:text-base text-[12px] `}
                    >
                      Brain Deo
                    </h1>
                    <p className={`md:text-base text-[10px]`}>15-10-2024</p>
                  </div>
                  <p className={`md:text-base text-[10px] `}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Illo cumque voluptates aperiam tempora nostrum adipisci
                    voluptatem numquam dolorem a quisquam?
                  </p>
                </div>
              </div>
            </div>
          </div>
          {showComment ? (
            user === null ? (
              <Link href={"/login"}>Please login to drop a comment</Link>
            ) : (
              <form className="p-4">
                <textarea
                  name=""
                  id=""
                  cols="10"
                  rows="10"
                  className={`  w-full h-[100px] border my-2 p-4 bg-white`}
                  placeholder="Type your comments"
                ></textarea>

                <Button title={"Send Comments"} />
              </form>
            )
          ) : (
            ""
          )}{" "}
        </div>

        <div className="w-full md:w-2/6">
          <CategoriesHeading title={"Get Connected"} />

          <div className="flex justify-between p-4">
            <FaFacebook className={`  text-3xl `} />
            <FaTwitter className={`  text-3xl `} />
            <FaLinkedin className={`  text-3xl `} />
            <FaYoutube className={`  text-3xl `} />
            <FaInstagram className={`  text-3xl `} />
            <FaPinterest className={` text-3xl `} />
          </div>

          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>

          <div className={` my-8 `}>
            <div className="p-10 flex flex-col justify-center items-center">
              <div className="w-[50px] h-[50px]">
                <Image
                  src={img1}
                  width={1000}
                  height={1000}
                  alt="p"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className={``}>{event?.data?.organisers[0]?.name}</h1>
              <p className={``}>Organizer</p>
            </div>
            <div className="flex justify-center gap-4">
              <div className="flex flex-col items-center p-4">
                <p className={``}>779</p>
                <p className={``}>concerts</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <p className={``}>779</p>
                <p className={``}>concerts</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <p className={``}>779</p>
                <p className={``}>concerts</p>
              </div>
            </div>

            <button className="w-full py-4 px-8 bg-primarycolor text-white">
              View Comments
            </button>
          </div>

          {/* TOP ARTIST SECTION */}
          <CategoriesHeading title={"Top 10 Artists"} />

          {/* <div className="grid grid-cols-3 md:flex md:flex-col gap-2">
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
          </div> */}

          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>

          {/* TOP PLAYLIST SECTION */}
          <CategoriesHeading title={"Top Playlist"} />

          <div className=" grid grid-cols-2 md:flex md:flex-col gap-2">
            <TopPlaylist />
            <TopPlaylist />
            <TopPlaylist />
            <TopPlaylist />
          </div>

          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>

          {/* Recent post section */}
          <CategoriesHeading title={"Recent Post"} />

          <div className=" flex flex-col gap-1 pt-4 ">
            <RecentPost />
            <RecentPost />
            <RecentPost />
          </div>
        </div>
      </section>
    </>
  );
}

export default SingleEventPage;
