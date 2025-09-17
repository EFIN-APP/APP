import LearningMap from "@/components/learning-map"

const temas = [
  {
    id: 1,
    titulo: "Time Value of Money",
    estado: "completado" as const,
    descripcion:
      "Learn the fundamental concept that money available today is worth more than the same amount in the future. Master present value, future value calculations, and compound interest.",
    duracion: "2 hours",
    puntos: 150,
    nivel: "Beginner" as const,
  },
  {
    id: 2,
    titulo: "Interest Rates",
    estado: "completado" as const,
    descripcion:
      "Understand how interest rates work, different types of rates, and their impact on investments and loans. Explore nominal vs real rates and yield curves.",
    duracion: "1.5 hours",
    puntos: 120,
    nivel: "Beginner" as const,
  },
  {
    id: 3,
    titulo: "Risk & Return",
    estado: "progreso" as const,
    descripcion:
      "Explore the relationship between risk and return in investments. Learn about different types of risk, risk measurement techniques, and risk-return trade-offs.",
    duracion: "3 hours",
    puntos: 200,
    nivel: "Intermediate" as const,
  },
  {
    id: 4,
    titulo: "Stock Valuation",
    estado: "bloqueado" as const,
    descripcion:
      "Master various methods to value stocks including dividend discount models, P/E ratios, and discounted cash flow analysis. Learn to analyze company fundamentals.",
    duracion: "4 hours",
    puntos: 250,
    nivel: "Intermediate" as const,
  },
  {
    id: 5,
    titulo: "Bonds",
    estado: "bloqueado" as const,
    descripcion:
      "Understand bond pricing, yield calculations, duration, and convexity. Learn about different types of bonds and their role in investment portfolios.",
    duracion: "3.5 hours",
    puntos: 220,
    nivel: "Intermediate" as const,
  },
  {
    id: 6,
    titulo: "Derivatives",
    estado: "bloqueado" as const,
    descripcion:
      "Dive into options, futures, and swaps. Learn pricing models, hedging strategies, and how derivatives are used for risk management and speculation.",
    duracion: "5 hours",
    puntos: 300,
    nivel: "Advanced" as const,
  },
  {
    id: 7,
    titulo: "Portfolio Theory",
    estado: "bloqueado" as const,
    descripcion:
      "Study modern portfolio theory, diversification benefits, efficient frontier, and asset allocation strategies. Learn to optimize risk-return profiles.",
    duracion: "4.5 hours",
    puntos: 280,
    nivel: "Advanced" as const,
  },
  {
    id: 8,
    titulo: "Taxation",
    estado: "bloqueado" as const,
    descripcion:
      "Understand tax implications of different investment strategies, tax-advantaged accounts, and how to optimize after-tax returns in your portfolio.",
    duracion: "2.5 hours",
    puntos: 180,
    nivel: "Intermediate" as const,
  },
  {
    id: 9,
    titulo: "Financial Planning",
    estado: "bloqueado" as const,
    descripcion:
      "Learn comprehensive financial planning strategies including budgeting, retirement planning, insurance needs, and estate planning fundamentals.",
    duracion: "3 hours",
    puntos: 200,
    nivel: "Intermediate" as const,
  },
  {
    id: 10,
    titulo: "Corporate Finance",
    estado: "bloqueado" as const,
    descripcion:
      "Explore capital structure decisions, cost of capital, dividend policy, and corporate valuation techniques used in business finance.",
    duracion: "4 hours",
    puntos: 260,
    nivel: "Advanced" as const,
  },
  {
    id: 11,
    titulo: "International Finance",
    estado: "bloqueado" as const,
    descripcion:
      "Study foreign exchange markets, currency risk management, international investment strategies, and global financial markets.",
    duracion: "3.5 hours",
    puntos: 240,
    nivel: "Advanced" as const,
  },
  {
    id: 12,
    titulo: "Behavioral Finance",
    estado: "bloqueado" as const,
    descripcion:
      "Understand psychological factors affecting financial decisions, market anomalies, and how emotions impact investment behavior.",
    duracion: "2.5 hours",
    puntos: 190,
    nivel: "Intermediate" as const,
  },
  {
    id: 13,
    titulo: "Alternative Investments",
    estado: "bloqueado" as const,
    descripcion:
      "Explore real estate, commodities, hedge funds, private equity, and cryptocurrency investments as portfolio diversification tools.",
    duracion: "4 hours",
    puntos: 270,
    nivel: "Advanced" as const,
  },
  {
    id: 14,
    titulo: "Financial Technology",
    estado: "bloqueado" as const,
    descripcion:
      "Learn about fintech innovations, robo-advisors, blockchain applications in finance, and digital payment systems.",
    duracion: "3 hours",
    puntos: 210,
    nivel: "Intermediate" as const,
  },
  {
    id: 15,
    titulo: "Risk Management",
    estado: "bloqueado" as const,
    descripcion:
      "Master advanced risk management techniques, stress testing, Value at Risk (VaR), and regulatory compliance in financial institutions.",
    duracion: "5 hours",
    puntos: 320,
    nivel: "Advanced" as const,
  },
]

export default function Home() {
  return <LearningMap temas={temas} />
}
