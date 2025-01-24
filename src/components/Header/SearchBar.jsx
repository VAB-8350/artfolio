import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function SearchBar() {
  return (
    <div className='flex items-center gap-2 border border-front-secondary rounded-full px-3 h-9'>
        <input
            type="text"
            placeholder="Search..."
            className='flex-grow text-sm w-full bg-transparent outline-none placeholder-front-secondary/70 text-front-secondary'
        />
        <Link className='text-front-secondary' href="/#">
            <Search width={16} height={16} />
        </Link>
    </div>
  )
}
