export interface ProfileFormData {
  // Account Information
  name: string
  email: string
  currentPassword: string
  newPassword: string
  confirmPassword: string

  // Business Information
  businessName: string
  businessDescription: string
  industry: string
  businessType: string

  // Content Goals
  contentGoals: string[]

  // Preferences
  emailNotifications: boolean
  pushNotifications: boolean
  contentDigest: string
  trendAlerts: boolean
  dataSharing: boolean
  darkMode: boolean
  language: string
} 