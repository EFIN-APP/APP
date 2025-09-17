"use client"

import { useState, useCallback } from "react"
import { Card } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Play, TrendingUp } from "lucide-react"
import { PopularLessons } from "./popular-lessons"
import { FeedTab } from "./feed-tabs"
import { FeedPost, mockPosts } from "@/lib/posts"
import { PostActions } from "./post-actions"

const interestTagMap: Record<string, string[]> = {
  Inversiones: ["Investment", "TimeValue", "TVM"],
  Presupuesto: ["Budgeting", "Savings"],
  "Finanzas personales": ["PersonalFinance", "Savings"],
  "Cripto & Web3": ["Crypto"],
  Economía: ["Economy"],
  Mercados: ["Markets"],
}

interface EFINFeedProps {
  activeTab: FeedTab
  interests?: string[]
}

export function EFINFeed({ activeTab, interests }: EFINFeedProps) {
  const [posts, setPosts] = useState<FeedPost[]>(mockPosts)

  const handleLike = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }, [])

  const handleSave = useCallback((postId: string) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post)))
  }, [])

  const handleRepost = useCallback((postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isReposted: !post.isReposted,
              reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1,
            }
          : post,
      ),
    )
  }, [])

  const preferredTags = new Set(
    (interests ?? [])
      .flatMap((interest) => interestTagMap[interest] ?? [])
      .map((tag) => tag.toLowerCase()),
  )

  const filteredPosts = posts.filter((post) => {
    switch (activeTab) {
      case FeedTab.Following:
        return ["FinanceGuru", "EFINTeacher"].includes(post.username)
      case FeedTab.Finance:
        return post.tags?.some((tag) => ["TimeValue", "Budgeting", "PersonalFinance", "TVM"].includes(tag))
      default:
        return true
    }
  })

  const orderedPosts = [...filteredPosts].sort((a, b) => {
    const aMatches = a.tags?.some((tag) => preferredTags.has(tag.toLowerCase())) ? 1 : 0
    const bMatches = b.tags?.some((tag) => preferredTags.has(tag.toLowerCase())) ? 1 : 0

    return bMatches - aMatches
  })

  return (
    <div className="space-y-6">
      {interests && interests.length > 0 && (
        <Card className="p-4 bg-gradient-to-r from-efin-blue/5 to-efin-turquoise/5 border-efin-blue/10">
          <p className="text-sm text-efin-navy font-medium">
            Personalizamos tu feed con foco en: {interests.slice(0, 3).join(", ")}
            {interests.length > 3 ? " y más." : "."}
          </p>
        </Card>
      )}

      {activeTab === FeedTab.ForYou && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-efin-blue" />
            <h3 className="font-semibold text-efin-navy">Popular Lessons</h3>
          </div>
          <PopularLessons />
        </div>
      )}

      {orderedPosts.map((post) => (
        <Card key={post.id} className="p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.avatar || "/placeholder.svg"} alt={post.username} />
              <AvatarFallback>{post.username[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-efin-navy">{post.username}</span>
                <span className="text-gray-500 text-sm">{post.timestamp}</span>
              </div>

              <p className="text-gray-800 mb-3 leading-relaxed">{post.content}</p>

              {post.lessonReference && (
                <Card className="p-3 mb-3 bg-gradient-to-r from-efin-blue/5 to-efin-turquoise/5 border-efin-blue/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-efin-blue" />
                      <span className="text-sm font-medium text-efin-navy">{post.lessonReference.title}</span>
                    </div>
                    <Badge variant="secondary" className="bg-efin-blue/10 text-efin-blue">
                      {post.lessonReference.progress}% Complete
                    </Badge>
                  </div>
                </Card>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs text-efin-blue border-efin-blue/30">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              <PostActions
                post={post}
                onLike={handleLike}
                onRepost={handleRepost}
                onSave={handleSave}
              />
            </div>
          </div>
        </Card>
      ))}

      {filteredPosts.length === 0 && (
        <Card className="p-8 text-center bg-white rounded-2xl">
          <p className="text-gray-500 mb-2">No posts found for "{activeTab}"</p>
          <p className="text-sm text-gray-400">Try switching to a different tab or follow more users!</p>
        </Card>
      )}
    </div>
  )
}
