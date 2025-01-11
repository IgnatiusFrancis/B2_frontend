



"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaSoundcloud, 
         FaClock, FaInstagram, FaPinterest, FaMapMarkerAlt, 
         FaCalendarAlt, FaTicketAlt } from "react-icons/fa";
import imgPlaceholder from "@/public/pld.jpeg";
import CategoriesHeading from "./CategoriesHeading";
import TopMusic from "./TopMusic";

const SingleEventClient = ({ event, topArtists }) => {
  const [countdown, setCountdown] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    if (event?.date) {
      const updateCountdown = () => {
        const timeDiff = new Date(event.date) - new Date();
        if (timeDiff > 0) {
          setCountdown({
            days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((timeDiff % (1000 * 60)) / 1000)
          });
        }
      };
      updateCountdown();
      const timer = setInterval(updateCountdown, 1000);
      return () => clearInterval(timer);
    }
  }, [event]);

  const socialIcons = [
    { Icon: FaFacebook, color: "#1877F2" },
    { Icon: FaTwitter, color: "#1DA1F2" },
    { Icon: FaInstagram, color: "#E4405F" },
    { Icon: FaLinkedin, color: "#0A66C2" },
    { Icon: FaYoutube, color: "#FF0000" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[60vh] overflow-hidden"
      >
        <Image
          src={event?.url || imgPlaceholder}
          alt={event?.title}
          fill
          className="object-cover brightness-50 transform hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
>
  {event?.title}
</motion.h1>

          
          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-4 md:gap-8 p-6 bg-black/20 backdrop-blur-md rounded-xl">
            {Object.entries(countdown).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center"
              >
                <span className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                  {value}
                </span>
                <span className="text-sm md:text-base font-medium uppercase tracking-wider">
                  {key}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="md:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl p-6 space-y-6"
            >
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-500" />
                  <span>{new Date(event?.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>{event?.location}</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: event?.description }}
                  className="text-gray-700 leading-relaxed"
                />
              </div>

              <motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
>
  <FaCalendarAlt className="inline-block mr-2" />
  Add to Calendar
</motion.button>
<div className="p-4 bg-gray-50 rounded-xl shadow-lg text-center">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Don't Miss Out!</h3>
  <p className="text-gray-600">Join us for an unforgettable experience in {event?.location}.</p>
</div>

<div className="p-4 bg-gray-50 rounded-xl shadow-lg">
  <h3 className="text-lg font-semibold text-gray-700">Frequently Asked Questions</h3>
  <div className="space-y-2 text-gray-600">
    <p><strong>Q: What is the dress code?</strong> Casual.</p>
    <p><strong>Q: Can I bring guests?</strong> Yes, up to two guests per ticket.</p>
    <p><strong>Q: Are refunds available?</strong> No, all sales are final.</p>
  </div>
</div>
<div className="p-4 bg-gray-50 rounded-xl shadow-lg">
  <h3 className="text-lg font-semibold text-gray-700">Share this Event</h3>
  <div className="flex gap-4 mt-2">
    {socialIcons.map(({ Icon, color }, i) => (
      <a
        key={i}
        href="#"
        className="p-3 rounded-full"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="text-2xl" style={{ color }} />
      </a>
    ))}
  </div>
</div>
<div className="p-4 bg-gray-50 rounded-xl shadow-lg space-y-4">
  <h3 className="text-lg font-semibold text-gray-700">Event Highlights</h3>
  <ul className="list-disc list-inside space-y-2 text-gray-600">
    <li>Live performances by top artists</li>
    <li>Interactive workshops and sessions</li>
    <li>Exclusive meet-and-greet opportunities</li>
    <li>Food and beverage stalls</li>
  </ul>
</div>
<div className="p-4 bg-gray-50 rounded-xl shadow-lg">
  <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Organizer</h3>
  <p className="text-gray-600">
    <FaMapMarkerAlt className="inline-block mr-2 text-red-500" />
    {event?.location || "Location details not available"}
  </p>
  <p className="text-gray-600">
    <FaClock className="inline-block mr-2 text-purple-500" />
    {new Date(event?.date).toLocaleString()}
  </p>
  <a
    href="mailto:organizer@example.com"
    className="text-purple-600 hover:underline"
  >
    organizer@example.com
  </a>
</div>

            </motion.div>

            {/* Event Gallery */}
            <div className="grid grid-cols-2 gap-4">
              {[event?.url, event?.url].map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="relative h-64 overflow-hidden rounded-xl shadow-lg"
                >
                  <Image
                    src={img || imgPlaceholder}
                    alt={`Event image ${i + 1}`}
                    fill
                    className="object-cover hover:brightness-110 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
        {/* Sidebar */}
        <aside className="space-y-8">
        <div className="">
          <CategoriesHeading title="Top 10 Artists" />
          <div className="flex flex-col gap-4">
            {topArtists?.map((artist, index) => (
              <TopMusic key={artist.id} topArtists={artist} index={index} />
            ))}
          </div>

          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>
          <CategoriesHeading title="Get Connected" />
          <div className="flex justify-between p-4">
            <FaFacebook className="text-3xl" />
            <FaTwitter className="text-3xl" />
            <FaLinkedin className="text-3xl" />
            <FaYoutube className="text-3xl" />
            <FaInstagram className="text-3xl" />
            <FaPinterest className="text-3xl" />
          </div>
        </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SingleEventClient;