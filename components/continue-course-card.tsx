"use client"

import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Play, Settings } from "lucide-react"

interface ContinueCourseCardProps {
  onStartCourse?: () => void
  userName?: string
}

export function ContinueCourseCard({ onStartCourse, userName }: ContinueCourseCardProps) {
  const progress = 65 // Current progress percentage
  const displayName = userName ?? "Santiago Carrasco"

  return (
    <div className="p-4">
      <Card className="bg-efin-navy text-white p-6 rounded-2xl shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">{displayName}</h2>
            <p className="text-efin-turquoise text-sm font-medium">Continue Class - IN PROGRESS</p>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Progress</span>
            <span className="text-sm text-efin-turquoise font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
        </div>

        <Button
          onClick={onStartCourse}
          className="w-full bg-efin-blue hover:bg-efin-blue/90 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <Play className="h-5 w-5 fill-current" />
          Continue Learning
        </Button>
      </Card>
    </div>
  )
}
