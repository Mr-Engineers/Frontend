"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { TrendingHashtags } from "@/components/trending-hashtags"
import { RecommendedContent } from "@/components/recommended-content"
import { DashboardHeader } from "@/components/dashboard-header"
import { SidebarTrigger } from "@/components/ui/sidebar"

type TimePeriod = "today" | "week" | "month"

export function DashboardComponent() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("today")

  return (
    <div className="flex flex-col h-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <SidebarTrigger />
          <div className="ml-4 font-semibold text-lg text-[#fc6428] md:hidden">TrendPulse</div>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <DashboardHeader 
            title="Dashboard"
            description="Welcome to your content management dashboard"
          />
        </div>
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Current Trends</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={timePeriod === "today" ? "default" : "outline"}
                    size="sm"
                    className={timePeriod === "today" ? "bg-[#fc6428] hover:bg-[#e55a23]" : ""}
                    onClick={() => setTimePeriod("today")}
                  >
                    Today
                  </Button>
                  <Button
                    variant={timePeriod === "week" ? "default" : "outline"}
                    size="sm"
                    className={timePeriod === "week" ? "bg-[#fc6428] hover:bg-[#e55a23]" : ""}
                    onClick={() => setTimePeriod("week")}
                  >
                    This Week
                  </Button>
                  <Button
                    variant={timePeriod === "month" ? "default" : "outline"}
                    size="sm"
                    className={timePeriod === "month" ? "bg-[#fc6428] hover:bg-[#e55a23]" : ""}
                    onClick={() => setTimePeriod("month")}
                  >
                    This Month
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="x">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="x">X</TabsTrigger>
                  <TabsTrigger value="tiktok">TikTok</TabsTrigger>
                  <TabsTrigger value="youtube">YouTube</TabsTrigger>
                </TabsList>
                <TabsContent value="x">
                  <TrendingHashtags platform="x" timePeriod={timePeriod} />
                </TabsContent>
                <TabsContent value="tiktok">
                  <TrendingHashtags platform="tiktok" timePeriod={timePeriod} />
                </TabsContent>
                <TabsContent value="youtube">
                  <TrendingHashtags platform="youtube" timePeriod={timePeriod} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Content</CardTitle>
            </CardHeader>
            <CardContent>
              <RecommendedContent timePeriod={timePeriod} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
