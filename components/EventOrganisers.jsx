import Image from "next/image";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
function EventOrganisers() {
  return (
    <>
      <div className=" h-[150px] md:h-[400px] relative">
        <Image
          src={"/albumcover.jpeg"}
          width={1000}
          height={1000}
          alt="album"
          className="w-ful h-full object-cover"
        ></Image>

        <div className="absolute bottom-0 left-0 right-0 bg-[#0000006d] p-4 ">
          <div className="relative flex justify-center">
            <div className="flex flex-col items-center">
              <h1 className="text-white text-lg font-bold">Sophia </h1>
              <p className="text-white text-sm">Organiser</p>
              <div className="flex text-white gap-4">
                <FaInstagram />
                <FaLinkedin />
                <FaTwitter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventOrganisers;
