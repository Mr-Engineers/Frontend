"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavSecondaryProps {
  items: {
    title: string
    url: string
    icon: LucideIcon
    disabled?: boolean
  }[]
  currentPath: string
  className?: string
}

export function NavSecondary({
  items,
  currentPath,
  className,
  ...props
}: NavSecondaryProps) {
  return (
    <SidebarGroup className={className} {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
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
                    <item.icon />
                    <span>{item.title}</span>
                  </div>
                ) : (
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
