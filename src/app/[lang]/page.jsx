import React from 'react'
import HomeComponent from '@/app/HomeComponent'

export default async function page({params}) {

  const { lang } = await params

  return (
    <HomeComponent lang={lang} />
  )
}
