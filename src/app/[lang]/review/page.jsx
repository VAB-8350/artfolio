import FormReview from "@/components/FormReview/FormReview";
import PaintStack from '@/components/PaintStack/PaintStack'
import { getTopPaints } from '@/actions/TopPaints'
import { getMaxReviews, getQuantityReviews } from "@/actions/Review";
import { FileStack, Frown, TriangleAlert } from "lucide-react";

export default async function page({params}) {
  const { lang } = await params
  const paints = await getTopPaints()

  const {maxReviews} = await getMaxReviews()
  const quantityReviews = await getQuantityReviews()

  const dictionary = await import(`@/app/dictionaries/${lang}/review.json`)

  return (
    <section className="container mx-auto px-5 lg:px-8 flex flex-col gap-10 mt-16">
      <h1 className="font-niconne text-center text-6xl font-bold text-front-secondary">{dictionary.title}</h1>

      <div className="flex lg:flex-row flex-col gap-10 justify-around items-center">
        <div className="w-full lg:order-2">
          {
            quantityReviews >= maxReviews
            ? <div className="flex flex-col items-center mb-[50px]">
                <TriangleAlert width={100} height={100} className="text-red-500 mb-5" />
                <h2 className="text-2xl text-front-text font-poppins font-bold text-center max-w-[500px]">
                  {dictionary.limitMessage}
                </h2>
              </div>
            : <FormReview dictionary={JSON.parse(JSON.stringify(dictionary))} />
          }
        </div>

        <div className="w-full lg:order-1">
          <PaintStack paints={paints.topPaints} />
        </div>
      </div>
    </section>
  )
}
