// Juego "¿Cuál rinde más?" - Decisiones rápidas con feedback inmediato
// Importa funciones del simulador para mantener consistencia

import computeSimulation, { type SimInputs } from "./simulator_compound_inflation"

export type Option = {
  id: string
  descripcion: string
  tna: number
  capitalizaciones: number
  comisionAnualPct: number
  inflacionMensualEsperada: number
  horizonteMeses: number
  aporteMensual: number
  montoInicial: number
}

export type Round = {
  id: string
  opciones: Option[]
  correcta: string
  explicacion: string
}

export type GameOutcome = {
  rounds: Round[]
  score: number
  aciertos: number
  tiempoTotalSeg: number
}

// Calcula rendimiento real esperado de una opción
function calcularRendimientoReal(option: Option): number {
  const inputs: SimInputs = {
    montoInicial: option.montoInicial,
    aporteMensual: option.aporteMensual,
    tasaNominalAnual: option.tna,
    capitalizacionesPorAnio: option.capitalizaciones,
    inflacionMensualSerie: Array(option.horizonteMeses).fill(option.inflacionMensualEsperada),
    comisionAnualPct: option.comisionAnualPct,
    meses: option.horizonteMeses,
    modoTasa: "TNA",
  }

  try {
    const resultado = computeSimulation(inputs)
    return resultado.resumen.rendimientoRealPct
  } catch {
    return -100 // Penalizar opciones inválidas
  }
}

// Genera una ronda del juego con seed para reproducibilidad
export function generateRound(seed?: number): Round {
  // Simple PRNG para reproducibilidad
  let rng = seed || Math.floor(Math.random() * 1000000)
  const random = () => {
    rng = (rng * 9301 + 49297) % 233280
    return rng / 233280
  }

  const roundTemplates = [
    // Ronda 1: TNA vs TEA básico
    {
      id: "r1_tna_vs_tea",
      opciones: [
        {
          id: "opt1",
          descripcion: "Plazo fijo TNA 50% anual",
          tna: 50,
          capitalizaciones: 1,
          comisionAnualPct: 0,
          inflacionMensualEsperada: 3,
          horizonteMeses: 12,
          aporteMensual: 0,
          montoInicial: 100000,
        },
        {
          id: "opt2",
          descripcion: "Fondo TNA 48% capitalización mensual",
          tna: 48,
          capitalizaciones: 12,
          comisionAnualPct: 0,
          inflacionMensualEsperada: 3,
          horizonteMeses: 12,
          aporteMensual: 0,
          montoInicial: 100000,
        },
      ],
    },
    // Ronda 2: Impacto de comisiones
    {
      id: "r2_comisiones",
      opciones: [
        {
          id: "opt1",
          descripcion: "Fondo A: TNA 65%, comisión 0.5%",
          tna: 65,
          capitalizaciones: 12,
          comisionAnualPct: 0.5,
          inflacionMensualEsperada: 4,
          horizonteMeses: 12,
          aporteMensual: 0,
          montoInicial: 100000,
        },
        {
          id: "opt2",
          descripcion: "Fondo B: TNA 60%, comisión 0%",
          tna: 60,
          capitalizaciones: 12,
          comisionAnualPct: 0,
          inflacionMensualEsperada: 4,
          horizonteMeses: 12,
          aporteMensual: 0,
          montoInicial: 100000,
        },
      ],
    },
    // Ronda 3: Aportes regulares
    {
      id: "r3_aportes",
      opciones: [
        {
          id: "opt1",
          descripcion: "Inversión inicial $200k, TNA 55%",
          tna: 55,
          capitalizaciones: 12,
          comisionAnualPct: 1,
          inflacionMensualEsperada: 4,
          horizonteMeses: 6,
          aporteMensual: 0,
          montoInicial: 200000,
        },
        {
          id: "opt2",
          descripcion: "Inicial $100k + $15k/mes, TNA 50%",
          tna: 50,
          capitalizaciones: 12,
          comisionAnualPct: 1,
          inflacionMensualEsperada: 4,
          horizonteMeses: 6,
          aporteMensual: 15000,
          montoInicial: 100000,
        },
      ],
    },
    // Ronda 4: Diferentes horizontes
    {
      id: "r4_horizontes",
      opciones: [
        {
          id: "opt1",
          descripcion: "Corto plazo: TNA 70%, 3 meses",
          tna: 70,
          capitalizaciones: 12,
          comisionAnualPct: 0.5,
          inflacionMensualEsperada: 6,
          horizonteMeses: 3,
          aporteMensual: 0,
          montoInicial: 100000,
        },
        {
          id: "opt2",
          descripcion: "Largo plazo: TNA 45%, 18 meses",
          tna: 45,
          capitalizaciones: 12,
          comisionAnualPct: 0.5,
          inflacionMensualEsperada: 3,
          horizonteMeses: 18,
          aporteMensual: 0,
          montoInicial: 100000,
        },
      ],
    },
    // Ronda 5: Escenario complejo
    {
      id: "r5_complejo",
      opciones: [
        {
          id: "opt1",
          descripcion: "Conservador: TNA 40%, sin comisión",
          tna: 40,
          capitalizaciones: 12,
          comisionAnualPct: 0,
          inflacionMensualEsperada: 5,
          horizonteMeses: 12,
          aporteMensual: 5000,
          montoInicial: 50000,
        },
        {
          id: "opt2",
          descripcion: "Agresivo: TNA 85%, comisión 2%",
          tna: 85,
          capitalizaciones: 12,
          comisionAnualPct: 2,
          inflacionMensualEsperada: 5,
          horizonteMeses: 12,
          aporteMensual: 5000,
          montoInicial: 50000,
        },
      ],
    },
  ]

  const templateIndex = Math.floor(random() * roundTemplates.length)
  const template = roundTemplates[templateIndex]

  // Calcular rendimientos reales y determinar ganador
  const opcionesConRendimiento = template.opciones.map((opt) => ({
    ...opt,
    rendimientoReal: calcularRendimientoReal(opt),
  }))

  const mejorOpcion = opcionesConRendimiento.reduce((mejor, actual) =>
    actual.rendimientoReal > mejor.rendimientoReal ? actual : mejor,
  )

  const explicacion =
    `La opción correcta rinde ${mejorOpcion.rendimientoReal.toFixed(1)}% real. ` +
    `Factores clave: ${mejorOpcion.capitalizaciones > 1 ? "capitalización frecuente, " : ""}` +
    `${mejorOpcion.comisionAnualPct === 0 ? "sin comisiones, " : `comisión ${mejorOpcion.comisionAnualPct}%, `}` +
    `TNA ${mejorOpcion.tna}%.`

  return {
    id: template.id,
    opciones: template.opciones,
    correcta: mejorOpcion.id,
    explicacion,
  }
}

