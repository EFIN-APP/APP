"use client"

import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { UserBadges } from "./user-badges"
import { User, Settings, BookOpen } from "lucide-react"

export function UserProfile() {
  return (
    <div className="min-h-screen bg-efin-navy p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" alt="Santiago Carrasco" />
              <AvatarFallback className="bg-efin-blue text-white text-lg">SC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">Santiago Carrasco</h1>
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
          </div>
        </Card>
      </div>
    </div>
  )
}
