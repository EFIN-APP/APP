"use client"

import { Check, Play, Lock, Home, X, Clock, Award, Star, Flame, Map } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface Tema {
  id: number
  titulo: string
  estado: "completado" | "progreso" | "bloqueado"
  descripcion: string
  duracion: string
  puntos: number
  nivel: "Beginner" | "Intermediate" | "Advanced"
}

interface LearningMapProps {
  temas: Tema[]
}

const getNodeStyles = (estado: string) => {
  switch (estado) {
    case "completado":
      return {
        bg: "bg-teal-500",
        text: "text-white",
        icon: Check,
        border: "border-teal-500",
      }
    case "progreso":
      return {
        bg: "bg-blue-600",
        text: "text-white",
        icon: Play,
        border: "border-blue-600",
      }
    case "bloqueado":
    default:
      return {
        bg: "bg-slate-700",
        text: "text-white",
        icon: Lock,
        border: "border-slate-700",
      }
  }
}

export default function LearningMap({ temas }: LearningMapProps) {
  const [selectedCourse, setSelectedCourse] = useState<Tema | null>(null)

  const handleCourseClick = (tema: Tema) => {
    setSelectedCourse(tema)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-slate-800 text-white px-4 py-6">
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-semibold">Finance Learning Map</h1>
            <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-slate-300 text-sm">Advance through courses and modules to learn financial concepts</p>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 pb-32 overflow-y-auto">
        <div className="max-w-sm mx-auto relative">
          {temas.map((tema, index) => {
            const styles = getNodeStyles(tema.estado)
            const IconComponent = styles.icon
            const isLast = index === temas.length - 1
            const isEven = index % 2 === 0

            return (
              <div key={tema.id} className="relative mb-6">
                {!isLast && (
                  <div
                    className={cn(
                      "absolute top-12 w-0.5 h-8 bg-slate-300 z-0",
                      isEven ? "left-1/2 transform -translate-x-1/2" : "left-1/2 transform -translate-x-1/2",
                    )}
                  />
                )}

                <div className={cn("relative z-10", isEven ? "text-left" : "text-right")}>
                  <button
                    onClick={() => handleCourseClick(tema)}
                    className={cn(
                      "inline-flex items-center gap-3 px-6 py-3 rounded-full shadow-sm transition-all duration-200 font-medium text-sm",
                      styles.bg,
                      styles.border,
                      "border-2",
                      "hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer",
                    )}
                  >
                    <IconComponent className={cn("w-4 h-4", styles.text)} />
                    <span className={cn(styles.text)}>{tema.titulo}</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full mx-4 overflow-hidden shadow-xl">
            {/* Modal Header */}
            <div className="bg-slate-800 text-white p-6 relative">
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold mb-2">{selectedCourse.titulo}</h2>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    selectedCourse.nivel === "Beginner" && "bg-green-100 text-green-800",
                    selectedCourse.nivel === "Intermediate" && "bg-yellow-100 text-yellow-800",
                    selectedCourse.nivel === "Advanced" && "bg-red-100 text-red-800",
                  )}
                >
                  {selectedCourse.nivel}
                </span>
                <div className="flex items-center gap-1 text-slate-300">
                  {selectedCourse.estado === "completado" && <Check className="w-4 h-4 text-teal-400" />}
                  {selectedCourse.estado === "progreso" && <Play className="w-4 h-4 text-blue-400" />}
                  {selectedCourse.estado === "bloqueado" && <Lock className="w-4 h-4 text-slate-400" />}
                  <span className="text-sm">
                    {selectedCourse.estado === "completado"
                      ? "Completed"
                      : selectedCourse.estado === "progreso"
                        ? "In Progress"
                        : selectedCourse.estado === "bloqueado"
                          ? "Locked"
                          : "Available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-slate-600 mb-6 leading-relaxed">{selectedCourse.descripcion}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Duration</p>
                    <p className="text-sm text-slate-600">{selectedCourse.duracion}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Points</p>
                    <p className="text-sm text-slate-600">{selectedCourse.puntos} points upon completion</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Level</p>
                    <p className="text-sm text-slate-600">{selectedCourse.nivel} level course</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                {selectedCourse.estado === "completado" ? (
                  <button className="flex-1 bg-teal-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-teal-600 transition-colors">
                    Review Course
                  </button>
                ) : selectedCourse.estado === "progreso" ? (
                  <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                    Continue
                  </button>
                ) : selectedCourse.estado === "bloqueado" ? (
                  <button
                    className="flex-1 bg-slate-400 text-white py-3 px-4 rounded-xl font-medium cursor-not-allowed"
                    disabled
                  >
                    Unlock Previous Courses
                  </button>
                ) : (
                  <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                    Start Course
                  </button>
                )}

                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-800 z-50">
        <div className="max-w-sm mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button className="flex flex-col items-center gap-1 p-2 transition-colors">
              <Flame className="w-6 h-6 text-white" />
            </button>

            <button className="flex flex-col items-center gap-1 p-2 transition-colors">
              <Home className="w-6 h-6 text-white" />
            </button>

            <button className="flex flex-col items-center gap-1 p-2 transition-colors">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Map className="w-6 h-6 text-slate-800" />
              </div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}
