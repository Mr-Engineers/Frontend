"use client"

import type React from "react"

import { useState } from "react"
import type { FormData } from "@/components/onboarding-flow"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Lock, Edit, Check, X } from "lucide-react"

interface AccountSectionProps {
  formData: {
    name: string
    email: string
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }
  onChange: (data: Partial<{
    name: string
    email: string
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }>) => void
  isEditing: boolean
  onEdit: () => void
  onCancel: () => void
}

export function AccountSection({ formData, onChange, isEditing, onEdit, onCancel }: AccountSectionProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCancel()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Update your personal information and password</CardDescription>
          </div>
          {!isEditing && (
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit account information</span>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => onChange({ name: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => onChange({ email: e.target.value })}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => onChange({ currentPassword: e.target.value })}
                        className="pl-10"
                      />
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => onChange({ newPassword: e.target.value })}
                          className="pl-10"
                        />
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => onChange({ confirmPassword: e.target.value })}
                          className="pl-10"
                        />
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
