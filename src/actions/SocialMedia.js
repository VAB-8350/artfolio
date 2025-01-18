'use server'

import { connectDB } from '@/utils/mongodb'
import SocialMedia from '@/Models/SocialMedia'
import { validateSession } from './validateSession'
import { revalidatePath } from 'next/cache'

export const getSocialMedias = async () => {
  await connectDB()
  let socialMedias = await SocialMedia.findOne()

  return JSON.parse(JSON.stringify(socialMedias))
}

export const updateSocialMedias = async (newSocialMedia) => {
  const res = await validateSession()
  if (!res.success) return res

  try {
    const socialMedia = new SocialMedia(newSocialMedia)
    await socialMedia.validate()

    const res = await getSocialMedias()

    if (res === null || res?.length === 0) {
      await socialMedia.save()
    } else {
      await SocialMedia.findOneAndUpdate({}, newSocialMedia)
    }
  } catch (error) {
    console.log(error)
    return false
  }

  revalidatePath('/admin/social-media')
  return true

} 