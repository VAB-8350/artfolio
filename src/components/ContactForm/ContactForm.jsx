'use client';
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, Ban, Loader2 } from "lucide-react";
import { formSchema } from "./schema"

export default function ContactForm({dictionary}) {

  const schema = formSchema(dictionary)
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema), // Integrar Zod con React Hook Form
  });

  const onSubmit = async (data) => {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify(data)
    })

    const json = await res.json()

    if (json.success) setTimeout(() => reset(), 2000)
    
  }

  return (
    <div className="flex flex-col gap-5 w-full md:w-[400px] relative mt-16 border border-front-text border-dashed rounded-3xl p-5 shadow-md bg-white/30 backdrop-blur-sm">

      <img src="/presentationImages/Romi.jpeg" alt="logo" className="absolute w-[100px] h-[100px] object-cover rounded-full -top-[50px] left-1/2 -translate-x-1/2 shadow-lg border border-front-text" />

      <h3 className="mt-[50px] font-niconne text-4xl text-center text-front-primary">Romina Peruchin</h3>

      {/* <div>social medias</div> */}


      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        
        <div className="flex flex-col">
          <label className="ml-5 font-poppins text-front-text text-base" htmlFor="email">{dictionary.email}</label>

          <input
            disabled={isSubmitting}
            id="email" {...register("email")}
            placeholder={dictionary.emailPlaceholder}
            className="w-full h-fit font-poppins text-sm px-5 py-3 rounded-full bg-front-gray shadow-md border border-dashed focus:border-front-text border-transparent outline-none text-front-text"
          />

          {
            errors.email &&
            <p className="text-xs text-red-400 ml-2 mt-1 flex gap-1">
              <Ban width={14} height={14} /> {errors.email.message}
            </p>
          }
        </div>

        <div className="flex flex-col">
          <label className="ml-5 font-poppins text-front-text text-base" htmlFor="message">{dictionary.message}</label>

          <textarea
            disabled={isSubmitting}
            id="message" {...register("message")}
            placeholder={dictionary.messagePlaceboer}
            className="p-5 rounded-3xl min-h-[220px] max-h-[300px] bg-front-gray shadow-md border border-dashed focus:border-front-text border-transparent outline-none text-front-text text-sm"
          />

          {
            errors.message &&
            <p className="text-xs text-red-400 ml-2 mt-1 flex gap-1">
              <Ban width={14} height={14} />
              {errors.message.message}
            </p>
          }
        </div>

        <div className="w-full flex items-center mt-2">
          {
            isSubmitSuccessful &&
            <span className="text-poppins bg-front-primary/80 text-front-gray h-10 px-4 rounded-full flex gap-2 items-center"><BadgeCheck /> {dictionary.successMessage}</span>
          }
          <button type="submit" disabled={isSubmitting} className="font-niconne text-2xl ml-auto text-front-gray bg-front-primary px-8 py-1 h-10 rounded-full shadow-md hover:shadow-xl duration-200 hover:scale-105">
            {
              isSubmitting
              ? <Loader2 className="animate-spin" />
              : dictionary.sendBtn
            }
          </button>
        </div>
      </form>
    </div>
  )
}