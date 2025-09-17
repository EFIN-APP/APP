export interface FintokClip {
  id: string
  title: string
  description: string
  creator: string
  role: string
  avatar: string
  videoUrl: string
  likes: number
  comments: number
  shares: number
  tags: string[]
}

export const fintokClips: FintokClip[] = [
  {
    id: "clip-1",
    title: "¿Qué es el interés compuesto?",
    description:
      "Imagina que tu dinero trabaja por ti todos los días. Así es como el interés compuesto acelera tu ahorro.",
    creator: "Sofi Inversiones",
    role: "Educadora financiera",
    avatar: "/finance-expert.png",
    videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
    likes: 1280,
    comments: 86,
    shares: 42,
    tags: ["InteresCompuesto", "Ahorro", "FinanzasPersonales"],
  },
  {
    id: "clip-2",
    title: "Gasto hormiga vs. presupuesto",
    description:
      "Un truco rápido para detectar tus gastos invisibles y redirigirlos a tus objetivos de inversión.",
    creator: "Lucas Advisor",
    role: "Coach financiero",
    avatar: "/student-learning.png",
    videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Sailing.mp4",
    likes: 940,
    comments: 64,
    shares: 33,
    tags: ["Budgeting", "GastoHormiga", "Tips"],
  },
  {
    id: "clip-3",
    title: "Cripto en 60 segundos",
    description:
      "Tres conceptos clave antes de comprar tu primera criptomoneda. No olvides tu fondo de emergencia.",
    creator: "CryptoVale",
    role: "Analista",
    avatar: "/teacher-professional.png",
    videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker_Sunset.mp4",
    likes: 1575,
    comments: 132,
    shares: 71,
    tags: ["Cripto", "Inversiones", "Riesgo"],
  },
  {
    id: "clip-4",
    title: "Simulá tus metas",
    description:
      "Usá nuestro simulador para proyectar cuánto necesitás ahorrar cada mes y alcanzar tus objetivos.",
    creator: "Equipo EFIN",
    role: "Producto",
    avatar: "/placeholder-user.jpg",
    videoUrl: "https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4",
    likes: 680,
    comments: 41,
    shares: 18,
    tags: ["Metas", "Simulador", "Planificacion"],
  },
]
