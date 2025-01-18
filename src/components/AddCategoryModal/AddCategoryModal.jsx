import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CategoryForm from "./CategoryForm"

const defaultVal = {
  visible: false,
  englishName: '',
  spanishName: '',
}

export default function AddCategoryModal({ initialVal, setInitialVal, setOpen, loading }) {

  
  return (
    <>
      <DialogTrigger asChild>
        <Button className='font-bold' onClick={() => setInitialVal(defaultVal)} disabled={loading}>Agregar Categoria</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Categoria</DialogTitle>
          <DialogDescription>
            Agregar una nueva categoria en ingles y español.
          </DialogDescription>
        </DialogHeader>

        <CategoryForm initialVal={initialVal} setOpen={setOpen} />

      </DialogContent>
    </>
  )
}
