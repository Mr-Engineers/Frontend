"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Clock, Info } from "lucide-react"
import { TrendsService, TrendDetails } from "@/lib/services/trends-service"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

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

export function TrendDetailsDialog({ isOpen, onClose, trend }: TrendDetailsDialogProps) {
  const [trendDetails, setTrendDetails] = useState<TrendDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen && trend) {
      setIsLoading(true)
      TrendsService.getTrendDetails(
        trend.platform.toLowerCase() as "x" | "tiktok" | "youtube",
        trend.tag
      ).then((details) => {
        setTrendDetails(details)
        setIsLoading(false)
      })
    }
  }, [isOpen, trend])

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
                {isLoading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <p className="text-2xl font-bold">{formatVolume(trendDetails?.volume || 0)}</p>
                )}
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
                {isLoading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <p className="text-2xl font-bold capitalize">{trendDetails?.insights.type}</p>
                )}
                <div className="text-xs text-gray-500 mt-1">
                  {isLoading ? (
                    <Skeleton className="h-4 w-32" />
                  ) : (
                    trendDetails?.insights.type === "viral" ? "Rapid growth" : "Sustained interest"
                  )}
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
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
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
                    trendDetails?.trendHistory
                      .map((point, i) => {
                        const x = 50 + (i / (trendDetails.trendHistory.length - 1)) * 500
                        const y = 200 - (point.volume / Math.max(...trendDetails.trendHistory.map(p => p.volume))) * 180
                        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
                      })
                      .join(" ") + ` L 550 ${200} L 50 ${200} Z`
                  }
                  fill="url(#areaGradient)"
                />

                {/* Line chart */}
                <path
                  d={trendDetails?.trendHistory
                    .map((point, i) => {
                      const x = 50 + (i / (trendDetails.trendHistory.length - 1)) * 500
                      const y = 200 - (point.volume / Math.max(...trendDetails.trendHistory.map(p => p.volume))) * 180
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
                {trendDetails?.trendHistory.map((point, i) => {
                  const x = 50 + (i / (trendDetails.trendHistory.length - 1)) * 500
                  const y = 200 - (point.volume / Math.max(...trendDetails.trendHistory.map(p => p.volume))) * 180
                  return <circle key={i} cx={x} cy={y} r="4" fill="#fc6428" stroke="white" strokeWidth="2" />
                })}

                {/* X-axis labels */}
                {trendDetails?.trendHistory.map((point, i) => {
                  if (i % Math.ceil(trendDetails.trendHistory.length / 5) === 0 || i === trendDetails.trendHistory.length - 1) {
                    const x = 50 + (i / (trendDetails.trendHistory.length - 1)) * 500
                    return (
                      <text key={i} x={x} y="235" textAnchor="middle" fontSize="14" fill="#6b7280" className="font-medium">
                        {point.date.split('-')[2]}
                      </text>
                    )
                  }
                  return null
                })}

                {/* Y-axis labels */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                  const y = 200 - ratio * 180
                  const value = Math.round(Math.max(...(trendDetails?.trendHistory.map(p => p.volume) || [0])) * ratio)
                  return (
                    <text key={i} x="40" y={y} textAnchor="end" dominantBaseline="middle" fontSize="14" fill="#6b7280" className="font-medium">
                      {formatVolume(value)}
                    </text>
                  )
                })}
              </svg>
            )}
          </div>
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg border-l-4 border-l-[#fc6428]">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-[#fc6428] mt-0.5" />
            <div>
              <h4 className="font-medium">Trend Insights</h4>
              {isLoading ? (
                <>
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600 mt-1">
                    {trendDetails?.description}
                  </p>
                  <div className="mt-3 text-sm">
                    <span className="font-medium">Recommendation: </span>
                    <span className="text-gray-600">
                      {trendDetails?.insights.recommendedAction}
                    </span>
                  </div>
                </>
              )}
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
