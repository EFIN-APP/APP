"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { FormData } from "@/lib/types";
import { INTERESTS } from "@/lib/constants";

interface InterestsStepProps {
  formData: FormData;
  progress: number;
  onNext: () => void;
  onBack: () => void;
  handleCheckboxChange: (field: "objectives" | "learningPreferences" | "interests", value: string) => void;
}

export default function InterestsStep({
  formData,
  progress,
  onNext,
  onBack,
  handleCheckboxChange,
}: InterestsStepProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={onBack} className="text-foreground hover:bg-card">
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
              {INTERESTS.map((interest) => (
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

            <Button onClick={onNext} className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
              Siguiente
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
