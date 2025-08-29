"use client"

import { FeedPost } from "@/lib/posts"
import { Button } from "./ui/button"
import { Heart, MessageCircle, Repeat2, Bookmark } from "lucide-react"

interface PostActionsProps {
  post: FeedPost
  onLike: (id: string) => void
  onRepost: (id: string) => void
  onSave: (id: string) => void
}

export function PostActions({ post, onLike, onRepost, onSave }: PostActionsProps) {
  return (
    <div className="flex items-center justify-between">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onLike(post.id)}
        className={`flex items-center gap-2 transition-colors ${
          post.isLiked ? "text-red-500 hover:text-red-600" : "text-gray-500 hover:text-red-500"
        }`}
      >
        <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
        {post.likes}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 text-gray-500 hover:text-efin-blue transition-colors"
      >
        <MessageCircle className="h-4 w-4" />
        {post.comments}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRepost(post.id)}
        className={`flex items-center gap-2 transition-colors ${
          post.isReposted ? "text-green-500 hover:text-green-600" : "text-gray-500 hover:text-green-500"
        }`}
      >
        <Repeat2 className="h-4 w-4" />
        {post.reposts}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onSave(post.id)}
        className={`transition-colors ${
          post.isSaved ? "text-efin-blue hover:text-efin-blue/80" : "text-gray-500 hover:text-efin-blue"
        }`}
      >
        <Bookmark className={`h-4 w-4 ${post.isSaved ? "fill-current" : ""}`} />
      </Button>
    </div>
  )
}
