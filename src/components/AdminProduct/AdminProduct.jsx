export default function AdminProduct({action, title, img, year, showActive = false, active}) {
  return (
    <article className='group relative h-fit'>
      <div className='bg-black/40 grid place-content-center w-full h-56 absolute top-0 left-0 rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50'>

        <div className='flex items-center gap-4'>
          {action && action}
        </div>
      </div>

      <picture className="relative">
        <img className={`rounded-lg h-56 w-full object-cover ${showActive ? 'border-l-4' : ''} ${active ? 'border-green-500' : 'border-red-700'}`} src={img} alt={title} />
        {
          year &&
          <span className="absolute bottom-1 right-3 font-bold text-white/70 text-sm">{year}</span>
        }
      </picture>

      <h1 className='font-bold mt-2 w-full text-ellipsis overflow-hidden text-nowrap'>
        {title}
      </h1>
    </article>
  )
}
