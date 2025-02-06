import FormReview from "@/components/FormReview/FormReview";
import PaintStack from '@/components/PaintStack/PaintStack'
import { getTopPaints } from '@/actions/TopPaints'

export default async function page() {
  const paints = await getTopPaints()

  return (
    <section className="container mx-auto px-5 lg:px-8 flex flex-col gap-10 mt-16">
      <h1 className="font-niconne text-center text-6xl font-bold text-front-secondary">Que Opinas?</h1>

      <div className="flex lg:flex-row flex-col gap-10 justify-around items-center">
        <div className="w-full lg:order-2">
          <FormReview />
        </div>

        <div className="w-full lg:order-1">
          <PaintStack paints={paints} />
        </div>
      </div>
    </section>
  )
}
