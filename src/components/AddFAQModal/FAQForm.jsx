"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { formSchema } from "./schema"
import { Input } from '../ui/input'
import { SuccessToast, ErrorToast } from '@/components/Toasts'
import { toast } from "sonner"
import { addFAQ, updateFAQ } from '@/actions/FAQ'
import { LoaderCircle } from 'lucide-react'

export default function FAQForm({ initialVal: initialVal, setOpen }) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialVal,
  })
  const { formState: { isSubmitting } } = form

  const onSubmit = async (data) => {

    let response = false
    if (initialVal._id) {
      response = await updateFAQ(initialVal._id, data)
    } else {
      response = await addFAQ(data)
    }

    if (response) {
      toast(<SuccessToast title='FAQ publicada!' message='Gracias por tu contribución' />)
    } else {
      toast(<ErrorToast title='Error al publicar FAQ' message='Vuelve a intentarlo' />)
    }

    setTimeout(() => setOpen(false), 100)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>

        <div className='grid md:grid-cols-2 gap-4'>

          <div className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name="askSpanish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Pregunta en español</FormLabel>
                  
                  <FormControl>
                    <Input id={field.name} placeholder="Ingrese una pregunta" {...field} disabled={isSubmitting} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="answerSpanish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Respuesta en español</FormLabel>
                  
                  <FormControl>
                    <Textarea
                      placeholder="Respuesta de la pregunta"
                      className="resize-none h-60"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name="askEnglish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Pregunta en ingles</FormLabel>
                  
                  <FormControl>
                    <Input id={field.name} placeholder="Ingrese una pregunta" {...field} disabled={isSubmitting} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="answerEnglish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Respuesta en ingles</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="Respuesta de la pregunta"
                      className="resize-none h-60"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className='flex justify-end'>
          <Button type="submit" className='font-bold' disabled={isSubmitting}>
            {
              isSubmitting
              ? <>Guardando <LoaderCircle className='animate-spin' /></>
              : 'Guardar'
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}
