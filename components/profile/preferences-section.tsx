"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Edit, Check, X, Bell, Globe, Lock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SectionHeader } from "./section-header"

interface PreferencesSectionProps {
  formData: {
    emailNotifications: boolean
    pushNotifications: boolean
    contentDigest: string
    trendAlerts: boolean
    dataSharing: boolean
    darkMode: boolean
    language: string
  }
  onChange: (data: Partial<{
    emailNotifications: boolean
    pushNotifications: boolean
    contentDigest: string
    trendAlerts: boolean
    dataSharing: boolean
    darkMode: boolean
    language: string
  }>) => void
  isEditing: boolean
  onEdit: () => void
  onCancel: () => void
}

export function PreferencesSection({ formData, onChange, isEditing, onEdit, onCancel }: PreferencesSectionProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCancel()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Manage your notification and application settings</CardDescription>
          </div>
          {!isEditing && (
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit preferences</span>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-4 flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications" className="font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-gray-500">Receive updates and alerts via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={formData.emailNotifications}
                    onCheckedChange={(checked) => onChange({ emailNotifications: checked })}
                    disabled={!isEditing}
                    className="data-[state=checked]:bg-[#fc6428]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifications" className="font-medium">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={formData.pushNotifications}
                    onCheckedChange={(checked) => onChange({ pushNotifications: checked })}
                    disabled={!isEditing}
                    className="data-[state=checked]:bg-[#fc6428]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="contentDigest" className="font-medium">
                      Content Digest
                    </Label>
                    <p className="text-sm text-gray-500">How often you want to receive content updates</p>
                  </div>
                  {isEditing ? (
                    <Select
                      value={formData.contentDigest}
                      onValueChange={(value) => onChange({ contentDigest: value })}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm font-medium capitalize">{formData.contentDigest}</div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="trendAlerts" className="font-medium">
                      Trend Alerts
                    </Label>
                    <p className="text-sm text-gray-500">Get notified about trending topics in your industry</p>
                  </div>
                  <Switch
                    id="trendAlerts"
                    checked={formData.trendAlerts}
                    onCheckedChange={(checked) => onChange({ trendAlerts: checked })}
                    disabled={!isEditing}
                    className="data-[state=checked]:bg-[#fc6428]"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4 flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Application Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="language" className="font-medium">
                      Language
                    </Label>
                    <p className="text-sm text-gray-500">Select your preferred language</p>
                  </div>
                  {isEditing ? (
                    <Select
                      value={formData.language}
                      onValueChange={(value) => onChange({ language: value })}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm font-medium capitalize">{formData.language}</div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="darkMode" className="font-medium">
                      Dark Mode
                    </Label>
                    <p className="text-sm text-gray-500">Use dark theme for the application</p>
                  </div>
                  <Switch
                    id="darkMode"
                    checked={formData.darkMode}
                    onCheckedChange={(checked) => onChange({ darkMode: checked })}
                    disabled={!isEditing}
                    className="data-[state=checked]:bg-[#fc6428]"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4 flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                Privacy
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dataSharing" className="font-medium">
                      Data Sharing
                    </Label>
                    <p className="text-sm text-gray-500">Allow anonymous usage data to improve our services</p>
                  </div>
                  <Switch
                    id="dataSharing"
                    checked={formData.dataSharing}
                    onCheckedChange={(checked) => onChange({ dataSharing: checked })}
                    disabled={!isEditing}
                    className="data-[state=checked]:bg-[#fc6428]"
                  />
                </div>
              </div>
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
