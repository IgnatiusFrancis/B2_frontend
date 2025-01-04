import Image from "next/image";

function FlickerFeed() {
  return (
    <>
      <div className="w-2/6 h-[200px] bg-[#000]">
        <Image
          src={"/albumcover.jpeg"}
          width={1000}
          height={1000}
          alt="allt"
          className="w-full h-full object-cover opacity-15"
        />
      </div>
    </>
  );
}

export default FlickerFeed;
