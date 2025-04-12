"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { LoginStep } from "@/components/login-step"
import { IndustryStep } from "@/components/industry-step"
import { BusinessDetailsStep } from "@/components/business-details-step"
import { ContentGoalsStep } from "@/components/content-goals-step"
import { FinishStep } from "@/components/finish-step"
import { Card, CardContent } from "@/components/ui/card"

type OnboardingStep = "login" | "industry" | "business-details" | "content-goals" | "finish"

export type FormData = {
  name: string
  email: string
  password: string
  industry: string
  businessType: string
  businessName: string
  businessDescription: string
  contentGoals: string[]
  isSignIn: boolean
}

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("login")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    industry: "",
    businessType: "",
    businessName: "",
    businessDescription: "",
    contentGoals: [],
    isSignIn: false,
  })

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep === "login") {
      if (formData.isSignIn) {
        // Redirect to dashboard when signing in
        window.location.href = "/dashboard"
        return
      }
      setCurrentStep("industry")
    } else if (currentStep === "industry") setCurrentStep("business-details")
    else if (currentStep === "business-details") setCurrentStep("content-goals")
    else if (currentStep === "content-goals") setCurrentStep("finish")
  }

  const prevStep = () => {
    if (currentStep === "industry") setCurrentStep("login")
    else if (currentStep === "business-details") setCurrentStep("industry")
    else if (currentStep === "content-goals") setCurrentStep("business-details")
    else if (currentStep === "finish") setCurrentStep("content-goals")
  }

  const getStepNumber = () => {
    switch (currentStep) {
      case "login":
        return 1
      case "industry":
        return 2
      case "business-details":
        return 3
      case "content-goals":
        return 4
      case "finish":
        return 5
      default:
        return 1
    }
  }

  return (
    <Card className="w-full max-w-3xl shadow-lg">
      <CardContent className="p-0">
        {(!formData.isSignIn || currentStep !== "login") && (
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/siftlogo.png"
                  alt="Sift Logo"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <h1 className="text-[1.5rem] font-grotesk font-semibold text-primary">Sift</h1>
              </div>
              <div className="flex justify-between w-full mt-4">
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
                    currentStep === "industry" ? "text-[#fc6428]" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      getStepNumber() >= 2
                        ? currentStep === "industry"
                          ? "border-[#fc6428] bg-[#fc6428] text-white"
                          : "border-[#fc6428] text-[#fc6428]"
                        : "border-gray-300"
                    }`}
                  >
                    2
                  </div>
                  <span className="text-xs mt-1">Industry</span>
                </div>
                <div className={`flex-1 mx-2 mt-5 h-0.5 ${getStepNumber() > 2 ? "bg-[#fc6428]" : "bg-gray-300"}`}></div>
                <div
                  className={`flex flex-col items-center ${
                    currentStep === "business-details" ? "text-[#fc6428]" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      getStepNumber() >= 3
                        ? currentStep === "business-details"
                          ? "border-[#fc6428] bg-[#fc6428] text-white"
                          : "border-[#fc6428] text-[#fc6428]"
                        : "border-gray-300"
                    }`}
                  >
                    3
                  </div>
                  <span className="text-xs mt-1">Business</span>
                </div>
                <div className={`flex-1 mx-2 mt-5 h-0.5 ${getStepNumber() > 3 ? "bg-[#fc6428]" : "bg-gray-300"}`}></div>
                <div
                  className={`flex flex-col items-center ${
                    currentStep === "content-goals" ? "text-[#fc6428]" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      getStepNumber() >= 4
                        ? currentStep === "content-goals"
                          ? "border-[#fc6428] bg-[#fc6428] text-white"
                          : "border-[#fc6428] text-[#fc6428]"
                        : "border-gray-300"
                    }`}
                  >
                    4
                  </div>
                  <span className="text-xs mt-1">Goals</span>
                </div>
                <div className={`flex-1 mx-2 mt-5 h-0.5 ${getStepNumber() > 4 ? "bg-[#fc6428]" : "bg-gray-300"}`}></div>
                <div
                  className={`flex flex-col items-center ${currentStep === "finish" ? "text-[#fc6428]" : "text-gray-400"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      getStepNumber() >= 5
                        ? currentStep === "finish"
                          ? "border-[#fc6428] bg-[#fc6428] text-white"
                          : "border-[#fc6428] text-[#fc6428]"
                        : "border-gray-300"
                    }`}
                  >
                    5
                  </div>
                  <span className="text-xs mt-1">Complete</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            layout
            className="relative"
            transition={{ 
              layout: { 
                duration: 0.2,
                ease: [0.2, 0, 0, 1]
              }
            }}
          >
            {currentStep === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                layout
              >
                <LoginStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
              </motion.div>
            )}

            {currentStep === "industry" && (
              <motion.div
                key="industry"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                layout
              >
                <IndustryStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
              </motion.div>
            )}

            {currentStep === "business-details" && (
              <motion.div
                key="business-details"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                layout
              >
                <BusinessDetailsStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
              </motion.div>
            )}

            {currentStep === "content-goals" && (
              <motion.div
                key="content-goals"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                layout
              >
                <ContentGoalsStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />
              </motion.div>
            )}

            {currentStep === "finish" && (
              <motion.div
                key="finish"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
                layout
              >
                <FinishStep formData={formData} onPrev={prevStep} />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
