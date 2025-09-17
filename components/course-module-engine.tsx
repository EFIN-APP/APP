"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { CourseSlide } from "./course-slide"

interface CourseModuleEngineProps {
  onClose: () => void
}

interface SlideData {
  id: string
  type: "definition" | "formula" | "graphic" | "simulator" | "quiz"
  title: string
  content: any
}

export function CourseModuleEngine({ onClose }: CourseModuleEngineProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Time Value of Money course slides
  const slides: SlideData[] = [
    {
      id: "1",
      type: "definition",
      title: "What is Time Value of Money?",
      content: {
        definition: "The Time Value of Money means money today is worth more than the same amount in the future.",
        explanation:
          "This fundamental concept is the foundation of all financial decisions. A dollar today can be invested to earn returns, making it worth more than a dollar received tomorrow.",
        keyPoints: [
          "Money has earning potential over time",
          "Inflation reduces purchasing power",
          "Investment opportunities create value",
        ],
      },
    },
    {
      id: "2",
      type: "formula",
      title: "The TVM Formula",
      content: {
        formula: "FV = PV × (1 + r)^n",
        variables: [
          { symbol: "FV", name: "Future Value", description: "The amount of money you'll have in the future" },
          { symbol: "PV", name: "Present Value", description: "The amount of money you have today" },
          { symbol: "r", name: "Interest Rate", description: "The rate of return per period" },
          { symbol: "n", name: "Number of Periods", description: "How many time periods the money grows" },
        ],
        example: "If you invest $1,000 at 5% annual interest for 3 years: FV = $1,000 × (1.05)³ = $1,157.63",
      },
    },
    {
      id: "3",
      type: "graphic",
      title: "Compound Growth Visualization",
      content: {
        title: "See How Money Grows Over Time",
        description: "Interest compounds over time, creating exponential growth",
        chartData: [
          { year: 0, value: 1000 },
          { year: 1, value: 1050 },
          { year: 2, value: 1102.5 },
          { year: 3, value: 1157.63 },
          { year: 4, value: 1215.51 },
          { year: 5, value: 1276.28 },
        ],
      },
    },
    {
      id: "4",
      type: "simulator",
      title: "TVM Calculator",
      content: {
        title: "Try the Time Value of Money Calculator",
        description: "Experiment with different values to see how your money can grow",
      },
    },
    {
      id: "5",
      type: "quiz",
      title: "Test Your Knowledge",
      content: {
        questions: [
          {
            id: "q1",
            question: "If you invest $1,000 at 5% annual interest for 3 years, what's the future value?",
            options: ["$1,157.63", "$1,200.00", "$1,300.00", "$1,500.00"],
            correct: 0,
            explanation: "Using the formula FV = PV × (1 + r)^n = $1,000 × (1.05)³ = $1,157.63",
          },
          {
            id: "q2",
            question: "Why is money today worth more than money tomorrow?",
            options: [
              "Because of inflation only",
              "Because it can be invested to earn returns",
              "Because prices always go up",
              "Because banks pay interest",
            ],
            correct: 1,
            explanation: "Money today has earning potential - it can be invested to generate returns over time.",
          },
          {
            id: "q3",
            question: "What happens to compound interest over longer time periods?",
            options: ["It decreases", "It stays the same", "It grows exponentially", "It becomes linear"],
            correct: 2,
            explanation:
              "Compound interest grows exponentially because you earn returns on both your principal and previous interest.",
          },
        ],
      },
    },
  ]

  const progress = ((currentSlide + 1) / slides.length) * 100

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  // Handle touch events for swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide()
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentSlide])

  return (
    <div className="fixed inset-0 bg-efin-navy z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
            <X className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-semibold">Time Value of Money</h1>
            <p className="text-sm text-efin-turquoise">
              Lesson {currentSlide + 1} of {slides.length}
            </p>
          </div>
        </div>
        <div className="text-sm text-efin-turquoise font-medium">{Math.round(progress)}%</div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 pb-4">
        <Progress value={progress} className="h-1 bg-white/20" />
      </div>

      {/* Slide Content */}
      <div
        className="flex-1 overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="w-full flex-shrink-0 h-full">
              <CourseSlide slide={slide} isActive={index === currentSlide} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-4">
        <Button
          variant="ghost"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="text-white hover:bg-white/10 disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Previous
        </Button>

        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? "bg-efin-turquoise" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="text-white hover:bg-white/10 disabled:opacity-50"
        >
          Next
          <ChevronRight className="h-5 w-5 ml-1" />
        </Button>
      </div>
    </div>
  )
}
