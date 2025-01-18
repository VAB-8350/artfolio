import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AdminForm from "./AdminForm"
import { ROLES } from "@/utils/roles"

const defaultVal = {
  name: '',
  email: '',
  role: 'Admin',
}

export default function AddAdminsModal({ initialVal, setInitialVal, setOpen }) {

  
  return (
    <>
      <DialogTrigger asChild>
        <Button className='font-bold' onClick={() => setInitialVal(defaultVal)}>Agregar un admin</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Admin</DialogTitle>
          <DialogDescription>
            Los Admin tienen permisos para administrar el sitio, y los {ROLES.SUPER_ADMIN} pueden modificar los admins.
          </DialogDescription>
        </DialogHeader>

        <AdminForm initialVal={initialVal} setOpen={setOpen} />
      </DialogContent>
    </>
  )
}
