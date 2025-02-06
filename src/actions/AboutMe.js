'use server'

import { connectDB } from '@/utils/mongodb'
import AboutMe from '@/Models/AboutMe'
import { validateSession } from './validateSession'
import { revalidatePath } from 'next/cache'

export const getAboutMe = async () => {
  await connectDB()
  const aboutMe = await AboutMe.findOne()

  return JSON.parse(JSON.stringify(aboutMe))
}

export const updateAboutUs = async (newAboutMe) => {
  const res = await validateSession()
  if (!res.success) return res

  try {
    const about = new AboutMe(newAboutMe)
    await about.validate()

    const res = await getAboutMe()

    if (res === null || res?.length === 0) {
      await about.save()
    } else {
      await AboutMe.findOneAndUpdate({}, newAboutMe)
    }
  } catch (error) {
    console.log(error)
    return false
  }

  revalidatePath('/admin/about-me')
  revalidatePath('/')
  revalidatePath('/es')
  revalidatePath('/en')
  return true

} 