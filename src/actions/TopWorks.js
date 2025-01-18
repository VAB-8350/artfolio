'use server'

import { connectDB } from '@/utils/mongodb'
import TopWorks from '@/Models/TopWorks'
import { validateSession } from './validateSession'

export const getTopWorks = async () => {
  await connectDB()
  let paints = await TopWorks.findOne().populate('topWorks')

  return JSON.parse(JSON.stringify(paints))
}

export const uploadTopWork = async (newTop) => {

  const res = await validateSession()
  if (!res.success) return res

  await connectDB()
  let addedPaint
  try {
    const topWork = new TopWorks(newTop)
    await topWork.validate()

    const res = await TopWorks.findOne()

    if (res === null || res?.length === 0) {
      await topWork.save()
    } else {
      await TopWorks.findOneAndUpdate({}, newTop)
    }
    addedPaint = true
  } catch (error) {
    console.log(error)
    return false
  }

  return addedPaint
}