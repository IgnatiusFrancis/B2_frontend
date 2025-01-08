import Image from "next/image";

function AlbumCover({ album }) {
  const { title, artist, url } = album;
  return (
    <div className="h-[250px] md:h-[400px] relative">
      {/* Display album cover image */}
      <Image
        src={url || "/albumcover.jpeg"} 
        width={1000}
        height={1000} 
        alt={title}
        className="w-full h-full object-cover rounded-lg"
      />

      {/* Overlay details */}
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-black text-lg font-bold">{title}</h1>
          {/* <p className="text-black text-sm">{artist}</p> */}
        </div>
      </div>
    </div>
  );
}

export default AlbumCover;
