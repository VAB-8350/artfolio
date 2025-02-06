import FormReview from "@/components/FormReview/FormReview";
import PaintStack from '@/components/PaintStack/PaintStack'
import { getTopPaints } from '@/actions/TopPaints'

export default async function page({params}) {
  const { lang } = await params
  const paints = await getTopPaints()

  const dictionary = await import(`@/app/dictionaries/${lang}/review.json`)

  return (
    <section className="container mx-auto px-5 lg:px-8 flex flex-col gap-10 mt-16">
      <h1 className="font-niconne text-center text-6xl font-bold text-front-secondary">{dictionary.title}</h1>

      <div className="flex lg:flex-row flex-col gap-10 justify-around items-center">
        <div className="w-full lg:order-2">
          <FormReview dictionary={JSON.parse(JSON.stringify(dictionary))} />
        </div>

        <div className="w-full lg:order-1">
          <PaintStack paints={paints.topPaints} />
        </div>
      </div>
    </section>
  )
}
