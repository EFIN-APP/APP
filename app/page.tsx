import Link from "next/link"
import { ArrowRight, BarChart3, BookOpenCheck, CalendarCheck2, CheckCircle2, Sparkles, Target, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const stats = [
  {
    value: "+1.2k",
    label: "Metas personalizadas creadas cada mes",
  },
  {
    value: "87%",
    label: "Usuarios que completan su primer plan en 4 semanas",
  },
  {
    value: "24/7",
    label: "Acompañamiento inteligente con recordatorios",
  },
]

const focusAreas = [
  {
    title: "Planificación personalizada",
    description:
      "Creamos rutas de aprendizaje de acuerdo a tus objetivos y ritmo para que avances con claridad.",
    icon: Target,
  },
  {
    title: "Seguimiento en tiempo real",
    description:
      "Recibe recomendaciones para mantenerte enfocado y medir tu progreso con indicadores claves.",
    icon: BarChart3,
  },
  {
    title: "Recordatorios inteligentes",
    description:
      "Tus tareas y recordatorios llegan justo a tiempo para que no se te escape ninguna actividad importante.",
    icon: CalendarCheck2,
  },
]

const profileHighlights = [
  {
    title: "Tu perfil como hub central",
    description:
      "Accedé a tus cursos activos, publicaciones, insignias y comunidad desde un mismo lugar.",
    icon: Users,
  },
  {
    title: "Aprendizaje guiado",
    description:
      "Los módulos interactivos combinan lecciones, quizzes y simuladores para consolidar tu conocimiento financiero.",
    icon: BookOpenCheck,
  },
  {
    title: "Logros visibles",
    description:
      "Cada avance se refleja con nuevas medallas y estadísticas que te motivan a seguir.",
    icon: CheckCircle2,
  },
]

const steps = [
  {
    title: "1. Creá tu perfil",
    description: "Completa tu perfil para que podamos recomendarte el recorrido ideal.",
  },
  {
    title: "2. Define tus metas",
    description:
      "Elige los temas que querés dominar y recibí un plan que se adapta a tu tiempo disponible.",
  },
  {
    title: "3. Seguimiento diario",
    description:
      "Usá los recordatorios y el feed social para mantenerte enfocado y compartir tus avances.",
  },
]

export default function HomePage() {
  return (
    <main className="bg-gradient-to-b from-efin-light-gray via-white to-white text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-16 sm:py-24">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <Badge className="bg-efin-blue text-white">
              Tu ruta inteligente hacia la educación financiera
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-efin-navy sm:text-5xl">
              Organizá tus finanzas con un plan hecho a tu medida
            </h1>
            <p className="text-lg text-muted-foreground">
              EFIN te acompaña con un home lleno de recursos y un perfil dinámico donde podés gestionar
              cursos, comunidad e hitos. Todo conectado para que sientas tu progreso día a día.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="bg-efin-blue text-white hover:bg-efin-blue/90">
                <Link href="/profile">
                  Ir a mi perfil
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-efin-navy">
                <Link href="#como-funciona">Ver cómo funciona</Link>
              </Button>
            </div>
          </div>
          <Card className="border-efin-blue/30 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-efin-navy">
                <Sparkles className="h-5 w-5 text-efin-blue" aria-hidden="true" />
                Progreso destacado
              </CardTitle>
              <CardDescription>
                Así se ve tu evolución desde el home de EFIN: objetivos claros, próximas tareas y comunidad al alcance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-xl bg-efin-blue/10 p-6 text-sm text-efin-navy">
                <p className="font-semibold">Próxima lección</p>
                <p className="mt-1 text-muted-foreground">
                  Introducción a inversiones responsables
                </p>
                <div className="mt-4 flex items-center gap-3 text-sm">
                  <div className="h-2 flex-1 rounded-full bg-efin-blue/20">
                    <div className="h-2 w-2/3 rounded-full bg-efin-blue" />
                  </div>
                  <span className="font-semibold text-efin-blue">67%</span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-lg border border-efin-blue/20 p-4">
                    <p className="text-2xl font-bold text-efin-navy">{item.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 rounded-3xl bg-white/80 p-10 shadow-sm" id="como-funciona">
          <div className="flex flex-col gap-4 text-center">
            <Badge variant="secondary" className="mx-auto bg-efin-blue/10 text-efin-blue">
              Todo empieza con tus objetivos
            </Badge>
            <h2 className="text-3xl font-semibold text-efin-navy">
              Diseñamos planes de acción que realmente podés cumplir
            </h2>
            <p className="text-muted-foreground">
              Desde el home accedés a tus cursos activos, el feed comunitario y recomendaciones. En el perfil
              administrás tu progreso con tabs, badges y ajustes.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {focusAreas.map((area) => (
              <Card key={area.title} className="h-full border-efin-blue/20">
                <CardHeader>
                  <area.icon className="h-6 w-6 text-efin-blue" aria-hidden="true" />
                  <CardTitle className="text-xl text-efin-navy">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="bg-efin-blue/10 text-efin-blue">
              Perfil conectado al home
            </Badge>
            <h2 className="text-3xl font-semibold text-efin-navy">
              Tu perfil concentra toda la información clave
            </h2>
            <p className="text-muted-foreground">
              Cambiá de pestañas para revisar tu progreso, repasá el feed con tus últimas interacciones y vuelve al home con un solo toque.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {profileHighlights.map((highlight) => (
                <Card key={highlight.title} className="border-efin-blue/20">
                  <CardHeader className="gap-3">
                    <highlight.icon className="h-6 w-6 text-efin-blue" aria-hidden="true" />
                    <CardTitle className="text-lg text-efin-navy">{highlight.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <Card className="border-efin-blue/30 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-efin-navy">
                <Sparkles className="h-5 w-5 text-efin-blue" aria-hidden="true" />
                Cómo empezar
              </CardTitle>
              <CardDescription>
                Tres pasos para aprovechar al máximo tu nueva experiencia integrada.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {steps.map((step) => (
                <div key={step.title} className="rounded-xl border border-dashed border-efin-blue/30 p-4">
                  <h3 className="font-semibold text-efin-navy">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="rounded-3xl bg-efin-blue px-8 py-12 text-white">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="text-balance text-3xl font-semibold sm:text-4xl">
              Estás a un clic de ver tu nuevo perfil en acción
            </h2>
            <p className="text-lg text-efin-light-gray/90">
              Hacé el merge con tranquilidad: el home y el perfil ahora comparten la misma base visual y de navegación.
            </p>
            <Button asChild size="lg" className="bg-white text-efin-blue hover:bg-white/90">
              <Link href="/profile">
                Ir al perfil integrado
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}
