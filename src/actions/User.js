'use server'

import { connectDB } from '@/utils/mongodb'
import User from '@/Models/User'
import { validateSession } from './validateSession'
import { ROLES } from '@/utils/roles'


export const getAllUsers = async () => {

  const res = await validateSuperAdmin()
  if (!res.success) return res

  await connectDB()
  const users = await User.find()

  return JSON.parse(JSON.stringify(users))
}

export const getUser = async (id) => {

  const res = await validateSuperAdmin()
  if (!res.success) return res

  await connectDB()
  const user = await User.findById(id)

  return JSON.parse(JSON.stringify(user))
}

export const updateUser = async (id, updateUser) => {

  const res = await validateSuperAdmin()
  if (!res.success) return res

  await connectDB()
  let updated = false
  
  try {
    const test = new User(updateUser)
    await test.validate()
    await User.findByIdAndUpdate(id, updateUser)
    updated = true
  } catch (error) {
    return false
  }

  return updated
}

export const addUser = async (newUser) => {

  const res = await validateSuperAdmin()
  if (!res.success) return res

  await connectDB()
  let addedUser = false

  try {
    const user = new User(newUser)
    await user.validate()
    await user.save()
    addedUser = true
  } catch (error) {
    return false
  }

  return addedUser
}

export const deleteUser = async (id) => {
  const res = await validateSuperAdmin()
  if (!res.success) return res

  await connectDB()
  await User.findByIdAndDelete(id)
}

const validateSuperAdmin = async () => {
  const res = await validateSession()
  if (!res.success) return res

  const user = await User.findOne({email: res.data.user.email})

  if (user?.role !== ROLES.SUPER_ADMIN) {
    return {
      success: false,
      message: 'No tienes permisos para realizar esta acción',
    }
  } else {
    return {
      success: true,
    }
  }
  
}