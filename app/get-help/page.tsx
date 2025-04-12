"use client"

import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"

const resources = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of Sift and how to make the most of our platform.",
    category: "Basics",
  },
  {
    title: "Content Strategy Tips",
    description: "Discover best practices for creating engaging content across different platforms.",
    category: "Content",
  },
  {
    title: "Analytics Dashboard Guide",
    description: "Understand how to interpret and use your analytics data effectively.",
    category: "Analytics",
  },
  {
    title: "Platform Integration",
    description: "Learn how to connect and manage your social media platforms with Sift.",
    category: "Integration",
  },
  {
    title: "Team Collaboration",
    description: "Set up and manage your team's access and permissions.",
    category: "Team",
  },
  {
    title: "Billing & Subscription",
    description: "Information about our pricing plans and how to manage your subscription.",
    category: "Account",
  },
]

export default function GetHelpPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-4xl mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
          <p className="text-muted-foreground mb-8">
            Search our knowledge base or browse through our resources to find answers to your questions.
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource) => (
            <Card key={resource.title} className="hover:bg-accent/5 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                  <span className="text-xs font-medium text-[#fc6428] bg-[#fc6428]/10 px-2 py-1 rounded-full">
                    {resource.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 