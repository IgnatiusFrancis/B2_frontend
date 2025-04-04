import CategoriesHeading from "@/components/CategoriesHeading";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import pld from "@/public/pld.jpeg";
import TopMusic from "@/components/TopMusic";
import { getPost, getTopArtists } from "@/lib/api";
import Link from "next/link";

export default async function SingleBlog({ params }) {
  const { blogId } = params;

  const [post, topArtists] = await Promise.all([
    getPost(blogId),
    getTopArtists(),
  ]);

  return (
    <>
      {/* Section Header */}
      <SectionHeader
        title={post?.title}
        desc={post?.subtitle}
        bgWallpaper="/blogWallpaper.jpeg"
      />

      {/* Blog Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black">
        <section className="w-full max-w-[1400px] mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Blog Content Card */}
            <article className="bg-gray-800/50 rounded-xl shadow-lg p-6 space-y-8 transition-transform hover:scale-[1.02]">
              {/* Blog Title */}
              <header>
                <h1 className="text-4xl font-extrabold text-gray-200 hover:text-primarycolor transition-all">
                  {post?.title}
                </h1>
                <p className="text-lg text-gray-600 mt-2">{post?.subtitle}</p>
              </header>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <Image
                  src={pld}
                  width={48}
                  height={48}
                  alt="author"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-200">
                    {post?.author?.userName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(post?.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Blog Image */}
              <div className="w-full h-80 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={post?.url || pld}
                  width={2000}
                  height={2000}
                  alt="blog"
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>

              {/* Blog Description */}
              <div
                className="text-gray-200 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: post?.description || "No content available.",
                }}
              />
            </article>
          </div>

          {/* Sidebar */}
          <aside className="md:w-1/3 space-y-10 sticky top-16 h-full">
            {/* Top Artists */}
            <div className="bg-gray-800/50 rounded-xl shadow-lg p-6">
              <CategoriesHeading title="Top 5 Artists" />
              <div className="grid grid-cols-1 gap-4 mt-6">
                {topArtists?.map((artist, index) => (
                  <TopMusic key={artist.id} topArtists={artist} index={index} />
                ))}
              </div>
            </div>

            {/* Get Connected */}
            <div className="bg-gray-800/50 rounded-xl shadow-lg p-6">
              <CategoriesHeading title="Get Connected" />
              <div className="flex justify-around mt-4 text-gray-200 text-3xl">
                <Link
                  href={
                    "https://www.facebook.com/share/1RNuYmnfbq/?mibextid=wwXIfr"
                  }
                  className="hover:text-primarycolor"
                >
                  <FaFacebook />
                </Link>
                <Link
                  href={"https://wa.me/message/DTRMTVSWSEOAP1"}
                  className="hover:text-primarycolor"
                >
                  <FaWhatsapp />
                </Link>
                <Link
                  href={
                    "https://www.instagram.com/b2xclusive?igsh=ZG01eTAxZ2cxaG5p"
                  }
                  className="hover:text-primarycolor"
                >
                  <FaInstagram />
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </>
  );
}
