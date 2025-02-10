'use client'

import { useEffect, useState } from "react"
import { getVisibleCategories } from '@/actions/Category'
import { getSocialMedias } from '@/actions/SocialMedia'
import { BookImage, CircleHelp, CircleX, Dot, Languages, LetterText, MenuIcon, MessagesSquare, Palette, Star, Tag } from 'lucide-react'
import useLanguageInURL from '@/hooks/useLanguageInURL'
import { SelectSocialMediasIcons } from "@/components/SocialMediaIcons"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useScrollToId from '@/hooks/useScrollToId'
import { languages } from '@/config.json'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

import './menu.css'


export default function NewMenu({dictionary, lang}) {

  const dropdown = dictionary?.dropdown
  const { addLangToURL } = useLanguageInURL()
  
  const pathname = usePathname()
  const params = useSearchParams()
  const router = useRouter()
  const { scrollToId } = useScrollToId()

  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [socialMedias, setSocialMedias] = useState([])

  // Effects
  useEffect(() => {
    getCategories()
    getAllSocialMedias()
  }, [])

  useEffect(() => {

    window.addEventListener('click', handleClickOutside)

    return () => {

      window.removeEventListener('click', handleClickOutside)

    }

  }, [open])

  // Methods
  const handleClickOutside = (event) => {

    const path = event.composedPath();

    // Comprobamos si alguno de esos elementos coincide con nuestros selectores válidos
    const clickedInside = path.some((el) => {
      return el instanceof HTMLElement && el.matches('#dropdown-menu, #dropdown-btn');
    });

    if (open && !clickedInside) {
      setOpen(false);
    }

  }

  const getCategories = async () => {
    const res = await getVisibleCategories()
    setCategories(res)
  }

  const getAllSocialMedias = async () => {
    const res = await getSocialMedias()
    const sm = {...res}

    delete sm._id
    delete sm.createdAt
    delete sm.updatedAt

    setSocialMedias(Object.entries(sm))
  }

  const changeToLanguage = (lang) => {
    let newPath

    if(pathname.startsWith('/es')) {
      newPath = pathname.replace('/es', `/${lang}`)
    } else if(pathname.startsWith('/en')) {
      newPath = pathname.replace('/en', `/${lang}`)
    } else {
      newPath = pathname.replace('/', `/${lang}`)
    }

    return newPath + `${params.size > 0 ? `?${params.toString()}` : ''}`
  }

  const scroll = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <div className="relative flex items-center text-white">
      <button id="dropdown-btn" className="outline-none" onClick={() => setOpen(!open)}>
        <div id="nav-icon4" className={`max-w-11 w-11 ${open ? 'open' : ''}`}>
          <span /><span /><span />
        </div>
      </button>

      <div
        id='dropdown-menu'
        className={`${open ? 'open-dropdown-menu' : 'close-dropdown-menu'} absolute top-14 right-0 bg-front-primary/80 backdrop-blur-sm shadow-xl rounded-xl p-4 z-50 min-w-[300px]`}
      >
        <div className="border-b-[1px] border-front-gray pb-2 mb-2">
          <button onClick={() => scroll('about-me')} className="flex items-center gap-2 w-full hover:bg-black/10 duration-200 px-3 py-1 rounded-md font-poppins text-base">
            <LetterText size={16} /> {dropdown?.about}
          </button>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className='border-none'>
              <AccordionTrigger className='hover:no-underline hover:bg-black/10 duration-200 dropdown px-3 py-1 rounded-md font-poppins text-base font-normal'>
                <div className='flex items-center gap-2'>
                  <Tag width={16} height={16} /> {dropdown?.category}
                </div>
              </AccordionTrigger>
              <AccordionContent className='pl-3 pb-0'>
                {
                  categories.map(category => (
                    <Link key={category._id} onClick={() => setOpen(false)} href={addLangToURL(`/list?category=${category._id}`)} className='flex items-center gap-2 w-full hover:bg-black/10 duration-200 px-3 py-1 rounded-md'>
                      <Dot width={16} height={16} />
                      {category.englishName}
                    </Link>
                  ))
                }
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <button onClick={() => scroll('top-works')} className="flex items-center gap-2 w-full hover:bg-black/10 duration-200 px-3 py-1 rounded-md font-poppins text-base">
            <Palette size={16} /> {dropdown?.works}
          </button>

          <button onClick={() => scroll('faqs')} className="flex items-center gap-2 w-full hover:bg-black/10 duration-200 px-3 py-1 rounded-md font-poppins text-base">
            <CircleHelp size={16} /> {dropdown?.faqs}
          </button>

          <button onClick={() => scroll('contact-me')} className="flex items-center gap-2 w-full hover:bg-black/10 duration-200 px-3 py-1 rounded-md font-poppins text-base">
            <MessagesSquare size={16} /> {dropdown?.contact}
          </button>

          <Link onClick={() => setOpen(false)} href={addLangToURL(`/list`)} className="flex items-center gap-2 w-full hover:bg-black/10 duration-200 px-3 py-1 rounded-md font-poppins text-base">
            <BookImage size={16} /> {dropdown?.allPaints}
          </Link>

          <Link onClick={() => setOpen(false)} href={addLangToURL(`/review`)} className="flex items-center gap-2 w-full hover:bg-black/10 duration-200 px-3 py-1 rounded-md font-poppins text-base">
            <Star size={16} /> {dropdown?.letReview}
          </Link>
        </div>

        <div className="border-b-[1px] border-front-gray pb-2 mb-2">
          {
            socialMedias.map((socialMedia, index) => (
              socialMedia[1].url.length > 0 &&
              <Link key={index} href={socialMedia[1].url} target='_blank' className="flex items-center gap-2 w-full hover:bg-black/10 duration-200 px-3 py-1 rounded-md font-poppins text-base">
                <SelectSocialMediasIcons name={socialMedia[1].name} size={16} />
                {socialMedia[1].name}
              </Link>
            ))
          }
        </div>

        <div className="pl-3">
          <h3 className="flex items-center gap-2 font-bold mb-2 font-poppins text-base"><Languages size={16} /> Languages</h3>

          <div className="flex gap-2">
            <a href={changeToLanguage(languages.secondary)} className={`flex items-center gap-2 disabled:cursor-not-allowed px-3 py-1 rounded-md hover:bg-black/10 duration-200 font-poppins text-base ${lang === languages.secondary ? 'bg-black/40' : ''}`}>
              <img src="/flagLanguage/Flag_Spain.svg" alt="flag-spain" className='w-5 rounded-sm' />
              Español
            </a>

            <a href={changeToLanguage(languages.primary)} className={`flex items-center gap-2 disabled:cursor-not-allowed px-3 py-1 rounded-md hover:bg-black/10 duration-200 font-poppins text-base ${lang === languages.primary ? 'bg-black/40' : ''}`}>
              <img src="/flagLanguage/Flag_United_Kingdom.svg" alt="flag-english" className='w-5 rounded-sm' />
              English
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
