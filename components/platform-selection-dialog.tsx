"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Youtube, Music2, Instagram, Facebook, Linkedin } from "lucide-react"
import { useState } from "react"

interface PlatformSelectionDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (platforms: string[]) => void
}

const platforms = [
  {
    name: "X (Twitter)",
    icon: X,
    available: true,
    color: "#fc6428",
  },
  {
    name: "TikTok",
    icon: Music2,
    available: true,
    color: "#fc6428",
  },
  {
    name: "YouTube",
    icon: Youtube,
    available: true,
    color: "#fc6428",
  },
  {
    name: "Instagram",
    icon: Instagram,
    available: false,
    color: "#fc6428",
  },
  {
    name: "Facebook",
    icon: Facebook,
    available: false,
    color: "#fc6428",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    available: false,
    color: "#fc6428",
  },
]

export function PlatformSelectionDialog({ isOpen, onClose, onSelect }: PlatformSelectionDialogProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])

  const handlePlatformClick = (platformName: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformName)) {
        return prev.filter(p => p !== platformName)
      }
      return [...prev, platformName]
    })
  }

  const handleApply = () => {
    onSelect(selectedPlatforms)
    setSelectedPlatforms([])
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Platforms</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {platforms.map((platform) => (
            <Card
              key={platform.name}
              className={`border overflow-hidden transition-all duration-200 ${
                !platform.available ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              } ${
                selectedPlatforms.includes(platform.name) 
                  ? "ring-3 ring-[#fc6428] ring-offset-2 bg-[#fc6428]/10 border-[#fc6428]" 
                  : ""
              }`}
              onClick={() => platform.available && handlePlatformClick(platform.name)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{platform.name}</p>
                  {!platform.available && (
                    <p className="text-xs text-muted-foreground mt-1">Coming soon</p>
                  )}
                </div>
                <div className="h-10 w-10 rounded-full bg-[#fc6428]/10 flex items-center justify-center">
                  <platform.icon className={`h-5 w-5 text-[${platform.color}]`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply} disabled={selectedPlatforms.length === 0}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 