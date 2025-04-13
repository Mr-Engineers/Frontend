import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export interface Trend {
  tag: string
  posts: number
  views: number
  relevance: number
  growth?: number
  platform?: string
}

interface ContentItem {
  id: string
  title: string
  description: string
  platform: "x" | "tiktok" | "youtube"
  contentType: "video" | "image" | "article"
  relevance: number
  hashtags: string[]
  isSaved: boolean
}

export interface TrendDetails {
  id: string;
  tag: string;
  platform: "x" | "tiktok" | "youtube";
  volume: number;
  growth: number;
  relevance: number;
  description: string;
  relatedHashtags: string[];
  topPosts: {
    id: string;
    content: string;
    author: string;
    likes: number;
    shares: number;
    url: string;
  }[];
  trendHistory: {
    date: string;
    volume: number;
  }[];
  insights: {
    type: "viral" | "growing" | "stable" | "declining";
    peakTime: string;
    averageEngagement: number;
    recommendedAction: string;
  };
}

export class TrendsService {
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

  private static getMockXTrends(): Trend[] {
    return [
      { tag: "#SmallBusiness", posts: 45000, views: 1200000, relevance: 95 },
      { tag: "#Entrepreneurship", posts: 32000, views: 850000, relevance: 90 },
      { tag: "#MarketingTips", posts: 28000, views: 750000, relevance: 85 },
      { tag: "#BusinessGrowth", posts: 22000, views: 600000, relevance: 80 },
      { tag: "#StartupLife", posts: 18000, views: 500000, relevance: 75 },
    ]
  }

  private static getMockTikTokTrends(): Trend[] {
    return [
      { tag: "#SmallBusinessCheck", posts: 120000, views: 5000000, relevance: 90 },
      { tag: "#BusinessTok", posts: 95000, views: 4000000, relevance: 85 },
      { tag: "#EntrepreneurLife", posts: 85000, views: 3500000, relevance: 80 },
      { tag: "#MarketingStrategy", posts: 65000, views: 3000000, relevance: 75 },
      { tag: "#BusinessOwner", posts: 55000, views: 2500000, relevance: 70 },
    ]
  }

  private static getMockYouTubeTrends(): Trend[] {
    return [
      { tag: "small business tips", posts: 35000, views: 1000000, relevance: 85 },
      { tag: "entrepreneur daily", posts: 28000, views: 800000, relevance: 80 },
      { tag: "marketing strategy", posts: 25000, views: 700000, relevance: 75 },
      { tag: "business growth hacks", posts: 22000, views: 600000, relevance: 70 },
      { tag: "startup success", posts: 18000, views: 500000, relevance: 65 },
    ]
  }

