import { useEffect, useState, useMemo, Suspense, lazy } from 'react'
import '../App.css'

// Lazy load komponen besar untuk mengurangi bundle awal
const NavBar = lazy(() => import('../components/navbar'))
const Hero = lazy(() => import('../components/hero'))
const Trending = lazy(() => import('../components/trending'))
const Latest = lazy(() => import('../components/Latest'))
const Faq = lazy(() => import('../components/Faq'))
const Footer = lazy(() => import('../components/Footer'))

function App() {
  const [movies, setMovies] = useState({
    top: [],
    trending: [],
    latest: [],
  })
  const [loading, setLoading] = useState(true)

  const base_api = useMemo(() => 'https://profesor-api.vercel.app', [])

  useEffect(() => {
    let isMounted = true // hindari memory leak
    const getMovies = async () => {
      try {
        const urls = [
          `${base_api}/api/movies/v1/box-office?page=1`,
          `${base_api}/api/movies/v1/trending?page=1`,
          `${base_api}/api/movies/v1/latest?page=1`,
        ]

        // Jalankan paralel + cache otomatis dari browser
        const [topRes, trendRes, latestRes] = await Promise.all(
          urls.map((url) =>
            fetch(url, { cache: 'force-cache' }).then((r) => r.json())
          )
        )

        if (!isMounted) return
        setMovies({
          top: topRes.data || [],
          trending: trendRes.data || [],
          latest: latestRes.data || [],
        })
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    getMovies()
    return () => {
      isMounted = false
    }
  }, [base_api])

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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
      <Suspense
        fallback={
          <div className="text-slate-400 text-center mt-20">Loading...</div>
        }
      >
        <NavBar source="filmapik" />
        <main>
          {movies.top.length > 0 && <Hero Movies={movies.top} />}

          <div className="space-y-16 pb-20">
            {movies.trending.length > 0 && (
              <Trending trendingMovies={movies.trending} />
            )}
            {movies.latest.length > 0 && (
              <Latest LatestMovies={movies.latest} />
            )}
            <Faq />
          </div>
        </main>

        <Footer />
      </Suspense>
    </div>
  )
}

export default App
