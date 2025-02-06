'use client'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SearchBar({dictionary}) {

  // Hooks
  const router = useRouter()

  // State
  const [search, setSearch] = useState('')

  // Methods
  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/list?search=${search}`)
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2 border border-front-gray rounded-full px-3 h-9 max-w-[220px] w-full lg:focus-within:max-w-[300px] duration-300'>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder={dictionary?.searchPlaceholder}
        className='flex-grow text-sm w-full bg-transparent outline-none placeholder-front-gray/70 text-front-gray'
      />

      <button className='text-front-gray'>
        <Search width={16} height={16} />
      </button>

    </form>
  )
}
