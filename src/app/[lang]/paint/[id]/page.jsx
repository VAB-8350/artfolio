import { getPaint, getPaintsByCategory } from "@/actions/Paint"
import ImagesOfPaintPage from "@/components/ImagesOfPaintPage/ImagesOfPaintPage"
import PaintStack from "@/components/PaintStack/PaintStack"

export async function generateMetadata({params: {lang, id}}) {
  const paint = await getPaint(id, false)

  return {
    title: lang === 'es' ? paint.titleSpanish : paint.titleEnglish,
    description: lang === 'es' ? paint.descriptionSpanish : paint.descriptionEnglish,
  }
}

export default async function page({params}) {

  const { lang, id } = await params
  const paint = await getPaint(id, true)
  const paints = await getPaintsByCategory(paint?.categories?.[0]?._id, paint?._id)

  const dictionary = await import(`@/app/dictionaries/${lang}/paint.json`)

  return (
    <div className="min-h-full">

      <div className="lg:container lg:mx-auto lg:px-8 flex flex-col lg:flex-row">
        <section className="aspect-square lg:h-[60vh] lg:w-full overflow-hidden">
          <ImagesOfPaintPage images={paint.images} />
        </section>

        <section className="flex flex-col container mx-auto px-5 lg:px-8 mt-3 lg:w-full">
          <h1 className="font-niconne text-3xl md:text-6xl font-bold text-front-secondary">
            {lang === 'es' ? paint.titleSpanish : paint.titleEnglish}
          </h1>

          <div className="flex gap-2 flex-wrap my-3">
            {
              paint.categories.map(category => (
                <span key={category._id} className="text-xs text-front-background bg-front-primary px-3 py-1 rounded-md">
                  {lang === 'es' ? category.englishName : category.spanishName}
                </span>
              ))
            }
          </div>

          <p className="font-poppins text-sm text-front-text font-extralight whitespace-pre-line">
            {lang === 'es' ? paint.descriptionSpanish : paint.descriptionEnglish}
          </p>

          <span className="self-end text-sm text-front-text">{paint.year}</span>
        </section>
      </div>

      <div className="container mx-auto flex justify-around items-center mt-10">
        {
          paints.length > 0 &&
          <section className="mt-10">
            <h3 className="font-niconne text-5xl text-center font-bold text-front-secondary mb-4">{dictionary?.similar}</h3>

            <PaintStack paints={paints} />
          </section>
        }

        {
          paint.images.length >= 3 &&
          <div className="w-1/2 h-[60vh] md:flex items-center justify-center mt-10 hidden">
            <div className="grid grid-cols-3 grid-rows-3 gap-6 w-full h-full">
              {/* Caja 1 - Grande */}
              <div className="col-span-2 row-span-2 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl hover:scale-[1.05] hover:rotate-1 transition-all duration-300 overflow-hidden">
                <img src={paint.images[paint.images.length - 3].url} alt="logo" className="w-full h-full object-cover" />
              </div>

              {/* Caja 2 - Pequeña Glassmorphism */}
              <div className="bg-front-primary/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg group overflow-hidden">
                <img src="/logo.png" alt="logo" className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-6 duration-300" />
              </div>

              {/* Caja 3 - Mediana Vertical */}
              <div className="col-span-1 row-span-2 rounded-2xl flex items-center justify-center text-white text-2xl font-semibold shadow-xl hover:scale-[1.05] hover:rotate-1 transition-all">
                <img src={paint.images[paint.images.length - 2].url} alt="logo" className="w-full h-full object-cover rounded-2xl" />
              </div>

              {/* Caja 4 - Mediana con efecto Neón */}
              <div className="col-span-2 rounded-2xl flex items-center justify-center text-white text-2xl font-semibold shadow-xl hover:scale-[1.05] transition-all">
                <img src={paint.images[paint.images.length - 1].url} alt="logo" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
          </div>
        }

      </div>
    </div>
  )
}
