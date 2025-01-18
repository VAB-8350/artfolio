'use server'

import { connectDB } from '@/utils/mongodb'
import Review from '@/Models/Review'
import MaxReviews from '@/Models/MaxReviews'
import { validateSession } from './validateSession'

export const getAllReviews = async () => {
  const res = await validateSession()
  if (!res.success) return res

  await connectDB()
  const reviews = await Review.find()

  return JSON.parse(JSON.stringify(reviews))
}

export const getActiveReviews = async () => {
  await connectDB()
  const reviews = await Review.find({ visible: true })

  return JSON.parse(JSON.stringify(reviews))
}

export const getReviewsLastMonth = async () => {
  await connectDB()
  const reviews = await Review.find({ createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1) } })

  return JSON.parse(JSON.stringify(reviews))
}

export const getQuantityReviews = async () => {
  await connectDB()
  const reviews = await Review.find()

  return reviews.length
}

export const dashboardData = async () => {
  const res = await validateSession()
  if (!res.success) return res

  const lastMonth = await getReviewsLastMonth()
  const quantity = await getQuantityReviews()
  const maxReviews = await getMaxReviews()

  return { lastMonth, quantity, maxReviews: maxReviews.maxReviews }
}

export const changeReviewVisibility = async (id, status) => {
  const res = await validateSession()
  if (!res.success) return res

  await connectDB()
  const review = await Review.findById(id)

  if (review === null || review?.length === 0) return false

  await Review.findByIdAndUpdate(id, { visible: status })

  return true
}

export const addReview = async (newReview) => {
  await connectDB()
  let addedReview = false

  try {
    const review = new Review(newReview)
    await review.validate()
    await review.save()
    addedReview = true
  } catch (error) {
    return false
  }

  return addedReview
}

export const deleteReview = async (id) => {
  const res = await validateSession()
  if (!res.success) return res

  await connectDB()
  const review = await Review.findByIdAndDelete(id)

  return !!review
}

export const updateMaxReviews = async (newMaxReviews) => {
  const res = await validateSession()
  if (!res.success) return res

  try {
    const maxReview = new MaxReviews(newMaxReviews)
    await maxReview.validate()

    const res = await MaxReviews.findOne()

    if (res === null || res?.length === 0) {
      await maxReview.save()
    } else {
      await MaxReviews.findOneAndUpdate({}, newMaxReviews)
    }
  } catch (error) {
    console.log(error)
    return false
  }

  return true
}

export const getMaxReviews = async () => {
  const res = await validateSession()
  if (!res.success) return res

  await connectDB()
  const maxReviews = await MaxReviews.findOne()

  return JSON.parse(JSON.stringify(maxReviews))
}