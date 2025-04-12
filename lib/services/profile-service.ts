import { ProfileFormData } from "@/types/profile"

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
  private static API_BASE_URL = 'http://18.201.217.42:5000'

  static async getProfileData(): Promise<ProfileFormData> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/api/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log(data)
      return mockProfileData as ProfileFormData
    } catch (error) {
      console.error('Error fetching profile data:', error)
      throw error
    }
  }

  static async updateProfileData(data: ProfileFormData): Promise<ProfileFormData> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
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