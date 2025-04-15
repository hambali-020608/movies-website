import { useEffect, useState } from 'react'
import NavBar from '../components/navbar'
import Hero from '../components/hero'
import '../App.css'

import Trending from '../components/trending'
import Movies from '../components/Movies'
import Latest from '../components/Latest'
import Faq from '../components/Faq'



function App() {
  const [count, setCount] = useState(0)
  const [topMovies,setTopMovies] = useState({})
  const [trendingMovies,setTrendingMovies] = useState({})
  const [LatestMovies,setLatestMovies] = useState({})
  const base_api = 'https://profesor-api.vercel.app'
  useEffect(()=>{
    // Fungsi untuk mengambil data top movie
    const getTopMovies = async () => {
      try {
        const responseTopMovie = await fetch(`${base_api}/api/movies/v1/box-office?page=1`)
        const responseTrendingMovie = await fetch(`${base_api}/api/movies/v1/trending?page=1`)
        const responseLatestMovie = await fetch(`${base_api}/api/movies/v1/latest?page=1`)
        const dataTopMovie = await responseTopMovie.json()
        const dataTrendingMovie = await responseTrendingMovie.json()
        const dataLatestMovie = await responseLatestMovie.json()
        // console.log(dataTopMovie)
        setTopMovies(dataTopMovie.data)
        setTrendingMovies(dataTrendingMovie.data)
        setLatestMovies(dataLatestMovie.data)
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
        <Latest LatestMovies={LatestMovies}/>
        <Faq/>
        {/* <Movies/> */}
      </main>
    </div>
  )
}

export default App
