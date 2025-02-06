import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CircleHelp } from 'lucide-react'
import { colors } from '@/config.json'

import './FAQs.css'

export default function FAQs({faqs, lang}) {

  return (
    <Accordion type="single" collapsible className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
      {
        faqs.map(faq => (
          <AccordionItem value={faq._id} key={faq._id} className='border-none bg-white shadow-md rounded-xl faq-question'>
            <AccordionTrigger className='hover:no-underline bg-front-primary backdrop-blur-sm px-5 rounded-xl shadow-md border border-dashed border-front-gray/20 hover:border-front-primary/50 transition-all'>
              <div className="flex items-center gap-2">
                <span>
                  <CircleHelp stroke={colors.background} />
                </span>

                <p className="text-front-background font-poppins font-extralight whitespace-pre-line">
                  {lang === 'es' ? faq.askSpanish : faq.askEnglish}
                </p>
              </div>
            </AccordionTrigger>

            <AccordionContent className='pl-5 mt-4 text-front-text'>
              {lang === 'es' ? faq.answerSpanish : faq.answerEnglish}
            </AccordionContent>
          </AccordionItem>
        ))
      }
    </Accordion>
  )
}
