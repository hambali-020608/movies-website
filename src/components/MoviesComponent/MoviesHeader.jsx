import { FcRight } from "react-icons/fc";
export default function Headers({title,url}){
    return (
        <div className='header flex justify-between'>
      <h1 className="text-2xl md:text-3xl mb-6 md:mb-10 font-bold">{title}</h1>
      <a className="text-blue-600 flex" href={url}>See More<FcRight className="ms-2"/>  </a>
      </div>
    )

}