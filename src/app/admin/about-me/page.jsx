import AboutMeForm from '@/components/AboutMeForm/AboutMeForm'
import AdminHeader from '@/components/admin-header'
import { getAboutMe } from '@/actions/AboutMe'

export default async function page() {

  const response = await getAboutMe()

  return (
    <>
      <AdminHeader title='About Me' />

      <AboutMeForm initialVal={response} />
    </>
  )
}
