import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export interface SavedContent {
  id: string
  title: string
  description: string
  platform: "x" | "tiktok" | "youtube"
  contentType: "video" | "image" | "article"
  relevance: number
  hashtags: string[]
  isSaved: boolean
}

const mockSavedContent: SavedContent[] = [
  {
    id: "1",
    title: "How to Create Engaging Social Media Content",
    description: "Learn the best practices for creating content that resonates with your audience and drives engagement.",
    platform: "x",
    contentType: "article",
    relevance: 88,
    hashtags: ["#SocialMedia", "#ContentCreation", "#Marketing"],
    isSaved: true
  },
  {
    id: "2",
    title: "The Power of Storytelling in Marketing",
    description: "Discover how to use storytelling techniques to make your brand message more compelling and memorable.",
    platform: "youtube",
    contentType: "video",
    relevance: 92,
    hashtags: ["#Storytelling", "#Marketing", "#Branding"],
    isSaved: true
  },
  {
    id: "3",
    title: "Content Calendar Planning Guide",
    description: "A comprehensive guide to planning and organizing your content calendar for maximum impact.",
    platform: "tiktok",
    contentType: "video",
    relevance: 85,
    hashtags: ["#ContentPlanning", "#SocialMedia", "#Strategy"],
    isSaved: true
  },
  {
    id: "4",
    title: "Social Media Analytics: What to Track",
    description: "Understand which metrics matter most for your social media strategy and how to track them effectively.",
    platform: "x",
    contentType: "article",
    relevance: 90,
    hashtags: ["#Analytics", "#SocialMedia", "#Metrics"],
    isSaved: true
  },
  {
    id: "5",
    title: "Building a Strong Brand Voice",
    description: "Learn how to develop and maintain a consistent brand voice across all your content channels.",
    platform: "youtube",
    contentType: "video",
    relevance: 87,
    hashtags: ["#Branding", "#ContentStrategy", "#Marketing"],
    isSaved: true
  }
]

export class SavedContentService {
  private static API_BASE_URL = 'http://18.201.217.41:5000'

  private static async getAuthHeaders() {
    const supabase = createClientComponentClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.access_token) {
      throw new Error('No authentication token available')
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  }

  static async getSavedContent(): Promise<SavedContent[]> {
    try {
      const headers = await this.getAuthHeaders()
      const response = await fetch(`${this.API_BASE_URL}/api/content`, {
        method: 'GET',
        headers,
        credentials: 'include',
        mode: 'cors'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Map the API response to our SavedContent interface
      return data.Content.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        platform: item.platform.toLowerCase() as "x" | "tiktok" | "youtube",
        contentType: item.type.toLowerCase() as "video" | "image" | "article",
        relevance: Math.floor(item.relevance * 100),
        hashtags: item.tags.map((tag: any) => tag.name),
        isSaved: item.is_saved
      }))
    } catch (error) {
      console.error('Error fetching saved content:', error)
      return []
    }
  }

  static async toggleSave(id: string): Promise<SavedContent[]> {
    const updatedContent = mockSavedContent.map(item => 
      item.id === id ? { ...item, isSaved: !item.isSaved } : item
    )
    
    return updatedContent
  }

  static async getCategories(): Promise<string[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const categories = new Set(mockSavedContent.map(item => item.contentType))
    return Array.from(categories)
  }

  static async getPlatforms(): Promise<string[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const platforms = new Set(mockSavedContent.map(item => item.platform))
    return Array.from(platforms)
  }

  static async saveContent(content: SavedContent): Promise<boolean> {
    try {
      const headers = await this.getAuthHeaders()
      const response = await fetch(`${this.API_BASE_URL}/api/content`, {
        method: 'PUT',
        headers,
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          id: content.id,
          is_saved: content.isSaved
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return true
    } catch (error) {
      console.error('Error saving content:', error)
      return false
    }
  }
} 