"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegistrationStep from "@/components/onboarding/RegistrationStep";
import AgeStep from "@/components/onboarding/AgeStep";
import ObjectiveStep from "@/components/onboarding/ObjectiveStep";
import LearningStep from "@/components/onboarding/LearningStep";
import InterestsStep from "@/components/onboarding/InterestsStep";
import SuccessStep from "@/components/onboarding/SuccessStep";
import { FormData } from "@/lib/types";

type OnboardingStep = "registration" | "age" | "objective" | "learning" | "interests" | "success";

export default function EfinOnboarding() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("registration");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: 18,
    objectives: [],
    learningPreferences: [],
    interests: [],
  });

  const steps: OnboardingStep[] = ["registration", "age", "objective", "learning", "interests", "success"];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };

  const handleCheckboxChange = (
    field: "objectives" | "learningPreferences" | "interests",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const router = useRouter();
  const handleStart = () => {
    router.push("/");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "registration":
        return <RegistrationStep formData={formData} setFormData={setFormData} onNext={handleNext} />;
      case "age":
        return (
          <AgeStep
            formData={formData}
            setFormData={setFormData}
            progress={progress}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case "objective":
        return (
          <ObjectiveStep
            formData={formData}
            setFormData={setFormData}
            progress={progress}
            onNext={handleNext}
            onBack={handleBack}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      case "learning":
        return (
          <LearningStep
            formData={formData}
            progress={progress}
            onNext={handleNext}
            onBack={handleBack}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      case "interests":
        return (
          <InterestsStep
            formData={formData}
            progress={progress}
            onNext={handleNext}
            onBack={handleBack}
            handleCheckboxChange={handleCheckboxChange}
          />
        );
      case "success":
        return <SuccessStep onStart={handleStart} />;
      default:
        return null;
    }
  };

  return renderCurrentStep();
}
