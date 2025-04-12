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
  static async getSavedContent(): Promise<SavedContent[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2500))
    return mockSavedContent
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
} 