"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { CheckCircle, XCircle, Award, RotateCcw } from "lucide-react"

interface Question {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface CourseQuizProps {
  questions: Question[]
  onComplete?: (score: number, passed: boolean) => void
}

interface QuizState {
  currentQuestion: number
  selectedAnswers: (number | null)[]
  showFeedback: boolean
  quizCompleted: boolean
  score: number
  startTime: number
}

export function CourseQuiz({ questions, onComplete }: CourseQuizProps) {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswers: new Array(questions.length).fill(null),
    showFeedback: false,
    quizCompleted: false,
    score: 0,
    startTime: Date.now(),
  })

  const currentQ = questions[quizState.currentQuestion]
  const selectedAnswer = quizState.selectedAnswers[quizState.currentQuestion]
  const isCorrect = selectedAnswer === currentQ?.correct
  const progress = ((quizState.currentQuestion + 1) / questions.length) * 100

  const selectAnswer = (answerIndex: number) => {
    if (quizState.showFeedback) return

    const newAnswers = [...quizState.selectedAnswers]
    newAnswers[quizState.currentQuestion] = answerIndex
    setQuizState((prev) => ({
      ...prev,
      selectedAnswers: newAnswers,
      showFeedback: true,
    }))
  }

  const nextQuestion = () => {
    if (quizState.currentQuestion < questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        showFeedback: false,
      }))
    } else {
      completeQuiz()
    }
  }

  const completeQuiz = () => {
    const correctAnswers = quizState.selectedAnswers.filter(
      (answer, index) => answer === questions[index].correct,
    ).length
    const finalScore = Math.round((correctAnswers / questions.length) * 100)
    const timeSpent = Date.now() - quizState.startTime
    const passed = finalScore >= 80

    setQuizState((prev) => ({
      ...prev,
      quizCompleted: true,
      score: finalScore,
    }))

    // Save quiz results to localStorage
    const quizResults = {
      score: finalScore,
      passed,
      timeSpent,
      completedAt: new Date().toISOString(),
      answers: quizState.selectedAnswers,
    }

    const existingResults = JSON.parse(localStorage.getItem("efin-quiz-results") || "[]")
    existingResults.push(quizResults)
    localStorage.setItem("efin-quiz-results", JSON.stringify(existingResults))

    // Unlock badge if passed
    if (passed) {
      const badges = JSON.parse(localStorage.getItem("efin-badges") || "[]")
      const badgeExists = badges.some((badge: any) => badge.id === "time-value-master")

      if (!badgeExists) {
        const newBadge = {
          id: "time-value-master",
          name: "Time Value Master",
          description: "Completed Time Value of Money quiz with 80%+ score",
          earnedAt: new Date().toISOString(),
          score: finalScore,
        }
        badges.push(newBadge)
        localStorage.setItem("efin-badges", JSON.stringify(badges))
      }
    }

    onComplete?.(finalScore, passed)
  }

  const restartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswers: new Array(questions.length).fill(null),
      showFeedback: false,
      quizCompleted: false,
      score: 0,
      startTime: Date.now(),
    })
  }

  if (quizState.quizCompleted) {
    const passed = quizState.score >= 80
    return (
      <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 text-center">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
            passed ? "bg-green-500" : "bg-orange-500"
          }`}
        >
          {passed ? <Award className="h-8 w-8 text-white" /> : <RotateCcw className="h-8 w-8 text-white" />}
        </div>

        <h3 className="text-2xl font-bold text-white mb-4">{passed ? "Congratulations!" : "Keep Learning!"}</h3>

        <div className="mb-6">
          <div className="text-4xl font-bold text-efin-turquoise mb-2">{quizState.score}%</div>
          <p className="text-white">
            You got {quizState.selectedAnswers.filter((answer, index) => answer === questions[index].correct).length}{" "}
            out of {questions.length} questions correct
          </p>
        </div>

        {passed ? (
          <Card className="p-4 bg-efin-turquoise/10 border-efin-turquoise/30 mb-6">
            <div className="flex items-center gap-3 justify-center">
              <Award className="h-6 w-6 text-efin-turquoise" />
              <div>
                <p className="text-efin-turquoise font-semibold">Badge Unlocked!</p>
                <p className="text-white text-sm">Time Value Master</p>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-4 bg-orange-500/10 border-orange-500/30 mb-6">
            <p className="text-orange-300 text-sm">
              You need 80% or higher to unlock the Time Value Master badge. Try again!
            </p>
          </Card>
        )}

        <div className="flex gap-3 justify-center">
          <Button
            onClick={restartQuiz}
            variant="outline"
            className="text-white border-white/30 hover:bg-white/10 bg-transparent"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          {passed && (
            <Button className="bg-efin-blue hover:bg-efin-blue/90 text-white">
              <Award className="h-4 w-4 mr-2" />
              View Badge
            </Button>
          )}
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-white">
        <span className="text-sm">
          Question {quizState.currentQuestion + 1} of {questions.length}
        </span>
        <span className="text-sm text-efin-turquoise">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2 bg-white/20" />

      {/* Question */}
      <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
        <h3 className="text-lg font-semibold text-white mb-6 leading-relaxed">{currentQ.question}</h3>

        <div className="space-y-3">
          {currentQ.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left border-2 transition-all duration-200 rounded-xl"

            if (quizState.showFeedback) {
              if (index === currentQ.correct) {
                buttonClass += " bg-green-500/20 border-green-500 text-green-100"
              } else if (index === selectedAnswer && index !== currentQ.correct) {
                buttonClass += " bg-red-500/20 border-red-500 text-red-100"
              } else {
                buttonClass += " bg-white/5 border-white/20 text-gray-300"
              }
            } else {
              if (index === selectedAnswer) {
                buttonClass += " bg-efin-blue/20 border-efin-blue text-white"
              } else {
                buttonClass += " bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30"
              }
            }

            return (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                className={buttonClass}
                disabled={quizState.showFeedback}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                  {quizState.showFeedback && index === currentQ.correct && (
                    <CheckCircle className="h-5 w-5 text-green-400 ml-auto" />
                  )}
                  {quizState.showFeedback && index === selectedAnswer && index !== currentQ.correct && (
                    <XCircle className="h-5 w-5 text-red-400 ml-auto" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {quizState.showFeedback && (
          <Card
            className={`mt-6 p-4 ${
              isCorrect ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
              )}
              <div>
                <p className={`font-medium mb-2 ${isCorrect ? "text-green-100" : "text-red-100"}`}>
                  {isCorrect ? "Correct!" : "Incorrect"}
                </p>
                <p className="text-sm text-gray-300">{currentQ.explanation}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Next Button */}
        {quizState.showFeedback && (
          <Button
            onClick={nextQuestion}
            className="w-full mt-6 bg-efin-blue hover:bg-efin-blue/90 text-white font-semibold py-3 rounded-xl"
          >
            {quizState.currentQuestion < questions.length - 1 ? "Next Question" : "Complete Quiz"}
          </Button>
        )}
      </Card>
    </div>
  )
}
