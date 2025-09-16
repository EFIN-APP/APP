"use client"

import { useState } from "react"
import ModuleM1 from "../ui_module_M1"
import contentData from "../content.json"
import quizData from "../quiz.json"

export default function Page() {
  const [moduleCompleted, setModuleCompleted] = useState(false)

  const handleModuleComplete = () => {
    setModuleCompleted(true)
    // Aquí se podría disparar el evento analytics module_completed
    console.log("[v0] Módulo M1 completado exitosamente")
  }

  if (moduleCompleted) {
    return (
      <div className="completion-screen">
        <h1>¡Felicitaciones!</h1>
        <p>Has completado exitosamente el Módulo M1: Fundamentos de la Inversión</p>
        <p>
          Ahora tienes las bases para entender cómo funciona el interés compuesto, el impacto de la inflación y la
          relación riesgo-retorno.
        </p>
        <button onClick={() => setModuleCompleted(false)}>Revisar módulo nuevamente</button>
      </div>
    )
  }

  return (
    <main className="module-container">
      <ModuleM1 content={contentData} quiz={quizData} onModuleComplete={handleModuleComplete} />
    </main>
  )
}
