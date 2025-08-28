export interface Post {
  id: number;
  user: string;
  username: string;
  time: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  avatar: string;
}

export const posts: Post[] = [
  {
    id: 1,
    user: "Santiago Carrasco",
    username: "@santicarrasco",
    time: "2h",
    content: "Acabo de completar mi primera lección sobre presupuestos. ¡Me siento más confiado con mis finanzas!",
    tags: ["#presupuesto", "#finanzas"],
    likes: 12,
    comments: 3,
    avatar: "/diverse-user-avatars.png",
  },
  {
    id: 2,
    user: "Delfina Palmero",
    username: "@delfinapalmero",
    time: "4h",
    content: "Compartiendo mi progreso del curso de inversiones. Ya voy por el 60% completado.",
    tags: ["#inversiones", "#progreso"],
    likes: 8,
    comments: 1,
    avatar: "/female-user-avatar.png",
  },
  {
    id: 3,
    user: "Juana Mora",
    username: "@juanamora",
    time: "6h",
    content: "¿Alguien más está tomando el curso de criptomonedas? Me gustaría formar un grupo de estudio.",
    tags: ["#crypto", "#estudio"],
    likes: 15,
    comments: 7,
    avatar: "/professional-woman-avatar.png",
  },
];

export interface Course {
  id: number;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  timeLeft: string;
  badge: string;
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Fundamentos de Finanzas",
    progress: 75,
    totalLessons: 12,
    completedLessons: 9,
    timeLeft: "2h 30min",
    badge: "En progreso",
  },
  {
    id: 2,
    title: "Inversiones para Principiantes",
    progress: 40,
    totalLessons: 15,
    completedLessons: 6,
    timeLeft: "4h 15min",
    badge: "En progreso",
  },
  {
    id: 3,
    title: "Presupuesto Personal",
    progress: 100,
    totalLessons: 8,
    completedLessons: 8,
    timeLeft: "Completado",
    badge: "Completado",
  },
];
