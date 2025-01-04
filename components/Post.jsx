import Image from "next/image";

function Post({ image, title, subtitle, createdAt, views }) {
  return (
    <>
      <div className="border flex items-center justify-between border-gray-100  p-2">
        <div className="flex gap-2 w-3/5 items-center">
          <div className="w-[30px] h-[30px] rounded-full">
            <Image
              src={image[0]?.url}
              width={1000}
              height={1000}
              alt="alb"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div>
            <h1 className={`md:text-xs text-[12px] `}>
              {title?.split(" ").slice(0, 5).join(" ")}....
            </h1>
            <p className="text-green-500 md:text-xs text-[11px] ">
              {subtitle?.split(" ").slice(0, 7).join(" ")}....
            </p>
          </div>
        </div>

        <div className="flex w-2/5 gap-4">
          <h1 className={` md:text-xs w-1/2 text-[12px] `}>{views.length}</h1>
          <h1 className={`md:text-xs w-1/2 text-[12px]`}>
            {createdAt?.split("T")[0]}
          </h1>
        </div>
      </div>
    </>
  );
}

export default Post;
