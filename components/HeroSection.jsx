// "use client";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import React, { useState } from "react";
// import Slider from "react-slick";
// import Image from "next/image";
// import Link from "next/link";

// function HeroSection({ hero }) {
//   console.log("hero:", hero);
//   var settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     pauseOnHover: true,
//   };

//   const slideshow = [
//     {
//       id: 1,
//       img: "/video.webp",
//       text: "Watch the latest Music Videos",
//       link: "/videoshome",
//       subtext:
//         "We provide you the latest music videos as they come in HD quality. Available to watch and download.",
//     },
//     {
//       id: 2,
//       img: "/music.webp",
//       text: "Catch Up on the Latest Trending Musics",
//       link: "/musics",
//       subtext:
//         "We provide you the latest music videos as they come in HD quality. Available to watch and download.",
//     },
//     {
//       id: 3,
//       img: "/blog.jpeg",
//       text: "Find all the exciting news and gossips here",
//       link: "/blogs",
//       subtext:
//         "We provide you the latest music videos as they come in HD quality. Available to watch and download.",
//     },
//     {
//       id: 4,
//       img: "/event.jpg",
//       text: "Our latest events are ready now",
//       link: "/upcomingevents",
//       subtext:
//         "We provide you the latest music videos as they come in HD quality. Available to watch and download.",
//     },
//   ];

//   return (
//     <div className=" mx-auto overflow-hidden">
//       <div className="slider-container">
//         <Slider {...settings}>
//           {slideshow.map((each) => (
//             <div className="relative" key={each.id}>
//               <div className="bg-black w-full h-[600px] relative">
//                 <Image
//                   src={each.img}
//                   width={1000}
//                   height={1000}
//                   alt="hero"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="bg-gradient-to-t from-black w-full absolute top-0 bottom-0 left-0 right-0"></div>
//               </div>
//               <div className="absolute top-0 bottom-0 right-0 left-0 p-8 flex flex-col gap-4 items-center justify-center">
//                 <h1 className="font-bold text-3xl md:text-5xl text-white uppercase text-center">
//                   {each.text}
//                 </h1>
//                 <p className="text-white text-xl md:w-[50%] w-[90%] mx-auto text-center">
//                   {each.subtext}
//                 </p>
//                 <Link
//                   className="py-2 px-4 text-sm text-primarycolor rounded-full border border-primarycolor"
//                   href={each.link}
//                 >
//                   EXPLORE
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// }

// export default HeroSection;

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
                  className="py-2 px-4 text-sm text-primarycolor rounded-full border border-primarycolor"
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
