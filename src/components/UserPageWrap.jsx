'use client'
import Header from './Header/Header'

import { usePathname } from 'next/navigation'

export default function UserPageWrap({children}) {
  
  const pathname = usePathname()

  return (
    <div className='flex flex-col gap-4 md:gap-5 background-height max-w-screen overflow-x-hidden' id='user-page-wrap'>
      {
        !pathname.includes('/admin') &&
        <>
          {/* Background */}
          {/* <div className="absolute inset-0 -z-50 h-full w-full bg-front-background bg-[linear-gradient(to_right,#00000030,transparent_1px),linear-gradient(to_bottom,#00000030,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="fixed inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#b37e56de,transparent)]" />
          </div> */}

          <div className="absolute inset-0 -z-10 background-height w-full bg-front-background bg-[radial-gradient(#c1c9c2_1px,transparent_1px)] [background-size:16px_16px]">

          <div className="fixed inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#b37e5690,transparent)]" />

          </div>

          {/* <div class="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-transparent bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,#14342990_100%)]"></div> */}



          <Header />
        </>
      }

      {
        !pathname.includes('/admin')
        ?
          <main className="container mx-auto px-5 lg:px-8 flex-grow font-poppins">
            {children}
          </main>
        : children
      }

      {
        !pathname.includes('/admin') &&
        <>
          {/* Footer */}
          holaa
        </>
      }
    </div>
  )
}
