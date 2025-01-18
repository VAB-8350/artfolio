
'use server'

import { connectDB } from '@/utils/mongodb'
import FAQ from '@/Models/FAQ'
import { validateSession } from './validateSession'

export const getFAQ = async () => {
  await connectDB()
  const faqs = await FAQ.find()

  return JSON.parse(JSON.stringify(faqs))
}

export const updateFAQ = async (id, newFAQ) => {
  const res = await validateSession()
  if (!res.success) return res

  try {
    const about = new FAQ(newFAQ)
    await about.validate()
    await FAQ.findByIdAndUpdate(id, newFAQ)

  } catch (error) {
    console.log(error)
    return false
  }

  return true

}

export const addFAQ = async (newFAQ) => {

  const res = await validateSession()
  if (!res.success) return res

  await connectDB()
  let addedFAQ
  try {
    const faq = new FAQ(newFAQ)
    await faq.validate()
    await faq.save()
    addedFAQ = true
  } catch (error) {
    return false
  }

  return addedFAQ
}

export const deleteFAQ = async (id) => {
  const res = await validateSession()
  if (!res.success) return res

  await connectDB()
  const faq = await FAQ.findByIdAndDelete(id)

  return !!faq
}