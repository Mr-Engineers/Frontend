"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface FinishStepProps {
  formData: {
    name: string
    industry: string
  }
  onPrev: () => void
}

export function FinishStep({ formData, onPrev }: FinishStepProps) {
  const router = useRouter()

  const handleFinish = () => {
    router.push("/dashboard")
  }

  return (
    <div className="p-6">
      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-8">
        <div className="h-20 w-20 rounded-full bg-[#fc6428]/10 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-[#fc6428]" />
        </div>
        <h1 className="text-2xl font-bold">You're all set, {formData.name}!</h1>
        <p className="text-gray-500 max-w-md">
          Your account has been created and we've tailored our content recommendations for your {formData.industry}{" "}
          business.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="bg-[#fc6428]/5 p-4 rounded-lg flex flex-col items-center text-center">
          <TrendingUp className="h-8 w-8 text-[#fc6428] mb-2" />
          <h3 className="font-medium">Trending Topics</h3>
          <p className="text-sm text-gray-500">Discover what's trending in your industry</p>
        </div>

        <div className="bg-[#fc6428]/5 p-4 rounded-lg flex flex-col items-center text-center">
          <Lightbulb className="h-8 w-8 text-[#fc6428] mb-2" />
          <h3 className="font-medium">Content Ideas</h3>
          <p className="text-sm text-gray-500">Get fresh content ideas tailored to your business</p>
        </div>

        <div className="bg-[#fc6428]/5 p-4 rounded-lg flex flex-col items-center text-center">
          <Zap className="h-8 w-8 text-[#fc6428] mb-2" />
          <h3 className="font-medium">Performance Insights</h3>
          <p className="text-sm text-gray-500">Track what resonates with your audience</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-medium">Resources to get started:</h2>
        <div className="grid gap-3">
          <Link href="#">
            <div className="p-4 border rounded-lg hover:border-[#fc6428] hover:bg-[#fc6428]/5 transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium group-hover:text-[#fc6428]">
                    How to create engaging social media content
                  </h3>
                  <p className="text-sm text-gray-500">
                    Learn the fundamentals of creating content that drives engagement
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#fc6428]" />
              </div>
            </div>
          </Link>

          <Link href="#">
            <div className="p-4 border rounded-lg hover:border-[#fc6428] hover:bg-[#fc6428]/5 transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium group-hover:text-[#fc6428]">Understanding content analytics</h3>
                  <p className="text-sm text-gray-500">How to measure and improve your content performance</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#fc6428]" />
              </div>
            </div>
          </Link>

          <Link href="#">
            <div className="p-4 border rounded-lg hover:border-[#fc6428] hover:bg-[#fc6428]/5 transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium group-hover:text-[#fc6428]">
                    Best practices for {formData.industry} businesses
                  </h3>
                  <p className="text-sm text-gray-500">
                    Industry-specific strategies that work for businesses like yours
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#fc6428]" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onPrev}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button type="button" className="bg-[#fc6428] hover:bg-[#e55a23]" onClick={handleFinish}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
} 