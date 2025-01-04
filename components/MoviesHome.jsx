
// export default AllMoviesHome;


// app/components/movieshome.jsx
import Link from "next/link";

export default function AllMoviesHome({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <div>
        <p className="text-gray-500 font-bold">No Movies Available</p>
      </div> 
    );
  }

  return ( 
    <section className="mb-10"> 
       <h2 className="text-2xl font-semibold mb-4">Movies</h2>
       <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4">
        {movies.map((movie) => (
          <div key={movie.id}  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <Link href={`/movies-menu/${movie.id}`}> 
              <div className="relative group cursor-pointer">
                <img
                  src={movie.key || "/placeholder.png"}
                  alt={movie.title}
                 className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                  <p className="text-white font-bold text-lg hidden group-hover:block">
                    View Details
                  </p>
                </div>
              </div>
            </Link>
            <p className="px-2 py-3 text-center font-medium">{movie.title}</p>
          </div>
        ))}
      </div>
    </section>
      )}

  

