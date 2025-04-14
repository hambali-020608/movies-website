import { useEffect, useState } from 'react'
import NavBar from '../components/navbar'
import Hero from '../components/hero'
import '../App.css'

import Trending from '../components/trending'
import Movies from '../components/Movies'



function App() {
  const [count, setCount] = useState(0)
  const [topMovies,setTopMovies] = useState({})
  const [trendingMovies,setTrendingMovies] = useState({})
  const base_api = 'https://profesor-api.vercel.app'
  useEffect(()=>{
    // Fungsi untuk mengambil data top movie
    const getTopMovies = async () => {
      try {
        const responseTopMovie = await fetch(`${base_api}/api/movies/v1/box-office?page=1`)
        const responseTrendingMovie = await fetch(`${base_api}/api/movies/v1/trending?page=1`)
        const dataTopMovie = await responseTopMovie.json()
        const dataTrendingMovie = await responseTrendingMovie.json()
        // console.log(dataTopMovie)
        setTopMovies(dataTopMovie.data)
        setTrendingMovies(dataTrendingMovie.data)
      }catch{

      }
      }

      getTopMovies()
  })

  return (
    <div className='bg-[#EBFAFF]'>
      {/* {console.log(topMovies)} */}
      <NavBar/>    
  {console.log(topMovies)}
      <main>
        {topMovies ? (
          <Hero topMovies={topMovies}/>

        ):'loading' }

        <Trending trendingMovies={trendingMovies}/>
        <Movies/>
      </main>
    </div>
  )
}

export default App
