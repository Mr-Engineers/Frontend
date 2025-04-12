"use client"

import type React from "react"

import { useState } from "react"
import type { FormData } from "@/components/onboarding-flow"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Check, X, Target, Users, ShoppingCart, Heart, LightbulbIcon } from "lucide-react"

interface ContentGoalsSectionProps {
  formData: {
    contentGoals: string[]
  }
  onChange: (data: Partial<{
    contentGoals: string[]
  }>) => void
  isEditing: boolean
  onEdit: () => void
  onCancel: () => void
}

const contentGoals = [
  { id: "brand-awareness", label: "Brand Awareness", description: "Increase recognition and visibility", icon: Target },
  { id: "lead-generation", label: "Lead Generation", description: "Attract potential customers", icon: Users },
  { id: "customer-engagement", label: "Customer Engagement", description: "Build stronger relationships", icon: Heart },
  { id: "product-promotion", label: "Product Promotion", description: "Highlight your offerings", icon: ShoppingCart },
  { id: "community-building", label: "Community Building", description: "Create a loyal following", icon: Users },
  {
    id: "thought-leadership",
    label: "Thought Leadership",
    description: "Establish industry expertise",
    icon: LightbulbIcon,
  },
]

export function ContentGoalsSection({ formData, onChange, isEditing, onEdit, onCancel }: ContentGoalsSectionProps) {
  const toggleGoal = (id: string) => {
    const newGoals = formData.contentGoals.includes(id)
      ? formData.contentGoals.filter(goal => goal !== id)
      : [...formData.contentGoals, id]
    onChange({ contentGoals: newGoals })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCancel()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Content Goals</CardTitle>
            <CardDescription>Select your content marketing objectives</CardDescription>
          </div>
          {!isEditing && (
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit content goals</span>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contentGoals.map((goal) => {
                  const Icon = goal.icon
                  const isSelected = formData.contentGoals.includes(goal.id)

                  return (
                    <div
                      key={goal.id}
                      className={`cursor-pointer border rounded-md transition-all hover:border-[#fc6428] ${
                        isSelected ? "border-[#fc6428] bg-[#fc6428]/5" : ""
                      }`}
                      onClick={() => toggleGoal(goal.id)}
                    >
                      <div className="p-4 flex items-center">
                        <div
                          className={`rounded-full p-2 mr-4 ${
                            isSelected ? "bg-[#fc6428]/10 text-[#fc6428]" : "bg-gray-100"
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">{goal.label}</h3>
                          <p className="text-sm text-gray-500">{goal.description}</p>
                        </div>
                        {isSelected && (
                          <div className="ml-auto w-5 h-5 rounded-full bg-[#fc6428] flex items-center justify-center text-white">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contentGoals
                  .filter((goal) => formData.contentGoals.includes(goal.id))
                  .map((goal) => {
                    const Icon = goal.icon
                    return (
                      <div key={goal.id} className="border rounded-md p-4 flex items-center">
                        <div className="rounded-full p-2 mr-4 bg-[#fc6428]/10 text-[#fc6428]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">{goal.label}</h3>
                          <p className="text-sm text-gray-500">{goal.description}</p>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}
          </div>
        </CardContent>
        {isEditing && (
          <CardFooter className="flex justify-end gap-2 border-t px-6 py-4">
            <Button variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              className="bg-[#fc6428] hover:bg-[#e55a23]"
              onClick={handleSubmit}
              disabled={formData.contentGoals.length === 0}
            >
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
