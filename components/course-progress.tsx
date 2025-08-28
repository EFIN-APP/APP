import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock } from "lucide-react"

export function CourseProgress() {
  const courses = [
    {
      id: 1,
      title: "Fundamentos de Finanzas",
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      timeLeft: "2h 30min",
      badge: "En progreso",
    },
    {
      id: 2,
      title: "Inversiones para Principiantes",
      progress: 40,
      totalLessons: 15,
      completedLessons: 6,
      timeLeft: "4h 15min",
      badge: "En progreso",
    },
    {
      id: 3,
      title: "Presupuesto Personal",
      progress: 100,
      totalLessons: 8,
      completedLessons: 8,
      timeLeft: "Completado",
      badge: "Completado",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.65)}`}
                  className="text-accent"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">65%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">Progreso General</p>
            <Button className="w-full">Continuar Aprendiendo</Button>
          </div>

          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-accent/10 rounded-lg p-3">
              <p className="text-lg font-bold text-accent">40%</p>
              <p className="text-xs text-muted-foreground">Completado</p>
            </div>
            <div className="bg-secondary/10 rounded-lg p-3">
              <p className="text-lg font-bold text-secondary">15</p>
              <p className="text-xs text-muted-foreground">Lecciones</p>
            </div>
            <div className="bg-green-500/10 rounded-lg p-3">
              <p className="text-lg font-bold text-green-600">100</p>
              <p className="text-xs text-muted-foreground">Puntos</p>
            </div>
            <div className="bg-orange-500/10 rounded-lg p-3">
              <p className="text-lg font-bold text-orange-600">5</p>
              <p className="text-xs text-muted-foreground">Insignias</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Courses */}
      {courses.map((course) => (
        <Card key={course.id} className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{course.title}</CardTitle>
              <Badge
                variant={course.progress === 100 ? "default" : "secondary"}
                className={course.progress === 100 ? "bg-green-500" : ""}
              >
                {course.badge}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Progress value={course.progress} className="h-2" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>
                      {course.completedLessons}/{course.totalLessons} lecciones
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.timeLeft}</span>
                  </div>
                </div>
                <span className="font-medium">{course.progress}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
