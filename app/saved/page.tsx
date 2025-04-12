"use client"

import { BookmarkPlus, BookmarkCheck, Lightbulb, Twitter, Youtube, Video, ImageIcon, FileText } from "lucide-react"
import { useState, useEffect, Suspense } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SavedContentService } from "@/lib/services/saved-content-service"
import { SavedContent } from "@/components/saved/saved-content"
import { SavedSkeleton } from "@/components/saved/saved-skeleton"
import { BellRing } from "lucide-react"

interface ContentItem {
  id: string
  title: string
  description: string
  platform: "x" | "tiktok" | "youtube"
  contentType: "video" | "image" | "article"
  relevance: number
  hashtags: string[]
  isSaved: boolean
}

export default function SavedPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <SidebarTrigger />
          <div className="ml-4 font-semibold text-lg text-[#fc6428] md:hidden">TrendPulse</div>
          <div className="ml-auto flex items-center gap-4 md:gap-6">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <BellRing className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </div>
      </div>
      <SavedContent />
    </div>
  )
} 