"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { FormData } from "@/components/onboarding-flow"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface LoginStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
  isSignIn: boolean
  setIsSignIn: (value: boolean) => void
}

export function LoginStep({ formData, updateFormData, onNext, isSignIn, setIsSignIn }: LoginStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const validateEmail = (email: string) => {
    // More comprehensive email validation
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    if (!isSignIn && !formData.acceptedTerms) {
      setError("Please accept the terms and conditions")
      setIsLoading(false)
      return
    }

    try {
      if (isSignIn) {
        // Sign in the user
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (signInError) throw signInError

        // Add a small delay before refreshing the session
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Force a refresh of the session
        await supabase.auth.refreshSession()
        
        // Add another small delay before navigation
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Use hard refresh to ensure the session and side menu are properly loaded
        window.location.href = "/dashboard"
      } else {
        // Continue to next step for sign up
        onNext()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold">{isSignIn ? "Welcome back" : "Create your account"}</h1>
        <p className="text-gray-500">
          {isSignIn
            ? "Sign in to access your account"
            : "Join thousands of businesses discovering trending content ideas"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isSignIn && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder={isSignIn ? "Enter your password" : "Create a secure password"}
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
            required
          />
          {!isSignIn && (
            <p className="text-xs text-gray-500">Must be at least 8 characters with 1 number and 1 special character</p>
          )}
        </div>

        {!isSignIn && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.acceptedTerms}
              onCheckedChange={(checked) => updateFormData({ acceptedTerms: checked as boolean })}
              required
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link href="#" className="text-[#fc6428] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-[#fc6428] hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
        )}

        {error && (
          <div className="text-sm text-red-500">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-[#fc6428] hover:bg-[#e55a23]"
            disabled={isLoading || (!isSignIn && !formData.acceptedTerms)}
          >
            {isLoading ? "Loading..." : isSignIn ? "Sign In" : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </Button>
        </div>
      </form>
    </div>
  )
}
