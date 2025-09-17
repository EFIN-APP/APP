"use client"

import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { UserBadges } from "./user-badges"
import { User, Settings, BookOpen } from "lucide-react"

interface UserProfileProps {
  name?: string
  objectives?: string[]
  interests?: string[]
  onResetProfile?: () => void
}

export function UserProfile({ name, objectives = [], interests = [], onResetProfile }: UserProfileProps) {
  const displayName = name ?? "Santiago Carrasco"
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2) || "SC"
  const displayedObjectives = objectives.length > 0 ? objectives : ["Explorar finanzas personales"]
  const displayedInterests = interests.length > 0 ? interests : ["Inversiones", "Presupuesto"]

  return (
    <div className="min-h-screen bg-efin-navy p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" alt={displayName} />
              <AvatarFallback className="bg-efin-blue text-white text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">{displayName}</h1>
              <p className="text-efin-turquoise text-sm">Finance Learning Journey</p>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-efin-turquoise">1</div>
              <div className="text-sm text-white">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-efin-turquoise">65%</div>
              <div className="text-sm text-white">Progress</div>
            </div>
          </div>
        </Card>

        {/* Badges Section */}
        <UserBadges />

        {/* Objectives */}
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Metas de aprendizaje</h3>
          <div className="flex flex-wrap gap-2">
            {displayedObjectives.map((objective) => (
              <Badge key={objective} variant="outline" className="border-efin-turquoise/40 text-efin-turquoise">
                {objective}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Interests */}
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Temas de interés</h3>
          <div className="flex flex-wrap gap-2">
            {displayedInterests.map((interest) => (
              <Badge key={interest} className="bg-efin-blue/20 text-efin-turquoise">
                {interest}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start bg-efin-blue hover:bg-efin-blue/90 text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Continue Learning
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-white border-white/30 hover:bg-white/10 bg-transparent"
            >
              <User className="h-4 w-4 mr-2" />
              View Learning Path
            </Button>
            {onResetProfile && (
              <Button
                variant="ghost"
                onClick={onResetProfile}
                className="w-full justify-start text-efin-turquoise hover:bg-efin-turquoise/10"
              >
                <Settings className="h-4 w-4 mr-2" />
                Actualizar preferencias
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
