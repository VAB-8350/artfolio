import { getVisiblePaints } from '@/actions/Paint'
import OpenImage from './OpenImage'
import { languages } from '@/config.json'
import TitleSection from '@/components/TitleSection'

export default async function page({params}) {

  const paints = await getVisiblePaints()
  const { lang } = await params

  const dictionary = await import(`@/app/dictionaries/${lang}/gallery.json`)

  return (
    <div className='container mx-auto p-5 flex flex-col gap-10'>
      <TitleSection>{dictionary.title}</TitleSection>

      <section className='md:columns-[350px] gap-5'>

        {
          paints.map((paint) => (
            paint.images.map((image) => (
              <div className='w-full h-full object-cover rounded-xl mb-5 overflow-hidden shadow-lg hover:shadow-2xl duration-300' key={image.url}>
                <OpenImage image={image} lang={lang} paint={paint} >
                  <img
                    src={image.url}
                    alt={lang === languages.secondary ? paint.titleSpanish : paint.titleEnglish}
                    className='w-full h-full object-cover hover:scale-110 duration-200'
                  />
                </OpenImage>
              </div>
            ))
          ))
        }
      </section>
    </div>
  )
}
