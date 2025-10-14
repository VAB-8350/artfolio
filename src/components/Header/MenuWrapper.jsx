'use client'

import { Suspense } from 'react'
import Menu from './Menu'

function MenuFallback() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-24"></div>
    </div>
  )
}

export default function MenuWrapper({ dictionary, lang }) {
  return (
    <Suspense fallback={<MenuFallback />}>
      <Menu dictionary={dictionary} lang={lang} />
    </Suspense>
  )
}