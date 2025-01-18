"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ErrorToast, SuccessToast } from '@/components/Toasts'
import { toast } from "sonner"
import { formSchema } from "./schema"
import { addCategory, updateCategory } from '@/actions/Category'
import { LoaderCircle } from 'lucide-react'

export default function CategoryForm({ initialVal, setOpen }) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialVal,
  })
  const { formState: { isSubmitting } } = form

  const onSubmit = async (data) => {

    let response
    if (!initialVal._id) {
      response = await addCategory(data)
    } else {
      response = await updateCategory(initialVal._id, data)
    }

    if (response) {
      toast(<SuccessToast title='Categoria publicada!' message='Gracias por tu contribución' />)
    } else {
      toast(<ErrorToast title='Error al actualizar Categoria' message='Asegurate que no existe otra con el mismo nombre.' />)
    }

    setOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name="spanishName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Español</FormLabel>
              
              <FormControl>
                <Input id={field.name} placeholder="Nombre" {...field} disabled={isSubmitting} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="englishName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Ingles</FormLabel>

              <FormControl>
                <Input id={field.name} placeholder="Name" {...field} disabled={isSubmitting} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="visible"
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-2'>
                <FormLabel htmlFor={field.name}> Visible </FormLabel>

                <FormControl>
                  <Switch
                    disabled={isSubmitting}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>

              <FormDescription>
                Si está activo, los usuarios podrán ver la categoría.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className='font-bold' disabled={isSubmitting}>
          {
            isSubmitting
            ? <>Guardando <LoaderCircle className='animate-spin' /></>
            : 'Guardar'
          }
        </Button>
      </form>
    </Form>
  )
}
