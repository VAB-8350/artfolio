'use client'

import { useEffect, useState } from 'react'
const { getSocialMedias } = require('@/actions/SocialMedia')
import { SelectSocialMediasIcons } from "@/components/SocialMediaIcons"
import Link from 'next/link'
import useScrollToId from '@/hooks/useScrollToId'
import { usePathname } from 'next/navigation'
import { languages } from '@/config.json'

export default function Footer() {

  const { scrollToId } = useScrollToId()
  const pathname = usePathname()
  const { primary, secondary } = languages
  const lang = pathname.startsWith(`/${secondary}`) ? secondary : primary

  const [socialMedias, setSocialMedias] = useState([])
  const [dictionary, setDictionary] = useState()

  useEffect(() => {
    getAllSocialMedias()
    getLang()
  }, [])

  const getAllSocialMedias = async () => {
    const res = await getSocialMedias()
    const sm = {...res}

    delete sm._id
    delete sm.createdAt
    delete sm.updatedAt

    setSocialMedias(Object.entries(sm))
  }

  const getLang = async () => {
    const res = await import(`@/app/dictionaries/${lang}/footer.json`)
    setDictionary(JSON.parse(JSON.stringify(res)))
  }

  return (
    <footer className='flex flex-col md:flex-row md:justify-around bg-front-primary/80 backdrop-blur-sm shadow-xl mt-[30px] p-5'>
      <div className='flex justify-around md:gap-3 items-center'>
        <section className='border-r-[1px] md:border-front-background border-transparent md:pr-3'>
          <img src="/logo.png" alt="logo" className="h-5 object-contain" />
        </section>

        <section className='flex gap-2 flex-wrap max-w-1/2'>
          {
            socialMedias.map(socialMedia => (
              socialMedia[1].url.length > 0 &&
              <Link href={socialMedia[1].url} key={socialMedia[1].name} target='_blank' className='flex items-center gap-2 text-background'>
                <SelectSocialMediasIcons name={socialMedia[1].name} size={24} />
              </Link>
            ))
          }
        </section>
      </div>

      <section className='mt-5 text-center border-t-[1px] border-front-background lg:border-transparent pt-5 md:pt-0 md:mt-0'>
        <p className='font-poppins font-extralight text-front-gray text-sm'>
          {dictionary?.alertLegal} <button onClick={() => scrollToId('about-me')} className='font-bold text-front-secondary underline hover:text-purple-500'>Romina Peruchin</button>
        </p>
      </section>
    </footer>
  )
}
