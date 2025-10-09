import { useEffect, useState } from 'react'
import NavBar from '../components/navbar'
import Hero from '../components/hero'
import '../App.css'
import Trending from '../components/trending'
import Movies from '../components/Movies'
import Latest from '../components/Latest'
import Faq from '../components/Faq'
import Footer from '../components/Footer'

function App() {
  const [topMovies, setTopMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [LatestMovies, setLatestMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const base_api = 'https://profesor-api.vercel.app'
  
  useEffect(() => {
    const getTopMovies = async () => {
      try {
        setLoading(true)
        const [responseTopMovie, responseTrendingMovie, responseLatestMovie] = await Promise.all([
          fetch(`${base_api}/api/movies/v1/box-office?page=1`),
          fetch(`${base_api}/api/movies/v1/trending?page=1`),
          fetch(`${base_api}/api/movies/v1/latest?page=1`)
        ])
        
        const dataTopMovie = await responseTopMovie.json()
        const dataTrendingMovie = await responseTrendingMovie.json()
        const dataLatestMovie = await responseLatestMovie.json()
        
        setTopMovies(dataTopMovie.data || [])
        setTrendingMovies(dataTrendingMovie.data || [])
        setLatestMovies(dataLatestMovie.data || [])
      } catch(error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    getTopMovies()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400">Loading amazing movies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden'>
      <NavBar source='filmapik'/>    
      
      <main>
        {topMovies.length > 0 && <Hero Movies={topMovies}/>}
        
        <div className="space-y-16 pb-20">
          {trendingMovies.length > 0 && <Trending trendingMovies={trendingMovies}/>}
          {LatestMovies.length > 0 && <Latest LatestMovies={LatestMovies}/>}
          <Faq/>
        </div>
      </main>
      
      <Footer/>
    </div>
  )
}

export default App