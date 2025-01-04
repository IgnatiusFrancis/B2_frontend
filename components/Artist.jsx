import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import pld from "@/public/pld.jpeg";
import { useState } from "react";

function Artist({ id, name, image, bio }) {
  const [showDetails, setShowdetails] = useState(false);
  return (
    <>
      <div
        onMouseOver={() => setShowdetails(true)}
        onMouseLeave={() => setShowdetails(false)}
      >
        <Link
          href={`/artists/${id}`}
          className=" h-[170px] md:h-[300px] relative"
        >
          <Image
            src={image ? image?.url : pld}
            width={1000}
            height={1000}
            alt="artist"
            className="w-full h-full object-cover"
          />
          <div
            className={`${showDetails ? "top-0" : "top-[80%]"} bg-[#3f254c60] flex justify-between items-center p-4 transition transition-all duration-500 absolute left-0 right-0 bottom-0 border-b-2 border-primarycolor`}
          >
            <div>
              <h1 className=" text-white font-bold text-[11px] md:text-lg">
                {name}
              </h1>
              {showDetails ? (
                <p className="text-[11px] text-white transition-all">
                  {bio.split(" ").slice(0, 30).join(" ")}.....
                </p>
              ) : (
                ""
              )}{" "}
            </div>

            <FaPlus className="text-lg md:block hidden text-white" />
          </div>
        </Link>
      </div>{" "}
    </>
  );
}

export default Artist;
