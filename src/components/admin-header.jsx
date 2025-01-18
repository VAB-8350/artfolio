import React from 'react'

export default function AdminHeader({children, title}) {
  return (
    <header className='flex justify-between items-center mb-4 mt-6 px-10'>
      <h1 className='text-4xl font-bold'>{title}</h1>
      {children}
    </header>
  )
}
