"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  ArrowLeft,
  Home,
  BookOpen,
  Flame,
  Grid3X3,
  MessageCircle,
  TrendingUp,
  Heart,
  Users,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageSquare,
} from "lucide-react"

type Screen = "profile" | "settings" | "personal-data" | "progress" | "forum"
type Tab = "grid" | "comments" | "progress" | "favorites" | "forum"

export default function EfinApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("profile")
  const [activeTab, setActiveTab] = useState<Tab>("grid")

  const TopBar = ({ title, showBack = false }: { title: string; showBack?: boolean }) => (
    <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen("profile")}
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
        onClick={() => setCurrentScreen("settings")}
        className="text-primary-foreground hover:bg-primary/20 p-2"
      >
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  )

  const BottomNav = () => (
    <div className="bg-primary text-primary-foreground p-4 flex justify-center gap-12">
      <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary/20 p-2">
        <Flame className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCurrentScreen("profile")}
        className="text-primary-foreground hover:bg-primary/20 p-2"
      >
        <Home className="h-6 w-6" />
      </Button>
      <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary/20 p-2">
        <BookOpen className="h-6 w-6" />
      </Button>
    </div>
  )

  const ProfileScreen = () => (
    <div className="flex-1 bg-background">
      <TopBar title="Tu Perfil" />

      <div className="p-4 space-y-6">
        {/* User Card */}
        <Card className="bg-card">
          <CardContent className="p-6 text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src="/abstract-profile.png" />
              <AvatarFallback className="bg-muted text-2xl">SC</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold text-foreground">Santiago Carrasco</h2>
            <p className="text-muted-foreground">@santiago_carrasco</p>

            <div className="flex justify-center gap-8 mt-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">156</div>
                <div className="text-sm text-muted-foreground">Siguiendo</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">1.2K</div>
                <div className="text-sm text-muted-foreground">Seguidores</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-6 border-b border-border">
          {[
            { id: "grid", icon: Grid3X3 },
            { id: "comments", icon: MessageCircle },
            { id: "progress", icon: TrendingUp },
            { id: "favorites", icon: Heart },
            { id: "forum", icon: Users },
          ].map(({ id, icon: Icon }) => (
            <Button
              key={id}
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab(id as Tab)}
              className={`p-3 ${activeTab === id ? "text-accent border-b-2 border-accent" : "text-muted-foreground"}`}
            >
              <Icon className="h-5 w-5" />
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {activeTab === "grid" && (
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-square bg-muted rounded-lg"></div>
              ))}
            </div>
          )}

          {activeTab === "comments" && (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="bg-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-muted text-xs">SC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">Santiago Carrasco</p>
                        <p className="text-sm text-muted-foreground mt-1">Lorem ipsum dolor sit amet...</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "progress" && (
            <div className="space-y-6">
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
          )}

          {activeTab === "forum" && (
            <div className="space-y-4">
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
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )

  const SettingsScreen = () => (
    <div className="flex-1 bg-background">
      <TopBar title="Ajustes" showBack />

      <div className="p-4 space-y-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Preferencias de Aprendizaje</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Objetivo principal</label>
              <Select>
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="Seleccionar objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ahorrar">Ahorrar</SelectItem>
                  <SelectItem value="invertir">Invertir</SelectItem>
                  <SelectItem value="deudas">Salir de deudas</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Estilo preferido</label>
              <Select>
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="Seleccionar estilo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="videos">Videos</SelectItem>
                  <SelectItem value="juegos">Juegos</SelectItem>
                  <SelectItem value="lecturas">Lecturas</SelectItem>
                  <SelectItem value="simuladores">Simuladores</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Notificaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              "Notificaciones",
              "Recordatorios de inicio diario",
              "Logros obtenidos",
              "Mostrar logros públicamente",
              "Compartir estadísticas personales",
            ].map((setting) => (
              <div key={setting} className="flex items-center justify-between">
                <span className="text-foreground">{setting}</span>
                <Switch />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4 space-y-4">
            {["Idioma", "Centro de ayuda", "Términos y Condiciones"].map((item) => (
              <Button key={item} variant="ghost" className="w-full justify-start text-foreground">
                {item}
              </Button>
            ))}
            <Button variant="ghost" className="w-full justify-start text-destructive">
              Cerrar sesión
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )

  const PersonalDataScreen = () => (
    <div className="flex-1 bg-background">
      <TopBar title="Datos Personales" showBack />

      <div className="p-4 space-y-6">
        <Card className="bg-card">
          <CardContent className="p-6 text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src="/abstract-profile.png" />
              <AvatarFallback className="bg-muted text-2xl">SC</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="mb-4 bg-transparent">
              Cambiar foto
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardContent className="p-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nombre</label>
              <p className="text-foreground">Santiago Carrasco</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Teléfono</label>
              <p className="text-foreground">+57 300 123 4567</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-foreground">santiago@example.com</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Contraseña</label>
              <p className="text-foreground">••••••••</p>
              <p className="text-xs text-muted-foreground">Actualizada hace 2 meses</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Cuentas Vinculadas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Facebook", connected: true },
              { name: "WhatsApp", connected: true },
              { name: "Twitter", connected: false },
            ].map((account) => (
              <div key={account.name} className="flex items-center justify-between">
                <span className="text-foreground">{account.name}</span>
                <Badge
                  variant={account.connected ? "default" : "secondary"}
                  className={account.connected ? "bg-accent text-accent-foreground" : ""}
                >
                  {account.connected ? "Conectado" : "Desconectado"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  )

  const screens = {
    profile: <ProfileScreen />,
    settings: <SettingsScreen />,
    "personal-data": <PersonalDataScreen />,
    progress: <ProfileScreen />,
    forum: <ProfileScreen />,
  }

  return <div className="max-w-sm mx-auto bg-background min-h-screen flex flex-col">{screens[currentScreen]}</div>
}
