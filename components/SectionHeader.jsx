function SectionHeader({ title, desc, bgWallpaper }) {
  const backgroundStyle = bgWallpaper
    ? {
      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${bgWallpaper})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
    : {};

  return (
    <div
      className={`p-8 md:p-24 h-[350px] flex flex-col items-center justify-center ${
        !bgWallpaper ? "bg-primarycolor" : ""
      }`}
      style={backgroundStyle}
    >
      <h1 className="font-bold text-2xl text-center text-white md:text-4xl">
        {title}
      </h1>
      <p className="md:text-lg text-white md:w-3/6 mx-auto text-center">
        {desc}
      </p>
    </div>
  );
}

export default SectionHeader;