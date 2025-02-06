import { usePathname } from 'next/navigation'
import { languages } from '@/config.json'

export default function useLanguageInURL() {
  const pathname = usePathname()

  // Methods
  const addLangToURL = (url) => {
    if(pathname.startsWith('/es')) {
      return `/es${url}`
    } else if(pathname.startsWith('/en')) {
      return `/en${url}`
    } else {
      return `/en${url}`
    }
  }

  return {
    addLangToURL
  }
}
