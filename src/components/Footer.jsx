import { FaTiktok } from "react-icons/fa";
import { FiFilm, FiHeart } from "react-icons/fi";

export default function Footer() {
    return(
        <footer className="relative mt-20 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800">
            {/* Decorative Top Border */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            
            <div className="container mx-auto px-4 lg:px-8 py-12">
                <div className="flex flex-col items-center space-y-8">
                    {/* Logo & Brand */}
                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center space-x-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50"></div>
                                <FiFilm className="relative text-4xl text-blue-400" />
                            </div>
                            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                NONTONYUK21
                            </span>
                        </div>
                        
                        <p className="text-slate-400 max-w-md">
                            Platform streaming film terbaik dengan koleksi terlengkap dan kualitas terbaik. Nikmati ribuan film dari berbagai genre.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-slate-400">
                        <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
                        <span className="text-slate-700">•</span>
                        <a href="/trending" className="hover:text-blue-400 transition-colors">Trending</a>
                        <span className="text-slate-700">•</span>
                        <a href="/latest" className="hover:text-blue-400 transition-colors">Latest</a>
                        <span className="text-slate-700">•</span>
                        <a href="/ny21-indo" className="hover:text-blue-400 transition-colors">FilmIndo</a>
                    </div>

                    {/* Social Media */}
                    <div className="flex items-center space-x-4">
                        <a 
                            href="https://www.tiktok.com/@tyan.dev?is_from_webapp=1&sender_device=pc"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-full border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
                            <FaTiktok className="relative text-2xl text-slate-400 group-hover:text-blue-400 transition-colors" />
                        </a>
                    </div>

                    {/* Divider */}
                    <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>

                    {/* Copyright */}
                    <div className="text-center space-y-2">
                        <p className="text-slate-500 text-sm flex items-center justify-center space-x-2">
                            <span>Made with</span>
                            <FiHeart className="text-red-500 animate-pulse" />
                            <span>by NontonYuk21 Team</span>
                        </p>
                        <p className="text-slate-600 text-sm">
                            Copyright © {new Date().getFullYear()} NontonYuk21. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative Bottom Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-blue-500/10 blur-3xl"></div>
        </footer>
    );
}