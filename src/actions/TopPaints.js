'use server'

import { connectDB } from '@/utils/mongodb'
import TopPaints from '@/Models/TopPaints'
import { validateSession } from './validateSession'

export const getTopPaints = async () => {
  await connectDB()
  let paints = await TopPaints.findOne().populate('topPaints')

  return JSON.parse(JSON.stringify(paints))
}

export const uploadTopPaint = async (newTop) => {

  const res = await validateSession()
  if (!res.success) return res

  await connectDB()
  let addedPaint
  try {
    const topPaint = new TopPaints(newTop)
    await topPaint.validate()

    const res = await TopPaints.findOne()

    if (res === null || res?.length === 0) {
      await topPaint.save()
    } else {
      await TopPaints.findOneAndUpdate({}, newTop)
    }
    addedPaint = true
  } catch (error) {
    console.log(error)
    return false
  }

  return addedPaint
}