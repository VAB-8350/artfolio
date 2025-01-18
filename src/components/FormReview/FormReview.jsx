'use client'

import { useForm } from "react-hook-form"
import AvatarCarousel from './AvatarCarousel'
import { Star } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "./schema" 
import { addReview } from "@/actions/Review"

export default function FormReview() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit =  async (data) => {
    console.log(data)

    const body = {...data, visible: false}

    const res = await addReview(body)
    console.log(res)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AvatarCarousel setValue={setValue} />

      <div className="flex flex-col gap-2">
        <input {...register('name')} />

        <textarea {...register("message")} />
      </div>

      <input {...register('stars')} type="number" min={1} max={5} className="hidden" />

      <div className='flex gap-1 items-center'>
        <button type="button" onClick={() => setValue('stars', 1)}>
          <Star size={15} className='text-yellow-400 fill-yellow-400' />
        </button>
        <button type="button" onClick={() => setValue('stars', 2)}>
          <Star size={15} className='text-yellow-400 fill-yellow-400' />
        </button>
        <button type="button" onClick={() => setValue('stars', 3)}>
          <Star size={15} className='text-yellow-400 fill-yellow-400' />
        </button>
        <button type="button" onClick={() => setValue('stars', 4)}>
          <Star size={15} className='text-yellow-400 fill-yellow-400' />
        </button>
        <button type="button" onClick={() => setValue('stars', 5)}>
          <Star size={15} className='text-yellow-400 fill-yellow-400' />
        </button>
      </div>

      <button type="submit" className="bg-red-200">Submit</button>
    </form>
  )
}
