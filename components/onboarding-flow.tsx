"use client"

import { useState } from "react"
import { LoginStep } from "@/components/login-step"
import { BusinessInfoStep } from "@/components/business-info-step"
import { ContentGoalsStep } from "@/components/content-goals-step"
import { FinishStep } from "@/components/finish-step"
import { Card, CardContent } from "@/components/ui/card"

type OnboardingStep = "login" | "business-info" | "content-goals" | "finish"

export type FormData = {
  name: string
  email: string
  password: string
  industry: string
  businessType: string
  contentGoals: string[]
  businessName: string
  businessDescription: string
}

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("login")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    industry: "",
    businessType: "",
    contentGoals: [],
    businessName: "",
    businessDescription: "",
  })

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep === "login") setCurrentStep("business-info")
    else if (currentStep === "business-info") setCurrentStep("content-goals")
    else if (currentStep === "content-goals") setCurrentStep("finish")
  }

  const prevStep = () => {
    if (currentStep === "business-info") setCurrentStep("login")
    else if (currentStep === "content-goals") setCurrentStep("business-info")
    else if (currentStep === "finish") setCurrentStep("content-goals")
  }

  const getStepNumber = () => {
    switch (currentStep) {
      case "login":
        return 1
      case "business-info":
        return 2
      case "content-goals":
        return 3
      case "finish":
        return 4
      default:
        return 1
    }
  }

  return (
    <Card className="w-full max-w-3xl shadow-lg">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between mb-6">
            <div
              className={`flex flex-col items-center ${currentStep === "login" ? "text-[#fc6428]" : "text-gray-400"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep === "login" ? "border-[#fc6428] bg-[#fc6428] text-white" : "border-gray-300"
                }`}
              >
                1
              </div>
              <span className="text-xs mt-1">Account</span>
            </div>
            <div className={`flex-1 mx-2 mt-5 h-0.5 ${getStepNumber() > 1 ? "bg-[#fc6428]" : "bg-gray-300"}`}></div>
            <div
              className={`flex flex-col items-center ${
                currentStep === "business-info" ? "text-[#fc6428]" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  getStepNumber() >= 2
                    ? currentStep === "business-info"
                      ? "border-[#fc6428] bg-[#fc6428] text-white"
                      : "border-[#fc6428] text-[#fc6428]"
                    : "border-gray-300"
                }`}
              >
                2
              </div>
              <span className="text-xs mt-1">Business</span>
            </div>
            <div className={`flex-1 mx-2 mt-5 h-0.5 ${getStepNumber() > 2 ? "bg-[#fc6428]" : "bg-gray-300"}`}></div>
            <div
              className={`flex flex-col items-center ${
                currentStep === "content-goals" ? "text-[#fc6428]" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  getStepNumber() >= 3
                    ? currentStep === "content-goals"
                      ? "border-[#fc6428] bg-[#fc6428] text-white"
                      : "border-[#fc6428] text-[#fc6428]"
                    : "border-gray-300"
                }`}
              >
                3
              </div>
              <span className="text-xs mt-1">Goals</span>
            </div>
            <div className={`flex-1 mx-2 mt-5 h-0.5 ${getStepNumber() > 3 ? "bg-[#fc6428]" : "bg-gray-300"}`}></div>
            <div
              className={`flex flex-col items-center ${currentStep === "finish" ? "text-[#fc6428]" : "text-gray-400"}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  getStepNumber() >= 4
                    ? currentStep === "finish"
                      ? "border-[#fc6428] bg-[#fc6428] text-white"
                      : "border-[#fc6428] text-[#fc6428]"
                    : "border-gray-300"
                }`}
              >
                4
              </div>
              <span className="text-xs mt-1">Complete</span>
            </div>
          </div>
        </div>

        {currentStep === "login" && <LoginStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />}

        {currentStep === "business-info" && (
          <BusinessInfoStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
        )}

        {currentStep === "content-goals" && (
          <ContentGoalsStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
        )}

        {currentStep === "finish" && <FinishStep formData={formData} onPrev={prevStep} />}
      </CardContent>
    </Card>
  )
}
