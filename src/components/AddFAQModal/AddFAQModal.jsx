import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import FAQForm from '@/components/AddFAQModal/FAQForm'



export default function AddFAQModal({ initialVal, setInitialVal, setOpen, loading, defaultVal }) {

  return (
    <>
      <DialogTrigger asChild>
        <Button className='font-bold' disabled={loading} onClick={() => setInitialVal(defaultVal)}>
          Agregar FAQ
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>Agregar una pregunta frecuente</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Agregar una pregunta frecuente para que los usuarios puedan resolver sus dudas en español y ingles.
        </DialogDescription>

        <FAQForm initialVal={initialVal} setOpen={setOpen} />

      </DialogContent>
    </>
  )
}
