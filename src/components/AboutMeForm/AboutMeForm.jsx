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
import { updateAboutUs } from '@/actions/AboutMe'
import { toast } from "sonner"
import { SuccessToast, ErrorToast } from '@/components/Toasts'
import { LoaderCircle } from 'lucide-react'


export default function AboutMeForm({ initialVal }) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialVal,
  })

  const { formState: { isSubmitting } } = form

  const onSubmit = async (data) => {

    const res = await updateAboutUs(data)
    if (res) {
      toast(<SuccessToast title='About Me actualizado!' message='Gracias por tu contribución' />)
    } else {
      toast(<ErrorToast title='Error al actualizar About Me' message='Por favor, inténtalo de nuevo' />)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name="aboutSpanish"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name} className='font-bold'>Español</FormLabel>
                
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="Escribe un poco sobre ti"
                    className="resize-none h-96"
                    {...field}
                  />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aboutEnglish"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name} className='font-bold'>Ingles</FormLabel>

                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none h-96"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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
