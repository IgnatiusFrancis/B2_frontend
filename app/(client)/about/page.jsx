"use client";

import SectionHeader from "@/components/SectionHeader";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import Image from "next/image";

function About() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <section className={`${theme}-text`}>
        <SectionHeader
          title={"About us"}
          desc={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, id."
          }
        />

        <section className="w-full p-2 md:p-8 md:w-5/6 md:mx-auto md:flex md:items-center md:gap-8">
          <div className="w-full h-[400px] md:w-2/4">
            <Image
              src={"/alb.jpeg"}
              width={1000}
              height={1000}
              alt="abt"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-2/4 flex flex-col gap-4">
            <h1 className={`${theme}-text`}>About us </h1>
            <h1 className={`font-bold ${theme}-text text-4xl`}>
              We Bring you the best content
            </h1>
            <p className={`${theme}-text`}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Aspernatur, eum explicabo sunt laborum quia nostrum facere!
              Ratione et atque ex quam sint debitis beatae, non quasi
              exercitationem ullam eum aperiam molestias, minus quis, aliquam
              rerum! Ut placeat voluptates non magnam?
            </p>
          </div>
        </section>

        <section className="w-full p-2 md:p-8 md:w-5/6 md:mx-auto md:flex md:items-center md:gap-8">
          <div className="w-full md:w-2/4 flex flex-col gap-4">
            <h1 className={`${theme}-text text-4xl font-bold`}>Our Service</h1>
            <div>
              <h1 className={`${theme}-text text-2xl`}> Trending Videos</h1>

              <p className={`${theme}-text`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
                aliquam?
              </p>
            </div>

            <div>
              <h1 className={` ${theme}-text text-2xl`}> Musics</h1>
              <p className={`${theme}-text`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
                aliquam?
              </p>
            </div>

            <div>
              <h1 className={` ${theme}-text text-2xl`}> Blogs</h1>
              <p className={`${theme}-text`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
                aliquam?
              </p>
            </div>

            <div>
              <h1 className={` ${theme}-text text-2xl`}> Events</h1>
              <p className={`${theme}-text`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
                aliquam?
              </p>
            </div>
          </div>
          <div className="w-full md:w-2/4 flex flex-col gap-10">
            <div className="flex gap-20">
              <div className="flex flex-col items-center w-2/4">
                <h1 className={` ${theme}-text font-bold text-4xl`}>20+</h1>
                <p className={`${theme}-text`}>Years in Business</p>
              </div>

              <div className="flex flex-col items-center w-2/4">
                <h1 className={` ${theme}-text font-bold text-4xl`}>5000+</h1>
                <p className={`${theme}-text`}>Music and Video Plays</p>
              </div>
            </div>
            <div className="flex gap-20">
              <div className="flex flex-col items-center w-2/4">
                <h1 className={` ${theme}-text font-bold text-4xl`}>500+</h1>
                <p className={`${theme}-text`}>Satisfied Users</p>
              </div>
              <div className="flex flex-col items-center w-2/4">
                <h1 className={` ${theme}-text font-bold text-4xl`}>21</h1>
                <p className={`${theme}-text`}>Awards</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full p-2 md:p-8 md:w-5/6 md:mx-auto md:flex md:items-center md:gap-8">
          <div className="w-full md:w-2/4">
            <h1 className={` ${theme}-text font-bold text-3xl`}>Our Vision</h1>
            <p className={`${theme}-text`}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
              asperiores repudiandae in dolor consequuntur cum maiores eos,
              corporis officia assumenda perspiciatis, excepturi aliquid ab nam,
              veritatis doloribus ipsa ducimus dicta odio. Iste excepturi odit
              officia alias error deleniti ipsam maxime voluptatibus vero
              possimus provident sint vel sed, aliquam dolorum quo voluptas non
              labore? Magnam modi odio sunt praesentium vel! Ipsum harum odit
              vel illo voluptate nihil sapiente doloribus tenetur! Tempore unde,
              ex commodi veritatis voluptatibus quasi aspernatur nobis facere
              harum praesentium optio doloribus quod molestiae impedit
              consectetur nostrum itaque iusto cum pariatur esse alias dolores
              aperiam? Molestiae harum ut facilis!
            </p>
          </div>
          <div className="w-full md:w-2/4">
            <h1 className={` ${theme}-text font-bold text-3xl`}>Our Mission</h1>
            <p className={`${theme}-text`}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
              asperiores repudiandae in dolor consequuntur cum maiores eos,
              corporis officia assumenda perspiciatis, excepturi aliquid ab nam,
              veritatis doloribus ipsa ducimus dicta odio. Iste excepturi odit
              officia alias error deleniti ipsam maxime voluptatibus vero
              possimus provident sint vel sed, aliquam dolorum quo voluptas non
              labore? Magnam modi odio sunt praesentium vel! Ipsum harum odit
              vel illo voluptate nihil sapiente doloribus tenetur! Tempore unde,
              ex commodi veritatis voluptatibus quasi aspernatur nobis facere
              harum praesentium optio doloribus quod molestiae impedit
              consectetur nostrum itaque iusto cum pariatur esse alias dolores
              aperiam? Molestiae harum ut facilis!
            </p>
          </div>
        </section>
      </section>
    </>
  );
}

export default About;
