'use client'
import React, { useEffect, useState } from 'react'
import AvailablesReviews from '@/components/Graphs/AvailablesReviews'
import PaintForMonths from '@/components/Graphs/PaintForMonths'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChartLine, Eye, EyeOff, Facebook, Instagram, MessageCircle, Star } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { dashboardData } from '@/actions/Review'
import { getSocialMedias } from '@/actions/SocialMedia'
import { getMonthlyInserts } from '@/actions/Paint'
import Loader from '@/components/Loader/Loader'
import { EmptyStatus } from '@/components/EmptyStatus'

export default function Page() {

  const [lastMonth, setLastMonth] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [maxReviews, setMaxReviews] = useState(0)
  const [socialMedias, setSocialMedias] = useState([])
  const [loading, setLoading] = useState(true)
  const [monthlyInserts, setMonthlyInserts] = useState([])

  useEffect(() => {
    getReviewsData()
    getSocialMediasData()
    getMonthlyInsertsData()
  }, [])

  const getReviewsData = async () => {
    setLoading(true)
    const res = await dashboardData()
    setLastMonth(res.lastMonth.reverse())
    setQuantity(res.quantity)
    setMaxReviews(res.maxReviews)
    setLoading(false)
  }

  const getSocialMediasData = async () => {
    setLoading(true)
    const res = await getSocialMedias()
    setSocialMedias(res)
    setLoading(false)
  }

  const getMonthlyInsertsData = async () => {
    setLoading(true)
    const res = await getMonthlyInserts()
    setMonthlyInserts(res)
    setLoading(false)
  }

  return (
    loading ? <Loader /> :
    <div className="flex flex-col gap-4 min-h-[calc(100vh-100px)]">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">

        <div className="aspect-video rounded-xl bg-muted/50 flex flex-col p-4 overflow-hidden">
          <h3 className='text-center text-xl font-bold mb-3'>Limite de Reviews {maxReviews}</h3>

          {
            quantity > 0
            ? <AvailablesReviews quantity={quantity} maxReviews={maxReviews} />
            : <EmptyStatus title='No tienes reviews' subtitle='Invita a tus clientes a dejar una review.' />
          }
          
        </div>
        
        <div className="aspect-video rounded-xl bg-muted/50 flex flex-col p-4 overflow-hidden" >

          <h3 className='text-center text-xl font-bold mb-3'>Reviews del ultimo mes</h3>

          {
            lastMonth?.length > 0
            ? 
            <div className='flex flex-col overflow-auto pr-2'>

              {
                lastMonth.map((review) => (
                  <div key={review._id}>
                    <article  className='flex flex-col justify-center'>
                      <div className='flex items-center gap-2 justify-between mb-1'>
                          <div className='flex items-center gap-2'>
                            <Avatar className="h-8 w-8 rounded-lg">
                              <AvatarImage src='' alt={review.name} />
                              <AvatarFallback className="rounded-lg">
                                {review.name[0] + (review?.name.split(' ')?.[1]?.[0] ?? '')}
                              </AvatarFallback>
                            </Avatar>
                            <h3 className='text-center text-lg font-bold'>{review.name}</h3>
                          </div>
                          <span className='flex gap-1 items-center'>
                            <Star size={15} className={review.stars >= 1 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500 fill-gray-800'} />
                            <Star size={15} className={review.stars >= 2 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500 fill-gray-800'} />
                            <Star size={15} className={review.stars >= 3 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500 fill-gray-800'} />
                            <Star size={15} className={review.stars >= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500 fill-gray-800'} />
                            <Star size={15} className={review.stars >= 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500 fill-gray-800'} />
                            <div className={`ml-2 ${review.visible ? 'text-green-500' : 'text-red-500'}`}>
                              {
                                review.visible
                                  ? <Eye size={15}/>
                                  : <EyeOff size={15}/>
                              }
                            </div>
                          </span>
                      </div>
                      <p className='text-sm line-clamp-2 indent-2'>
                        {review.message}
                      </p>
                    </article>

                    <Separator className='bg-white/50 my-2' />
                  </div>
                ))
              }
            </div>
            : <EmptyStatus title='No tienes reviews' subtitle='Invita a tus clientes a dejar una review.' />

          }



        </div>

        <div className='aspect-video rounded-xl bg-muted/50 flex flex-col p-4 overflow-hidden'>
        <h3 className='text-center text-xl font-bold'>Redes Sociales y estadisticas</h3>

          <div className="grid place-content-center h-full pb-4" >
            <div className='flex gap-2 items-center mb-3'>
              <Link target='blank' href={socialMedias?.facebook ?? '#'}><Facebook className='p-2 rounded-lg w-14 h-14 hover:bg-white/20 duration-300' /></Link>
              <Link target='blank' href={socialMedias?.instagram ?? '#'}><Instagram className='p-2 rounded-lg w-14 h-14 hover:bg-white/20 duration-300' /></Link>
              <Link target='blank' href={socialMedias?.whatsapp ?? '#'}><MessageCircle className='p-2 rounded-lg w-14 h-14 hover:bg-white/20 duration-300' /></Link>
            </div>
            <Button asChild className='font-bold text-lg'>
              <Link target='blank' href='#'><ChartLine /> Clarity</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="rounded-xl bg-muted/50 flex flex-col flex-grow min-h-[300px] overflow-hidden" >

        <h3 className='text-center text-xl font-bold pb-3 pt-4'>Pinturas del ultimo mes</h3>

        <div className='w-full h-full'>
          {
            monthlyInserts?.date?.length > 0 &&
            monthlyInserts?.quantity?.length > 0
            ? <PaintForMonths data={monthlyInserts} />
            : <EmptyStatus title='No tienes datos de pinturas' subtitle='Agrega nuevas pinturas para ver tu cantidad de aportes al mes  aquí.' />
          }
        </div>
      </div>
    </div>
  )
}