// Plantillas de rondas predefinidas para consistencia
export function getRoundTemplates(): Round[] {
  return [
    generateRound(12345), // Semillas fijas para reproducibilidad
    generateRound(67890),
    generateRound(11111),
    generateRound(22222),
    generateRound(33333),
  ]
}

// Motor principal del juego
export class GameEngine {
  private rounds: Round[] = []
  private currentRound = 0
  private aciertos = 0
  private tiempoInicio = 0

  iniciarJuego(seed?: number): Round[] {
    this.rounds = getRoundTemplates()
    this.currentRound = 0
    this.aciertos = 0
    this.tiempoInicio = Date.now()
    return this.rounds
  }

  responderRonda(roundId: string, opcionElegida: string): { correcto: boolean; explicacion: string } {
    const round = this.rounds.find((r) => r.id === roundId)
    if (!round) throw new Error("Ronda no encontrada")

    const correcto = opcionElegida === round.correcta
    if (correcto) this.aciertos++

    return {
      correcto,
      explicacion: round.explicacion,
    }
  }

  finalizarJuego(): GameOutcome {
    const tiempoTotalSeg = Math.round((Date.now() - this.tiempoInicio) / 1000)
    const score = Math.round((this.aciertos / this.rounds.length) * 100 + Math.max(0, 100 - tiempoTotalSeg)) // Bonus por velocidad

    return {
      rounds: this.rounds,
      score,
      aciertos: this.aciertos,
      tiempoTotalSeg,
    }
  }
}

export default GameEngine
