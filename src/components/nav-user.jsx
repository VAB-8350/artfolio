"use client"

import {
  ChevronsUpDown,
  LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { signOut, useSession } from "next-auth/react"
import { Skeleton } from "./ui/skeleton"

export function NavUser() {
  const { isMobile } = useSidebar()
  const { data: session } = useSession()
  const {user} = session || {}
  const initialsLetters = user?.name[0] + (user?.name.split(' ')?.[1]?.[0] ?? '')

  return (
    (<SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                {
                  user
                  ?
                    <>
                      <AvatarImage src={user?.image} alt={user?.name} />
                      <AvatarFallback className="rounded-lg">{initialsLetters}</AvatarFallback>
                    </>
                  : <Skeleton className='w-10 h-10' />
                }
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {
                  user
                  ?
                  <>
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </>
                  :
                  <>
                    <Skeleton className='w-[100px] h-3 mb-1' />
                    <Skeleton className='w-[140px] h-3' />
                  </>
                }
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="rounded-lg">{initialsLetters}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold flex gap-2 items-center">
                    {user?.name}
                    <span className={`${user?.role === 'Admin' ? 'bg-green-500' : 'bg-purple-600'} h-fit py-[1px] px-2 rounded-full font-bold text-[10px] flex items-center`}>
                      {user?.role}
                    </span>
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => signOut({callbackUrl: '/'})}>
                <LogOut />
                Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>)
  );
}
