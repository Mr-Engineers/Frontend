"use client"

import { CheckIcon, XIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DashboardHeader } from "@/components/dashboard-header"

interface ContentItem {
  id: string
  title: string
  description: string
  platform: string
  date: string
  isSaved: boolean
}

export function Dashboard() {
  const [timePeriod, setTimePeriod] = useState("week")
  const [content, setContent] = useState<ContentItem[]>([
    {
      id: "1",
      title: "How to Create Engaging Social Media Content",
      description: "Learn the best practices for creating content that resonates with your audience and drives engagement.",
      platform: "LinkedIn",
      date: "2024-03-15",
      isSaved: false,
    },
    {
      id: "2",
      title: "The Power of Storytelling in Marketing",
      description: "Discover how to use storytelling techniques to make your brand message more compelling and memorable.",
      platform: "X",
      date: "2024-03-14",
      isSaved: false,
    },
    {
      id: "3",
      title: "Content Calendar Planning Guide",
      description: "A comprehensive guide to planning and organizing your content calendar for maximum impact.",
      platform: "Instagram",
      date: "2024-03-13",
      isSaved: false,
    },
  ])

  const toggleSave = (id: string) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, isSaved: !item.isSaved } : item
    ))
  }

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6">
      <DashboardHeader
        title="Recommended Content"
        description="Content pieces tailored to your business needs"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={timePeriod === "day" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimePeriod("day")}
          >
            Today
          </Button>
          <Button
            variant={timePeriod === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimePeriod("week")}
          >
            This Week
          </Button>
          <Button
            variant={timePeriod === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimePeriod("month")}
          >
            This Month
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Most Relevant</DropdownMenuItem>
            <DropdownMenuItem>Most Recent</DropdownMenuItem>
            <DropdownMenuItem>Most Popular</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {content.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <button
                onClick={() => toggleSave(item.id)}
                className={`rounded-full p-2 transition-colors ${
                  item.isSaved ? "bg-orange-100 text-orange-600" : "bg-muted text-muted-foreground"
                }`}
              >
                {item.isSaved ? <CheckIcon className="h-4 w-4" /> : <CheckIcon className="h-4 w-4" />}
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>{item.platform}</span>
              <span>{item.date}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 