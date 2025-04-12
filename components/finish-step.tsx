"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormData } from "./onboarding-flow"

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

        if (signInError) throw signInError
      } else {
        // Sign up the user
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
            },
          },
        })

        if (signUpError) throw signUpError

        // Insert business profile
        const { error: profileError } = await supabase
          .from("business_profiles")
          .insert({
            industry: formData.industry,
            business_type: formData.businessType,
            business_name: formData.businessName,
            business_description: formData.businessDescription,
          })

        if (profileError) throw profileError

        // Insert content goals
        if (formData.contentGoals.length > 0) {
          const { error: goalsError } = await supabase
            .from("content_goals")
            .insert(
              formData.contentGoals.map((goal) => ({
                goal_name: goal,
              }))
            )

          if (goalsError) throw goalsError
        }
      }

      // Add a small delay before refreshing the session
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Force a refresh of the session
      await supabase.auth.refreshSession()
      
      // Add another small delay before navigation
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Use hard refresh to ensure the session and side menu are properly loaded
      window.location.href = "/dashboard"
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-semibold">Welcome to Sift!</h2>
          <p className="text-center text-muted-foreground">
            {formData.isSignIn
              ? "You're all set! You can now access your dashboard."
              : "Your account has been created successfully. You can now start using Sift to manage your content."}
          </p>
          {error && (
            <div className="text-sm text-red-500">{error}</div>
          )}
          <div className="flex gap-4 mt-4">
            <Button
              variant="outline"
              onClick={onPrev}
              disabled={isLoading}
            >
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Go to Dashboard"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
