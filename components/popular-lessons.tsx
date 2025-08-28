"use client"

import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Play, Users, Clock } from "lucide-react"

interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  students: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  thumbnail: string
}

export function PopularLessons() {
  const lessons: Lesson[] = [
    {
      id: "1",
      title: "Time Value of Money",
      description: "Learn how money grows over time with compound interest",
      duration: "15 min",
      students: 1240,
      difficulty: "Beginner",
      thumbnail: "/lesson-tvm.png",
    },
    {
      id: "2",
      title: "Investment Basics",
      description: "Understanding stocks, bonds, and portfolio diversification",
      duration: "22 min",
      students: 890,
      difficulty: "Beginner",
      thumbnail: "/lesson-investment.png",
    },
    {
      id: "3",
      title: "Risk Management",
      description: "Assess and manage financial risks in your investments",
      duration: "18 min",
      students: 650,
      difficulty: "Intermediate",
      thumbnail: "/lesson-risk.png",
    },
  ]

  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {lessons.map((lesson) => (
        <Card
          key={lesson.id}
          className="flex-shrink-0 w-72 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-efin-blue to-efin-turquoise rounded-xl flex items-center justify-center flex-shrink-0">
              <Play className="h-6 w-6 text-white fill-current" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-efin-navy text-sm leading-tight">{lesson.title}</h4>
                <Badge
                  variant="secondary"
                  className={`text-xs ml-2 flex-shrink-0 ${
                    lesson.difficulty === "Beginner"
                      ? "bg-green-100 text-green-700"
                      : lesson.difficulty === "Intermediate"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {lesson.difficulty}
                </Badge>
              </div>

              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{lesson.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {lesson.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {lesson.students.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <Button className="w-full mt-3 bg-efin-blue hover:bg-efin-blue/90 text-white text-sm py-2 rounded-xl">
            Start Learning
          </Button>
        </Card>
      ))}
    </div>
  )
}
