import Presentation from '@/components/Presentation/Presentation'
import PaintStack from '@/components/PaintStack/PaintStack'
import TitleSection from '@/components/TitleSection'
import TopWorks from '@/components/TopWork/TopWork'
import Review from '@/components/Review'
import FAQs from '@/components/FAQs/FAQs'
import ContactForm from '@/components/ContactForm/ContactForm'

import { getAboutMe } from '@/actions/AboutMe'
import { getTopPaints } from '@/actions/TopPaints'
import { getTopWorks } from '@/actions/TopWorks'
import { getActiveReviews } from '@/actions/Review'
import { getFAQ } from '@/actions/FAQ'

export default async function HomeComponent({lang}) {
  const paints = await getTopPaints()
  const about = await getAboutMe()
  const works = await getTopWorks()
  const reviews = await getActiveReviews()
  const faqs = await getFAQ()

  const dictionary = await import(`@/app/dictionaries/${lang}/home.json`)

  return (
    <div>
      {/* Presentation */}
      <Presentation job={dictionary.job} lang={lang} />

      {/* Top Paints & About */}
      <section className='container mx-auto px-5 lg:px-8 flex flex-col gap-16 md:flex-row md:justify-around md:items-center'>

        {/* Top Paints */}
        {
          paints.topPaints.length > 0 &&
          <div className='flex flex-col gap-10' id='top-paints'>
            <TitleSection>{dictionary.paintsTitle}</TitleSection>

            <PaintStack paints={paints?.topPaints} />
          </div>
        }

        {/* About */}
        {
          about.aboutEnglish.length > 0 &&
          <div className='flex flex-col gap-7' id='about-me'>
            <TitleSection>{dictionary.aboutTitle}</TitleSection>
            <p className='font-poppins text-base whitespace-pre-line max-w-[600px] text-front-text text-pretty'>
              {lang === 'es' ? about.aboutSpanish : about.aboutEnglish}
            </p>
          </div>
        }

      </section>

      {/* Top Works */}
      {
        works.topWorks.length > 0 &&
        <section className='flex flex-col gap-10 items-center mt-8 lg:mt-60' id='top-works'>
          <TitleSection>{dictionary.worksTitle}</TitleSection>

          <TopWorks works={works} lang={lang} />
        </section>
      }


      <div className='container mx-auto px-5 lg:px-8 flex flex-col lg:flex-row gap-10 mt-16 lg:mt-60 justify-around'>
        {/* Reviews */}
        {
          reviews.length > 0 &&
          <section className='flex flex-col gap-10'>
            <TitleSection>{dictionary.reviewsTitle}</TitleSection>

            <div className='flex flex-col gap-5'>
              {
                reviews.map(review => (
                  <Review review={review} key={review._id} />
                ))
              }
            </div>
          </section>
        }
        
        <section className='' id='contact-me'>
          <TitleSection>{dictionary.contactMeTitle}</TitleSection>

           <ContactForm dictionary={dictionary.contactForm} />
        </section>
      </div>

      {/* FAQ's */}
      {
        faqs.length > 0 &&
        <section className='container mx-auto px-5 lg:px-8 flex flex-col gap-10 mt-16 lg:mt-60 mb-20' id='faqs'>
          <TitleSection>{dictionary.faqsTitle}</TitleSection>

          <FAQs faqs={faqs} lang={lang} />
        </section>
      }
    </div>
  )
}