  static async getXTrends(timePeriod: "today" | "week" | "month"): Promise<Trend[]> {
    if (timePeriod !== "today") {
      return this.getMockXTrends()
    }

    try {
      const headers = await this.getAuthHeaders()
      const response = await fetch(`${this.API_BASE_URL}/api/twitter?range=${timePeriod}`, {
        method: 'GET',
        headers,
        credentials: 'include',
        mode: 'cors'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Twitter trends response:', data)
      
      // Map the X API response to our Trend interface
      return data.data.map((trend: any) => ({
        tag: trend.name,
        posts: trend.post_count,
        views: Math.floor(trend.post_count * 100), // Estimate views based on post count
        relevance: Math.floor(trend.relevance * 100), // Convert decimal to percentage
        platform: "x"
      }))
    } catch (error) {
      console.error('Error fetching Twitter trends:', error)
      return this.getMockXTrends()
    }
  }

  static async getTikTokTrends(timePeriod: "today" | "week" | "month"): Promise<Trend[]> {
    if (timePeriod !== "today") {
      return this.getMockTikTokTrends()
    }

    try {
      const headers = await this.getAuthHeaders()
      const response = await fetch(`${this.API_BASE_URL}/api/tiktok?range=${timePeriod}`, {
        method: 'GET',
        headers,
        credentials: 'include',
        mode: 'cors'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('TikTok trends response:', data)
      return data.data.collection.map((trend: any) => ({
        tag: trend.title,
        posts: trend.publish_count,
        views: trend.video_views,
        relevance: Math.floor(Math.random() * 100) + 50
      }))
    } catch (error) {
      console.error('Error fetching TikTok trends:', error)
      return this.getMockTikTokTrends()
    }
  }

  static async getYouTubeTrends(timePeriod: "today" | "week" | "month"): Promise<Trend[]> {
    if (timePeriod !== "today") {
      return this.getMockYouTubeTrends()
    }

    try {
      const headers = await this.getAuthHeaders()
      const response = await fetch(`${this.API_BASE_URL}/api/youtube?range=${timePeriod}`, {
        method: 'GET',
        headers,
        credentials: 'include',
        mode: 'cors'
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('YouTube trends response:', data)
      
      // Map the YouTube API response to our Trend interface
      return data.data.map((trend: any) => ({
        tag: trend.title,
        posts: Math.floor(trend.rating * 1000), // Estimate posts based on rating
        views: Math.floor(trend.rating * 10000), // Estimate views based on rating
        relevance: trend.rating, // Use rating directly as it's already a percentage
        platform: "youtube"
      }))
    } catch (error) {
      console.error('Error fetching YouTube trends:', error)
      return this.getMockYouTubeTrends()
    }
  }

  static async getRecommendedContent(timePeriod: "today" | "week" | "month"): Promise<ContentItem[]> {
    try {
      // First get the current trends to use as hashtags
      const xTrends = await this.getXTrends(timePeriod)
      const tiktokTrends = await this.getTikTokTrends(timePeriod)
      const youtubeTrends = await this.getYouTubeTrends(timePeriod)

      // Combine and deduplicate hashtags from all platforms
      const allHashtags = [
        ...xTrends.map(t => t.tag),
        ...tiktokTrends.map(t => t.tag),
        ...youtubeTrends.map(t => t.tag)
      ].filter((tag, index, self) => self.indexOf(tag) === index)

      // Take top 3 hashtags
      const selectedHashtags = allHashtags.slice(0, 3)

      // Fetch recommended content for each platform
      const headers = await this.getAuthHeaders()
      const recommendations: ContentItem[] = []

      // Fetch for X
      const xResponse = await fetch(`${this.API_BASE_URL}/api/prompt`, {
        method: 'POST',
        headers,
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          hashtags: selectedHashtags,
          platform: 'twitter'
        })
      })
      if (xResponse.ok) {
        const xData = await xResponse.json()
        recommendations.push({
          id: xData.id,
          title: xData.data.title,
          description: xData.data.description,
          platform: "x",
          contentType: xData.data.contentType as "video" | "image" | "article",
          relevance: xData.data.relevance,
          hashtags: xData.data.hashtags,
          isSaved: false
        })
      }

      // Fetch for TikTok
      const tiktokResponse = await fetch(`${this.API_BASE_URL}/api/prompt`, {
        method: 'POST',
        headers,
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          hashtags: selectedHashtags,
          platform: 'tiktok'
        })
      })
      if (tiktokResponse.ok) {
        const tiktokData = await tiktokResponse.json()
        recommendations.push({
          id: tiktokData.id,
          title: tiktokData.data.title,
          description: tiktokData.data.description,
          platform: "tiktok",
          contentType: tiktokData.data.contentType as "video" | "image" | "article",
          relevance: tiktokData.data.relevance,
          hashtags: tiktokData.data.hashtags,
          isSaved: false
        })
      }

      // Fetch for YouTube
      const youtubeResponse = await fetch(`${this.API_BASE_URL}/api/prompt`, {
        method: 'POST',
        headers,
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          hashtags: selectedHashtags,
          platform: 'youtube'
        })
      })
      if (youtubeResponse.ok) {
        const youtubeData = await youtubeResponse.json()
        recommendations.push({
          id: youtubeData.id,
          title: youtubeData.data.title,
          description: youtubeData.data.description,
          platform: "youtube",
          contentType: youtubeData.data.contentType as "video" | "image" | "article",
          relevance: youtubeData.data.relevance,
          hashtags: youtubeData.data.hashtags,
          isSaved: false
        })
      }

      return recommendations
    } catch (error) {
      console.error('Error fetching recommended content:', error)
      // Return mock data if API calls fail
      return [
        {
          id: "1",
          title: "How to Create Engaging Social Media Content",
          description: "Learn the best practices for creating content that resonates with your audience and drives engagement.",
          platform: "x",
          contentType: "article",
          relevance: 88,
          hashtags: ["#SocialMedia", "#ContentCreation", "#Marketing"],
          isSaved: false
        },
        {
          id: "2",
          title: "The Power of Storytelling in Marketing",
          description: "Discover how to use storytelling techniques to make your brand message more compelling and memorable.",
          platform: "youtube",
          contentType: "video",
          relevance: 92,
          hashtags: ["#Storytelling", "#Marketing", "#Branding"],
          isSaved: false
        },
        {
          id: "3",
          title: "Content Calendar Planning Guide",
          description: "A comprehensive guide to planning and organizing your content calendar for maximum impact.",
          platform: "tiktok",
          contentType: "video",
          relevance: 85,
          hashtags: ["#ContentPlanning", "#SocialMedia", "#Strategy"],
          isSaved: false
        }
      ]
    }
  }

