import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { courses, posts } from "@/lib/data"

const features = [
  {
    title: "Planes personalizados",
    description:
      "Diseñamos rutas de aprendizaje que se adaptan a tus objetivos y ritmo para que avances con claridad.",
    icon: Sparkles,
  },
  {
    title: "Seguimiento inteligente",
    description:
      "Visualiza tu progreso financiero en tiempo real y recibe recomendaciones para impulsar tus resultados.",
    icon: TrendingUp,
  },
  {
    title: "Seguridad garantizada",
    description:
      "Protegemos tus datos con tecnología de primer nivel para que solo te enfoques en aprender.",
    icon: ShieldCheck,
  },
]

const stats = [
  { value: "12K+", label: "Personas aprendiendo cada mes" },
  { value: "86%", label: "Completa su primer curso" },
  { value: "4.8/5", label: "Satisfacción promedio" },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-muted/40">
      <section className="bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:items-center md:py-20">
          <div className="flex-1 space-y-6">
            <Badge variant="outline" className="border-primary-foreground/40 bg-primary/60 text-primary-foreground">
              Tu evolución financiera comienza aquí
            </Badge>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Construí hábitos financieros sanos con acompañamiento en cada paso
            </h1>
            <p className="text-primary-foreground/80 text-lg">
              Aprende a gestionar tu dinero con contenidos accionables, desafíos semanales y una comunidad que te impulsa a
              seguir. Cuando estés listo, continuá tu experiencia desde tu panel personal.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/profile" className="gap-2">
                  Ir a mi perfil
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="#features" className="gap-2">
                  Explorar contenidos
                </Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 text-primary-foreground/80">
              {stats.map((stat) => (
                <div key={stat.label} className="min-w-[140px]">
                  <p className="text-3xl font-semibold">{stat.value}</p>
                  <p className="text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <Card className="border-0 bg-primary-foreground/10 text-left text-primary-foreground backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl">Tu resumen del día</CardTitle>
                <CardDescription className="text-primary-foreground/70">
                  Descubrí lo que está sucediendo en tu comunidad y retoma tu progreso cuando quieras.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {posts.slice(0, 2).map((post) => (
                  <div key={post.id} className="flex items-start gap-4">
                    <Image
                      src={post.avatar}
                      alt={`Avatar de ${post.user}`}
                      width={48}
                      height={48}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{post.user}</p>
                      <p className="text-sm text-primary-foreground/80">{post.content}</p>
                      <div className="text-xs text-primary-foreground/70">
                        {post.likes} me gusta · {post.comments} comentarios
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <Link href="/profile?tab=social" className="gap-2">
                    Ver comunidad
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl space-y-12 px-6 py-16">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-semibold">Todo lo que necesitás para avanzar</h2>
          <p className="text-muted-foreground text-lg">
            Herramientas diseñadas para que aprendas, practiques y veas resultados tangibles en tus finanzas.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="h-full border-border/60 bg-background">
              <CardHeader className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-background/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 lg:flex-row">
          <Card className="flex-1 border-border/60">
            <CardHeader>
              <CardTitle className="text-2xl">Tu progreso actual</CardTitle>
              <CardDescription>
                Retomá tus cursos desde donde los dejaste y desbloqueá nuevas insignias en tu perfil.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{course.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {course.completedLessons} de {course.totalLessons} lecciones completadas · {course.timeLeft}
                    </p>
                  </div>
                  <div className="flex w-full flex-col gap-2 sm:w-48">
                    <Badge variant="secondary" className="self-start">
                      {course.badge}
                    </Badge>
                    <Progress value={course.progress} />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/profile" className="gap-2">
                  Abrir mi panel
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex-1 border-border/60">
            <CardHeader>
              <CardTitle className="text-2xl">Lo último de la comunidad</CardTitle>
              <CardDescription>
                Inspirate con historias reales y celebrá tus logros junto a otras personas de la comunidad Efin.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-xl bg-muted p-6">
                <p className="text-lg font-semibold">+280 nuevos planes personalizados esta semana</p>
                <p className="mt-2 text-muted-foreground text-sm">
                  La comunidad está enfocada en mejorar sus ahorros y crear hábitos saludables. Unite a los desafíos desde tu perfil.
                </p>
              </div>
              <div className="rounded-xl bg-muted p-6">
                <p className="text-lg font-semibold">Eventos en vivo todos los jueves</p>
                <p className="mt-2 text-muted-foreground text-sm">
                  Participá de sesiones con especialistas en inversiones, presupuesto y planificación financiera.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="gap-2">
                <Link href="/profile?tab=timeline" className="gap-2">
                  Ver agenda completa
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  )
}
