"use client"

import { BookmarkPlus, BookmarkCheck, Lightbulb, Twitter, Youtube, Video, ImageIcon, FileText } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"

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
  const [content, setContent] = useState<ContentItem[]>([
    {
      id: "1",
      title: "How to Create Engaging Social Media Content",
      description: "Learn the best practices for creating content that resonates with your audience and drives engagement.",
      platform: "x",
      contentType: "article",
      relevance: 95,
      hashtags: ["#MarketingTips", "#SmallBusiness"],
      isSaved: true,
    },
    {
      id: "2",
      title: "The Power of Storytelling in Marketing",
      description: "Discover how to use storytelling techniques to make your brand message more compelling and memorable.",
      platform: "youtube",
      contentType: "video",
      relevance: 90,
      hashtags: ["#BusinessStrategy", "#GrowthHacking"],
      isSaved: true,
    },
    {
      id: "3",
      title: "Content Calendar Planning Guide",
      description: "A comprehensive guide to planning and organizing your content calendar for maximum impact.",
      platform: "youtube",
      contentType: "video",
      relevance: 85,
      hashtags: ["#BusinessGrowthTips", "#SmallBusinessSuccess"],
      isSaved: true,
    },
  ])

  const toggleSave = (id: string) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, isSaved: !item.isSaved } : item
    ))
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "x":
        return <Twitter className="h-4 w-4" />
      case "tiktok":
        return <span className="text-xs font-bold">TT</span>
      case "youtube":
        return <Youtube className="h-4 w-4" />
      default:
        return null
    }
  }

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType) {
      case "video":
        return <Video className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "article":
        return <FileText className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6 w-full">
      <DashboardHeader
        title="Saved Content"
        description="Your collection of saved content pieces"
      />
      <div className="space-y-4 w-full">
        {content.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:border-[#fc6428] transition-all w-full">
            <CardContent className="p-0">
              <div className="p-4 border-l-4 border-l-[#fc6428]">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[#fc6428]/10 flex items-center justify-center text-[#fc6428]">
                      <Lightbulb className="h-4 w-4" />
                    </div>
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                  <div className="flex gap-1">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getPlatformIcon(item.platform)}
                      <span className="capitalize">{item.platform === "x" ? "X" : item.platform}</span>
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getContentTypeIcon(item.contentType)}
                      <span className="capitalize">{item.contentType}</span>
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.hashtags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-[#fc6428]/10 text-[#fc6428] border-none hover:bg-[#fc6428]/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-gray-500">Relevance: </span>
                    <span className="font-medium">{item.relevance}</span>
                  </div>
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`h-8 ${item.isSaved ? "bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-700" : ""}`}
                      onClick={() => toggleSave(item.id)}
                    >
                      {item.isSaved ? (
                        <BookmarkCheck className="h-4 w-4 mr-1" />
                      ) : (
                        <BookmarkPlus className="h-4 w-4 mr-1" />
                      )}
                      {item.isSaved ? "Saved" : "Save"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 