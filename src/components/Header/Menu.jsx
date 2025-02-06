'use client'

import { CircleHelp, CircleX, Dot, Languages, LetterText, MenuIcon, MessagesSquare, Palette, Star, Tag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getVisibleCategories } from '@/actions/Category'
import { getSocialMedias } from '@/actions/SocialMedia'
import Link from 'next/link'
import './menu.css'
import scrollToId from '@/utils/scrollToId'
import useLanguageInURL from '@/hooks/useLanguageInURL'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { SelectSocialMediasIcons } from "@/components/SocialMediaIcons"
import { usePathname, useSearchParams } from 'next/navigation'

export default function Menu({dictionary, lang}) {

  const pathname = usePathname()
  const params = useSearchParams()
  const { addLangToURL } = useLanguageInURL()

  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [socialMedias, setSocialMedias] = useState([])

  const dropdown = dictionary?.dropdown

  // Effects
  useEffect(() => {
    getCategories()
    getAllSocialMedias()
  }, [])

  // Methods
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

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} className='relative'>
      <DropdownMenuTrigger className='outline-none max-w-11 w-11 flex items-center justify-end'>
        {open ? <CircleX className='text-red-400' /> : <MenuIcon className='text-front-gray' />}
      </DropdownMenuTrigger>

      <DropdownMenuContent className='bg-front-primary/80 translate-y-7 md:translate-y-5 min-w-[250px] p-3 shadow-xl backdrop-blur-md rounded-xl text-front-background overflow-y-auto flex flex-col origin-top duration-300 -translate-x-3 border-none'> 

        <DropdownMenuGroup>
          <DropdownMenuItem className='focus:bg-black/10 focus:text-white cursor-pointer' onSelect={(e) => scrollToId('about-me', e)}>
            <LetterText /> {dropdown?.about}
          </DropdownMenuItem>


          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className='border-none'>
              <AccordionTrigger className='hover:no-underline px-2 py-[6px] hover:bg-black/10 rounded-sm dropdown'>
                <div className='flex items-center gap-2'>
                  <Tag width={16} height={16} /> {dropdown?.category}
                </div>
              </AccordionTrigger>
              <AccordionContent className='pl-3 pb-0'>
                {
                  categories.map((category, index) => (
                    <DropdownMenuItem key={index} className='hover:bg-black/10 cursor-pointer'>
                      <Link href={addLangToURL(`/list?category=${category._id}`)} className='flex items-center w-full h-full'>
                        <Dot width={16} height={16} />
                        {category.englishName}
                      </Link>
                    </DropdownMenuItem>
                  ))
                }
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <DropdownMenuItem className='focus:bg-black/10 focus:text-white cursor-pointer' onSelect={(e) => scrollToId('top-works', e)}>
            <Palette /> {dropdown?.works}
          </DropdownMenuItem>

          <DropdownMenuItem className='focus:bg-black/10 focus:text-white cursor-pointer' onSelect={(e) => scrollToId('faqs', e)}>
            <CircleHelp /> {dropdown?.faqs}
          </DropdownMenuItem>

          <DropdownMenuItem className='focus:bg-black/10 focus:text-white cursor-pointer' onSelect={(e) => scrollToId('contact-me', e)}>
            <MessagesSquare /> {dropdown?.contact}
          </DropdownMenuItem>

          <DropdownMenuItem className='focus:bg-black/10 focus:text-white cursor-pointer'>
            <Link href={addLangToURL(`/review`)} className='flex items-center gap-2'>
              <Star width={16} height={16} /> {dropdown?.letReview}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>


        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {
            socialMedias.map((socialMedia, index) => (
              socialMedia[1].url.length > 0 &&
              <DropdownMenuItem key={index} className='focus:bg-black/10 focus:text-white'>
                <Link href={socialMedia[1].url} target='_blank' className='flex items-center gap-2'>
                  <SelectSocialMediasIcons name={socialMedia[1].name} size={16} />
                  {socialMedia[1].name}
                </Link>
              </DropdownMenuItem>
            ))
          }
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className='flex items-center gap-2'><Languages width={16} height={16} /> {dropdown?.language}</DropdownMenuLabel>
        <DropdownMenuGroup className='flex'>
          <DropdownMenuItem
            disabled={lang === 'es'}
            className={`focus:bg-black/10 focus:text-white ${lang === 'es' ? 'bg-black/10 cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            <a href={changeToLanguage('es')} className='flex items-center gap-2'>
              <img src="/flagLanguage/Flag_Spain.svg" alt="flag-spain" className='w-5 rounded-sm' />
              Español
            </a>
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={lang === 'en'}
            className={`focus:bg-black/10 focus:text-white ${lang === 'en' ? 'bg-black/10 cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            <a href={changeToLanguage('en')} className='flex items-center gap-2'>
              <img src="/flagLanguage/Flag_United_Kingdom.svg" alt="flag-english" className='w-5 rounded-sm' />
              English
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
