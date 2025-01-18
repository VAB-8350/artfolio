'use client'
import { useEffect, useState } from 'react'
import AdminHeader from '@/components/admin-header'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Switch } from '@/components/ui/switch'
import { Eye, EyeOff, Loader2, Star, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import ReviewSettingsModal from '@/components/ReviewSettingsModal/ReviewSettingsModal'
import { getAllReviews, changeReviewVisibility, deleteReview } from '@/actions/Review'
import { toast } from 'sonner'
import { SuccessToast, ErrorToast } from '@/components/Toasts'
import { Bold, EmptyStatus } from '@/components/EmptyStatus'

export default function page() {

  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getReviews()
  }, [])

  // methods
  const getReviews = async () => {
    setLoading(true)
    const res = await getAllReviews()
    setReviews(res.reverse())
    setLoading(false)
  }

  const changeVisibility = async (id, status) => {
    setLoading(true)
    const res = await changeReviewVisibility(id, status)
    
    if (res) {
      toast(<SuccessToast title='Visibilidad cambiada!' message='Gracias por tu contribución' />)
    } else {
      toast(<ErrorToast title='Error al cambiar la visibilidad' message='Por favor, inténtalo de nuevo' />)
    }
    getReviews()
    setLoading(false)
  }

  const removeReview = (id) => {
    const res = window.confirm(`Estas seguro que quieres eliminar la review de ${reviews.find(review => review._id === id).name}?`)
    if (res) {
      setLoading(true)
      const res = deleteReview(id)
      if (res) {
        toast(<SuccessToast title='Review eliminada!' message='Gracias por tu contribución' />)
      } else {
        toast(<ErrorToast title='Error al eliminar la review' message='Por favor, inténtalo de nuevo' />)
      }
      getReviews()
      setLoading(false)
    }
  }

  return (
    <>
      <AdminHeader title='Reviews'>
        <ReviewSettingsModal />
      </AdminHeader>

      <h3 className='flex w-full justify-end items-center gap-2 pr-10'>
        {loading ? <Loader2 size={17} className='animate-spin' /> : reviews.length} Reviews cargadas
      </h3>

      {
        !loading && reviews.length === 0 &&
        <EmptyStatus
          title="No Tienes reviews para mostrar"
          subtitle={<>Invita a tus clientes a dejar a una review en <Bold>"/review"</Bold></>}
        />
      }

      <section className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {
          reviews.map((review) => (
            <Card className='p-3 pb-4' key={review._id}>
              <article className='flex gap-3 relative'>

                <Avatar>
                  {
                    review.avatar?.length > 0
                    ? <AvatarImage src={review.avatar} alt="@shadcn" />
                    :
                    <AvatarFallback>
                      {review?.name[0] + (review?.name.split(' ')?.[1]?.[0] ?? '')}
                    </AvatarFallback>
                  }
                </Avatar>

                <div className='w-full'>
                  <div className='flex justify-between w-full'>
                    <h2 className='text-xl font-bold'>{review.name}</h2>

                    <div className='flex gap-3 items-center'>
                      <Switch id={`review-visibility-${review._id}`} onCheckedChange={(status) => changeVisibility(review._id, status)} checked={review.visibility} disabled={loading} />
                      <label htmlFor={`review-visibility-${review._id}`} className={review.visible ? 'text-green-500' : 'text-red-500'}>
                        {
                          review.visible
                            ? <Eye size={20}/>
                            : <EyeOff size={20}/>
                        }
                      </label>

                      <button disabled={loading} className='hover:text-red-500 transition-colors duration-200' onClick={() => removeReview(review._id)}>
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <span className='flex gap-1 items-center'>
                    <Star size={15} className={review.stars >= 1 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500 fill-gray-800'} />
                    <Star size={15} className={review.stars >= 2 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500 fill-gray-800'} />
                    <Star size={15} className={review.stars >= 3 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500 fill-gray-800'} />
                    <Star size={15} className={review.stars >= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500 fill-gray-800'} />
                    <Star size={15} className={review.stars >= 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500 fill-gray-800'} />
                  </span>

                  <p className='mt-2 text-sm'>{review.message}</p>
                </div>
              </article>
            </Card>
          ))
        }
      </section>
    </>
  )
}