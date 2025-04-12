"use client"

import type React from "react"
import type { FormData } from "@/components/onboarding-flow"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface BusinessDetailsStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  onPrev: () => void
}

const businessTypes = ["Sole Proprietorship", "Partnership", "LLC", "Corporation", "Nonprofit", "Freelancer"]

export function BusinessDetailsStep({ formData, updateFormData, onNext, onPrev }: BusinessDetailsStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  return (
    <div className="p-6">
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">Tell us about your business</h1>
        <p className="text-gray-500">This helps us tailor content ideas specifically for your business needs</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type</Label>
          <Select value={formData.businessType} onValueChange={(value) => updateFormData({ businessType: value })}>
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            placeholder="Your Business Name"
            value={formData.businessName}
            onChange={(e) => updateFormData({ businessName: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessDescription">Tell us about your business</Label>
          <Textarea
            id="businessDescription"
            placeholder="Briefly describe what your business does and who your customers are..."
            value={formData.businessDescription}
            onChange={(e) => updateFormData({ businessDescription: e.target.value })}
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onPrev}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="submit" className="bg-[#fc6428] hover:bg-[#e55a23]">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
} 