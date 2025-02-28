"use client"

import * as React from "react"
import {
  User,
  Settings2,
  TableOfContents
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"
import { Link } from 'next-view-transitions'

// This is sample data.
const data = {
  navMain: [
    {
      title: "Contenido",
      url: "/admin/pinturas",
      icon: TableOfContents,
      isActive: true,
      items: [
        {
          title: "Pinturas",
          url: "/admin/pinturas",
        },
        {
          title: "Top Obras",
          url: "/admin/top-obras",
        },
        {
          title: "Top Pinturas",
          url: "/admin/top-pinturas",
        },
        {
          title: "FAQ's",
          url: "/admin/faqs",
        },
        
        {
          title: "Reviews",
          url: "/admin/reviews",
        },
      ],
    },
    {
      title: "Configuracion",
      url: "/admin/categories",
      icon: Settings2,
      items: [
        {
          title: "Categorías",
          url: "/admin/categories",
        },
        {
          title: "Admins",
          url: "/admin/admins",
        },
      ],
    },
    {
      title: "Perfil",
      url: "/admin/social-media",
      icon: User,
      items: [
        {
          title: "Redes Sociales",
          url: "/admin/social-media",
        },
        {
          title: "About Me",
          url: "/admin/about-me",
        }
      ],
    }
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser/>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 justify-end">
          <ModeToggle />
        </div>

        <p className="text-sm text-center">
          Web creada por <Link href='https://victorbarilin.com' target='_blank' className='font-bold underline hover:text-purple-500'>Andres Barilin</Link>
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
