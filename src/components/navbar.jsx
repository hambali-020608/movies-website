import { useState } from 'react';
import { FiSearch, FiMenu, FiX, FiHome, FiTrendingUp, FiClock } from 'react-icons/fi';

export default function NavBar(source = 'filmapik') {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if(source == 'filmapik'){
        window.location.href = `/movies/search?q=${encodeURIComponent(searchQuery)}`;
        
      }else{
        window.location.href = `/ny21-indo/movies/search?q=${encodeURIComponent(searchQuery)}`;

      }
    }
  };

  return (
    <nav className="max-w-[100vw] fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <a href="/" className="text-white font-bold text-xl flex items-center">
              <span className="hidden sm:inline">NontonYuk21</span>
              <span className="sm:hidden">NontonYuk21</span>
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearch}
            className={`hidden md:flex relative items-center transition-all duration-300 ${
              isSearchFocused ? 'w-72' : 'w-56'
            }`}
          >
            <input
              type="text"
              placeholder="Cari film..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <button 
              type="submit" 
              className="absolute left-3 text-white/80 hover:text-white transition-colors"
            >
              <FiSearch size={18} />
            </button>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <a 
              href="/" 
              className="px-4 py-2 text-white/80 hover:text-white flex items-center space-x-2 transition-colors"
            >
              <FiHome size={18} />
              <span>Home</span>
            </a>
            <a 
              href="/trending" 
              className="px-4 py-2 text-white/80 hover:text-white flex items-center space-x-2 transition-colors"
            >
              <FiTrendingUp size={18} />
              <span>Trending</span>
            </a>
            <a 
              href="/latest" 
              className="px-4 py-2 text-white/80 hover:text-white flex items-center space-x-2 transition-colors"
            >
              <FiClock size={18} />
              <span>Terbaru</span>
            </a>
            <a 
              href="/ny21-indo" 
              className="px-4 py-2 text-white/80 hover:text-white flex items-center space-x-2 transition-colors"
            >
              {/* <FiClock size={18} /> */}
              <span>FilmIndo</span>
            </a>
          </div>

          {/* Mobile Menu Button and Search */}
          <div className="flex lg:hidden items-center space-x-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden z-40 bg-gray-900/95 backdrop-blur-lg pb-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-4 py-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari film..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
                >
                  <FiSearch size={18} />
                </button>
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-1 px-2">
              <a 
                href="/" 
                className="flex items-center space-x-3 px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FiHome size={20} />
                <span>Home</span>
              </a>
              <a 
                href="/trending" 
                className="flex items-center space-x-3 px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FiTrendingUp size={20} />
                <span>Trending</span>
              </a>
              <a 
                href="/latest" 
                className="flex items-center space-x-3 px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FiClock size={20} />
                <span>Terbaru</span>
              </a>
            <a 
              href="/ny21-indo" 
              className="flex items-center space-x-3 px-4 py-3 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
            >
              {/* <FiClock size={18} /> */}
              <span>FilmIndo</span>
            </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}