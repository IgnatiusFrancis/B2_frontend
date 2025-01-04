import Image from "next/image";
function AlbumCover() {
  return (
    <>
      <div className=" h-[250px] md:h-[400px] relative">
        <Image
          src={"/albumcover.jpeg"}
          width={1000}
          height={1000}
          alt="album"
          className="w-ful h-full object-cover"
        ></Image>

        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 ">
          <div className="relative flex justify-center">
            <div className="flex flex-col items-center">
              <h1 className="text-black text-lg font-bold">The Wailing </h1>
              <p className="text-black text-sm">Kanye West</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AlbumCover;
