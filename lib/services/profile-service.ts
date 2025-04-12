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
  // In a real app, this would be an API call to fetch the user's profile data
  static async getProfileData(): Promise<ProfileFormData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockProfileData
  }

  // In a real app, this would be an API call to update the user's profile data
  static async updateProfileData(data: ProfileFormData): Promise<ProfileFormData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2500))
    return data
  }
} 