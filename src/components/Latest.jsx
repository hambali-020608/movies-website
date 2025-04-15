import MoviesCard from "./MoviesComponent/MoviesCard";
import Headers from "./MoviesComponent/MoviesHeader";
import MoviesSlide from "./MoviesComponent/MoviesSlide";

export default function LatestMovies({LatestMovies}) {
    if (!LatestMovies || !LatestMovies.length) {
        return (
          <div className="mt-10 mx-4 md:mx-10 h-64 flex items-center justify-center">
            Loading latest movies...
          </div>
        );
      }
    
      return (
        <div className="mx-4 md:mx-10">
       <Headers title="Latest" url="/latest"/>
          <div className="h-auto min-h-[300px] md:min-h-[400px]">
           <MoviesSlide
           movies={LatestMovies}
           renderSlide={(movie, index) => <MoviesCard movie={movie} index={index} />}
           />
          </div>
        </div>
      );J
    
    
}