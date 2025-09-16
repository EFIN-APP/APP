"use client"

import type React from "react"

import "./styles.css"
import Pager from "./components/Pager"
import { useState } from "react"
import computeSimulation, { type SimInputs, examplePreset } from "./simulator_compound_inflation"
import GameEngine, { type Round } from "./game_which_yields_more"

// Tipos para props de componentes
interface Content {
  id: string
  titulo: string
  objetivos: string[]
  por_que_importa: string
  ideas_clave: Array<{ titulo: string; explicacion_corta: string }>
  ejemplo_local: {
    descripcion: string
    supuestos: any
    calculo?: any
  }
  glosario: Array<{ termino: string; definicion: string }>
  takeaway: string[]
  flashcards: Array<{ front: string; back: string }>
}

interface QuizItem {
  id: string
  tipo: string
  enunciado: string
  opciones?: string[]
  respuesta_correcta: number | boolean
  explicacion_feedback: string
  dificultad?: number
  tag?: string
  tolerancia?: number
}

interface QuizData {
  version: string
  passing_rule: { min_correct: number; total: number }
  items: QuizItem[]
}

interface QuizProps {
  items: QuizItem[]
  onComplete: (score: number, passed: boolean) => void
  passingRule: { min_correct: number; total: number }
}

// Componente: ¿Por qué importa?
function SectionWhy({ content }: { content: string }) {
  return (
    <div className="section-content">
      <h2 className="section-title">¿Por qué importa?</h2>
      <div className="content-box">
        <div className="card">
          <p>{content}</p>
        </div>
      </div>
    </div>
  )
}

