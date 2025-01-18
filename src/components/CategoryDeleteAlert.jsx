'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"



export default function CategoryDeleteAlert({open, setOpen, paintOnlyCat, isSpanish}) {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Error al eliminar la categoría</DialogTitle>
          <DialogDescription>
            Tienes algunas pinturas que solo tienen esta categoría. Agrega una nueva categoría o elimina las pinturas asociadas antes de eliminar la categoría.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-5 text-white/70">
          {
            paintOnlyCat.length > 3
            ? <p>Estos son algunas de las pinturas asociadas a la categoría:</p>
            : <p>Estas son las pinturas asociadas a la categoría:</p>
          }
          <ul className="list-disc pl-4 ml-5">
            {
              paintOnlyCat?.length > 0 &&
              paintOnlyCat.slice(0, 3).map((paint) => (
                <li key={paint._id}>{isSpanish ? paint.titleSpanish : paint.titleEnglish}</li>
              ))
            }
          </ul>
        </div>

        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" className='font-bold'>
              Entendido
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
