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
import { formSchema } from "./schema"
import { Card, CardFooter, CardHeader } from '../ui/card'
import { updateSocialMedias } from '@/actions/SocialMedia'
import { SuccessToast, ErrorToast } from '@/components/Toasts'
import { toast } from "sonner"
import { LoaderCircle } from 'lucide-react'
import {
  X,
  Facebook,
  Instagram,
  WhatsApp,
  Telegram,
  Linkedin,
  Tiktok,
  Youtube,
  Threads,
  Pinterest
} from "../SocialMediaIcons"

const socialMediasOptions = {
  facebook: {
    name: 'Facebook',
    url: '',
  },
  instagram: {
    name: 'Instagram',
    url: '',
  },
  whatsapp: {
    name: 'WhatsApp',
    url: '',
  },
  telegram: {
    name: 'Telegram',
    url: '',
  },
  linkedin: {
    name: 'LinkedIn',
    url: '',
  },
  tiktok: {
    name: 'TikTok',
    url: '',
  },
  youtube: {
    name: 'YouTube',
    url: '',
  },
  threads: {
    name: 'Threads',
    url: '',
  },
  pinterest: {
    name: 'Pinterest',
    url: '',
  },
  x: {
    name: 'X',
    url: '',
  }
}

export default function SocialMediaForm({initialVal}) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialVal ?? socialMediasOptions,
  })
  const { formState: { isSubmitting } } = form

  const onSubmit = async (data) => {
    const res = await updateSocialMedias(data)

    if (res) {
      toast(<SuccessToast title='Redes Sociales actualizadas!' message='Gracias por tu contribución' />)
    } else {
      toast(<ErrorToast title='Error al actualizar las Redes' message='Por favor, inténtalo de nuevo' />)
    }
  }

  const Icons = ({name}) => {
    const size = 30
    return (
      <>
        {
          name === 'X'&&
          <X width={size} height={size} />
        }
        {
          name === 'Facebook'&&
          <Facebook width={size} height={size} />
        }
        {
          name === 'Instagram'&&
          <Instagram width={size} height={size} />
        }
        {
          name === 'WhatsApp'&&
          <WhatsApp width={size} height={size} />
        }
        {
          name === 'Telegram'&&
          <Telegram width={size} height={size} />
        }
        {
          name === 'LinkedIn'&&
          <Linkedin width={size} height={size} />
        }
        {
          name === 'TikTok'&&
          <Tiktok width={size} height={size} />
        }
        {
          name === 'YouTube'&&
          <Youtube width={size} height={size} />
        }
        {
          name === 'Threads'&&
          <Threads width={size} height={size} />
        }
        {
          name === 'Pinterest'&&
          <Pinterest width={size} height={size} />
        } 
      </>
    )
  }

  return (

    <div>
      <Form {...form} id="social-medias-form">
        <Card className='p-4'>
          <CardHeader className='p-0 mb-5'>
            <h3 className='text-center font-bold text-2xl'>Agrega las redes sociales que usas</h3>
          </CardHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-1 gap-4 md:grid-cols-2' id="social-medias">

            {
              Object.entries(socialMediasOptions).map(([key, value]) => (
                <FormField
                  key={key}
                  className='w-full'
                  control={form.control}
                  name={`${key}.url`}
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      
                      <FormLabel htmlFor={field.name} className='flex items-end gap-2'>
                        {value.name}
                      </FormLabel>
                      
                      <div className='flex gap-2 items-center w-full'>
                        <Icons name={value.name} />

                        <FormControl>
                          <Input disabled={isSubmitting} id={field.name} {...field} />
                        </FormControl>
                      </div>
                      
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))
            }
          </form>

          <CardFooter className='flex justify-end mt-5 p-0'>
            <Button type="submit" className='font-bold' disabled={isSubmitting} form="social-medias">
              {
                isSubmitting
                ? <>Guardando <LoaderCircle className='animate-spin' /></>
                : 'Guardar'
              }
            </Button>
          </CardFooter>
        </Card>
      </Form>
    </div>
  )
}
