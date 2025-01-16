"use client";
import Image from "next/image";
import Link from "next/link";
import pld from "@/public/pld.jpeg";

export default function AllSeasonalHome({ seasonal }) {
  if (!seasonal || seasonal.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 font-bold">No Movies Available</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        Seasonal Movies
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {seasonal.map((movie, index) => (
          <div
            key={movie.id}
            className="group relative bg-gray-800/50 rounded-xl overflow-hidden 
                     hover:scale-105 transition-all duration-300 backdrop-blur-sm
                     shadow-xl animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Link href={`/series-menu/${movie.id}/`}>
              <div className="aspect-[2/3] relative overflow-hidden">
                <Image
                  src={movie.imageUrl || pld}
                  alt={movie.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p
                      className="text-white font-bold text-lg transform translate-y-full 
                                group-hover:translate-y-0 transition-transform duration-300"
                    >
                      View Details
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3
                  className="text-gray-200 font-semibold text-center group-hover:text-purple-400 
                             transition-colors duration-300"
                >
                  {movie.title}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
