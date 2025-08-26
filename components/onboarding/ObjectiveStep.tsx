"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { FormData } from "@/lib/types";
import { OBJECTIVES } from "@/lib/constants";

interface ObjectiveStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  progress: number;
  onNext: () => void;
  onBack: () => void;
  handleCheckboxChange: (field: "objectives" | "learningPreferences" | "interests", value: string) => void;
}

export default function ObjectiveStep({
  formData,
  setFormData,
  progress,
  onNext,
  onBack,
  handleCheckboxChange,
}: ObjectiveStepProps) {
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
              <h2 className="text-xl font-bold text-foreground mb-6">¿Cuál es tu objetivo?</h2>
            </div>

            <div className="space-y-4">
              {OBJECTIVES.map((objective) => (
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
                  value={formData.objectives.find((o) => o !== "Ahorrar" && o !== "Invertir" && o !== "Salir de deudas" && o !== "Otro") || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      objectives: prev.objectives.map((o) =>
                        ["Ahorrar", "Invertir", "Salir de deudas", "Otro"].includes(o) ? o : e.target.value
                      ),
                    }))
                  }
                  className="mt-2 bg-white text-black placeholder:text-gray-500 border-white"
                />
              )}
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
