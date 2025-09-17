"use client"

import { useState, useEffect } from "react"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Award, Share, Calendar, Target } from "lucide-react"

interface BadgeData {
  id: string
  name: string
  description: string
  earnedAt: string
  score?: number
}

export function UserBadges() {
  const [badges, setBadges] = useState<BadgeData[]>([])
  const [quizResults, setQuizResults] = useState<any[]>([])

  useEffect(() => {
    // Load badges from localStorage
    const savedBadges = JSON.parse(localStorage.getItem("efin-badges") || "[]")
    setBadges(savedBadges)

    // Load quiz results
    const savedResults = JSON.parse(localStorage.getItem("efin-quiz-results") || "[]")
    setQuizResults(savedResults)
  }, [])

  const shareBadge = (badge: BadgeData) => {
    if (navigator.share) {
      navigator.share({
        title: `I earned the ${badge.name} badge!`,
        text: `Just completed the Time Value of Money course on EFIN with ${badge.score}% score!`,
        url: window.location.origin,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I earned the ${badge.name} badge on EFIN! 🏆`
      navigator.clipboard.writeText(text)
      alert("Badge achievement copied to clipboard!")
    }
  }

  const getBestScore = () => {
    if (quizResults.length === 0) return 0
    return Math.max(...quizResults.map((result) => result.score))
  }

  const getTotalAttempts = () => {
    return quizResults.length
  }

  const getAverageScore = () => {
    if (quizResults.length === 0) return 0
    const total = quizResults.reduce((sum, result) => sum + result.score, 0)
    return Math.round(total / quizResults.length)
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center bg-white/10 backdrop-blur-sm border-white/20">
          <div className="text-2xl font-bold text-efin-turquoise">{badges.length}</div>
          <div className="text-sm text-white">Badges</div>
        </Card>
        <Card className="p-4 text-center bg-white/10 backdrop-blur-sm border-white/20">
          <div className="text-2xl font-bold text-efin-turquoise">{getBestScore()}%</div>
          <div className="text-sm text-white">Best Score</div>
        </Card>
        <Card className="p-4 text-center bg-white/10 backdrop-blur-sm border-white/20">
          <div className="text-2xl font-bold text-efin-turquoise">{getTotalAttempts()}</div>
          <div className="text-sm text-white">Attempts</div>
        </Card>
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-efin-turquoise" />
          Your Achievements
        </h3>

        {badges.length > 0 ? (
          <div className="space-y-4">
            {badges.map((badge) => (
              <Card key={badge.id} className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-efin-blue to-efin-turquoise rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="h-8 w-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-white">{badge.name}</h4>
                        <p className="text-sm text-gray-300">{badge.description}</p>
                      </div>
                      <Button
                        onClick={() => shareBadge(badge)}
                        variant="ghost"
                        size="sm"
                        className="text-efin-turquoise hover:bg-efin-turquoise/10"
                      >
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(badge.earnedAt).toLocaleDateString()}
                      </div>
                      {badge.score && (
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {badge.score}% Score
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center bg-white/10 backdrop-blur-sm border-white/20">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-2">No badges earned yet</p>
            <p className="text-sm text-gray-400">Complete quizzes with 80%+ score to unlock badges!</p>
          </Card>
        )}
      </div>

      {/* Quiz History */}
      {quizResults.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quiz History</h3>
          <div className="space-y-3">
            {quizResults
              .slice(-5)
              .reverse()
              .map((result, index) => (
                <Card key={index} className="p-4 bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Time Value of Money Quiz</p>
                      <p className="text-sm text-gray-400">
                        {new Date(result.completedAt).toLocaleDateString()} •{Math.round(result.timeSpent / 1000 / 60)}{" "}
                        min
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${result.score >= 80 ? "text-green-400" : "text-orange-400"}`}>
                        {result.score}%
                      </div>
                      {result.passed && (
                        <Badge variant="outline" className="text-green-400 border-green-400/50 text-xs">
                          Passed
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
