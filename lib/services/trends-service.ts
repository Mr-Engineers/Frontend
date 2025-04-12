interface Trend {
  tag: string
  volume: number
  growth: number
  relevance: number
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
  static async getXTrends(timePeriod: "today" | "week" | "month"): Promise<Trend[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data for X trends
    return [
      { tag: "#SmallBusiness", volume: 45000, growth: 12, relevance: 95 },
      { tag: "#Entrepreneurship", volume: 32000, growth: 8, relevance: 90 },
      { tag: "#MarketingTips", volume: 28000, growth: 15, relevance: 85 },
      { tag: "#BusinessGrowth", volume: 22000, growth: 5, relevance: 80 },
      { tag: "#StartupLife", volume: 18000, growth: 10, relevance: 75 },
    ]
  }

  static async getTikTokTrends(timePeriod: "today" | "week" | "month"): Promise<Trend[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data for TikTok trends
    return [
      { tag: "#SmallBusinessCheck", volume: 120000, growth: 25, relevance: 90 },
      { tag: "#BusinessTok", volume: 95000, growth: 18, relevance: 85 },
      { tag: "#EntrepreneurLife", volume: 85000, growth: 12, relevance: 80 },
      { tag: "#MarketingStrategy", volume: 65000, growth: 8, relevance: 75 },
      { tag: "#BusinessOwner", volume: 55000, growth: 15, relevance: 70 },
    ]
  }

  static async getYouTubeTrends(timePeriod: "today" | "week" | "month"): Promise<Trend[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data for YouTube trends
    return [
      { tag: "small business tips", volume: 35000, growth: 10, relevance: 85 },
      { tag: "entrepreneur daily", volume: 28000, growth: 7, relevance: 80 },
      { tag: "marketing strategy", volume: 25000, growth: 12, relevance: 75 },
      { tag: "business growth hacks", volume: 22000, growth: 15, relevance: 70 },
      { tag: "startup success", volume: 18000, growth: 5, relevance: 65 },
    ]
  }

  static async getRecommendedContent(timePeriod: "today" | "week" | "month"): Promise<ContentItem[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock data for recommended content
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