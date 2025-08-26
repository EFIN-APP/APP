"use client";

import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share2 } from "lucide-react";

interface ProgressScreenProps {
  onBack: () => void;
  onSettings: () => void;
  onHome: () => void;
  onForum: () => void;
}

export default function ProgressScreen({ onBack, onSettings, onHome, onForum }: ProgressScreenProps) {
  return (
    <div className="flex-1 bg-background">
      <TopBar title="Progreso" showBack onBack={onBack} onSettings={onSettings} />

      <div className="p-4 space-y-6">
        <Card className="bg-card">
          <CardContent className="p-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.65)}`}
                  className="text-accent"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">65%</div>
                  <div className="text-sm text-muted-foreground">Completado</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-accent text-accent-foreground p-3 rounded-lg">
                <div className="text-lg font-semibold">1.2K</div>
                <div className="text-sm">XP</div>
              </div>
              <div className="bg-accent text-accent-foreground p-3 rounded-lg">
                <div className="text-lg font-semibold">15</div>
                <div className="text-sm">Lecciones</div>
              </div>
              <div className="bg-accent text-accent-foreground p-3 rounded-lg">
                <div className="text-lg font-semibold">3</div>
                <div className="text-sm">Módulos</div>
              </div>
              <div className="bg-accent text-accent-foreground p-3 rounded-lg">
                <div className="text-lg font-semibold">8</div>
                <div className="text-sm">Cursos</div>
              </div>
            </div>

            <Button className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Share2 className="w-4 h-4 mr-2" />
              Compartir mi perfil
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNav onProgress={() => {}} onHome={onHome} onForum={onForum} />
    </div>
  );
}
