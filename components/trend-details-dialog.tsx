"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Clock, Info } from "lucide-react"

interface TrendDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  trend: {
    tag: string
    volume: number
    growth: number
    relevance: number
    platform: string
  } | null
}

// Mock data for trend history
const generateTrendHistory = (type: "long" | "viral") => {
  const days = type === "long" ? 30 : 7
  const data = []

  if (type === "long") {
    // Long trend with steady growth
    let baseValue = 10000 + Math.random() * 5000
    for (let i = 0; i < days; i++) {
      baseValue = baseValue + (Math.random() * 1000 - 200)
      data.push({
        day: i + 1,
        volume: Math.round(baseValue),
      })
    }
  } else {
    // Viral trend with sharp spike
    let baseValue = 1000 + Math.random() * 500
    for (let i = 0; i < days; i++) {
      if (i < 2) {
        baseValue = baseValue + Math.random() * 500
      } else if (i < 4) {
        baseValue = baseValue + Math.random() * 10000
      } else {
        baseValue = baseValue - Math.random() * 2000
        baseValue = Math.max(baseValue, 1000)
      }
      data.push({
        day: i + 1,
        volume: Math.round(baseValue),
      })
    }
  }

  return data
}

export function TrendDetailsDialog({ isOpen, onClose, trend }: TrendDetailsDialogProps) {
  // Determine if this is a long trend or viral trend (randomly for demo)
  const trendType = Math.random() > 0.5 ? "long" : "viral"
  const trendHistory = generateTrendHistory(trendType)

  // Find max value for scaling the chart
  const maxVolume = Math.max(...trendHistory.map((d) => d.volume))

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

  if (!trend) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Badge
              variant="outline"
              className="bg-[#fc6428]/10 text-[#fc6428] border-[#fc6428]/20 hover:bg-[#fc6428]/20 text-base py-1 px-3"
            >
              {trend.tag}
            </Badge>
            <span className="text-sm text-gray-500">on {trend.platform}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 my-4">
          <Card className="border-l-4 border-l-[#fc6428] overflow-hidden">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Volume</p>
                <p className="text-2xl font-bold">{formatVolume(trend.volume)}</p>
                <div className="text-xs text-gray-500 mt-1">Total posts</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#fc6428]/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-[#fc6428]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#fc6428] overflow-hidden">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Trend Type</p>
                <p className="text-2xl font-bold capitalize">{trendType}</p>
                <div className="text-xs text-gray-500 mt-1">
                  {trendType === "long" ? "Sustained interest" : "Rapid growth"}
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#fc6428]/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-[#fc6428]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Trend History</h3>
          <div className="h-[200px] w-full relative bg-white p-6 rounded-lg border">
            {/* SVG line chart with proper viewBox and padding */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 600 250"
              preserveAspectRatio="none"
              className="overflow-visible"
            >
              {/* Grid lines */}
              <g className="grid-lines">
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                  <line
                    key={`grid-${i}`}
                    x1="50"
                    y1={200 - ratio * 180}
                    x2="550"
                    y2={200 - ratio * 180}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    strokeDasharray={i > 0 ? "4 4" : ""}
                  />
                ))}
              </g>

              {/* Area under the line with gradient */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fc6428" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#fc6428" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d={
                  trendHistory
                    .map((point, i) => {
                      const x = 50 + (i / (trendHistory.length - 1)) * 500
                      const y = 200 - (point.volume / maxVolume) * 180
                      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
                    })
                    .join(" ") + ` L 550 ${200} L 50 ${200} Z`
                }
                fill="url(#areaGradient)"
              />

              {/* Line chart */}
              <path
                d={trendHistory
                  .map((point, i) => {
                    const x = 50 + (i / (trendHistory.length - 1)) * 500
                    const y = 200 - (point.volume / maxVolume) * 180
                    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
                  })
                  .join(" ")}
                fill="none"
                stroke="#fc6428"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {trendHistory.map((point, i) => {
                const x = 50 + (i / (trendHistory.length - 1)) * 500
                const y = 200 - (point.volume / maxVolume) * 180
                return <circle key={i} cx={x} cy={y} r="4" fill="#fc6428" stroke="white" strokeWidth="2" />
              })}

              {/* X-axis labels */}
              {trendHistory.map((point, i) => {
                if (i % Math.ceil(trendHistory.length / 5) === 0 || i === trendHistory.length - 1) {
                  const x = 50 + (i / (trendHistory.length - 1)) * 500
                  return (
                    <text key={i} x={x} y="235" textAnchor="middle" fontSize="14" fill="#6b7280" className="font-medium">
                      Day {point.day}
                    </text>
                  )
                }
                return null
              })}

              {/* Y-axis labels */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = 200 - ratio * 180
                const value = Math.round(maxVolume * ratio)
                return (
                  <text key={i} x="40" y={y} textAnchor="end" dominantBaseline="middle" fontSize="14" fill="#6b7280" className="font-medium">
                    {formatVolume(value)}
                  </text>
                )
              })}
            </svg>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg border-l-4 border-l-[#fc6428]">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-[#fc6428] mt-0.5" />
            <div>
              <h4 className="font-medium">Trend Insights</h4>
              <p className="text-sm text-gray-600 mt-1">
                {trendType === "long"
                  ? `This is a long-lasting trend that has shown consistent engagement over time. It's likely to remain relevant for your audience in the coming weeks.`
                  : `This is a viral trend with a sharp spike in popularity. It may not last long, so consider creating content quickly to capitalize on its current momentum.`}
              </p>
              <div className="mt-3 text-sm">
                <span className="font-medium">Recommendation: </span>
                <span className="text-gray-600">
                  {trendType === "long"
                    ? "Create in-depth, evergreen content that can perform well over time."
                    : "Create timely, reactive content to capture immediate attention."}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
