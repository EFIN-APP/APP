"use client"

import { useMemo, useState } from "react"
import { ArrowLeft, Apple, CheckCircle2, Mail, Sparkles, UserRound } from "lucide-react"

import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Progress } from "./ui/progress"

export type OnboardingStep =
  | "registration"
  | "age"
  | "objective"
  | "learning"
  | "interests"
  | "success"

export interface OnboardingData {
  name: string
  email: string
  age: number
  objectives: string[]
  learningPreferences: string[]
  interests: string[]
}

interface EFINOnboardingProps {
  onComplete: (data: OnboardingData) => void
}

const learningObjectives = [
  "Mejorar mis finanzas personales",
  "Prepararme para inversiones",
  "Entender créditos y préstamos",
  "Aprender a presupuestar",
]

const learningModes = [
  "Lecciones interactivas",
  "Videos cortos",
  "Casos prácticos",
  "Simuladores financieros",
]

const interestAreas = [
  "Inversiones",
  "Presupuesto",
  "Finanzas personales",
  "Cripto & Web3",
  "Economía",
  "Mercados",
]

export function EFINOnboarding({ onComplete }: EFINOnboardingProps) {
  const steps: OnboardingStep[] = useMemo(
    () => ["registration", "age", "objective", "learning", "interests", "success"],
    [],
  )

  const [currentStep, setCurrentStep] = useState<OnboardingStep>("registration")
  const [formData, setFormData] = useState<OnboardingData>({
    name: "",
    email: "",
    age: 18,
    objectives: [],
    learningPreferences: [],
    interests: [],
  })

  const currentStepIndex = steps.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const goToStep = (direction: 1 | -1) => {
    const newIndex = currentStepIndex + direction
    if (newIndex >= 0 && newIndex < steps.length) {
      setCurrentStep(steps[newIndex])
    }
  }

  const toggleValue = (key: keyof Pick<OnboardingData, "objectives" | "learningPreferences" | "interests">, value: string) => {
    setFormData((prev) => {
      const current = prev[key]
      const exists = current.includes(value)

      return {
        ...prev,
        [key]: exists ? current.filter((item) => item !== value) : [...current, value],
      }
    })
  }

  const renderHeader = (title: string, description: string) => (
    <CardHeader className="text-center">
      <CardTitle className="text-2xl font-semibold text-foreground">{title}</CardTitle>
      <CardDescription className="text-base text-muted-foreground">{description}</CardDescription>
    </CardHeader>
  )

  const renderBackButton = currentStep !== "registration" ? (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => goToStep(-1)}
      className="absolute left-4 top-4 text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  ) : null

  const actionButtonText =
    currentStep === "success"
      ? "Ir al inicio"
      : currentStepIndex === steps.length - 2
        ? "Finalizar"
        : "Continuar"

  const handleComplete = () => {
    const result: OnboardingData = {
      name: formData.name.trim() || "Invitado",
      email: formData.email.trim(),
      age: formData.age,
      objectives: formData.objectives,
      learningPreferences: formData.learningPreferences,
      interests: formData.interests,
    }

    localStorage.setItem("efin-profile", JSON.stringify(result))
    onComplete(result)
  }

  const RegistrationStep = (
    <>
      {renderHeader("Bienvenido a EFIN", "Creamos un plan personalizado para tu aprendizaje financiero")}
      <CardContent className="space-y-6 pb-8">
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="flex items-center justify-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="text-xs font-medium">Email</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center gap-2">
            <Apple className="h-4 w-4" />
            <span className="text-xs font-medium">Apple</span>
          </Button>
          <Button variant="outline" className="flex items-center justify-center gap-2">
            <UserRound className="h-4 w-4" />
            <span className="text-xs font-medium">Continuar</span>
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2 text-left">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              placeholder="Ingresa tu nombre"
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            />
          </div>
          <div className="space-y-2 text-left">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={formData.email}
              onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2 text-left">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="••••••" />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="password-confirm">Confirmar contraseña</Label>
              <Input id="password-confirm" type="password" placeholder="••••••" />
            </div>
          </div>
        </div>
      </CardContent>
    </>
  )

  const AgeStep = (
    <>
      {renderHeader("¿Cuál es tu edad?", "Adaptamos el contenido a tu etapa de aprendizaje")}
      <CardContent className="space-y-6 pb-8">
        <div className="flex justify-center">
          <div className="rounded-2xl bg-primary/10 p-8 text-center">
            <p className="text-sm text-muted-foreground">Tu edad</p>
            <Input
              type="number"
              min={14}
              max={100}
              className="mt-3 w-24 text-center text-xl"
              value={formData.age}
              onChange={(event) => {
                const parsedValue = Number.parseInt(event.target.value, 10)
                setFormData((prev) => ({
                  ...prev,
                  age: Number.isNaN(parsedValue) ? 18 : parsedValue,
                }))
              }}
            />
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Utilizamos esta información para recomendar cursos y contenidos adecuados.
        </p>
      </CardContent>
    </>
  )

  const ObjectiveStep = (
    <>
      {renderHeader("¿Cuál es tu objetivo principal?", "Selecciona todas las opciones que se ajusten a tus metas")}
      <CardContent className="space-y-4 pb-8">
        {learningObjectives.map((item) => (
          <Label
            key={item}
            className="flex cursor-pointer items-center justify-between rounded-xl border bg-card/60 p-4 hover:border-primary"
          >
            <span className="text-sm font-medium text-foreground">{item}</span>
            <Checkbox
              checked={formData.objectives.includes(item)}
              onCheckedChange={() => toggleValue("objectives", item)}
            />
          </Label>
        ))}
      </CardContent>
    </>
  )

  const LearningStep = (
    <>
      {renderHeader("¿Cómo prefieres aprender?", "Personalizamos el formato de tus clases y recursos")}
      <CardContent className="space-y-4 pb-8">
        {learningModes.map((item) => (
          <Label
            key={item}
            className="flex cursor-pointer items-center justify-between rounded-xl border bg-card/60 p-4 hover:border-primary"
          >
            <span className="text-sm font-medium text-foreground">{item}</span>
            <Checkbox
              checked={formData.learningPreferences.includes(item)}
              onCheckedChange={() => toggleValue("learningPreferences", item)}
            />
          </Label>
        ))}
      </CardContent>
    </>
  )

  const InterestsStep = (
    <>
      {renderHeader("¿Qué temas te interesan?", "Creamos un feed con contenido relevante para ti")}
      <CardContent className="grid grid-cols-2 gap-3 pb-8 sm:grid-cols-3">
        {interestAreas.map((item) => (
          <Label
            key={item}
            className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-sm font-medium transition-colors ${
              formData.interests.includes(item)
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card/60 text-foreground"
            }`}
          >
            {item}
            <Checkbox
              checked={formData.interests.includes(item)}
              onCheckedChange={() => toggleValue("interests", item)}
            />
          </Label>
        ))}
      </CardContent>
    </>
  )

  const SuccessStep = (
    <>
      {renderHeader("¡Listo para comenzar!", "Construimos tu experiencia personalizada en finanzas")}
      <CardContent className="space-y-6 pb-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">Bienvenido, {formData.name || "Invitado"}</p>
          <p className="text-sm text-muted-foreground">
            Comienza explorando tu feed personalizado y continúa con tus cursos recomendados.
          </p>
        </div>
        <div className="rounded-2xl bg-muted/30 p-4 text-left">
          <p className="text-sm font-semibold text-muted-foreground">Tus intereses principales</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(formData.interests.length ? formData.interests : interestAreas.slice(0, 3)).map((item) => (
              <span
                key={item}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </>
  )

  const stepContent: Record<OnboardingStep, JSX.Element> = {
    registration: RegistrationStep,
    age: AgeStep,
    objective: ObjectiveStep,
    learning: LearningStep,
    interests: InterestsStep,
    success: SuccessStep,
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-efin-navy/5 p-4">
      <div className="w-full max-w-2xl">
        <div className="relative">
          {renderBackButton}
          <Card className="overflow-hidden border-none bg-white shadow-2xl">
            <div className="relative">
              <div className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Paso {currentStepIndex + 1} de {steps.length}
              </div>
              <Progress value={progress} className="h-1 w-full bg-muted" />
            </div>
            {stepContent[currentStep]}
            <CardContent className="flex justify-between gap-3 border-t pt-6">
              <div>
                <p className="text-xs text-muted-foreground">
                  Guardamos tu progreso para personalizar tu experiencia.
                </p>
              </div>
              <Button
                className="min-w-[120px] bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={
                  currentStep === "success"
                    ? handleComplete
                    : () => goToStep(1)
                }
              >
                {actionButtonText}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
