import Image from "next/image";
import pld from "@/public/pld.jpeg";

function ArtistCard({ name, image, bio, createdAt }) {
  return (
    <>
      <div className="border flex justify-between border-gray-100  p-2">
        <div className="flex gap-2 items-center">
          <div className="w-[40px] h-[40px] rounded-full">
            <Image
              src={image ? image.url : pld}
              width={1000}
              height={1000}
              alt="alb"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div>
            <h1 className={` md:text-base text-[12px] `}>{name}</h1>
            <p className="text-green-500 md:text-base text-[12px] ">
              {bio.split(" ").slice(0, 6).join(" ")}
            </p>
          </div>
        </div>

        <p className={`${theme}-text md:text-base text-[12px] `}>
          {createdAt.slice("T")[0]}
        </p>
      </div>
    </>
  );
}

export default ArtistCard;
