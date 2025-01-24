import React from 'react'
import SearchBar from './SearchBar'
import { Menu } from 'lucide-react'

export default function header() {
  return (
    <header className='sticky top-0 left-0 right-0 z-50 flex gap-4 items-center justify-between w-full px-6 py-5'>
        <picture className='max-w-11 w-11 flex items-center justify-start'>
          <img src="/logo.png" alt="logo" />
        </picture>

        <SearchBar />

        <div className='max-w-11 w-11 flex items-center justify-end'>
            <button className='flex text-front-secondary'>
              <Menu />
            </button>
        </div>
    </header>
  )
}
