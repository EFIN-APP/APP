"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProgressScreen from "@/components/profile/ProgressScreen";
import ForumScreen from "@/components/profile/ForumScreen";
import { PROFILE_TABS } from "@/lib/constants";

 type Screen = "profile" | "settings" | "personal-data" | "progress" | "forum";
 type Tab = "grid" | "comments" | "favorites";

export default function EfinApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("profile");
  const [activeTab, setActiveTab] = useState<Tab>("grid");

  const ProfileScreen = () => (
    <div className="flex-1 bg-background">
      <TopBar title="Tu Perfil" onSettings={() => setCurrentScreen("settings")} />

      <div className="p-4 space-y-6">
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

        <div className="flex justify-center gap-6 border-b border-border">
          {PROFILE_TABS.map(({ id, icon: Icon }) => (
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

          {activeTab === "favorites" && (
            <div className="text-center text-muted-foreground mt-6">
              Aún no tienes publicaciones favoritas
            </div>
          )}
        </div>
      </div>

      <BottomNav
        onProgress={() => setCurrentScreen("progress")}
        onHome={() => setCurrentScreen("profile")}
        onForum={() => setCurrentScreen("forum")}
      />
    </div>
  );

  const SettingsScreen = () => (
    <div className="flex-1 bg-background">
      <TopBar title="Ajustes" showBack onBack={() => setCurrentScreen("profile")} />

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

      <BottomNav
        onProgress={() => setCurrentScreen("progress")}
        onHome={() => setCurrentScreen("profile")}
        onForum={() => setCurrentScreen("forum")}
      />
    </div>
  );

  const PersonalDataScreen = () => (
    <div className="flex-1 bg-background">
      <TopBar title="Datos Personales" showBack onBack={() => setCurrentScreen("profile")} />

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

      <BottomNav
        onProgress={() => setCurrentScreen("progress")}
        onHome={() => setCurrentScreen("profile")}
        onForum={() => setCurrentScreen("forum")}
      />
    </div>
  );

  const screens = {
    profile: <ProfileScreen />,
    settings: <SettingsScreen />,
    "personal-data": <PersonalDataScreen />,
    progress: (
      <ProgressScreen
        onBack={() => setCurrentScreen("profile")}
        onSettings={() => setCurrentScreen("settings")}
        onHome={() => setCurrentScreen("profile")}
        onForum={() => setCurrentScreen("forum")}
      />
    ),
    forum: (
      <ForumScreen
        onBack={() => setCurrentScreen("profile")}
        onSettings={() => setCurrentScreen("settings")}
        onHome={() => setCurrentScreen("profile")}
        onProgress={() => setCurrentScreen("progress")}
      />
    ),
  } as const;

  return <div className="max-w-sm mx-auto bg-background min-h-screen flex flex-col">{screens[currentScreen]}</div>;
}
