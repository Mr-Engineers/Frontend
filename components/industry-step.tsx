"use client"

import type React from "react"
import type { FormData } from "@/components/onboarding-flow"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, ShoppingBag, Utensils, Palette, Scissors, Heart, Home, BookOpen, Camera } from "lucide-react"

interface IndustryStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}

const industries = [
  { value: "retail", label: "Retail", icon: ShoppingBag },
  { value: "food", label: "Food & Beverage", icon: Utensils },
  { value: "creative", label: "Creative Services", icon: Palette },
  { value: "beauty", label: "Beauty & Wellness", icon: Scissors },
  { value: "health", label: "Health & Fitness", icon: Heart },
  { value: "home", label: "Home Services", icon: Home },
  { value: "education", label: "Education", icon: BookOpen },
  { value: "photography", label: "Photography", icon: Camera },
]

export function IndustryStep({ formData, updateFormData, onNext, onPrev }: IndustryStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <div className="p-6">
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Select your industry</h1>
        <p className="text-gray-500">This helps us tailor content ideas specifically for your business needs</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {industries.map((industry) => {
            const Icon = industry.icon
            return (
              <Card
                key={industry.value}
                className={`cursor-pointer transition-all hover:border-[#fc6428] ${
                  formData.industry === industry.value ? "border-[#fc6428] bg-[#fc6428]/5" : ""
                }`}
                onClick={() => updateFormData({ industry: industry.value })}
              >
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <Icon className={`h-8 w-8 mb-2 ${formData.industry === industry.value ? "text-[#fc6428]" : ""}`} />
                  <span className="text-sm text-center">{industry.label}</span>
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
          <Button type="submit" className="bg-[#fc6428] hover:bg-[#e55a23]" disabled={!formData.industry}>
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
} 