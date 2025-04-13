import { ProfileFormData } from "@/types/profile"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Mock data that would come from the backend
const mockProfileData: ProfileFormData = {
  // Account Information
  name: "John Doe",
  email: "john@example.com",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",

  // Business Information
  businessName: "Acme Inc",
  businessDescription: "We provide high-quality products for small businesses.",
  industry: "retail",
  businessType: "LLC",

  // Content Goals
  contentGoals: ["brand-awareness", "lead-generation", "customer-engagement"],

  // Preferences
  emailNotifications: true,
  pushNotifications: false,
  contentDigest: "weekly",
  trendAlerts: true,
  dataSharing: false,
  darkMode: false,
  language: "english"
}

export class ProfileService {
  private static API_BASE_URL = 'http://18.201.217.41:5000'

  private static async getAuthHeaders() {
    const supabase = createClientComponentClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.access_token) {
      throw new Error('No authentication token available')
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`
    }
  }

  static async getProfileData(): Promise<ProfileFormData> {
    try {
      const headers = await this.getAuthHeaders()
      const response = await fetch(`${this.API_BASE_URL}/api/user`, {
        method: 'GET',
        headers,
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const { user } = await response.json()
      
      // Map server response to ProfileFormData
      const profileData: ProfileFormData = {
        // Account Information
        name: user.name,
        email: user.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",

        // Business Information
        businessName: user.businessName,
        businessDescription: user.businessDescription,
        industry: user.industry,
        businessType: user.business_type,

        // Content Goals
        contentGoals: user.contentGoals,

        // Preferences (default values since not provided by server)
        emailNotifications: true,
        pushNotifications: false,
        contentDigest: "weekly",
        trendAlerts: true,
        dataSharing: false,
        darkMode: false,
        language: "english"
      }

      return profileData
    } catch (error) {
      console.error('Error fetching profile data:', error)
      throw error
    }
  }

  static async updateProfileData(data: ProfileFormData): Promise<ProfileFormData> {
    try {
      const headers = await this.getAuthHeaders()
      const response = await fetch(`${this.API_BASE_URL}/api/user`, {
        method: 'PUT',
        headers,
        credentials: 'include',
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const updatedData = await response.json()
      return updatedData as ProfileFormData
    } catch (error) {
      console.error('Error updating profile data:', error)
      throw error
    }
  }
} 