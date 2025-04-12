"use client"

import type React from "react"

import { useState } from "react"
import type { FormData } from "@/components/onboarding-flow"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Edit,
  Check,
  X,
  Building,
  ShoppingBag,
  Utensils,
  Palette,
  Scissors,
  Heart,
  Home,
  BookOpen,
  Camera,
} from "lucide-react"
import { SectionHeader } from "./section-header"

interface BusinessSectionProps {
  formData: {
    businessName: string
    businessDescription: string
    industry: string
    businessType: string
  }
  onChange: (data: Partial<{
    businessName: string
    businessDescription: string
    industry: string
    businessType: string
  }>) => void
  isEditing: boolean
  onEdit: () => void
  onCancel: () => void
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

const businessTypes = ["Sole Proprietorship", "Partnership", "LLC", "Corporation", "Nonprofit", "Freelancer"]

export function BusinessSection({ formData, onChange, isEditing, onEdit, onCancel }: BusinessSectionProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCancel()
  }

  // Find the current industry object
  const currentIndustry = industries.find((ind) => ind.value === formData.industry)
  const IndustryIcon = currentIndustry?.icon || ShoppingBag

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Update details about your business</CardDescription>
          </div>
          {!isEditing && (
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit business information</span>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <div className="relative">
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={(e) => onChange({ businessName: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                  <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                {isEditing ? (
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => onChange({ businessType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input id="businessType" value={formData.businessType} disabled />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Industry</Label>
              {isEditing ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {industries.map((industry) => {
                    const Icon = industry.icon
                    return (
                      <div
                        key={industry.value}
                        className={`cursor-pointer border rounded-md transition-all hover:border-[#fc6428] ${
                          formData.industry === industry.value ? "border-[#fc6428] bg-[#fc6428]/5" : ""
                        }`}
                        onClick={() => onChange({ industry: industry.value })}
                      >
                        <div className="flex flex-col items-center justify-center p-4">
                          <Icon
                            className={`h-8 w-8 mb-2 ${formData.industry === industry.value ? "text-[#fc6428]" : ""}`}
                          />
                          <span className="text-sm text-center">{industry.label}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 border rounded-md">
                  <div className="h-10 w-10 rounded-full bg-[#fc6428]/10 flex items-center justify-center">
                    <IndustryIcon className="h-6 w-6 text-[#fc6428]" />
                  </div>
                  <div>
                    <p className="font-medium">{currentIndustry?.label || "Retail"}</p>
                    <p className="text-sm text-gray-500">Your selected industry</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessDescription">Business Description</Label>
              <Textarea
                id="businessDescription"
                name="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => onChange({ businessDescription: e.target.value })}
                disabled={!isEditing}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CardContent>
        {isEditing && (
          <CardFooter className="flex justify-end gap-2 border-t px-6 py-4">
            <Button variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button className="bg-[#fc6428] hover:bg-[#e55a23]" onClick={handleSubmit}>
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
