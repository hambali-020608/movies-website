import { FiServer } from 'react-icons/fi';
export default function ButtonServer({link,onClick,isActive,iteration}){
    return  <button
            key={iteration}
            onClick={onClick}
            className={`px-5 py-2 rounded-lg transition-all ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <FiServer className="inline mr-2" />
            {link}
          </button>
    
}