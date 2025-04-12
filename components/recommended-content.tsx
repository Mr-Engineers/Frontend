import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Twitter, Youtube, BookmarkPlus, Video, ImageIcon, FileText, Lightbulb } from "lucide-react"

interface RecommendedContentProps {
  timePeriod: "today" | "week" | "month"
}

interface ContentRecommendation {
  id: string
  title: string
  description: string
  platform: "x" | "tiktok" | "youtube"
  contentType: "video" | "image" | "article"
  relevance: number
  hashtags: string[]
}

// Mock data for recommended content
const mockRecommendations: Record<string, ContentRecommendation[]> = {
  today: [
    {
      id: "rec1",
      title: "5 Quick Tips for Small Business Marketing",
      description:
        "Share your top marketing tips that have worked for your business. Focus on actionable advice that can be implemented quickly.",
      platform: "x",
      contentType: "article",
      relevance: 95,
      hashtags: ["#MarketingTips", "#SmallBusiness"],
    },
    {
      id: "rec2",
      title: "Behind-the-Scenes of Your Business Process",
      description:
        "Create a short video showing how your products are made or services are delivered. People love seeing the process behind businesses.",
      platform: "tiktok",
      contentType: "video",
      relevance: 90,
      hashtags: ["#SmallBusinessCheck", "#BusinessTok"],
    },
    {
      id: "rec3",
      title: "Customer Success Story Highlight",
      description:
        "Share a brief story about how your product or service helped a customer solve a problem. Include before and after if possible.",
      platform: "youtube",
      contentType: "video",
      relevance: 85,
      hashtags: ["small business tips", "entrepreneur daily"],
    },
  ],
  week: [
    {
      id: "rec4",
      title: "Weekly Business Growth Strategy",
      description:
        "Create content around one specific growth strategy that's working for your business right now. Be specific and share results.",
      platform: "youtube",
      contentType: "video",
      relevance: 92,
      hashtags: ["business growth strategy", "entrepreneur success stories"],
    },
    {
      id: "rec5",
      title: "Industry Trend Analysis",
      description:
        "Share your thoughts on a current trend in your industry and how businesses can leverage it for growth.",
      platform: "x",
      contentType: "article",
      relevance: 88,
      hashtags: ["#BusinessStrategy", "#GrowthHacking"],
    },
    {
      id: "rec6",
      title: "Quick Tip Tuesday",
      description:
        "Create a short, engaging video with a single actionable tip related to your industry that viewers can implement immediately.",
      platform: "tiktok",
      contentType: "video",
      relevance: 85,
      hashtags: ["#BusinessHacks", "#SmallBizTok"],
    },
  ],
  month: [
    {
      id: "rec7",
      title: "Monthly Business Innovation Showcase",
      description:
        "Create a comprehensive video highlighting innovative approaches in your industry and how your business is adapting.",
      platform: "youtube",
      contentType: "video",
      relevance: 90,
      hashtags: ["business success strategies", "entrepreneur lifestyle"],
    },
    {
      id: "rec8",
      title: "Success Metrics Deep Dive",
      description:
        "Share insights about which metrics matter most for business growth and how to track them effectively.",
      platform: "x",
      contentType: "article",
      relevance: 88,
      hashtags: ["#BusinessInnovation", "#MarketingStrategy"],
    },
    {
      id: "rec9",
      title: "Customer Pain Point Solutions",
      description:
        "Create a series of short videos addressing common customer pain points and how your products/services solve them.",
      platform: "tiktok",
      contentType: "video",
      relevance: 85,
      hashtags: ["#BusinessGrowthTips", "#SmallBusinessSuccess"],
    },
  ],
}

export function RecommendedContent({ timePeriod }: RecommendedContentProps) {
  const recommendations = mockRecommendations[timePeriod]

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "x":
        return <Twitter className="h-4 w-4" />
      case "tiktok":
        return <span className="text-xs font-bold">TT</span>
      case "youtube":
        return <Youtube className="h-4 w-4" />
      default:
        return null
    }
  }

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType) {
      case "video":
        return <Video className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "article":
        return <FileText className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <Card key={rec.id} className="overflow-hidden hover:border-[#fc6428] transition-all">
          <CardContent className="p-0">
            <div className="p-4 border-l-4 border-l-[#fc6428]">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#fc6428]/10 flex items-center justify-center text-[#fc6428]">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">{rec.title}</h3>
                </div>
                <div className="flex gap-1">
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getPlatformIcon(rec.platform)}
                    <span className="capitalize">{rec.platform === "x" ? "X" : rec.platform}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getContentTypeIcon(rec.contentType)}
                    <span className="capitalize">{rec.contentType}</span>
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3">{rec.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {rec.hashtags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-[#fc6428]/10 text-[#fc6428] border-none hover:bg-[#fc6428]/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-gray-500">Relevance: </span>
                  <span className="font-medium">{rec.relevance}</span>
                </div>
                <div>
                  <Button variant="outline" size="sm" className="h-8">
                    <BookmarkPlus className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
