"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";

function HeroSection({ hero = [] }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="mx-auto overflow-hidden">
      <div className="slider-container">
        <Slider {...settings}>
          {hero.map((each, index) => (
            <div className="relative" key={each.slug || index}>
              <div className="bg-black w-full h-[600px] relative">
                <Image
                  src={each.img || "/video.webp"}
                  width={1000}
                  height={1000}
                  alt="hero"
                  className="w-full h-full object-cover"
                />
                <div className="bg-gradient-to-t from-black w-full absolute top-0 bottom-0 left-0 right-0"></div>
              </div>
              <div className="absolute top-0 bottom-0 right-0 left-0 p-8 flex flex-col gap-4 items-center justify-center">
                <h1 className="font-bold text-3xl md:text-5xl text-white uppercase text-center">
                  {each.text || "Watch the latest Music Videos"}
                </h1>
                <p className="text-white text-xl md:w-[50%] w-[90%] mx-auto text-center">
                  {each.subtext ||
                    "We provide you the latest music videos as they come in HD quality. Available to watch and download."}
                </p>
                <Link
                  className="py-2 px-4 text-sm text-gray-200 rounded-full border border-primarycolor"
                  href={each.link || "/videoshome"}
                >
                  EXPLORE
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default HeroSection;
