"use client"

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
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from '@/components/ui/separator'
import { formSchema } from "./schema"
import useImagesInput from '@/components/AddPaintsComponents/useImagesInput'
import SelectCategories from '@/components/AddPaintsComponents/SelectCategories'
import { addPaint, updatePaint } from "@/actions/Paint"
import { uploadImage, deleteImage } from "@/utils/cloudinary"
import { LoaderCircle } from "lucide-react"
import { ErrorToast, SuccessToast } from '@/components/Toasts'
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function PaintForm({initialValues}) {

  // parsed images
  const parsedImages = initialValues?.images?.map((image) => ({...image, id: image.url}))

  const router = useRouter()
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: initialValues ?? {
      visible: false,
      categories: [],
      year: new Date().getFullYear().toString(),
      titleSpanish: "",
      titleEnglish: "",
      descriptionSpanish: "",
      descriptionEnglish: "",
    },
  })
  const {formState: {isSubmitting}} = form
  const {render: renderImages, images} = useImagesInput({initialImages: parsedImages ?? [], isSubmitting})

  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')

  // Methods
  const onSubmit = async () => {

    setLoading(true)
    const isNewPaint = !initialValues

    if (!isNewPaint) await updateCloudinaryDeletes()
    await sendImagesToCloudinary()

    const newPaint = form.getValues()

    setLoadingMessage('Guardando datos en la base de datos...')
    let res
    if (isNewPaint) {
      res = await addPaint(newPaint)
    } else {
      res = await updatePaint(initialValues._id, newPaint)
    }

    setLoading(false)
    setLoadingMessage('')

    if (res) {
      toast(<SuccessToast title={isNewPaint ? 'Pintura agregada!' : 'Pintura actualizada!'} message='Gracias por tu contribución' />)
    } else {
      toast(<ErrorToast title={isNewPaint ? 'Error al agregar pintura' : 'Error al actualizar pintura'} message='Por favor, inténtalo de nuevo' />)
    }

    router.push('/admin/pinturas')
  }

  const sendImagesToCloudinary = async () => {

    setLoadingMessage('Subiendo imágenes a Cloudinary...')
    const imagesToSave = []
    for (const obj of images) {

      const isDBImage = !!obj.publicId

      if (isDBImage) {
        const dbImage = {
          url: obj.url,
          publicId: obj.publicId,
        }
        imagesToSave.push(dbImage)
      } else {
        const img = obj.file
        const data = await uploadImage(img)
        imagesToSave.push(data)
      }
    }

    form.setValue('images', imagesToSave)
  }

  const updateCloudinaryDeletes = async () => {

    const saveImagesIds = images.map((image) => image.id)
    const arrayDeleteImages = parsedImages.filter((image) => !saveImagesIds.includes(image.id))

    if (arrayDeleteImages.length === 0) return

    setLoadingMessage('Eliminando imágenes de Cloudinary...')
    for (const image of arrayDeleteImages) {
      const res = await deleteImage(image.publicId)
      if (res.result === 'ok') {
        toast(<SuccessToast title='Imagen eliminada' message='Gracias por tu contribución' />)
      } else {
        toast(<ErrorToast title='Error al eliminar una imagen' message='ha ocurrido algun error inesperado' />)
      }
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full lg:max-w-[1000px] mx-auto'>

        {/* Loading */}
        {
          loading &&
          <div
            className="grid place-content-center fixed inset-0 z-50 bg-black/50 w-full h-full backdrop-blur-sm"
          >
            <h2 className="font-bold text-2xl">Esto puede tomar unos cuantos segundos.</h2>
            {
              loadingMessage.length > 0 &&
              <div className="flex items-center gap-2 mt-2 mx-auto">
                <LoaderCircle className='animate-spin' />
                <p className="text-center text-white">{loadingMessage}</p>
              </div>
            }
          </div>
        }

        <div className='flex flex-col gap-3'>
          <div className='w-full flex justify-between items-center'>
            <label className='font-bold text-lg'>Imagenes de pintura</label>

            <FormField
              control={form.control}
              name="visible"
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center gap-2'>
                    <FormLabel htmlFor={field.name}> Visible </FormLabel>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            {renderImages}
          </div>
        </div>

        <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>

          <SelectCategories form={form} initialCategories={initialValues?.categories} />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>Año de creacion</FormLabel>
                
                <FormControl>
                  <Input id={field.name} placeholder="2015" type="number" min='2000' {...field} disabled={isSubmitting} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />

        </section>

        
        <section className='w-full flex flex-col md:flex-row gap-4 mt-4'>
          <div className='flex flex-col gap-4 w-full'>
            <h1 className='text-center font-bold text-2xl'>Español</h1>

            <FormField
              control={form.control}
              name="titleSpanish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Titulo</FormLabel>
                  
                  <FormControl>
                    <Input id={field.name} placeholder="Titulo de la pintura" {...field} disabled={isSubmitting} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descriptionSpanish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className='font-bold'>Descripcion</FormLabel>
  
                  <FormControl>
                    <Textarea
                      placeholder="Escribe un poco sobre la pintura"
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

          <Separator orientation='vertical' className='hidden md:block'/>

          <div className='flex flex-col gap-4 w-full'>
            <h1 className='text-center font-bold text-2xl'>Ingles</h1>

            <FormField
              control={form.control}
              name="titleEnglish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Titulo</FormLabel>
                  
                  <FormControl>
                    <Input id={field.name} placeholder="Titulo de la pintura" {...field} disabled={isSubmitting} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descriptionEnglish"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className='font-bold'>Descripcion</FormLabel>
  
                  <FormControl>
                    <Textarea
                      placeholder="Escribe un poco sobre la pintura"
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
        </section>
        
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
