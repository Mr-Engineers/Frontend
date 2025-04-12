"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"
import { TrendDetailsDialog } from "./trend-details-dialog"

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

// Mock data for trending hashtags
const mockData: Record<string, Record<string, Hashtag[]>> = {
  today: {
    x: [
      { tag: "#SmallBusiness", volume: 45000, growth: 12, relevance: 95 },
      { tag: "#Entrepreneurship", volume: 32000, growth: 8, relevance: 90 },
      { tag: "#MarketingTips", volume: 28000, growth: 15, relevance: 85 },
      { tag: "#BusinessGrowth", volume: 22000, growth: 5, relevance: 80 },
      { tag: "#StartupLife", volume: 18000, growth: 10, relevance: 75 },
    ],
    tiktok: [
      { tag: "#SmallBusinessCheck", volume: 120000, growth: 25, relevance: 90 },
      { tag: "#BusinessTok", volume: 95000, growth: 18, relevance: 85 },
      { tag: "#EntrepreneurLife", volume: 85000, growth: 12, relevance: 80 },
      { tag: "#MarketingStrategy", volume: 65000, growth: 8, relevance: 75 },
      { tag: "#BusinessOwner", volume: 55000, growth: 15, relevance: 70 },
    ],
    youtube: [
      { tag: "small business tips", volume: 35000, growth: 10, relevance: 85 },
      { tag: "entrepreneur daily", volume: 28000, growth: 7, relevance: 80 },
      { tag: "marketing strategy", volume: 25000, growth: 12, relevance: 75 },
      { tag: "business growth hacks", volume: 22000, growth: 15, relevance: 70 },
      { tag: "startup success", volume: 18000, growth: 5, relevance: 65 },
    ],
  },
  week: {
    x: [
      { tag: "#BusinessStrategy", volume: 120000, growth: 18, relevance: 92 },
      { tag: "#SmallBizTips", volume: 95000, growth: 15, relevance: 88 },
      { tag: "#EntrepreneurMindset", volume: 85000, growth: 10, relevance: 85 },
      { tag: "#GrowthHacking", volume: 75000, growth: 22, relevance: 80 },
      { tag: "#DigitalMarketing", volume: 65000, growth: 8, relevance: 78 },
    ],
    tiktok: [
      { tag: "#BusinessHacks", volume: 250000, growth: 30, relevance: 90 },
      { tag: "#SmallBizTok", volume: 180000, growth: 25, relevance: 85 },
      { tag: "#MarketingTips", volume: 150000, growth: 20, relevance: 82 },
      { tag: "#EntrepreneurTok", volume: 120000, growth: 15, relevance: 80 },
      { tag: "#BusinessAdvice", volume: 100000, growth: 12, relevance: 75 },
    ],
    youtube: [
      { tag: "business growth strategy", volume: 85000, growth: 15, relevance: 88 },
      { tag: "entrepreneur success stories", volume: 75000, growth: 12, relevance: 85 },
      { tag: "marketing for small business", volume: 65000, growth: 18, relevance: 82 },
      { tag: "digital marketing trends", volume: 55000, growth: 10, relevance: 78 },
      { tag: "small business tips and tricks", volume: 45000, growth: 8, relevance: 75 },
    ],
  },
  month: {
    x: [
      { tag: "#BusinessInnovation", volume: 350000, growth: 25, relevance: 90 },
      { tag: "#EntrepreneurJourney", volume: 280000, growth: 20, relevance: 88 },
      { tag: "#MarketingStrategy", volume: 250000, growth: 18, relevance: 85 },
      { tag: "#SmallBusinessOwner", volume: 220000, growth: 15, relevance: 82 },
      { tag: "#BusinessGrowth", volume: 200000, growth: 12, relevance: 80 },
    ],
    tiktok: [
      { tag: "#BusinessGrowthTips", volume: 500000, growth: 35, relevance: 92 },
      { tag: "#EntrepreneurMindset", volume: 450000, growth: 30, relevance: 90 },
      { tag: "#SmallBusinessSuccess", volume: 400000, growth: 28, relevance: 88 },
      { tag: "#MarketingHacks", volume: 350000, growth: 25, relevance: 85 },
      { tag: "#BusinessStrategy", volume: 300000, growth: 20, relevance: 82 },
    ],
    youtube: [
      { tag: "business success strategies", volume: 150000, growth: 22, relevance: 90 },
      { tag: "entrepreneur lifestyle", volume: 130000, growth: 18, relevance: 88 },
      { tag: "marketing masterclass", volume: 120000, growth: 20, relevance: 85 },
      { tag: "small business growth tips", volume: 100000, growth: 15, relevance: 82 },
      { tag: "digital marketing for business", volume: 90000, growth: 12, relevance: 80 },
    ],
  },
}

export function TrendingHashtags({ platform, timePeriod }: TrendingHashtagsProps) {
  const hashtags = mockData[timePeriod][platform]
  const [selectedTrend, setSelectedTrend] = useState<(Hashtag & { platform: string }) | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

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
