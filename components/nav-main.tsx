"use client"

import { PlusCircleIcon, type LucideIcon, Activity, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { PlatformSelectionDialog } from "@/components/platform-selection-dialog"

interface NavMainProps {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    disabled?: boolean
  }[]
  currentPath: string
}

export function NavMain({ items, currentPath }: NavMainProps) {
  const [isPlatformDialogOpen, setIsPlatformDialogOpen] = useState(false)

  const handlePlatformSelect = (platforms: string[]) => {
    // TODO: Handle platform selection
    console.log("Selected platforms:", platforms)
    setIsPlatformDialogOpen(false)
  }

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Add platforms"
                className="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                onClick={() => setIsPlatformDialogOpen(true)}
              >
                <PlusCircleIcon className="h-4 w-4" />
                <span>Add platforms</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
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
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </div>
                  ) : (
                    <Link href={item.url}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </Link>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <PlatformSelectionDialog
        isOpen={isPlatformDialogOpen}
        onClose={() => setIsPlatformDialogOpen(false)}
        onSelect={handlePlatformSelect}
      />
    </>
  )
}
