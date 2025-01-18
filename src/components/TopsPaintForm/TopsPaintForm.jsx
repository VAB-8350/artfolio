'use client'

import { Input } from '@/components/ui/input'
import { Plus, Search, Trash2 } from 'lucide-react'
import AdminProduct from '@/components/AdminProduct/AdminProduct'
import { getAllPaints } from '@/actions/Paint'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { getTopWorks, uploadTopWork } from '@/actions/TopWorks'
import { getTopPaints, uploadTopPaint } from '@/actions/TopPaints'
import { toast } from 'sonner'
import { ErrorToast, SuccessToast } from '../Toasts'
import { Skeleton } from '../ui/skeleton'
import { Bold, EmptyStatus } from '../EmptyStatus'

export default function TopsPaintForm({view}) {

  const [search, setSearch] = useState('')
  const [filteredPaints, setFilteredPaints] = useState([])
  const [paints, setPaints] = useState([])
  const [topWorks, setTopWorks] = useState([])
  const [topWorksIds, setTopWorksIds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPaints()
    getTopWorksDB()
  }, [])

  useEffect(() => {
    if (paints.length > 0) {
      if (search.length > 0) {
        const filtred = paints.filter((paint) =>
          paint.titleSpanish?.toLowerCase().includes(search.toLowerCase()) ||
          paint.titleEnglish?.toLowerCase().includes(search.toLowerCase()) ||
          paint.categories.map((category) =>
            category.spanishName?.toLowerCase().includes(search.toLowerCase()) ||
            category.englishName?.toLowerCase().includes(search.toLowerCase())).includes(true)
        )
        setFilteredPaints(filtred)
      } else {
        setFilteredPaints(paints)
      }
    }
  }, [search])

  const getPaints = async () => {
    setLoading(true)
    const response = await getAllPaints()
    response.reverse()
    setPaints(response)
    setFilteredPaints(response)
    setLoading(false)
  }

  const getTopWorksDB = async () => {
    setLoading(true)
    let response
    if (view === 'TopWorks') {
      response = await getTopWorks()
    } else {
      response = await getTopPaints()
    }

    const data =  view === 'TopWorks' ? response.topWorks : response.topPaints

    setTopWorks(data)
    setTopWorksIds(data.map((work) => work._id))
    setLoading(false)
  }

  const uploadTop = async () => {
    setLoading(true)
    let response

    if (view === 'TopWorks') {
      response = await uploadTopWork({topWorks: topWorksIds})
    } else {
      response = await uploadTopPaint({topPaints: topWorksIds})
    }
    
    if (response) {
      toast(<SuccessToast title={'Top Obras guardadas'} message={'Gracias por tu contribución'} />)
    } else {
      toast(<ErrorToast title={'Error al guardar'} message={'Intenta de nuevo'} />)
    }
    setLoading(false)
  }

  const SkeletonPaint = () => {
    return (
      loading &&
      <>
        <div>
          <Skeleton className='w-full h-56 rounded-lg mb-3' />
          <Skeleton className='w-1/2 h-4 rounded-lg' />
        </div>
        <div>
          <Skeleton className='w-full h-56 rounded-lg mb-3' />
          <Skeleton className='w-2/3 h-4 rounded-lg' />
        </div>
      </>
    )
  }

  return (
    <div className='flex gap-4 h-full'>

      <div className='w-full flex flex-col'>

        <h3 className='text-start font-bold text-2xl'>Todas las obras</h3>

        {/* Search */}
        <div className='max-w-[400px] w-full mx-auto my-4'>
          <div className='relative'>
            <Input placeholder='Titulo de la pintura' id='search-paint' onChange={(e) => setSearch(e.target.value)} value={search} />
            <button className='absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-200'>
              <Search size={17} />
            </button>
          </div>
        </div>

        {/* Listado de obras */}
        <div className='overflow-auto h-full flex flex-col'>
          <section className='grid grid-cols-1 gap-4 md:grid-cols-3 pb-4'>
            {
              !loading &&
              filteredPaints.map((paint) => (
                paint.visible &&
                <AdminProduct
                  key={paint._id}
                  title={paint.titleSpanish}
                  img={paint.images[0].url}
                  action={
                    <button
                      aria-label='Agregar'
                      className='hover:text-purple-500 hover:bg-white/50 rounded-full p-4 transition duration-300'
                      onClick={() => {
                        if (topWorks.length < 5 && !topWorksIds.includes(paint._id)) {
                          setTopWorks([...topWorks, paint])
                          setTopWorksIds([...topWorksIds, paint._id])
                        }
                      }}
                    >
                      <Plus width={40} height={40} />
                    </button>
                  }
                />
              ))
            }
            <SkeletonPaint />
          </section>

          {
            !loading && filteredPaints.length === 0 &&
            <div className='flex-grow mb-[45px]'>
              <EmptyStatus
                title="No hay pinturas para mostrar."
                subtitle='Talvez debes agregar una o buscarla de otra forma.'
              />
            </div>
          }
        </div>

      </div>

      <Separator orientation='vertical' />

      {/* Top de obras */}
      <div className='w-full flex flex-col'>
        <div className='flex justify-between'>
          <h3 className='text-center font-bold text-2xl'>Obras seleccionadas</h3>
          <Button className='font-bold' onClick={uploadTop}>Guardar</Button>
        </div>

        <section className='grid grid-cols-1 gap-4 md:grid-cols-3 mt-[62px]'>

          {
            !loading &&
            topWorks.map((topWork) => (
              <AdminProduct
                key={topWork?._id}
                title={topWork?.titleSpanish}
                img={topWork?.images[0].url}
                action={
                  <button
                    onClick={() => {
                      setTopWorks(topWorks.filter((work) => work._id !== topWork._id))
                      setTopWorksIds(topWorksIds.filter((id) => id !== topWork._id))
                    }}
                    aria-label='Eliminar'
                    className='hover:text-red-500 hover:bg-white/50 rounded-full p-4 transition duration-300'
                  >
                    <Trash2 width={40} height={40} />
                  </button>
                }
              />
            ))
          }
          <SkeletonPaint />
        </section>

        {
          !loading && topWorks.length === 0 &&
          <div className='flex flex-grow'>
            <EmptyStatus
              height='83%'
              title="No hay obras seleccionadas."
              subtitle={<>Puedes agregar una obra a través del botón <Bold>"Plus (+)"</Bold> en las pinturas del lado izquierdo.</>}
            />
          </div>
        }
      </div>
    </div>
  )
}