// Componente: Ideas clave
function KeyIdeas({ items }: { items: Content["ideas_clave"] }) {
  return (
    <div className="section-content text-white bg-white">
      <h2 className="section-title text-blue-900 opacity-100 bg-slate-800">Ideas Clave</h2>
      <div className="content-box">
        <div className="grid-1 bg-transparent">
          {items.map((idea, index) => (
            <div key={index} className="key-idea-card text-white bg-white border-white opacity-100">
              <h3 className="text-blue-800 bg-white">{idea.titulo}</h3>
              <p className="bg-white">{idea.explicacion_corta}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Componente: Quiz interactivo
function Quiz({ items, onComplete, passingRule }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | boolean | string)[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswer, setUserAnswer] = useState<number | boolean | string | null>(null)

  const handleAnswer = (answer: number | boolean | string) => {
    setUserAnswer(answer)
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answer
    setAnswers(newAnswers)
    setShowFeedback(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < items.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowFeedback(false)
      setUserAnswer(null)
    } else {
      // Calcular puntaje final
      const correct = answers.reduce((count, answer, index) => {
        return answer === items[index].respuesta_correcta ? count + 1 : count
      }, 0)
      const passed = correct >= passingRule.min_correct
      setQuizCompleted(true)
      onComplete(correct, passed)
    }
  }

  const currentItem = items[currentQuestion]
  const isCorrect = userAnswer === currentItem.respuesta_correcta

  if (quizCompleted) {
    const score = answers.reduce((count, answer, index) => {
      return answer === items[index].respuesta_correcta ? count + 1 : count
    }, 0)
    const passed = score >= passingRule.min_correct

    return (
      <div className="section-content">
        <h2 className="section-title">Resultados del Quiz</h2>
        <div className={`score ${passed ? "passed" : "failed"}`}>
          <p>
            Puntaje: {score}/{items.length}
          </p>
          <p>{passed ? "¡Aprobado!" : "Necesitas al menos " + passingRule.min_correct + " respuestas correctas"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="section-content">
      <h2 className="section-title">Evaluación</h2>
      <div className="content-box">
        <div className="quiz-progress">
          <span>
            Pregunta {currentQuestion + 1} de {items.length}
          </span>
        </div>

        <div className="question-card">
          <h3>{currentItem.enunciado}</h3>

          {currentItem.tipo === "multiple_choice" && currentItem.opciones && (
            <div className="options">
              {currentItem.opciones.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                  className={`quiz-option ${userAnswer === index ? "selected" : ""}`}
                  aria-label={`Opción ${index + 1}: ${option}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {currentItem.tipo === "true_false" && (
            <div className="options">
              <button
                onClick={() => handleAnswer(true)}
                disabled={showFeedback}
                className={`quiz-option ${userAnswer === true ? "selected" : ""}`}
                aria-label="Verdadero"
              >
                Verdadero
              </button>
              <button
                onClick={() => handleAnswer(false)}
                disabled={showFeedback}
                className={`quiz-option ${userAnswer === false ? "selected" : ""}`}
                aria-label="Falso"
              >
                Falso
              </button>
            </div>
          )}

          {currentItem.tipo === "numeric_input" && (
            <div className="numeric-input">
              <input
                type="number"
                placeholder="Ingresa tu respuesta"
                onChange={(e) => setUserAnswer(Number.parseFloat(e.target.value))}
                disabled={showFeedback}
                aria-label="Respuesta numérica"
              />
              <button
                onClick={() => userAnswer !== null && handleAnswer(userAnswer)}
                disabled={showFeedback || userAnswer === null}
                aria-label="Confirmar respuesta"
              >
                Confirmar
              </button>
            </div>
          )}

          {showFeedback && (
            <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
              <p>{isCorrect ? "¡Correcto!" : "Incorrecto"}</p>
              <p>{currentItem.explicacion_feedback}</p>
              <button onClick={nextQuestion} aria-label="Siguiente pregunta">
                {currentQuestion < items.length - 1 ? "Siguiente" : "Finalizar"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente: Simulador de interés compuesto
function SimulatorCompoundInflation({
  onRun,
  presets,
}: {
  onRun: typeof computeSimulation
  presets: ReturnType<typeof examplePreset>
}) {
  const [inputs, setInputs] = useState<Partial<SimInputs>>({
    montoInicial: 100000,
    aporteMensual: 10000,
    tasaNominalAnual: 60,
    capitalizacionesPorAnio: 12,
    comisionAnualPct: 1,
    meses: 12,
    modoTasa: "TNA",
  })
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runSimulation = async () => {
    setLoading(true)
    try {
      const inflacionSerie = Array(inputs.meses || 12).fill(5) // 5% mensual por defecto
      const fullInputs: SimInputs = {
        ...inputs,
        inflacionMensualSerie: inflacionSerie,
      } as SimInputs

      const simResult = onRun(fullInputs)
      setResult(simResult)
    } catch (error) {
      console.error("Error en simulación:", error)
    }
    setLoading(false)
  }

  const loadPreset = (presetName: string) => {
    const preset = presets[presetName]
    if (preset) {
      setInputs({ ...inputs, ...preset })
    }
  }

  return (
    <div className="section-content">
      <h2 className="section-title">Simulador: Interés Compuesto + Inflación</h2>
      <div className="content-box">
        <div className="presets">
          <h3>Escenarios predefinidos:</h3>
          {Object.keys(presets).map((presetName) => (
            <button
              key={presetName}
              onClick={() => loadPreset(presetName)}
              className="preset-button"
              aria-label={`Cargar escenario ${presetName.replace("_", " ")}`}
            >
              {presetName.replace("_", " ").toUpperCase()}
            </button>
          ))}
        </div>

        <div className="inputs-grid">
          <div className="input-group">
            <label htmlFor="monto-inicial">Monto inicial (ARS)</label>
            <input
              id="monto-inicial"
              type="number"
              value={inputs.montoInicial || ""}
              onChange={(e) => setInputs({ ...inputs, montoInicial: Number.parseFloat(e.target.value) })}
              aria-describedby="monto-inicial-help"
            />
            <small id="monto-inicial-help">Capital inicial a invertir</small>
          </div>

          <div className="input-group">
            <label htmlFor="aporte-mensual">Aporte mensual (ARS)</label>
            <input
              id="aporte-mensual"
              type="number"
              value={inputs.aporteMensual || ""}
              onChange={(e) => setInputs({ ...inputs, aporteMensual: Number.parseFloat(e.target.value) })}
              aria-describedby="aporte-help"
            />
            <small id="aporte-help">Dinero que agregas cada mes</small>
          </div>

          <div className="input-group">
            <label htmlFor="tasa-anual">Tasa anual (%)</label>
            <input
              id="tasa-anual"
              type="number"
              value={inputs.tasaNominalAnual || ""}
              onChange={(e) => setInputs({ ...inputs, tasaNominalAnual: Number.parseFloat(e.target.value) })}
              aria-describedby="tasa-help"
            />
            <small id="tasa-help">Rendimiento esperado por año</small>
          </div>

          <div className="input-group">
            <label htmlFor="comision">Comisión anual (%)</label>
            <input
              id="comision"
              type="number"
              step="0.1"
              value={inputs.comisionAnualPct || ""}
              onChange={(e) => setInputs({ ...inputs, comisionAnualPct: Number.parseFloat(e.target.value) })}
              aria-describedby="comision-help"
            />
            <small id="comision-help">Costo anual sobre el patrimonio</small>
          </div>

          <div className="input-group">
            <label htmlFor="meses">Horizonte (meses)</label>
            <input
              id="meses"
              type="number"
              value={inputs.meses || ""}
              onChange={(e) => setInputs({ ...inputs, meses: Number.parseInt(e.target.value) })}
              aria-describedby="meses-help"
            />
            <small id="meses-help">Tiempo de la inversión</small>
          </div>
        </div>

        <button onClick={runSimulation} disabled={loading} className="run-simulation" aria-label="Ejecutar simulación">
          {loading ? "Calculando..." : "Simular"}
        </button>

        {result && (
          <div className="results" aria-labelledby="results-title">
            <h3 id="results-title">Resultados</h3>
            <div className="results-grid">
              <div className="result-item">
                <span className="label">Monto final nominal:</span>
                <span className="value">${result.resumen.montoFinalNominal.toLocaleString()}</span>
              </div>
              <div className="result-item">
                <span className="label">Monto final real:</span>
                <span className="value">${result.resumen.montoFinalReal.toLocaleString()}</span>
              </div>
              <div className="result-item">
                <span className="label">Rendimiento real:</span>
                <span className={`value ${result.resumen.rendimientoRealPct >= 0 ? "positive" : "negative"}`}>
                  {result.resumen.rendimientoRealPct.toFixed(1)}%
                </span>
              </div>
              <div className="result-item">
                <span className="label">Comisiones pagadas:</span>
                <span className="value">${result.resumen.comisionesPagadas.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente: Juego "¿Cuál rinde más?"
function GameWhichYieldsMore({ onStart }: { onStart: () => void }) {
  const [gameEngine] = useState(new GameEngine())
  const [gameState, setGameState] = useState<"menu" | "playing" | "completed">("menu")
  const [rounds, setRounds] = useState<Round[]>([])
  const [currentRound, setCurrentRound] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ correcto: boolean; explicacion: string } | null>(null)
  const [gameResult, setGameResult] = useState<any>(null)

  const startGame = () => {
    const gameRounds = gameEngine.iniciarJuego()
    setRounds(gameRounds)
    setCurrentRound(0)
    setGameState("playing")
    setSelectedOption(null)
    setFeedback(null)
    onStart()
  }

  const selectOption = (optionId: string) => {
    if (feedback) return // Ya respondió

    setSelectedOption(optionId)
    const round = rounds[currentRound]
    const result = gameEngine.responderRonda(round.id, optionId)
    setFeedback(result)
  }

  const nextRound = () => {
    if (currentRound < rounds.length - 1) {
      setCurrentRound(currentRound + 1)
      setSelectedOption(null)
      setFeedback(null)
    } else {
      const finalResult = gameEngine.finalizarJuego()
      setGameResult(finalResult)
      setGameState("completed")
    }
  }

  if (gameState === "menu") {
    return (
      <div className="section-content">
        <h2 className="section-title">Juego: ¿Cuál rinde más?</h2>
        <div className="content-box">
          <p>Pon a prueba tu conocimiento comparando opciones de inversión.</p>
          <p>5 rondas • 20 segundos por ronda • Puntaje por acierto y velocidad</p>
          <button onClick={startGame} className="start-game" aria-label="Comenzar juego">
            Comenzar
          </button>
        </div>
      </div>
    )
  }

  if (gameState === "completed" && gameResult) {
    return (
      <div className="section-content">
        <h2 className="section-title">¡Juego completado!</h2>
        <div className="final-score">
          <p>Puntaje final: {gameResult.score}</p>
          <p>
            Aciertos: {gameResult.aciertos}/{gameResult.rounds.length}
          </p>
          <p>Tiempo total: {gameResult.tiempoTotalSeg} segundos</p>
        </div>
        <button onClick={() => setGameState("menu")} aria-label="Jugar de nuevo">
          Jugar de nuevo
        </button>
      </div>
    )
  }

  const round = rounds[currentRound]
  if (!round) return null

  return (
    <div className="section-content">
      <div className="content-box">
        <div className="game-progress">
          <span>
            Ronda {currentRound + 1} de {rounds.length}
          </span>
        </div>

        <h3 className="section-title">¿Cuál opción rinde más en términos reales?</h3>

        <div className="options-game">
          {round.opciones.map((option) => (
            <button
              key={option.id}
              onClick={() => selectOption(option.id)}
              disabled={!!feedback}
              className={`game-option ${selectedOption === option.id ? "selected" : ""} ${
                feedback && option.id === round.correcta ? "correct" : ""
              } ${feedback && selectedOption === option.id && option.id !== round.correcta ? "incorrect" : ""}`}
              aria-label={`Opción: ${option.descripcion}`}
            >
              <div className="option-description">{option.descripcion}</div>
              <div className="option-details">
                TNA {option.tna}% • Cap: {option.capitalizaciones === 1 ? "anual" : "mensual"} • Comisión:{" "}
                {option.comisionAnualPct}%
              </div>
            </button>
          ))}
        </div>

        {feedback && (
          <div className={`game-feedback ${feedback.correcto ? "correct" : "incorrect"}`}>
            <p>{feedback.correcto ? "¡Correcto!" : "Incorrecto"}</p>
            <p>{feedback.explicacion}</p>
            <button onClick={nextRound} aria-label="Siguiente ronda">
              {currentRound < rounds.length - 1 ? "Siguiente ronda" : "Ver resultados"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Componente: Takeaways y Flashcards
function Takeaway({
  items,
  flashcards,
}: {
  items: string[]
  flashcards: Array<{ front: string; back: string }>
}) {
  const [currentCard, setCurrentCard] = useState(0)
  const [showBack, setShowBack] = useState(false)

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length)
    setShowBack(false)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length)
    setShowBack(false)
  }

  return (
    <div className="section-content">
      <h2 className="section-title">Puntos clave para recordar</h2>
      <div className="content-box">
        <div className="takeaway-list">
          {items.map((item, index) => (
            <div key={index} className="takeaway-item">
              <span className="takeaway-number">{index + 1}</span>
              <span className="takeaway-text">{item}</span>
            </div>
          ))}
        </div>

        <div className="flashcards" aria-labelledby="flashcards-title">
          <h3 id="flashcards-title">Tarjetas de repaso</h3>

          <div className="flashcard-container">
            <div
              className={`flashcard ${showBack ? "flipped" : ""}`}
              onClick={() => setShowBack(!showBack)}
              role="button"
              tabIndex={0}
              aria-label={showBack ? "Ver pregunta" : "Ver respuesta"}
              onKeyDown={(e) => e.key === "Enter" && setShowBack(!showBack)}
            >
              <div className="flashcard-front">{flashcards[currentCard].front}</div>
              <div className="flashcard-back">{flashcards[currentCard].back}</div>
            </div>

            <div className="flashcard-controls">
              <button onClick={prevCard} aria-label="Tarjeta anterior">
                ← Anterior
              </button>
              <span>
                {currentCard + 1} / {flashcards.length}
              </span>
              <button onClick={nextCard} aria-label="Tarjeta siguiente">
                Siguiente →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente: Portada
function SectionPortada({ title }: { title: string }) {
  return (
    <div className="section-content">
      <div className="module-header bg-blue-800">
        <h1 className="text-blue-900">M1 • Fundamentos</h1>
        <p className="text-blue-800">Interés compuesto, inflación y riesgo-retorno</p>
      </div>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">Aprende los conceptos esenciales para invertir en Argentina</p>
      </div>
    </div>
  )
}

function Screen({ children }: { children: React.ReactNode }) {
  return <div className="screen">{children}</div>
}

// Componente principal del módulo
export default function ModuleM1({
  content,
  quiz,
  onModuleComplete,
}: {
  content: Content
  quiz: QuizData
  onModuleComplete: () => void
}) {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  const markSectionComplete = (sectionId: string) => {
    setCompletedSections((prev) => new Set([...prev, sectionId]))
  }

  const handleQuizComplete = (score: number, passed: boolean) => {
    markSectionComplete("quiz")
    if (passed && completedSections.size >= 4) {
      // Todas las secciones principales
      onModuleComplete()
    }
  }

  const trackEvent = (eventName: string, properties: any) => {
    console.log(`[v0] Analytics: ${eventName}`, properties)
    // Here you would integrate with your analytics service
  }

  const handlePagerSwipe = (from: number, to: number) => {
    trackEvent("pager_swipe", { from, to, module: "M1" })
  }

  const handleIndexChange = (newIndex: number) => {
    setCurrentPageIndex(newIndex)

    // Track section views
    const sectionIds = ["portada", "why_matters", "key_ideas", "quiz", "simulator", "game", "takeaway"]
    if (sectionIds[newIndex]) {
      trackEvent("lesson_viewed", {
        section_id: sectionIds[newIndex],
        module_id: "M1_fundamentos",
        timestamp: new Date().toISOString(),
      })
    }
  }

  return (
    <div className="module-m1" role="main">
      <Pager showDots enableArrows analytics={{ onSwipe: handlePagerSwipe }} onIndexChange={handleIndexChange}>
        <Screen>
          <SectionPortada title={content.titulo} />
        </Screen>

        <Screen>
          <SectionWhy content={content.por_que_importa} />
        </Screen>

        <Screen>
          <KeyIdeas items={content.ideas_clave} />
        </Screen>

        <Screen>
          <Quiz items={quiz.items} onComplete={handleQuizComplete} passingRule={quiz.passing_rule} />
        </Screen>

        <Screen>
          <SimulatorCompoundInflation onRun={computeSimulation} presets={examplePreset()} />
        </Screen>

        <Screen>
          <GameWhichYieldsMore onStart={() => markSectionComplete("game")} />
        </Screen>

        <Screen>
          <Takeaway items={content.takeaway} flashcards={content.flashcards} />
        </Screen>
      </Pager>
    </div>
  )
}
