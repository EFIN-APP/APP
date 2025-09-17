"use client"

import Link from "next/link"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Play, Settings, User } from "lucide-react"

interface ContinueCourseCardProps {
  onStartCourse?: () => void
}

export function ContinueCourseCard({ onStartCourse }: ContinueCourseCardProps) {
  const progress = 65 // Current progress percentage

  return (
    <div className="p-4">
      <Card className="bg-efin-navy text-white p-6 rounded-2xl shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">Santiago Carrasco</h2>
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

        <div className="space-y-3">
          <Button
            onClick={onStartCourse}
            className="w-full bg-efin-blue hover:bg-efin-blue/90 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Play className="h-5 w-5 fill-current" />
            Continue Learning
          </Button>
          <Button
            asChild
            variant="secondary"
            className="w-full bg-white/10 text-white hover:bg-white/20 font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <Link href="/profile" className="gap-2" aria-label="Go to my profile">
              <User className="h-5 w-5" />
              Go to my profile
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
