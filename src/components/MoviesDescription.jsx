import { FaClock, FaStar, FaCalendarAlt } from 'react-icons/fa';
export default function MoviesDescription({title,rating,year,duration,synopsis}){

    return(
        <div>
            <h1 className="text-3xl font-bold text-slate-100">{title}</h1>
            
                      <div className="flex flex-wrap gap-4">
                        {rating &&  (
                          <div className="flex items-center gap-2 text-yellow-400">
                          <FaStar /> {rating}
                          </div>
                        )}
                        {year && (
                          <div className="flex items-center gap-2 text-blue-400">
                            <FaCalendarAlt /> {year}
                          </div>
                        )}
                        {duration && (
                          <div className="flex items-center gap-2 text-cyan-400">
                            <FaClock /> {duration}
                          </div>
                        )}
                      </div>
                      <p className="text-slate-300">{synopsis}</p>
        </div>
    )

}