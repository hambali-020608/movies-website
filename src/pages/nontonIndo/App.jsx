import { useEffect, useState } from 'react'
import NavBar from '../../components/navbar'
import Hero from '../../components/hero'
import '../../App.css'
import MoviesComponent from '../../components/Movies'
// import Trending from '../../components/trending'
// import Movies from '../components/Movies'
import Latest from '../../components/Latest'
import Faq from '../../components/Faq'
import Footer from '../../components/Footer'



function AppIndo() {
  const [topMovies,setTopMovies] = useState({})
  const [Movies,setMovies] = useState({})
  const [LatestMovies,setLatestMovies] = useState({})
  const base_api = 'https://profesor-api.vercel.app'
  useEffect(()=>{
    // Fungsi untuk mengambil data top movie
    const getTopMovies = async () => {
      try {
        const responseMovies = await fetch(`${base_api}/api/movies/v2/movies?page=1`)
        const responseLatestMovie = await fetch(`${base_api}/api/movies/v2/latest?page=1`)
        const dataMovies = await responseMovies.json()
        const dataLatestMovie = await responseLatestMovie.json()
        setMovies(dataMovies)
        // setTrendingMovies(dataTrendingMovie)
        setLatestMovies(dataLatestMovie)
      }catch{

      }
      }

      getTopMovies()
  })

  return (
    <div className='bg-[#d7f2fb]'>
      {/* {console.log(topMovies)} */}
      <NavBar source='justtalk'/>    
  {/* {console.log(topMovies)} */}
      <main>

          <Hero Movies={LatestMovies}/>
        
        <MoviesComponent Movies={Movies} source='justtalk'/>
        {/* <Trending trendingMovies={trendingMovies}/> */}
        <Latest LatestMovies={LatestMovies} source='justtalk'/>
        <Faq/>
        {/* <Movies/> */}
      </main>
      <Footer/>
    </div>
  )
}

export default AppIndo
