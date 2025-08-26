"use client";

import { Button } from "@/components/ui/button";
import { Flame, Home, BookOpen } from "lucide-react";

interface BottomNavProps {
  onProgress?: () => void;
  onHome?: () => void;
  onForum?: () => void;
}

export default function BottomNav({ onProgress, onHome, onForum }: BottomNavProps) {
  return (
    <div className="bg-primary text-primary-foreground p-4 flex justify-center gap-12">
      <Button
        variant="ghost"
        size="sm"
        onClick={onProgress}
        className="text-primary-foreground hover:bg-primary/20 p-2"
      >
        <Flame className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onHome}
        className="text-primary-foreground hover:bg-primary/20 p-2"
      >
        <Home className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onForum}
        className="text-primary-foreground hover:bg-primary/20 p-2"
      >
        <BookOpen className="h-6 w-6" />
      </Button>
    </div>
  );
}
