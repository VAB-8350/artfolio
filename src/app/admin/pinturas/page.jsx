'use client'
import AdminHeader from '@/components/admin-header'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Languages, Pencil, Search } from 'lucide-react'
import Link from 'next/link'
import AdminProduct from '@/components/AdminProduct/AdminProduct'
import { getAllPaints } from '@/actions/Paint'
import DeletePaint from '@/components/AddPaintsComponents/DeletPaint'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Bold, EmptyStatus } from '@/components/EmptyStatus'

export default function page() {

  const [search, setSearch] = useState('')
  const [filteredPaints, setFilteredPaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSpanish, setIsSpanish] = useState(true)
  const [paints, setPaints] = useState([])

  useEffect(() => {
    getPaints()
  }, [])

  useEffect(() => {
    if (paints.length > 0) {
      if (search.length > 0) {
        const filtred = paints.filter((paint) => 
          paint.titleSpanish.toLowerCase().includes(search.toLowerCase()) ||
          paint.titleEnglish.toLowerCase().includes(search.toLowerCase()) ||
          paint.categories.map((category) =>
            category.spanishName.toLowerCase().includes(search.toLowerCase()) ||
            category.englishName.toLowerCase().includes(search.toLowerCase())).includes(true)
        )
        setFilteredPaints(filtred)
      } else {
        setFilteredPaints(paints)
      }
    }
  }, [search])

  const getPaints = async () => {
    setLoading(true)
    const res = await getAllPaints(true)
    res.reverse()
    setFilteredPaints(res)
    setPaints(res)
    setLoading(false)
  }

  return (
    <>
      <AdminHeader title='Pinturas'>
        <div className='flex gap-4'>
          <Button onClick={() => setIsSpanish(!isSpanish)} className='font-bold'>
            <Languages />
            {isSpanish ? 'English' : 'Español'}
          </Button>

          <Button className='font-bold' asChild>
            <Link href='/admin/pinturas/add'>
              Agregar Pintura
            </Link>
          </Button>
        </div>
      </AdminHeader>

      <div className='relative w-[500px] mx-auto'>
        <Input placeholder='Titulo / Categoria de la pintura' id='search-paint' onChange={(e) => setSearch(e.target.value)} value={search} />
        <button className='absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-200'>
          <Search size={17} />
        </button>
      </div>

      {
        !loading && filteredPaints.length === 0 &&
        <EmptyStatus
          title="No hay pinturas aún."
          subtitle={<>Puedes agregar una pintura a través del botón <Bold>Agregar pintura</Bold>.</>}
        />
      }

      <section className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>

        {
          !loading &&
          filteredPaints.map((paint) => (
            <AdminProduct
              showActive
              active={paint.visible}
              key={paint._id}
              title={isSpanish ? paint.titleSpanish : paint.titleEnglish}
              img={paint.images[0].url}
              year={paint.year}
              action={
                <>
                  <Link
                    href={`/admin/pinturas/edit/${paint._id}`}
                    aria-label='Editar'
                    className='hover:text-cyan-500 hover:bg-white/50 rounded-full p-4 transition duration-300'
                  >
                    <Pencil width={40} height={40} />
                  </Link>

                  <Separator orientation='vertical' className='bg-white' />

                  <DeletePaint paint={paint} setFilteredPaints={setFilteredPaints} setPaints={setPaints} setLoading={setLoading} />
                </>
              }
            />
          ))
        }

        {
          loading &&
          <>
            <div>
              <Skeleton className='w-full h-56 rounded-lg mb-3' />
              <Skeleton className='w-[200px] h-4 rounded-lg' />
            </div>
            <div>
              <Skeleton className='w-full h-56 rounded-lg mb-3' />
              <Skeleton className='w-[250px] h-4 rounded-lg' />
            </div>
          </>
        }

      </section>
    </>
  )
}
