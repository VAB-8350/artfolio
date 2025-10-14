"use client"

import { ChevronRight, Home, LayoutDashboard } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { ROLES } from "@/utils/roles";

export function NavMain({
  items
}) {

  const { data: session } = useSession()

  return (
    (<SidebarGroup>
      <SidebarGroupLabel>Panel de administrador</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton asChild>
            <Link href='/' >
              <Home /> Go Home
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>

        <SidebarMenuSubItem>
          <SidebarMenuSubButton asChild>
            <Link href='/admin' >
              <LayoutDashboard /> Dashboard
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight
                    className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    (subItem.url !== '/admin/admins') ?
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    : session?.user?.role === ROLES.SUPER_ADMIN &&
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>)
  );
}
