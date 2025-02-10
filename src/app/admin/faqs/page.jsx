'use client'

import AdminHeader from '@/components/admin-header'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Edit2, Languages, Trash2 } from 'lucide-react'
import AddFAQModal from '@/components/AddFAQModal/AddFAQModal'
import { getFAQ, deleteFAQ } from '@/actions/FAQ'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyStatus, Bold } from '@/components/EmptyStatus'

const defaultVal = {
  askSpanish: '',
  askEnglish: '',
  answerSpanish: '',
  answerEnglish: '',
}

export default function page() {

  const [open, setOpen] = useState(false)
  const [isSpanish, setIsSpanish] = useState(true)
  const [loading, setLoading] = useState(true)
  const [faqs, setFAQS] = useState([])
  const [initialVal, setInitialVal] = useState(defaultVal)

  useEffect(() => {
    !open && getFaqs()
  }, [open])

  const getFaqs = async () => {
    setLoading(true)
    const response = await getFAQ()
    setFAQS(response)
    setLoading(false)
  }

  const removeFAQ = async (faq) => {
    setLoading(true)
    const confirm = window.confirm(`Estas seguro que deseas eliminar la FAQ "${faq.askSpanish}"?`)
    if (!confirm) {setLoading(false); return}

    await deleteFAQ(faq._id)
    getFaqs()
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AdminHeader title="FAQ's">
        <div className='flex gap-4'>
          <Button onClick={() => setIsSpanish(!isSpanish)} className='font-bold'>
            <Languages />
            {isSpanish ? 'English' : 'Español'}
          </Button>
          <AddFAQModal initialVal={initialVal} setInitialVal={setInitialVal} setOpen={setOpen} loading={loading} defaultVal={defaultVal} />
        </div>
      </AdminHeader>

      {
        !loading && faqs.length === 0 &&
        <EmptyStatus
          title="No hay FAQ's escritas aun."
          subtitle={<>Agrega una FAQ con el boton <Bold>"Agregar FAQ"</Bold>.</>}
        />
      }

      <div className='w-full max-w-[800px] mx-auto'>
        <Accordion type="single" collapsible>
          {
            !loading &&
            faqs.map((faq, index) => (
              <div key={faq._id} className='flex gap-3 items-start w-full h-full'>
                <DialogTrigger asChild>
                  <button className='mt-4 hover:text-blue-500 transition-colors duration-200' disabled={loading} onClick={() => setInitialVal(faq)}>
                    <Edit2 size={18} />
                  </button>
                </DialogTrigger>
                
                <button className='text-red-500 mt-4 hover:opacity-50 transition-colors duration-200' onClick={() => removeFAQ(faq)} disabled={loading}>
                  <Trash2 size={18} />
                </button>

                <AccordionItem value={`item-${index}`} className='w-full'>
                  <AccordionTrigger>{isSpanish ? faq.askSpanish : faq.askEnglish }</AccordionTrigger>
                  <AccordionContent>{isSpanish ? faq.answerSpanish : faq.answerEnglish }</AccordionContent>
                </AccordionItem>
              </div>
            ))
          }

          {
            loading &&
            <>
              <div className='flex gap-3 items-start w-full h-full animate-pulse'>

                <div className='mt-4 flex gap-2 items-center text-gray-500 animate-pulse'>
                  <DialogTrigger asChild>
                      <Edit2 size={18} />
                  </DialogTrigger>
                  
                  <Trash2 size={18} />
                </div>

                <AccordionItem value='item-1' className='w-full'>
                  <AccordionTrigger><Skeleton className='w-3/5 h-4' /></AccordionTrigger>
                  <AccordionContent><Skeleton className='w-3/6 h-4' /></AccordionContent>
                </AccordionItem>
              </div>

              <div className='flex gap-3 items-start w-full h-full animate-pulse'>

                <div className='mt-4 flex gap-2 items-center text-gray-500 animate-pulse'>
                  <DialogTrigger asChild>
                      <Edit2 size={18} />
                  </DialogTrigger>
                  
                  <Trash2 size={18} />
                </div>

                <AccordionItem value='item-2' className='w-full'>
                  <AccordionTrigger><Skeleton className='w-2/5 h-4' /></AccordionTrigger>
                  <AccordionContent><Skeleton className='w-4/6 h-4' /></AccordionContent>
                </AccordionItem>
              </div>
            </>
          }
        </Accordion>
      </div>
    </Dialog>
  )
}