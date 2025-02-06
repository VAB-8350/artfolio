import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { avatarOptions } from '@/config.json'
import { useState } from "react"

export function SelectImage({button, setValue}) {

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen} className='bg-transparent' >
      <DialogTrigger asChild>
        {button}
      </DialogTrigger>

      <DialogContent className="max-w-[calc(100%-40px)] md:max-w-[425px] bg-white/30 backdrop-blur-sm border-none rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle className='text-front-background'>Selecciona tu foto favorita</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 items-center max-w-full flex-wrap justify-center">
          {
            Array.from({ length: avatarOptions }).map((_, i) => (
              <button key={i} type="button" onClick={() => {setValue('avatarOption', i + 1); setOpen(false)}} className="rounded-full shadow-md overflow-hidden hover:shadow-xl duration-200 border-2 border-transparent hover:border-front-background" >
                <img src={`/avatars/${i + 1}.webp`} alt="avatar for review" className="w-16 h-16 max-w-16 max-h-16 object-cover" />
              </button>
            ))
          }
        </div>
      </DialogContent>
    </Dialog>
  )
}
