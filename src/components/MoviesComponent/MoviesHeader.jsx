export default function Headers({title,url}){
    return (
        <div className='header flex justify-between'>
      <h1 className="text-2xl md:text-3xl mb-6 md:mb-10 font-semibold">{title}</h1>
      <a className="text-blue-600" href={url}>See More  </a>
      </div>
    )

}