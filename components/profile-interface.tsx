"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Grid3X3, Clock, BookOpen, Award, Users, Home, Compass, User, Flame, ChevronLeft } from "lucide-react"
import { UserInfoCard } from "./user-info-card"
import { PostsFeed } from "./posts-feed"
import { CourseProgress } from "./course-progress"
import { SettingsPanel } from "./settings-panel"

export function ProfileInterface() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") ?? "grid"
  const [showSettings, setShowSettings] = useState(false)

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("tab", value)
    router.replace(`?${params.toString()}`)
  }

  if (showSettings) {
    return <SettingsPanel onBack={() => setShowSettings(false)} />
  }

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <ChevronLeft className="w-6 h-6" aria-hidden="true" />
        <h1 className="font-bold text-lg">Tu Perfil</h1>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary/20"
          onClick={() => setShowSettings(true)}
          aria-label="Ajustes"
        >
          <Settings className="w-6 h-6" />
        </Button>
      </div>

      {/* User Info Card */}
      <UserInfoCard />

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="px-4">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="grid" className="p-2">
            <Grid3X3 className="w-5 h-5" />
          </TabsTrigger>
          <TabsTrigger value="timeline" className="p-2">
            <Clock className="w-5 h-5" />
          </TabsTrigger>
          <TabsTrigger value="courses" className="p-2">
            <BookOpen className="w-5 h-5" />
          </TabsTrigger>
          <TabsTrigger value="badges" className="p-2">
            <Award className="w-5 h-5" />
          </TabsTrigger>
          <TabsTrigger value="social" className="p-2">
            <Users className="w-5 h-5" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <PostsFeed />
        </TabsContent>

        <TabsContent value="courses">
          <CourseProgress />
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {["Principiante", "Ahorrador", "Inversor", "Experto", "Mentor", "Líder"].map((badge) => (
              <Card key={badge} className="text-center p-4">
                <Award className="w-8 h-8 mx-auto mb-2 text-accent" />
                <p className="text-sm font-medium">{badge}</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="social">
          <PostsFeed showSocial />
        </TabsContent>
      </Tabs>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-primary text-primary-foreground">
        <div className="flex justify-around py-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary/20"
            aria-label="Tendencias"
          >
            <Flame className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary/20"
            aria-label="Inicio"
          >
            <Home className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary/20"
            aria-label="Explorar"
          >
            <Compass className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary/20"
            aria-label="Perfil"
          >
            <User className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20" />
    </div>
  )
}
