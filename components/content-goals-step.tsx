"use client"

import type React from "react"
import type { FormData } from "@/components/onboarding-flow"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Target, Users, ShoppingCart, Heart, Lightbulb } from "lucide-react"

interface ContentGoalsStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}

const contentGoals = [
  { id: "brand-awareness", label: "Brand Awareness", description: "Increase recognition and visibility", icon: Target },
  { id: "lead-generation", label: "Lead Generation", description: "Attract potential customers", icon: Users },
  { id: "customer-engagement", label: "Customer Engagement", description: "Build stronger relationships", icon: Heart },
  { id: "product-promotion", label: "Product Promotion", description: "Highlight your offerings", icon: ShoppingCart },
  { id: "community-building", label: "Community Building", description: "Create a loyal following", icon: Users },
  { id: "thought-leadership", label: "Thought Leadership", description: "Establish industry expertise", icon: Lightbulb },
]

export function ContentGoalsStep({ formData, updateFormData, onNext, onPrev }: ContentGoalsStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const toggleGoal = (id: string) => {
    if (formData.contentGoals.includes(id)) {
      updateFormData({
        contentGoals: formData.contentGoals.filter((goal) => goal !== id),
      })
    } else {
      updateFormData({
        contentGoals: [...formData.contentGoals, id],
      })
    }
  }

  return (
    <div className="p-6">
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">What are your content goals?</h1>
        <p className="text-gray-500">Select the goals that matter most to your business (select all that apply)</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contentGoals.map((goal) => {
            const Icon = goal.icon
            const isSelected = formData.contentGoals.includes(goal.id)

            return (
              <Card
                key={goal.id}
                className={`cursor-pointer transition-all hover:border-[#fc6428] ${
                  isSelected ? "border-[#fc6428] bg-[#fc6428]/5" : ""
                }`}
                onClick={() => toggleGoal(goal.id)}
              >
                <CardContent className="p-4 flex items-center">
                  <div
                    className={`rounded-full p-2 mr-4 ${isSelected ? "bg-[#fc6428]/10 text-[#fc6428]" : "bg-gray-100"}`}
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
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            type="submit"
            className="bg-[#fc6428] hover:bg-[#e55a23]"
            disabled={formData.contentGoals.length === 0}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
}
