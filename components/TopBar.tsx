"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";

interface TopBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onSettings?: () => void;
}

export default function TopBar({ title, showBack = false, onBack, onSettings }: TopBarProps) {
  return (
    <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary/20 p-1"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onSettings}
        className="text-primary-foreground hover:bg-primary/20 p-2"
      >
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
}
