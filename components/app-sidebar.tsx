"use client"

import * as React from "react"
import {
  BarChart2,
  CameraIcon,
  DatabaseIcon,
  FileText,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UserCircleIcon,
  UsersIcon,
} from "lucide-react"
import { usePathname } from "next/navigation"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart2,
      disabled: true,
    },
    {
      title: "Teams",
      url: "/teams",
      icon: UsersIcon,
      disabled: true,
    },
  ],
  documents: [
    {
      name: "Saved Content",
      url: "/saved",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      url: "/reports",
      icon: FileText,
      disabled: true,
    },
  ],
  navSecondary: [
    {
      title: "Account",
      url: "/profile",
      icon: UserCircleIcon,
    },
    {
      title: "Get Help",
      url: "/get-help",
      icon: HelpCircleIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#" className="flex items-center gap-2">
                <Image
                  src="/siftlogo.png"
                  alt="Sift Logo"
                  width={20}
                  height={20}
                  className="h-5 w-5"
                />
                <span className="text-lg font-semibold tracking-tight">Sift</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} currentPath={pathname} />
        <NavDocuments items={data.documents} currentPath={pathname} />
        <NavSecondary items={data.navSecondary} className="mt-auto" currentPath={pathname} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
