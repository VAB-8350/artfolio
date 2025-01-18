import AdminHeader from '@/components/admin-header'
import SocialMediaForm from '@/components/SocialMediaForm/SocialMediaForm'
import { getSocialMedias } from '@/actions/SocialMedia'

export default async function page() {
  const socialMedias = await getSocialMedias()

  return (
    <>
      <AdminHeader title='Redes Sociales' />

      <div className='flex flex-col gap-4 w-full lg:w-[1000px] mx-auto'>
        <SocialMediaForm initialVal={socialMedias} />
      </div>
    </>
  )
}
