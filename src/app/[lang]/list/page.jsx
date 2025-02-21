import { searchPaintings } from "@/actions/Paint"
import PaintCard from "@/components/PaintCard"

export async function generateMetadata({params: {lang}}) {

  return {
    title: lang === 'es' ? 'Listado' : 'List'
  }
}

export default async function Page({params, searchParams}) {

  const { lang } = await params
  const { search, category } = await searchParams

  const paints = await searchPaintings({ search, lang, category })

  return (
    <div>


      <section className="container mx-auto px-5 lg:px-8 mt-10">

        <div className="grid grid-cols-2 gap-4 md:gap-10 lg:grid-cols-3 xl:grid-cols-4">
          {
            paints.map(paint => (
              <PaintCard paint={paint} key={paint._id} lang={lang} />
            ))
          }
        </div>
      </section>
    </div>
  )
}
