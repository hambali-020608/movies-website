import { Link } from "react-router";

export default function MoviesCard({movie,index}){
    return(
        <a href={`/movies/streaming/${movie.moviesTitle}`}>
            {/* {console.log('latest',)} */}
        <div className="group relative h-0 pb-[150%] overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:z-10 hover:scale-105">
          <img 
            src={movie.posterUrls} 
            alt={movie.moviesTitle || `Movie ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <h3 className="text-white text-sm md:text-base font-medium truncate">
              {movie.moviesTitle}
            </h3>
          </div>
        </div>
      </a>
    )
}