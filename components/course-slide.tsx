"use client"

import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { BookOpen, Calculator, BarChart3, HelpCircle } from "lucide-react"
import { TVMSimulator } from "./tvm-simulator"
import { CourseQuiz } from "./course-quiz"

interface SlideData {
  id: string
  type: "definition" | "formula" | "graphic" | "simulator" | "quiz"
  title: string
  content: any
}

interface CourseSlideProps {
  slide: SlideData
  isActive: boolean
}

export function CourseSlide({ slide, isActive }: CourseSlideProps) {
  const renderSlideContent = () => {
    switch (slide.type) {
      case "definition":
        return (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-efin-turquoise rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-efin-navy" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">{slide.title}</h2>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 mb-6">
              <p className="text-lg text-white leading-relaxed mb-4">{slide.content.definition}</p>
              <p className="text-efin-turquoise text-sm">{slide.content.explanation}</p>
            </Card>

            <div className="space-y-3">
              <h3 className="text-efin-turquoise font-semibold">Key Points:</h3>
              {slide.content.keyPoints.map((point: string, index: number) => (
                <div key={index} className="flex items-center gap-3 text-white">
                  <div className="w-2 h-2 bg-efin-turquoise rounded-full" />
                  <span className="text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>
        )

      case "formula":
        return (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-efin-blue rounded-full flex items-center justify-center mx-auto mb-6">
              <Calculator className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">{slide.title}</h2>

            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 mb-6">
              <div className="text-3xl font-mono text-efin-turquoise mb-6">{slide.content.formula}</div>
            </Card>

            <div className="space-y-4 mb-6">
              {slide.content.variables.map((variable: any, index: number) => (
                <div key={index} className="flex items-start gap-4 text-left">
                  <Badge variant="outline" className="text-efin-turquoise border-efin-turquoise/50 font-mono">
                    {variable.symbol}
                  </Badge>
                  <div>
                    <div className="text-white font-medium">{variable.name}</div>
                    <div className="text-gray-300 text-sm">{variable.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <Card className="p-4 bg-efin-turquoise/10 border-efin-turquoise/30">
              <p className="text-efin-turquoise text-sm font-medium mb-1">Example:</p>
              <p className="text-white text-sm">{slide.content.example}</p>
            </Card>
          </div>
        )

      case "graphic":
        return (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">{slide.title}</h2>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">{slide.content.title}</h3>
              <p className="text-efin-turquoise text-sm mb-6">{slide.content.description}</p>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={slide.content.chartData}>
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: "#2DE2E6", fontSize: 12 }} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#2DE2E6", fontSize: 12 }}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2DE2E6"
                      strokeWidth={3}
                      dot={{ fill: "#246BFD", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )

      case "simulator":
        return (
          <div className="p-6">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calculator className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-6 text-center">{slide.title}</h2>

            <TVMSimulator />
          </div>
        )

      case "quiz":
        return (
          <div className="p-6">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-6 text-center">{slide.title}</h2>

            <CourseQuiz
              questions={slide.content.questions}
              onComplete={(score, passed) => {
                console.log(`Quiz completed with ${score}% (${passed ? "passed" : "failed"})`)
              }}
            />
          </div>
        )

      default:
        return <div className="p-6 text-white">Unknown slide type</div>
    }
  }

  return (
    <div className="h-full flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">{renderSlideContent()}</div>
    </div>
  )
}
