"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Bell, LogOut, Trash2, User, Facebook, Twitter } from "lucide-react"

interface SettingsPanelProps {
  onBack: () => void
}

export function SettingsPanel({ onBack }: SettingsPanelProps) {
  const [showPersonalData, setShowPersonalData] = useState(false)
  const [notifications, setNotifications] = useState({
    achievements: true,
    weeklyReports: true,
    mentorSharing: false,
    publicProfile: true,
  })

  if (showPersonalData) {
    return (
      <div className="max-w-md mx-auto bg-background min-h-screen">
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary/20 mr-3"
            onClick={() => setShowPersonalData(false)}
            aria-label="Volver"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="font-bold text-lg">Datos Personales</h1>
        </div>

        {/* Personal Data Form */}
        <div className="p-4 space-y-6">
          {/* Profile Picture */}
          <div className="text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src="/professional-headshot.png" alt="Santiago Carrasco" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">SC</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Cambiar foto
            </Button>
          </div>

          {/* Personal Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" defaultValue="Santiago Carrasco" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="santiago@gmail.com" />
            </div>
            <div>
              <Label htmlFor="phone">Número de teléfono</Label>
              <Input id="phone" defaultValue="+54 11 3030 9060" />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" defaultValue="••••••••••" />
            </div>
          </div>

          {/* Linked Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Apps asociadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <Facebook className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">Facebook</span>
                </div>
                <Button variant="outline" size="sm" className="bg-green-500 text-white border-green-500">
                  Conectado
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">W</span>
                  </div>
                  <span className="text-sm">WhatsApp</span>
                </div>
                <Button variant="outline" size="sm" className="bg-green-500 text-white border-green-500">
                  Conectado
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center">
                    <Twitter className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">Twitter</span>
                </div>
                <Button variant="outline" size="sm" className="bg-accent text-white border-accent">
                  Desconectado
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary/20 mr-3"
          onClick={onBack}
          aria-label="Volver"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="font-bold text-lg">Ajustes</h1>
      </div>

      {/* Settings Menu */}
      <div className="p-4 space-y-4">
        {/* Personal Data */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto"
              onClick={() => setShowPersonalData(true)}
            >
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <span>Datos personales</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Button>
          </CardContent>
        </Card>

        {/* Learning Preferences */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Preferencias de aprendizaje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="objective">Objetivo Principal</Label>
              <Select defaultValue="ahorrar">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ahorrar">Ahorrar</SelectItem>
                  <SelectItem value="invertir">Invertir</SelectItem>
                  <SelectItem value="presupuesto">Presupuesto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="style">Estilo Preferido</Label>
              <Select defaultValue="videos">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="videos">Videos</SelectItem>
                  <SelectItem value="lectura">Lectura</SelectItem>
                  <SelectItem value="juegos">Juegos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="language">Idioma</Label>
              <Select defaultValue="es">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notificaciones</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Recibir noticias de logros</span>
              <Switch
                checked={notifications.achievements}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, achievements: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Logros obtenidos</span>
              <Switch
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, weeklyReports: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Mostrar logros públicamente</span>
              <Switch
                checked={notifications.publicProfile}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, publicProfile: checked }))}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Compartir estadísticas personales</span>
              <Switch
                checked={notifications.mentorSharing}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, mentorSharing: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Cerrar sesión
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
          >
            <Trash2 className="w-5 h-5 mr-3" />
            Eliminar cuenta
          </Button>
        </div>
      </div>
    </div>
  )
}
