"use client"

import { useEffect, useState } from "react"
import { AccountSection } from "@/components/profile/account-section"
import { BusinessSection } from "@/components/profile/business-section"
import { ContentGoalsSection } from "@/components/profile/content-goals-section"
import { PreferencesSection } from "@/components/profile/preferences-section"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileSkeleton } from "@/components/profile/profile-skeleton"
import { Button } from "@/components/ui/button"
import { BellRing } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ProfileService } from "@/lib/services/profile-service"
import { ProfileFormData } from "@/types/profile"
import { toast } from "sonner"

export function ProfilePage() {
  const [formData, setFormData] = useState<ProfileFormData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [editingSection, setEditingSection] = useState<string | null>(null)

  useEffect(() => {
    loadProfileData()
  }, [])

  const loadProfileData = async () => {
    try {
      setIsLoading(true)
      const data = await ProfileService.getProfileData()
      setFormData(data)
    } catch (error) {
      console.error("Failed to load profile data:", error)
      toast.error("Failed to load profile data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (data: Partial<ProfileFormData>) => {
    if (formData) {
      setFormData(prev => ({ ...prev!, ...data }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    try {
      setIsLoading(true)
      await ProfileService.updateProfileData(formData)
      toast.success("Profile updated successfully")
      setEditingSection(null)
    } catch (error) {
      console.error("Failed to update profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (section: string) => {
    setEditingSection(section)
  }

  const handleCancel = () => {
    setEditingSection(null)
    loadProfileData() // Reload original data
  }

  if (isLoading || !formData) {
    return (
      <div className="flex flex-col h-full">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 md:px-6">
            <SidebarTrigger />
            <div className="ml-4 font-semibold text-lg text-[#fc6428] md:hidden">TrendPulse</div>
            <div className="ml-auto flex items-center gap-4 md:gap-6">
              <Button variant="ghost" size="icon" className="text-gray-500">
                <BellRing className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </div>
          </div>
        </div>
        <ProfileSkeleton />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <SidebarTrigger />
          <div className="ml-4 font-semibold text-lg text-[#fc6428] md:hidden">TrendPulse</div>
          <div className="ml-auto flex items-center gap-4 md:gap-6">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <BellRing className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 md:px-6">
          <ProfileHeader userData={formData} />
        </div>
        <div className="px-4 md:px-6 space-y-8">
          <AccountSection 
            formData={formData}
            onChange={handleChange}
            isEditing={editingSection === 'account'}
            onEdit={() => handleEdit('account')}
            onCancel={handleCancel}
          />
          <BusinessSection 
            formData={formData}
            onChange={handleChange}
            isEditing={editingSection === 'business'}
            onEdit={() => handleEdit('business')}
            onCancel={handleCancel}
          />
          <ContentGoalsSection 
            formData={formData}
            onChange={handleChange}
            isEditing={editingSection === 'content-goals'}
            onEdit={() => handleEdit('content-goals')}
            onCancel={handleCancel}
          />
          <PreferencesSection 
            formData={formData}
            onChange={handleChange}
            isEditing={editingSection === 'preferences'}
            onEdit={() => handleEdit('preferences')}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  )
}
