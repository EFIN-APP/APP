"use client";

import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, Bookmark } from "lucide-react";

interface ForumScreenProps {
  onBack: () => void;
  onSettings: () => void;
  onHome: () => void;
  onProgress: () => void;
}

export default function ForumScreen({ onBack, onSettings, onHome, onProgress }: ForumScreenProps) {
  return (
    <div className="flex-1 bg-background">
      <TopBar title="Foro" showBack onBack={onBack} onSettings={onSettings} />

      <div className="p-4 space-y-4">
        {[
          {
            title: "Dudas y manejo del crédito",
            desc: "Como puedo mejorar mi score crediticio y salir de deudas de forma gradual",
          },
          { title: "Inversión Primaria", desc: "Lorem ipsum dolor sit amet" },
          { title: "Temas Avanzados", desc: "Lorem ipsum dolor sit amet" },
        ].map((post, i) => (
          <Card key={i} className="bg-card">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-muted">SC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{post.desc}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <Button variant="ghost" size="sm" className="text-muted-foreground p-1">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      12
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground p-1">
                      <MessageSquare className="w-4 h-4 mr-1" />5
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground p-1">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <BottomNav onProgress={onProgress} onHome={onHome} onForum={() => {}} />
    </div>
  );
}
