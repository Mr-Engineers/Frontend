"use client"

import type React from "react"

import { useState } from "react"
import type { FormData } from "@/components/onboarding-flow"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface LoginStepProps {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  onNext: () => void
}

export function LoginStep({ formData, updateFormData, onNext }: LoginStepProps) {
  const [isSignIn, setIsSignIn] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignIn) {
      // Handle sign in logic here
      // For now, we'll just proceed to the next step
      onNext()
    } else {
      onNext()
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
              checked={acceptedTerms}
              onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
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

        <Button type="submit" className="w-full bg-[#fc6428] hover:bg-[#e55a23]">
          {isSignIn ? "Sign In" : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <p className="text-center text-sm text-gray-500">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-[#fc6428] hover:underline"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </button>
        </p>
      </form>
    </div>
  )
}
