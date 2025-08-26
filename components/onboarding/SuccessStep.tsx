"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SuccessStepProps {
  onStart: () => void;
}

export default function SuccessStep({ onStart }: SuccessStepProps) {
  return (
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

          <Button onClick={onStart} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3">
            Empezar ahora
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
