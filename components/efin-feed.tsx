"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Heart, MessageCircle, Repeat2, Bookmark, Play, TrendingUp } from "lucide-react"
import { PopularLessons } from "./popular-lessons"

interface FeedPost {
  id: string
  username: string
  avatar: string
  timestamp: string
  content: string
  likes: number
  comments: number
  reposts: number
  isLiked: boolean
  isSaved: boolean
  isReposted: boolean
  tags?: string[]
  lessonReference?: {
    title: string
    progress: number
  }
}

interface EFINFeedProps {
  activeTab: string
}

export function EFINFeed({ activeTab }: EFINFeedProps) {
  const [posts, setPosts] = useState<FeedPost[]>([
    {
      id: "1",
      username: "FinanceGuru",
      avatar: "/finance-expert.png",
      timestamp: "2h",
      content:
        "Just completed the Time Value of Money module! The compound interest calculator really helped me understand how my investments will grow over time.",
      likes: 24,
      comments: 8,
      reposts: 3,
      isLiked: false,
      isSaved: true,
      isReposted: false,
      tags: ["TimeValue", "CompoundInterest"],
      lessonReference: {
        title: "Time Value of Money",
        progress: 100,
      },
    },
    {
      id: "2",
      username: "InvestmentNewbie",
      avatar: "/student-learning.png",
      timestamp: "4h",
      content:
        "Can someone explain why money today is worth more than money tomorrow? Still wrapping my head around this concept.",
      likes: 12,
      comments: 15,
      reposts: 1,
      isLiked: true,
      isSaved: false,
      isReposted: false,
      tags: ["Question", "TimeValue"],
    },
    {
      id: "3",
      username: "EFINTeacher",
      avatar: "/teacher-professional.png",
      timestamp: "6h",
      content:
        "Pro tip: Use the TVM simulator with different scenarios. Try calculating what happens if you save $100/month vs $200/month over 10 years. The difference will surprise you!",
      likes: 45,
      comments: 12,
      reposts: 8,
      isLiked: false,
      isSaved: false,
      isReposted: false,
      tags: ["ProTip", "Savings", "TVM"],
    },
    {
      id: "4",
      username: "BudgetMaster",
      avatar: "/budget-expert.png",
      timestamp: "8h",
      content:
        "Started the budgeting fundamentals course today. The 50/30/20 rule is a game changer for managing expenses!",
      likes: 18,
      comments: 6,
      reposts: 4,
      isLiked: false,
      isSaved: true,
      isReposted: false,
      tags: ["Budgeting", "PersonalFinance"],
      lessonReference: {
        title: "Budgeting Fundamentals",
        progress: 25,
      },
    },
  ])

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleSave = (postId: string) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, isSaved: !post.isSaved } : post)))
  }

  const handleRepost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isReposted: !post.isReposted,
              reposts: post.isReposted ? post.reposts - 1 : post.reposts + 1,
            }
          : post,
      ),
    )
  }

  const filteredPosts = posts.filter((post) => {
    switch (activeTab) {
      case "Following":
        return ["FinanceGuru", "EFINTeacher"].includes(post.username)
      case "Finance":
        return post.tags?.some((tag) => ["TimeValue", "Budgeting", "PersonalFinance", "TVM"].includes(tag))
      default:
        return true
    }
  })

  return (
    <div className="space-y-6">
      {activeTab === "For You" && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-efin-blue" />
            <h3 className="font-semibold text-efin-navy">Popular Lessons</h3>
          </div>
          <PopularLessons />
        </div>
      )}

      {filteredPosts.map((post) => (
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

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
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
                  onClick={() => handleRepost(post.id)}
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
                  onClick={() => handleSave(post.id)}
                  className={`transition-colors ${
                    post.isSaved ? "text-efin-blue hover:text-efin-blue/80" : "text-gray-500 hover:text-efin-blue"
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${post.isSaved ? "fill-current" : ""}`} />
                </Button>
              </div>
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
