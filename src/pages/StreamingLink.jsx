import { useParams } from "react-router";
import NavBar from "../components/navbar";
import { useEffect, useMemo, useState } from "react";
import { decodeUrl } from "../lib/helper";
import VideoPlayer from "../components/videoPlayer";
import ButtonServer from "../components/ButtonServer";
import MoviesDescription from "../components/MoviesDescription";


export default function StreamingLink(){
    const [movie,setMovie] = useState(null);
    const [Player, setPlayer] = useState("p2");
    const [loading,setLoading] = useState(false);
    const {link} = useParams();
    const decodeLink = decodeUrl(link);

    const fetchMovie=async()=>{
        setLoading(true);
        try{
            const response = await fetch(`https://profesor-api.vercel.app/api/movies/v2/stream/movie?url=${decodeLink}&player=${Player}`);
            const data = await response.json();
            setMovie(data);
        }catch(error){
            setLoading(false)
            console.error("Error fetching movie data:", error);
        }finally{
            setLoading(false);
        }

    }
    useEffect(()=>{
    fetchMovie();
    },[link,Player])
const serverButtons = useMemo(() => {
    if (!movie?.data?.players) return null;

    return movie.data.players.map((link, i) => (
      <ButtonServer
        iteration={i}
        onClick={() => setPlayer(link.playerId)}
        isActive={Player === link.playerId}
        link={link.playerName}
      />
      
    ));
  }, [movie?.data?.players, Player]);

    if (loading){
    return (<div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Loading...
      </div>)
    }
    return (
    <div className="min-h-screen bg-slate-950">
<NavBar />
<div className="pt-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4 lg:px-8 py-8">
            {console.log(Player)}
          <VideoPlayer url={movie?.data?.StreamingUrl} title={movie?.data?.title} />
          {/* {console.log(movie.data.streamingUrl)} */}
        </div>
      </div>
{console.log(movie)}



<div className="container mx-auto px-4 lg:px-8 py-12 space-y-10">
        {/* Episode hanya jika series */}
      

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 space-y-6">
        {/* {console.log(data)} */}
        <MoviesDescription title={movie?.data?.title} rating={movie?.data?.rating} synopsis={movie?.data?.description} />
          {/* Server pilihan */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700">
            {serverButtons}
          </div>
        </div>
      </div>
    </div>
    )

}