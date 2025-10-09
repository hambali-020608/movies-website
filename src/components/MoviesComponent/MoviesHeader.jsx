import { FiArrowRight } from "react-icons/fi";

export default function Headers({title, url}){
    return (
        <div className='flex justify-between items-center mb-8'>
            <div className="flex items-center space-x-4">
                {/* Decorative Line */}
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold">
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        {title}
                    </span>
                </h2>
            </div>
            
            {/* See More Link */}
            <a 
                href={url}
                className="group flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-all duration-300"
            >
                <span className="text-sm md:text-base font-medium">See More</span>
                <FiArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
        </div>
    );
}