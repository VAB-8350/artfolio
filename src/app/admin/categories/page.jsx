'use client'

import { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Trash2, Pencil, Languages } from "lucide-react"
import AdminHeader from '@/components/admin-header'
import AddCategoryModal from '@/components/AddCategoryModal/AddCategoryModal'
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { getAllCategories } from '@/actions/Category'
import { deleteCategory } from '@/actions/Category'
import { ErrorToast, SuccessToast } from '@/components/Toasts'
import { toast } from "sonner"
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import CategoryDeleteAlert from '@/components/CategoryDeleteAlert'
import { Bold, EmptyStatus } from '@/components/EmptyStatus'

export default function page() {

  const [paintOnlyCat, setPaintOnlyCat] = useState([])
  const [loading, setLoading] = useState(true)
  const [spanish, setSpanish] = useState(true)
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [initialValue, setInitialValue] = useState({
    visible: false,
    spanishCat: '',
    englishCat: '',
  })

  useEffect(() => {
    !open && getCategories()
  }, [open])

  // Methods
  const getCategories = async () => {
    setLoading(true)
    const response = await getAllCategories()
    setCategories(response)
    setLoading(false)
  }

  const removeCategory = async (category) => {
    setLoading(true)
    const confirm = window.confirm(`Estas seguro que deseas eliminar la categoria "${category.spanishName}"?`)
    if (!confirm) {setLoading(false); return}

    const res = await deleteCategory(category._id)

    if (res.paintsWithCategory) setPaintOnlyCat(res.paintsWithCategory)

    if (res?.success) {
      toast(<SuccessToast title='Categoria eliminada!' message='Gracias por tu contribución' />)
      getCategories()
    } else {
      toast(<ErrorToast title='Error al eliminar Categoria' message={res.message} />)
    }
    setLoading(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <AdminHeader title='Categorias'>
          <div className='flex gap-4'>
            <Button className='font-bold' onClick={() => setSpanish(!spanish)}>
              <Languages />
              {spanish ? 'English' : 'Español'}
            </Button>
            <AddCategoryModal initialVal={initialValue} setInitialVal={setInitialValue} setOpen={setOpen} loading={loading} />
          </div>
        </AdminHeader>

        {
          !loading && categories.length === 0 &&
          <EmptyStatus
            title='No hay categorias'
            subtitle={<>Añade una nueva categoría para empezar usando el boton <Bold>"Agregar Categoria"</Bold>.</>}
          />
        }

        <div className='grid h-14 place-items-center grid-cols-1 gap-4 md:grid-cols-4'>
          {
            !loading &&
            categories.map((category) => (
              <Card className='w-full h-full' key={category._id}>
                <CardHeader>
                  <CardTitle>
                    <div className='flex items-center gap-2 justify-between'>
                      
                      <div className='flex items-center gap-2 w-[calc(100% - 50px)]'>
                        <span className={`flex min-w-3 min-h-3 rounded-full ${category.visible ? 'bg-green-500' : 'bg-red-500'}`} />
                        <h4 className='text-ellipsis overflow-hidden text-nowrap w-full'>
                          {spanish ? category.spanishName : category.englishName}
                        </h4>
                      </div>

                      <div className='flex items-center gap-3'>
                        <DialogTrigger asChild>
                          <button disabled={loading} className='text-white hover:text-cyan-500 duration-300 outline-none disabled:opacity-50 disabled:text-slate-500' onClick={() => setInitialValue(category)}>
                            <Pencil width={17} height={17} />
                          </button>
                        </DialogTrigger>

                        <button disabled={loading} className='text-red-500 hover:opacity-50 duration-300 outline-none disabled:opacity-50 disabled:text-slate-500' onClick={() => removeCategory(category)}>
                          <Trash2 width={17} height={17} />
                        </button>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))
          }

          {/* skeleton loader */}
          {
            loading &&
            <>
              <Skeleton className='w-full h-[65px] rounded-lg' />
              <Skeleton className='w-full h-[65px] rounded-lg' />
              <Skeleton className='w-full h-[65px] rounded-lg' />
              <Skeleton className='w-full h-[65px] rounded-lg' />
              <Skeleton className='w-full h-[65px] rounded-lg' />
            </>
          }
        </div>
      </Dialog>

      <CategoryDeleteAlert open={paintOnlyCat.length > 0} setOpen={setPaintOnlyCat} paintOnlyCat={paintOnlyCat} isSpanish={spanish} />
    </>
  )
}
