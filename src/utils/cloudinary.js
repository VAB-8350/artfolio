'use client'
import imageCompression from 'browser-image-compression'
import crypto from 'crypto'

export const uploadImage = async (img) => {

  const image = await compressImage(img)

  const data = new FormData()
  data.append('file', image)
  data.append('api_key', process.env.NEXT_PUBLIC_CLOUD_API_KEY)
  data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUD_PRESET)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: data,
    }
  )
  const json = await res.json()
  return {publicId: json.public_id, url: json.secure_url}
}

export const compressImage = async (image) => {
  
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }

  try {
    const compressedImage = await imageCompression(image, options)
    return compressedImage
  } catch (error) {
    console.error('Error compressing image:', error)
  }
}

export const deleteImage = async (publicId) => {
  const timestamp = Math.floor(Date.now() / 1000)
  const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_CLOUD_API_SECRET}`
  const sha1 = crypto.createHash('sha1')
  sha1.update(stringToSign)
  const signature = sha1.digest('hex')

  const data = new FormData()
  data.append('public_id', publicId)
  data.append('api_key', process.env.NEXT_PUBLIC_CLOUD_API_KEY)
  data.append('timestamp', timestamp)
  data.append('signature', signature)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/destroy`, {
    method: 'POST',
    body: data,
  })

  const json = await res.json()

  return json
}