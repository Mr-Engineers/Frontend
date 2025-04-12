"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormData } from "./onboarding-flow"
import { ArrowLeft, ArrowRight, CheckCircle, Lightbulb, TrendingUp, Zap } from "lucide-react"
import Link from "next/link"

interface FinishStepProps {
  formData: FormData
  onPrev: () => void
}

export function FinishStep({ formData, onPrev }: FinishStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (formData.isSignIn) {
        // Sign in the user
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (signInError) {
          console.error('Sign in error:', {
            message: signInError.message,
            status: signInError.status,
            name: signInError.name
          })
          throw signInError
        }
      } else {
        // Sign up the user
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
            },
          },
        })

        if (signUpError) {
          console.error('Sign up error:', {
            message: signUpError.message,
            status: signUpError.status,
            name: signUpError.name
          })
          throw signUpError
        }

        if (!signUpData.user) {
          throw new Error('No user data returned after signup')
        }

        // Insert business profile with user_id
        const { error: profileError } = await supabase
          .from("business_profiles")
          .insert({
            user_id: signUpData.user.id,
            industry: formData.industry,
            business_type: formData.businessType,
            business_name: formData.businessName,
            business_description: formData.businessDescription,
          })

        if (profileError) {
          console.error('Profile creation error:', {
            message: profileError.message,
            code: profileError.code,
            details: profileError.details,
            hint: profileError.hint
          })
          throw profileError
        }

        // Insert content goals with user_id
        if (formData.contentGoals.length > 0) {
          const { error: goalsError } = await supabase
            .from("content_goals")
            .insert(
              formData.contentGoals.map((goal) => ({
                user_id: signUpData?.user?.id,
                goal_id: goal, //don't change
              }))
            )

          if (goalsError) {
            console.error('Content goals error:', {
              message: goalsError.message,
              code: goalsError.code,
              details: goalsError.details,
              hint: goalsError.hint
            })
            throw goalsError
          }
        }
      }

      // Add a small delay before navigation
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Use hard refresh to ensure the session and side menu are properly loaded
      window.location.href = "/dashboard"
    } catch (err) {
      console.error('Unexpected error:', err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col items-center justify-center text-center space-y-3 mb-6">
        <div className="h-20 w-20 rounded-full bg-[#fc6428]/10 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-[#fc6428]" />
        </div>
        <h1 className="text-2xl font-bold">Ready to get started, {formData.name}?</h1>
        <p className="text-gray-500 max-w-md">
          We'll tailor content recommendations for your {formData.industry} business once you create your account.
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

      {error && (
        <div className="text-sm text-red-500 mb-4">{error}</div>
      )}

      <div className="flex justify-between pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrev} 
          disabled={isLoading}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          type="button" 
          className="bg-[#fc6428] hover:bg-[#e55a23] disabled:opacity-50 disabled:cursor-not-allowed" 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Account"}
        </Button>
      </div>
    </div>
  )
}
