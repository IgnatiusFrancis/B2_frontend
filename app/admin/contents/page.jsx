import { FaBlog, FaComment, FaEye, FaUser } from "react-icons/fa";
import AllArtistOverview from "@/components/AllArtistOverview";
import AllVideosOverview from "@/components/AllVideosOverview";
import AllEventOverview from "@/components/AllEventOverview";
import AllOverviewPost from "@/components/AllOverviewPosts";
import { CiMusicNote1, CiVideoOn } from "react-icons/ci";
import { MdOutlineEmojiEvents } from "react-icons/md";
import AllMusicOverview from "@/components/AllMusicOverview";
function Contents() {
  return (
    <>
      <section className={`w-full md:w-10/12 flex flex-col gap-2  p-4 `}>
        <h1 className={` text-xl `}>Contents</h1>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
            <div className="flex justify-between">
              <h1 className={`text-[10px] md:text-xs`}>Total Blogs</h1>
              <FaBlog className={`text-xs`} />
            </div>

            <div>
              <div className="flex">
                <h1 className={`font-bold text-xl`}>423</h1>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
            <div className="flex justify-between">
              <h1 className={`text-[10px] md:text-xs`}>Total Music</h1>
              <CiMusicNote1 className={`text-xs`} />
            </div>

            <div>
              <div className="flex">
                <h1 className={` font-bold text-xl`}>20</h1>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
            <div className="flex justify-between">
              <h1 className={`text-[10px] md:text-xs`}>Total Videos</h1>
              <CiVideoOn className={`text-xs`} />
            </div>

            <div>
              <div className="flex">
                <h1 className={` font-bold text-xl`}>408</h1>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
            <div className="flex justify-between">
              <h1 className={`text-[10px] md:text-xs`}>Total Events</h1>
              <MdOutlineEmojiEvents className={`text-xs`} />
            </div>

            <div>
              <div className="flex">
                <h1 className={` font-bold text-xl`}>50</h1>
              </div>
            </div>
          </div>

          <div className="p-4 border border-gray-100 flex flex-col justify-between h-[100px] rounded-lg">
            <div className="flex justify-between">
              <h1 className={`text-[10px] md:text-xs`}>Total Artist</h1>
              <FaUser className={`text-xs`} />
            </div>

            <div>
              <div className="flex">
                <h1 className={` font-bold text-xl`}>50</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2 ">
          <div className="w-full md:min-h-72">
            <div className="w-full p-2 flex border border-gray-100 rounded-se rounded-ss">
              <div className="w-6/12">
                <h1 className={` text-xs`}>Blogs</h1>
              </div>
              <div className="w-6/12 flex gap-2">
                <h1 className={` w-1/4 text-xs`}>Views</h1>

                <h1 className={` w-1/4 text-xs`}>Comments</h1>
                <h1 className={` w-1/4 text-xs`}>Date</h1>
                <h1 className={` w-1/4 text-xs`}>Action</h1>
              </div>
            </div>

            {/* <AllOverviewPost /> */}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="w-full p-2  border border-gray-100 rounded-se rounded-ss">
              <div className="w-full flex">
                <div className="w-5/12">
                  <h1 className={` text-xs`}>Music</h1>
                </div>
                <h1 className={` w-2/12 text-xs`}>Duration</h1>
                <h1 className={` w-3/12 text-xs`}>Date</h1>
                <h1 className={` w-2/12 text-xs`}>Action</h1>
              </div>
            </div>
            {/* <AllMusicOverview /> */}
          </div>

          <div>
            <div className="w-full p-2  border border-gray-100 rounded-se rounded-ss">
              <div className="w-full flex">
                <div className="w-5/12">
                  <h1 className={` text-xs`}>Videos</h1>
                </div>
                <h1 className={` w-2/12 text-xs`}>Duration</h1>
                <h1 className={` w-3/12 text-xs`}>Date</h1>
                <h1 className={` w-2/12 text-xs`}>Action</h1>
              </div>
            </div>
            {/* <AllVideosOverview /> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Contents;
