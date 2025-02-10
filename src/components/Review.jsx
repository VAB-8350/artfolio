import { Star } from 'lucide-react'
import React from 'react'
import { colors } from '@/config.json'

export default function Review({review}) {

  const { stars, name, message, avatarOption } = review

  return (
    <article className='flex gap-5'>
      <img
        src={`/avatars/${avatarOption}.webp`}
        alt="review"
        className='w-16 h-16 rounded-full shadow-md object-cover'
      />

      <div>
        <h4 className='font-poppins font-bold text-xl text-front-text'>{name}</h4>

        {/* stars */}
        <div className='flex gap-1'>
          <Star width={14} height={14} fill={stars >=1 ? colors.secondary : 'transparent'} stroke={colors.secondary} />
          <Star width={14} height={14} fill={stars >=2 ? colors.secondary : 'transparent'} stroke={colors.secondary} />
          <Star width={14} height={14} fill={stars >=3 ? colors.secondary : 'transparent'} stroke={colors.secondary} />
          <Star width={14} height={14} fill={stars >=4 ? colors.secondary : 'transparent'} stroke={colors.secondary} />
          <Star width={14} height={14} fill={stars >=5 ? colors.secondary : 'transparent'} stroke={colors.secondary} />
        </div>

        <p className='font-poppins text-xs text-front-text mt-2 max-w-[400px] text-pretty'>{message}</p>
      </div>
    </article>
  )
}
