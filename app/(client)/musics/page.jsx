import AllMusic from "@/components/AllMusic";
import SectionHeader from "@/components/SectionHeader";
import { FaSearch } from "react-icons/fa";

function Musics() {
  return (
    <>
      <SectionHeader
        title={"Musics"}
        desc={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates suscipit labore eaque ducimus qui corporis expedita, quis possimus et corrupti."
        }
      />

      <section className="w-full md:w-5/6 mx-auto p-4">
        <div className="flex gap-4 w-full">
          <div className="md:w-4/6 rounded-full flex items-center z-10 border">
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
      <AllMusic />
    </>
  );
}

export default Musics;
