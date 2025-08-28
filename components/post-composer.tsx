"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Badge } from "./ui/badge"
import { X, Smile, LinkIcon, ImageIcon, MapPin } from "lucide-react"

interface PostComposerProps {
  onClose: () => void
}

export function PostComposer({ onClose }: PostComposerProps) {
  const [content, setContent] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const popularTags = [
    "TimeValue",
    "Budgeting",
    "Investment",
    "Savings",
    "PersonalFinance",
    "Question",
    "ProTip",
    "Achievement",
  ]

  const quickEmojis = ["📈", "💰", "🎯", "💡", "🚀", "📊", "💪", "🔥"]

  const handlePost = () => {
    if (content.trim()) {
      // Handle post creation logic here
      console.log("Posting:", { content, tags: selectedTags })
      onClose()
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const addEmoji = (emoji: string) => {
    setContent((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <Card className="w-full bg-white rounded-t-3xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-efin-navy">Create Post</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Textarea
          placeholder="Share your finance learning journey..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-32 mb-4 border-gray-200 focus:border-efin-blue resize-none text-base"
        />

        {showEmojiPicker && (
          <div className="mb-4 p-3 bg-gray-50 rounded-xl">
            <div className="flex flex-wrap gap-2">
              {quickEmojis.map((emoji) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  size="sm"
                  onClick={() => addEmoji(emoji)}
                  className="text-lg hover:bg-efin-blue/10"
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Add tags:</p>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedTags.includes(tag)
                    ? "bg-efin-blue text-white hover:bg-efin-blue/90"
                    : "text-efin-blue border-efin-blue/30 hover:bg-efin-blue/10"
                }`}
                onClick={() => toggleTag(tag)}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className={`text-gray-500 hover:text-efin-blue ${showEmojiPicker ? "text-efin-blue" : ""}`}
            >
              <Smile className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-efin-blue">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-efin-blue">
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-efin-blue">
              <MapPin className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{content.length}/280</span>
            <Button
              onClick={handlePost}
              disabled={!content.trim() || content.length > 280}
              className="bg-efin-blue hover:bg-efin-blue/90 text-white px-6 rounded-xl disabled:opacity-50"
            >
              Post
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
