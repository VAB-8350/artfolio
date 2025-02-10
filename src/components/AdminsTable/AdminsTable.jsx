'use client'

import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash2, Pencil } from "lucide-react"
import { DialogTrigger } from "@/components/ui/dialog"
import { getAllUsers, deleteUser } from '@/actions/User'
import { Skeleton } from "../ui/skeleton"
import { useSession } from "next-auth/react"
import { ROLES } from "@/utils/roles"

export default function AdminsTable({setInitialVal, open}) {

  const { data: session } = useSession()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!open) getUsers()
  }, [open])

  // Methods
  const getUsers = async () => {
    setLoading(true)
    const response = await getAllUsers()
    setUsers(response)
    setLoading(false)
  }

  const deleteAdmin = async (user) => {
    const { _id: id, email } = user
    const confirm = window.confirm(`Estas seguro que deseas eliminar a ${email}?`)
    if (!confirm) return

    setLoading(true)
    await deleteUser(id)
    setUsers(users.filter(user => user._id !== id))
    setLoading(false)
  }

  const changeInitialVal = (name, email, role, id) => {
    setInitialVal({name,email,role,id})
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='font-bold'>Name</TableHead>
          <TableHead className='font-bold'>Email</TableHead>
          <TableHead className='font-bold'>Role</TableHead>
          {
            session?.user?.role === ROLES.SUPER_ADMIN &&
            <TableHead className="text-right font-bold">Actions</TableHead>
          }
        </TableRow>
      </TableHeader>

      <TableBody>
        {!loading && users.map((admin) => (
          <TableRow key={admin.email}>
            <TableCell className="font-medium">{admin.name}</TableCell>
            <TableCell>{admin.email}</TableCell>

            <TableCell>
              <span className={`${admin.role === 'Admin' ? 'bg-green-500' : 'bg-purple-600'} py-1 px-3 rounded-full font-bold`}>
                {admin.role}
              </span>
            </TableCell>

            {
              session?.user?.role === ROLES.SUPER_ADMIN &&
              <TableCell className="text-right">
                <div className='flex items-center gap-4 justify-end'>
                  <DialogTrigger asChild>
                    <button className='hover:text-blue-500 duration-300 outline-none' onClick={() => changeInitialVal(admin.name, admin.email, admin.role, admin._id)}>
                      <Pencil width={17} height={17} />
                    </button>
                  </DialogTrigger>

                  <button className='text-red-500 outline-none hover:opacity-50 duration-300' onClick={() => deleteAdmin(admin)}>
                    <Trash2 width={17} height={17} />
                  </button>
                </div>
              </TableCell>
            }
          </TableRow>
        ))}

        {/* skeleton loader */}
        {
          loading &&
          <>
            <TableRow>
              <TableCell><Skeleton className='h-4 w-[130px]' /></TableCell>
              <TableCell><Skeleton className='h-4 w-[150px]' /></TableCell>
              <TableCell><Skeleton className='h-4 w-[110px]' /></TableCell>
              <TableCell className='flex justify-end gap-4 animate-pulse text-gray-500'>
                <Pencil width={17} height={17} />
                <Trash2 width={17} height={17} />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell><Skeleton className='h-4 w-[60px]' /></TableCell>
              <TableCell><Skeleton className='h-4 w-[200px]' /></TableCell>
              <TableCell><Skeleton className='h-4 w-[80px]' /></TableCell>
              <TableCell className='flex justify-end gap-4 animate-pulse text-gray-500'>
                <Pencil width={17} height={17} />
                <Trash2 width={17} height={17} />
              </TableCell>
            </TableRow>
          </>
        }

      </TableBody>
    </Table>
  )
}
