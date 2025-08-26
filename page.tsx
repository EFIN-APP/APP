"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Mail, Apple } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

type OnboardingStep = "registration" | "age" | "objective" | "learning" | "interests" | "success"

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  age: number
  objectives: string[]
  learningPreferences: string[]
  interests: string[]
}

export default function EfinOnboarding() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("registration")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: 18,
    objectives: [],
    learningPreferences: [],
    interests: [],
  })

  const steps: OnboardingStep[] = ["registration", "age", "objective", "learning", "interests", "success"]
  const currentStepIndex = steps.indexOf(currentStep)
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const handleCheckboxChange = (field: "objectives" | "learningPreferences" | "interests", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const renderRegistrationScreen = () => (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">EFIN</h1>
            <p className="text-muted-foreground text-sm">Aprender finanzas nunca fue tan fácil</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="flex items-center justify-center p-3 bg-white text-black border-white hover:bg-gray-100"
              >
                <FcGoogle className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center p-3 bg-white text-black border-white hover:bg-gray-100"
              >
                <Apple className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="flex items-center justify-center p-3 bg-white text-black border-white hover:bg-gray-100"
              >
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="bg-white text-black placeholder:text-gray-500 border-white"
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="bg-white text-black placeholder:text-gray-500 border-white"
            />
            <Input
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              className="bg-white text-black placeholder:text-gray-500 border-white"
            />
            <Input
              type="password"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              className="bg-white text-black placeholder:text-gray-500 border-white"
            />
          </div>

          <Button onClick={handleNext} className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
            Registrarme
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderAgeScreen = () => (
    <div className="min-h-screen bg-background flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={handleBack} className="text-foreground hover:bg-card">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Progress value={progress} className="flex-1 mx-4" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md bg-card border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">EFIN</h1>
              <p className="text-muted-foreground text-sm">Aprender finanzas nunca fue tan fácil</p>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <label className="block text-foreground text-lg font-medium mb-4">¿Cuál es tu edad?</label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData((prev) => ({ ...prev, age: Number.parseInt(e.target.value) || 18 }))}
                  className="text-center text-2xl bg-white text-black border-white"
                  min="16"
                  max="100"
                />
              </div>
            </div>

            <Button onClick={handleNext} className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
              Siguiente
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderObjectiveScreen = () => (
    <div className="min-h-screen bg-background flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={handleBack} className="text-foreground hover:bg-card">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Progress value={progress} className="flex-1 mx-4" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md bg-card border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-foreground mb-6">¿Cuál es tu objetivo?</h2>
            </div>

            <div className="space-y-4">
              {["Ahorrar", "Invertir", "Salir de deudas", "Otro"].map((objective) => (
                <div key={objective} className="flex items-center space-x-3">
                  <Checkbox
                    id={objective}
                    checked={formData.objectives.includes(objective)}
                    onCheckedChange={() => handleCheckboxChange("objectives", objective)}
                    className="border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label htmlFor={objective} className="text-foreground text-lg">
                    {objective}
                  </label>
                </div>
              ))}
              {formData.objectives.includes("Otro") && (
                <Input
                  placeholder="Especifica tu objetivo"
                  className="mt-2 bg-white text-black placeholder:text-gray-500 border-white"
                />
              )}
            </div>

            <Button onClick={handleNext} className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
              Siguiente
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderLearningScreen = () => (
    <div className="min-h-screen bg-background flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={handleBack} className="text-foreground hover:bg-card">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Progress value={progress} className="flex-1 mx-4" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md bg-card border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-foreground mb-6">¿Cómo preferís aprender?</h2>
            </div>

            <div className="space-y-4">
              {["Videos", "Juegos", "Lecturas", "Simuladores"].map((preference) => (
                <div key={preference} className="flex items-center space-x-3">
                  <Checkbox
                    id={preference}
                    checked={formData.learningPreferences.includes(preference)}
                    onCheckedChange={() => handleCheckboxChange("learningPreferences", preference)}
                    className="border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label htmlFor={preference} className="text-foreground text-lg">
                    {preference}
                  </label>
                </div>
              ))}
            </div>

            <Button onClick={handleNext} className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
              Siguiente
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderInterestsScreen = () => (
    <div className="min-h-screen bg-background flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={handleBack} className="text-foreground hover:bg-card">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Progress value={progress} className="flex-1 mx-4" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md bg-card border-0 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-foreground mb-6">¿Qué temas te interesan?</h2>
            </div>

            <div className="space-y-4">
              {["Cripto", "Inversión", "Economía básica", "VC", "Impuestos", "Deuda"].map((interest) => (
                <div key={interest} className="flex items-center space-x-3">
                  <Checkbox
                    id={interest}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={() => handleCheckboxChange("interests", interest)}
                    className="border-white data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label htmlFor={interest} className="text-foreground text-lg">
                    {interest}
                  </label>
                </div>
              ))}
            </div>

            <Button onClick={handleNext} className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
              Siguiente
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSuccessScreen = () => (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">¡Listo!</h2>
            <p className="text-foreground text-lg leading-relaxed">Creamos un camino de aprendizaje único para vos.</p>
          </div>

          <Button
            onClick={() => console.log("Starting app...")}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3"
          >
            Empezar ahora
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "registration":
        return renderRegistrationScreen()
      case "age":
        return renderAgeScreen()
      case "objective":
        return renderObjectiveScreen()
      case "learning":
        return renderLearningScreen()
      case "interests":
        return renderInterestsScreen()
      case "success":
        return renderSuccessScreen()
      default:
        return renderRegistrationScreen()
    }
  }

  return renderCurrentStep()
}
"use client";
import React from "react";
import { Button } from "@/components/ui/moving-border";


  );
}
