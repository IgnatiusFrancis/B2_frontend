import CategoriesHeading from "@/components/CategoriesHeading";
import SectionHeader from "@/components/SectionHeader";
import TopMusic from "@/components/TopMusic";
import TopPlaylist from "@/components/TopPlaylist";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSearch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import AllVideos from "@/components/AllVideos";
import HomeRecentPost from "@/components/HomeRecentPost";

function VideosHome() {
  return (
    <>
      <SectionHeader title={"All videos"} desc={"some"} />

      <section className="w-full md:w-5/6 mx-auto py-4">
        <div className="p-6">
          <h1 className={` text-4xl font-bold`}>
            Find the most recent video release
          </h1>
          <p className={``}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum,
            consequatur.
          </p>
        </div>
      </section>

      <section className="w-full md:w-5/6 mx-auto p-4">
        <div className="flex gap-4 w-full">
          <div className=" md:w-4/6 rounded-full flex items-center z-10 border">
            <input
              type="text"
              placeholder="Search here"
              className={`  w-11/12 bg-transparent p-4 text-white outline-none `}
            />
            <button className="rounded-full text-white bg-primarycolor flex items-center md:text-base text-[12px] py-2 gap-1 px-4 mr-2">
              <FaSearch /> Search
            </button>
          </div>

          <div className="w-2/6 p-4 bg-transparent outline-none border rounded-lg">
            <select
              name=""
              id=""
              className="w-full bg-transparent outline-none"
            >
              <option value="">Filter</option>
              <option value="">Realesed Date</option>
              <option value="">Artist</option>
            </select>
          </div>
        </div>
      </section>

      <section className=" md:w-5/6 p-4 md:p-0 mx-auto md:flex md:gap-8">
        <div className=" w-full md:w-4/6">
          <AllVideos />
        </div>

        <div className=" md:w-2/5 pb-8">
          {/* TOP ARTIST SECTION */}
          <CategoriesHeading title={"Top 10 Artist"} />

          <div className="grid grid-cols-2 py-4 md:flex flex-col gap-2">
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
            <TopMusic />
          </div>

          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>

          {/* TOP PLAYLIST SECTION */}
          <CategoriesHeading title={"Top Playlist"} />

          <div className="grid grid-cols-2 py-4 md:flex flex-col gap-2">
            <TopPlaylist />
            <TopPlaylist />
            <TopPlaylist />
            <TopPlaylist />
          </div>

          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>

          {/* GET CONNECTED */}
          <CategoriesHeading title={"Get Connected"} />

          <div className="flex justify-between p-4">
            <FaFacebook className={`text-3xl `} />
            <FaTwitter className={`text-3xl `} />
            <FaLinkedin className={`text-3xl `} />
            <FaYoutube className={`text-3xl `} />
            <FaInstagram className={`text-3xl `} />
            <FaPinterest className={`text-3xl `} />
          </div>

          <div className="my-8 w-full h-[3px] bg-primarycolor"></div>

          {/* Recent post section */}
          <CategoriesHeading title={"Recent Posts"} />

          <div className=" flex flex-col gap-1 pt-4 ">
            <HomeRecentPost />
          </div>
        </div>
      </section>
    </>
  );
}
export default VideosHome;
