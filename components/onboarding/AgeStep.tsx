"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { FormData } from "@/lib/types";

interface AgeStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  progress: number;
  onNext: () => void;
  onBack: () => void;
}

export default function AgeStep({ formData, setFormData, progress, onNext, onBack }: AgeStepProps) {
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

            <Button onClick={onNext} className="w-full mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
              Siguiente
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
