import { FaFileDownload } from "react-icons/fa";

const SingleSeries = () => {
  return (
    <section className="w-[90%] md:w-5/6 mx-auto my-10 ">
      <div className="space-y-4">
        <p className="md:text-2xl text-xl font-bold">Synopsis</p>
        <p className="text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut,
          incidunt saepe maxime consequuntur consectetur doloremque eligendi
          laboriosam delectus, optio ea perspiciatis fugiat, voluptates esse id.
          Doloremque excepturi aliquid error beatae!
        </p>
      </div>

      <div className="space-y-4 my-10">
        <p className="md:text-2xl text-xl font-bold">Download link for Rocky</p>

        <button className="md:w-[40%] w-full py-5 bg-green-600 text-white flex justify-center items-center gap-2 rounded-2xl">
          <FaFileDownload /> Download
        </button>
      </div>
    </section>
  );
};

export default SingleSeries;
