"use client"

import { FileText, BarChart2, type LucideIcon } from "lucide-react"
import Link from "next/link"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavDocumentsProps {
  items: {
    name: string
    url: string
    icon: LucideIcon
    disabled?: boolean
  }[]
  currentPath: string
}

export function NavDocuments({ items, currentPath }: NavDocumentsProps) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Content</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              className={`transition-colors duration-200 ${
                item.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : currentPath === item.url
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
              disabled={item.disabled}
              asChild={!item.disabled}
            >
              {item.disabled ? (
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
              ) : (
                <Link href={item.url}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
