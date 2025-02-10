'use client'
import { Trash2 } from 'lucide-react'
import { toast } from "sonner"
import { LoadingToast, SuccessToast, ErrorToast } from '@/components/Toasts'
import { deletePaint } from '@/actions/Paint'
import { deleteImage } from '@/utils/cloudinary'

export default function DeletPaint({paint, setFilteredPaints, setPaints, setLoading}) {

  const removePaint = async () => {
    const confirm = window.confirm('Estas seguro que deseas eliminar la pintura?')

    if (!confirm) return

    await deleteCloudinaryImages()
    
    toast(<LoadingToast title='Eliminando pintura...' message='Aguarde un momento' />)
    
    const res = deletePaint(paint._id)
    
    setLoading(true)
    if (res) {
      toast(<SuccessToast title='Pintura eliminada!' message='Gracias por tu contribución' />)
      setFilteredPaints((prevPaints) => prevPaints.filter((p) => p._id !== paint._id))
      setPaints((prevPaints) => prevPaints.filter((p) => p._id !== p._id))
    } else {
      toast(<ErrorToast title='Error al eliminar Pintura' message='Por favor, inténtalo de nuevo' />)
    }
    setLoading(false)
  }

  const deleteCloudinaryImages = async () => {

    toast(<LoadingToast title='Eliminando imagenes...' message='Aguarde un momento' />)

    for (const image of paint.images) {
      await deleteImage(image.publicId)
    }
  }

  return (
    <button
      aria-label='Eliminar'
      className='hover:bg-red-500/50 rounded-full p-4 transition duration-300'
      onClick={removePaint}
    >
      <Trash2 width={40} height={40} />
    </button>
  )
}
