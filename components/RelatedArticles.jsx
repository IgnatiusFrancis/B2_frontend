import Image from "next/image";
import pld from "@/public/pld.jpeg";

function RelatedArticles({ title, image, subtitle }) {
  return (
    <>
      <div className="w-full h-[150px] md:h-[300px] relative">
        <Image
          src={image[0]?.url || pld}
          width={1000}
          height={1000}
          alt="blogd"
          className="w-full h-full object-cover"
        />
        <div className="text-white absolute bottom-0 bg-[#000000aa] left-0 p-2 md:p-4">
          <h1 className="font-bold text-sm md:text-2xl text-white ">
            {title?.split(" ").slice(0, 3).join(" ")} .....
          </h1>
          <p className="md:text-base text-[10px]">
            {subtitle?.split(" ").slice(0, 6).join(" ") ||
              "A littlee about the album goes here"}{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default RelatedArticles;
