import AdminHeader from '@/components/admin-header'
import TopsPaintForm from '@/components/TopsPaintForm/TopsPaintForm'

export default function page() {
  return (
    <>
      <AdminHeader title='Top Obras' />
      <TopsPaintForm view='TopWorks' />
    </>
  )
}