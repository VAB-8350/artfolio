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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { formSchema } from "./schema"
import { updateUser, addUser } from "@/actions/User"
import { LoaderCircle } from 'lucide-react'
import { ROLES } from '@/utils/roles'

export default function AdminForm({ initialVal, setOpen }) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialVal,
  })

  const { formState: { isSubmitting } } = form

  const onSubmit = async (data) => {

    if (initialVal.id) {
      await updateUser(initialVal.id, data)
    } else {
      await addUser(data)
    }

    setTimeout(() => setOpen(false), 100)
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Nombre</FormLabel>
              
              <FormControl>
                <Input id={field.name} placeholder="Romi Peruchin" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Email</FormLabel>

              <FormControl>
                <Input id={field.name} placeholder="romi@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={ROLES.ADMIN}>{ROLES.ADMIN}</SelectItem>
                  <SelectItem value={ROLES.SUPER_ADMIN}>{ROLES.SUPER_ADMIN}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className='font-bold mt-2' disabled={isSubmitting}>
          {isSubmitting ? <LoaderCircle className='animate-spin' /> : 'Guardar'}
        </Button>
      </form>
    </Form>
  )
}
