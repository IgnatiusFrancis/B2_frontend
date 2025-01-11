import CategoriesHeading from "@/components/CategoriesHeading";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import pld from "@/public/pld.jpeg";
import TopMusic from "@/components/TopMusic";
import { getPost, getTopArtists } from "@/lib/api";
export async function SingleBlog({ params }) {
  const { blogId } = params;

  const [post, topArtists] = await Promise.all([
    getPost(blogId),
    getTopArtists(),
  ]);

  return (
    <>
      <SectionHeader title={post?.title} desc={post?.subtitle} />
      <section className="w-full p-4 md:w-4/5 md:mx-auto flex gap-10">
        <div className="md:w-4/6">
          <div className="flex flex-col gap-2 md:gap-6">
            <div className="py-4 flex flex-col gap-4">
              <h1 className={`text-black text-3xl md:text-5xl font-bold`}>
                {post.title}
              </h1>
              <p className={``}>{post.subtitle}</p>
            </div>
            <div className="flex gap-2">
              <div className="w-[50px] h-[50px] rounded-full">
                <Image
                  src={pld}
                  width={1000}
                  height={1000}
                  alt="alb"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div>
                <h1 className={` font-bold text-lg`}> 
                  {post?.author?.userName}
                </h1>
                <div className="flex gap-4">
                  <p className={``}>{post?.updatedAt.split("T")[0]}</p>
                </div>
              </div>
            </div>
            <div className="w-full h-[300px] md:h-[600px]">
              <Image
                src={post?.url ? post?.url : pld}
                width={2000}
                height={2000}
                alt="alb"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="text-2xl py-6"
              dangerouslySetInnerHTML={{
                __html:
                  post?.description?.split(" ").slice(0, 20).join(" ") + "...",
              }}
            />{" "}
          </div>
        </div>
        <div className="md:w-2/6">
          {/* TOP ARTIST SECTION */}
          <CategoriesHeading title={"Top 10 Artists"} />
          <div className="grid grid-cols-2 py-4 md:flex flex-col gap-2">
            {topArtists?.map((artist, index) => (
              <TopMusic key={artist.id} topArtists={artist} index={index} />
            ))}
          </div>
          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>
          {/* GET CONNECTED */}
          <CategoriesHeading title={"Get Connected"} />
          <div className="flex justify-between p-4">
            <FaFacebook className="text-3xl" />
            <FaTwitter className="text-3xl" />
            <FaLinkedin className="text-3xl" />
            <FaYoutube className="text-3xl" />
            <FaInstagram className="text-3xl" />
            <FaPinterest className="text-3xl" />
          </div>
          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>
        </div>
      </section>
    </>
  );
}

export default SingleBlog;
