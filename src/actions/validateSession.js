'use server'
import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth/next'


export const validateSession = async () => {

  try {
    const session = await getServerSession(cookies())

    if (!session) return {success: false, error: 'Unauthorized'}
    return {success: true, data: session}

  } catch (error) {
    console.log(error)
  }
}