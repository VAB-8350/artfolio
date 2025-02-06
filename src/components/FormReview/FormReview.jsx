'use client'

import { useForm } from "react-hook-form"
import { BadgeCheck, Ban, Edit, Star } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "./schema" 
import { addReview } from "@/actions/Review"
import Review from '@/components/Review'

import './FormReview.css'
import { SelectImage } from "./SelectImage"
import { useEffect, useState } from "react"

export default function FormReview({dictionary}) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatarOption: 1
    }
  })

  const [mounted, setMounted] = useState(false)
  const [storageReview, setStorageReview] = useState(JSON.parse(window.localStorage.getItem('review')))

  useEffect(() => {
    setValue('avatarOption', Math.floor(Math.random() * 9) + 1)
    setMounted(true)
  }, [])

  const onSubmit =  async (data) => {
    const body = {...data, visible: false}

    const success = await addReview(body)
    
    if (success) {
      window.localStorage.setItem('review', JSON.stringify(body))
      setStorageReview(body)
    }
  }

  if (storageReview) return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <div className="flex flex-col items-center mb-[50px]">
        <BadgeCheck width={100} height={100} className="text-green-500" />
        <h2 className="text-3xl text-front-text font-poppins font-bold">{dictionary.thank}</h2>
      </div>

      <Review review={storageReview} />
    </div>
  )

  return (
    mounted &&
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px]">

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center pl-3">
          <SelectImage
            button={
              <button type="button" className="relative group rounded-full shadow-md -mb-5 hover:shadow-xl duration-300">
                <img src={`/avatars/${watch('avatarOption')}.webp`} alt="avatar for review" className="w-20 h-20 max-w-20 max-h-20 rounded-full shadow-md object-cover" />

                <span className="absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 rounded-full backdrop-blur-sm text-white grid place-items-center">
                  <Edit width={40} height={40} />
                </span>
              </button>
            }
            setValue={setValue}
          />

          <input {...register('name')} autoComplete="off" className="w-full h-fit font-poppins text-sm px-5 py-3 rounded-full bg-front-gray shadow-md border border-dashed focus:border-front-text border-transparent outline-none text-front-text" placeholder={dictionary.form.namePlaceholder} />
        </div>

        <textarea {...register("message")} autoComplete="off" className="p-5 rounded-3xl min-h-[220px] max-h-[300px] bg-front-gray shadow-md border border-dashed focus:border-front-text border-transparent outline-none text-front-text" placeholder={dictionary.form.messagePlaceboer} />
      </div>
      <div className="w-full flex items-center justify-between mt-3">
        <input {...register('stars')} type="number" min={1} max={5} className="hidden" />
        <div className='flex gap-1 items-center pl-3'>
          <button type="button" className={`star5 ${watch('stars') === 5 ? 'active' : ''}`} onClick={() => setValue('stars', 5)}>
            <Star size={37} className='text-front-primary duration-200' />
          </button>
          <button type="button" className={`star4 ${watch('stars') === 4 ? 'active' : ''}`} onClick={() => setValue('stars', 4)}>
            <Star size={37} className='text-front-primary duration-200' />
          </button>
          <button type="button" className={`star3 ${watch('stars') === 3 ? 'active' : ''}`} onClick={() => setValue('stars', 3)}>
            <Star size={37} className='text-front-primary duration-200' />
          </button>
          <button type="button" className={`star2 ${watch('stars') === 2 ? 'active' : ''}`} onClick={() => setValue('stars', 2)}>
            <Star size={37} className='text-front-primary duration-200' />
          </button>
          <button type="button" className={`star1 ${watch('stars') === 1 ? 'active' : ''}`} onClick={() => setValue('stars', 1)}>
            <Star size={37} className='text-front-primary duration-200' />
          </button>
        </div>

        <button type="submit" className="font-niconne text-2xl text-front-gray bg-front-primary px-8 py-1 rounded-full shadow-md hover:shadow-xl duration-200 hover:scale-105">{dictionary.form.sendBtn}</button>
      </div>
      
      {
        Object.keys(errors)?.length > 0 &&
        <span className="text-sm font-poppins text-red-500 flex items-star gap-1 p-5">
          <Ban width={18} height={18} />
          {dictionary.form.errorMessage}
        </span>
      }
    </form>
  )
}
