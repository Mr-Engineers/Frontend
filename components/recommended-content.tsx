"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Twitter, Youtube, BookmarkPlus, Video, ImageIcon, FileText, Lightbulb, Sparkles, BookmarkCheck } from "lucide-react"
import { useState, useEffect } from "react"
import { TrendsService } from "@/lib/services/trends-service"
import { SavedContentService } from "@/lib/services/saved-content-service"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

interface RecommendedContentProps {
  timePeriod: "today" | "week" | "month"
}

interface ContentRecommendation {
  id: string
  title: string
  description: string
  platform: "x" | "tiktok" | "youtube"
  contentType: "video" | "image" | "article"
  relevance: number
  hashtags: string[]
  isSaved: boolean
}

export function RecommendedContent({ timePeriod }: RecommendedContentProps) {
  const [recommendations, setRecommendations] = useState<ContentRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadingText, setLoadingText] = useState("Generating content")

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Simulate longer loading time for the animation
        await new Promise(resolve => setTimeout(resolve, 2000))
        const content = await TrendsService.getRecommendedContent(timePeriod)
        setRecommendations(content)
      } catch (err) {
        setError("Failed to load recommendations. Please try again later.")
        console.error("Error fetching recommendations:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [timePeriod])

  useEffect(() => {
    if (!isLoading) return

    const dots = [".", "..", "..."]
    let currentDot = 0

    const interval = setInterval(() => {
      currentDot = (currentDot + 1) % dots.length
      setLoadingText(`Generating content${dots[currentDot]}`)
    }, 500)

    return () => clearInterval(interval)
  }, [isLoading])

  const handleSave = async (content: ContentRecommendation) => {
    try {
      const success = await SavedContentService.saveContent(content)
      if (success) {
        setRecommendations(prev => 
          prev.map(item => 
            item.id === content.id ? { ...item, isSaved: true } : item
          )
        )
        toast.success("Content saved successfully")
      } else {
        toast.error("Failed to save content")
      }
    } catch (error) {
      console.error("Error saving content:", error)
      toast.error("Failed to save content")
    }
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#fc6428]/20 rounded-full animate-spin-slow border-t-[#fc6428]"></div>
          </div>
          <div className="w-16 h-16 flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-[#fc6428] animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-medium text-[#fc6428]">{loadingText}</h3>
          <p className="text-sm text-gray-500">Analyzing trends and preferences</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <Card key={rec.id} className="overflow-hidden hover:border-[#fc6428] transition-all">
          <CardContent className="p-0">
            <div className="p-4 border-l-4 border-l-[#fc6428]">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#fc6428]/10 flex items-center justify-center text-[#fc6428]">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">{rec.title}</h3>
                </div>
                <div className="flex gap-1">
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getPlatformIcon(rec.platform)}
                    <span className="capitalize">{rec.platform === "x" ? "X" : rec.platform}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getContentTypeIcon(rec.contentType)}
                    <span className="capitalize">{rec.contentType}</span>
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3">{rec.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {rec.hashtags.map((tag) => (
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
                  <span className="font-medium">{rec.relevance}</span>
                </div>
                <div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`h-8 ${rec.isSaved ? "bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-700" : ""}`}
                    onClick={() => handleSave(rec)}
                  >
                    {rec.isSaved ? (
                      <BookmarkCheck className="h-4 w-4 mr-1" />
                    ) : (
                      <BookmarkPlus className="h-4 w-4 mr-1" />
                    )}
                    {rec.isSaved ? "Saved" : "Save"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
