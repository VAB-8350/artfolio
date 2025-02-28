import { Link } from 'next-view-transitions'

export default function PaintCard({paint, lang}) {

  return (
    <article>
      <Link href={(`/${lang}/paint/${paint._id}`)} className="block rounded-lg shadow-xs shadow-indigo-100 group">
        <div className='h-56 w-full rounded-3xl overflow-hidden shadow-md relative'>
          <img
            loading='lazy'
            alt={lang === 'es' ? paint.titleSpanish : paint.titleEnglish}
            src={paint.images[0].url}
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
          />
          <span className='absolute bottom-0 right-0 inline-block w-full h-full z-20 bg-[radial-gradient(circle_80px_at_95%_100%,#00000090,transparent)]' />
          <span className='absolute bottom-2 right-5 text-front-gray z-30 font-poppins text-base'>{paint.year}</span>
        </div>

        <div className="mt-1">
          <h4 className='text-front-text text-sm px-2 truncate'>{lang === 'es' ? paint.titleSpanish : paint.titleEnglish}</h4>
        </div>
      </Link>
    </article>
  )
}
