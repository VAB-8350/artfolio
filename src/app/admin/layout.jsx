'use client'
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/AuthProvider"
import { Toaster } from "@/components/ui/sonner"
import { usePathname } from "next/navigation"

export default function Page({children}) {

  const pathname = usePathname()
  const routes = pathname.slice(1).split('/')

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header
              className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />

                <Breadcrumb>
                  <BreadcrumbList>
                      {
                        routes.slice(0, routes.length - 1).map((route, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <BreadcrumbItem className="hidden md:block">
                              <BreadcrumbLink href={`/${routes.slice(0, index + 1).join('/')}`}>
                                {capitalize(route)}
                              </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                          </div>
                        ))
                      }
                    <BreadcrumbItem>
                      <BreadcrumbPage className='text-lg font-bold'>{capitalize(routes[routes.length - 1])}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {children}
              <Toaster />
            </section>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
