"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import { TrendDetailsDialog } from "./trend-details-dialog"
import { TrendsService } from "@/lib/services/trends-service"
import { Skeleton } from "@/components/ui/skeleton"

interface TrendingHashtagsProps {
  platform: "x" | "tiktok" | "youtube"
  timePeriod: "today" | "week" | "month"
}

interface Hashtag {
  tag: string
  volume: number
  growth: number
  relevance: number
}

export function TrendingHashtags({ platform, timePeriod }: TrendingHashtagsProps) {
  const [hashtags, setHashtags] = useState<Hashtag[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTrend, setSelectedTrend] = useState<(Hashtag & { platform: string }) | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const fetchTrends = async () => {
      setIsLoading(true)
      setError(null)
      try {
        let trends: Hashtag[]
        switch (platform) {
          case "x":
            trends = await TrendsService.getXTrends(timePeriod)
            break
          case "tiktok":
            trends = await TrendsService.getTikTokTrends(timePeriod)
            break
          case "youtube":
            trends = await TrendsService.getYouTubeTrends(timePeriod)
            break
          default:
            trends = []
        }
        setHashtags(trends)
      } catch (err) {
        setError("Failed to load trends. Please try again later.")
        console.error("Error fetching trends:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrends()
  }, [platform, timePeriod])

  // Format volume with K or M suffix
  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`
    }
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`
    }
    return volume.toString()
  }

  const handleTrendClick = (hashtag: Hashtag) => {
    setSelectedTrend({ ...hashtag, platform: platform === "x" ? "X" : platform })
    setDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="space-y-4 mt-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <Skeleton className="h-4 w-16 mb-2" />
                <div className="flex items-center gap-2">
                  <Skeleton className="w-24 h-2" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            </div>
          </div>
        ))}
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
    <div className="space-y-4 mt-4">
      {hashtags.map((hashtag) => (
        <div
          key={hashtag.tag}
          className="flex items-center justify-between p-3 border rounded-lg hover:border-[#fc6428] transition-all cursor-pointer"
          onClick={() => handleTrendClick(hashtag)}
        >
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="bg-[#fc6428]/10 text-[#fc6428] border-[#fc6428]/20 hover:bg-[#fc6428]/20"
            >
              {hashtag.tag}
            </Badge>
            <span className="text-sm text-gray-500">{formatVolume(hashtag.volume)} posts</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Relevance</span>
              <div className="flex items-center gap-2">
                <Progress value={hashtag.relevance} className="w-24 h-2" />
                <span className="text-xs font-medium">{hashtag.relevance}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <TrendDetailsDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} trend={selectedTrend} />
    </div>
  )
}
