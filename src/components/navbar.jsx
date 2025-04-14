import { useState } from 'react';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { Navigate } from 'react-router';

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href=`/movies/search?q=${encodeURIComponent(searchQuery)}`
    // alert(`Searching for: ${searchQuery}`);
    // Implement search functionality
  };

  return (
    <div className="fixed rounded-lg top-1 left-1/2 transform -translate-x-1/2 w-full max-w-screen-xl z-50 bg-transparent backdrop-blur-md bg-opacity-30 shadow-md">
      <div className="navbar flex justify-between items-center px-4">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center">
          <a className="btn btn-ghost text-xl text-white font-bold">NontonKuy21</a>
          
          {/* Mobile Menu Button - Hidden on desktop */}
          <button 
            className="md:hidden ml-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Search Bar - Hidden on mobile when menu is open */}
        {!isMobileMenuOpen && (
          <form 
            onSubmit={handleSearch}
            className={`relative transition-all duration-300 mx-2 ${
              isSearchFocused ? 'w-64' : 'w-48'
            } hidden sm:block`}
          >
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
              <FiSearch size={20} />
            </button>
          </form>
        )}

        {/* Desktop Navigation - Hidden on mobile */}
        <ul className="hidden md:flex menu menu-horizontal px-1">
          <li><a className="text-white hover:bg-white/10">Movies</a></li>
          <li><a className="text-white hover:bg-white/10">Series</a></li>
        </ul>

        {/* Mobile Search Icon - Only visible on small screens */}
        <div className="sm:hidden flex items-center">
          <button 
            className="text-white p-2"
            onClick={() => {
              setIsMobileMenuOpen(false);
              // Implement mobile search modal toggle here
              handleSearch(new Event('submit')); // Contoh pemanggilan search
            }}
          >
            <FiSearch size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Only visible when toggled */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm w-full py-4 px-4">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
                <FiSearch size={20} />
              </button>
            </div>
          </form>
          <ul className="space-y-3">
            <li>
              <a className="block text-white text-lg py-2 hover:bg-white/10 rounded px-2">Movies</a>
            </li>
            <li>
              <a className="block text-white text-lg py-2 hover:bg-white/10 rounded px-2">Series</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}