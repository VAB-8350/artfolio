'use client'
import { useState } from 'react'
import AdminHeader from '@/components/admin-header'
import AdminsTable from '@/components/AdminsTable/AdminsTable'
import AddAdminsModal from '@/components/AddAdminsModal/AddAdminsModal'
import { Dialog } from "@/components/ui/dialog"

export default function page() {

  const [open, setOpen] = useState(false)
  const [initialValue, setInitialValue] = useState({
    name: '',
    email: '',
    role: '',
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AdminHeader title='Admins'>
        <AddAdminsModal initialVal={initialValue} setInitialVal={setInitialValue} setOpen={setOpen} />
      </AdminHeader>

      <div className='flex flex-col gap-4 w-full lg:w-[1000px] mx-auto'>
        <AdminsTable setInitialVal={setInitialValue} open={open} />
      </div>
    </Dialog>
  )
}
