import MoviesCard from "./MoviesComponent/MoviesCard";
import Headers from "./MoviesComponent/MoviesHeader";
import MoviesSlide from "./MoviesComponent/MoviesSlide";

export default function Movies({Movies,source="filmapik"}) {
    if (!Movies || !Movies.length) {
        return (
          <div className="mt-10 mx-4 md:mx-10 h-64 flex items-center justify-center">
            Loading movies...
          </div>
        );
      }
    
      return (
        <div className="mx-4 md:mx-10 overflow-x-hidden">
       <Headers title="Movies" url="/latest"/>
          <div className="h-auto min-h-[300px] md:min-h-[400px]">
           <MoviesSlide
           movies={Movies}
           renderSlide={(movie, index) => <MoviesCard movie={movie} index={index} source={source}/>}
           />
          </div>
        </div>
      );J
    
    
}