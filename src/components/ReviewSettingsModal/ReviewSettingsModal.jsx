'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LoaderCircle, Ruler } from "lucide-react"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { getMaxReviews, updateMaxReviews } from "@/actions/Review"
import { toast } from "sonner"
import { ErrorToast, SuccessToast } from "../Toasts"



export default function ReviewSettingsModal() {

  const [open, setOpen] = useState(false)
  const [maxReviews, setMaxReviews] = useState(10)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getmaxReviewsDB()
  }, [loading])

  const getmaxReviewsDB = async () => {
    const res = await getMaxReviews()
    if (res) setMaxReviews(res.maxReviews)
  }

  const sendNewMax = async () => {
    setLoading(true)
    const res = await updateMaxReviews({maxReviews :maxReviews})
    if (res) {
      setMaxReviews(maxReviews)
      getmaxReviewsDB()
      toast(<SuccessToast title='Limite actualizado' message='Se han actualizado los reviews' />)
    } else {
      toast(<ErrorToast title='No se pudo actualizar' message='Intenta de nuevo' />)
    }
    setOpen(false)
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='font-bold'>
          <Ruler />
          Limite de Reviews
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configurar Reviews</DialogTitle>
          <DialogDescription>
            Cuantas reviews quieres recibir como maximo?
          </DialogDescription>
        </DialogHeader>

        <Input min='10' max='10000' type='number' placeholder='Ingrese un numero' onChange={(e) => setMaxReviews(e.target.value)} value={maxReviews} />

        <Button className='font-bold' onClick={sendNewMax} disabled={loading}>
          {
            loading
            ? <>Guardando <LoaderCircle className='animate-spin' /></>
            : 'Guardar'
          }
        </Button>

      </DialogContent>
    </Dialog>
  )
}