  static async getTrendDetails(
    platform: "x" | "tiktok" | "youtube",
    tag: string
  ): Promise<TrendDetails> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock data for trend details
    const mockTrendDetails: TrendDetails = {
      id: `trend-${platform}-${tag}`,
      tag,
      platform,
      volume: Math.floor(Math.random() * 1000000) + 100000,
      growth: Math.floor(Math.random() * 100) + 10,
      relevance: Math.floor(Math.random() * 100) + 50,
      description: `This trend represents ${tag} on ${platform}. It's gaining traction among users interested in this topic.`,
      relatedHashtags: [
        `${tag}trend`,
        `${tag}2024`,
        `${tag}news`,
        `${tag}update`,
        `${tag}community`
      ],
      topPosts: [
        {
          id: "post-1",
          content: `Check out this amazing content about ${tag}! #${tag} #trending`,
          author: "user123",
          likes: Math.floor(Math.random() * 10000) + 1000,
          shares: Math.floor(Math.random() * 1000) + 100,
          url: `https://${platform}.com/post/1`
        },
        {
          id: "post-2",
          content: `New insights about ${tag} that you need to know! #${tag} #insights`,
          author: "expert456",
          likes: Math.floor(Math.random() * 10000) + 1000,
          shares: Math.floor(Math.random() * 1000) + 100,
          url: `https://${platform}.com/post/2`
        },
        {
          id: "post-3",
          content: `Why ${tag} is changing the game right now #${tag} #innovation`,
          author: "influencer789",
          likes: Math.floor(Math.random() * 10000) + 1000,
          shares: Math.floor(Math.random() * 1000) + 100,
          url: `https://${platform}.com/post/3`
        }
      ],
      trendHistory: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        volume: Math.floor(Math.random() * 1000000) + 100000
      })),
      insights: {
        type: ["viral", "growing", "stable", "declining"][Math.floor(Math.random() * 4)] as "viral" | "growing" | "stable" | "declining",
        peakTime: "14:00-16:00",
        averageEngagement: Math.floor(Math.random() * 50) + 20,
        recommendedAction: `Consider creating content about ${tag} during peak hours to maximize engagement.`
      }
    };

    return mockTrendDetails;
  }
} 