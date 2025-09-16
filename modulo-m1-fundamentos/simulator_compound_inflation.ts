// Simulador de interés compuesto con inflación y shocks
// Funciones puras para cálculos financieros en contexto argentino

export type SimInputs = {
  montoInicial: number // ARS
  aporteMensual: number // ARS
  tasaNominalAnual: number // % TNA
  capitalizacionesPorAnio: number // ej. 12 para mensual
  inflacionMensualSerie: number[] // % mensual, puede incluir shocks
  comisionAnualPct: number // % sobre patrimonio
  meses: number // horizonte
  modoTasa: "TNA" | "TEA" // interpretar entrada
  semilla?: number // para reproducibilidad
}

export type SimResult = {
  patrimonioNominalSerie: number[]
  patrimonioRealSerie: number[]
  inflacionAcumSerie: number[]
  aportesAcumSerie: number[]
  rendRealAcumPct: number
  resumen: {
    montoFinalNominal: number
    montoFinalReal: number
    comisionesPagadas: number
    rendimientoNominalPct: number
    rendimientoRealPct: number
  }
}

// Validación de inputs
export function validateInputs(inputs: SimInputs): string[] {
  const errores: string[] = []

  if (inputs.montoInicial < 0) errores.push("Monto inicial no puede ser negativo")
  if (inputs.aporteMensual < 0) errores.push("Aporte mensual no puede ser negativo")
  if (inputs.tasaNominalAnual < 0) errores.push("Tasa no puede ser negativa")
  if (inputs.capitalizacionesPorAnio <= 0) errores.push("Capitalizaciones por año debe ser positivo")
  if (inputs.comisionAnualPct < 0) errores.push("Comisión no puede ser negativa")
  if (inputs.meses <= 0) errores.push("Meses debe ser positivo")
  if (inputs.inflacionMensualSerie.length !== inputs.meses) {
    errores.push("Serie de inflación debe tener la misma longitud que meses")
  }

  return errores
}

// Conversión TNA a TEA
function tnaToTea(tna: number, capitalizaciones: number): number {
  return Math.pow(1 + tna / 100 / capitalizaciones, capitalizaciones) - 1
}

// Conversión TEA a tasa mensual efectiva
function teaToMensual(tea: number): number {
  return Math.pow(1 + tea, 1 / 12) - 1
}

// Cálculo de serie real aplicando deflactor de inflación
export function toRealSeries(nominalSerie: number[], inflacionMensualSerie: number[]): number[] {
  const realSerie: number[] = []
  let deflactorAcum = 1

  for (let i = 0; i < nominalSerie.length; i++) {
    if (i > 0) {
      deflactorAcum *= 1 + inflacionMensualSerie[i] / 100
    }
    realSerie.push(nominalSerie[i] / deflactorAcum)
  }

  return realSerie.map((val) => Math.round(val * 100) / 100)
}

// Función principal de simulación
export default function computeSimulation(inputs: SimInputs): SimResult {
  const errores = validateInputs(inputs)
  if (errores.length > 0) {
    throw new Error(`Errores de validación: ${errores.join(", ")}`)
  }

  // Conversión de tasa según modo
  let tasaEfectivaAnual: number
  if (inputs.modoTasa === "TNA") {
    tasaEfectivaAnual = tnaToTea(inputs.tasaNominalAnual, inputs.capitalizacionesPorAnio)
  } else {
    tasaEfectivaAnual = inputs.tasaNominalAnual / 100
  }

  const tasaMensual = teaToMensual(tasaEfectivaAnual)
  const comisionMensual = inputs.comisionAnualPct / 100 / 12

  // Series de resultados
  const patrimonioNominalSerie: number[] = []
  const aportesAcumSerie: number[] = []
  const inflacionAcumSerie: number[] = []

  let patrimonio = inputs.montoInicial
  let aportesAcum = inputs.montoInicial
  let inflacionAcum = 1
  let comisionesPagadas = 0

  // Simulación mes a mes
  for (let mes = 0; mes < inputs.meses; mes++) {
    // Agregar aporte mensual (excepto mes 0)
    if (mes > 0) {
      patrimonio += inputs.aporteMensual
      aportesAcum += inputs.aporteMensual
    }

    // Aplicar rendimiento mensual
    patrimonio *= 1 + tasaMensual

    // Aplicar comisión mensual
    const comisionMes = patrimonio * comisionMensual
    patrimonio -= comisionMes
    comisionesPagadas += comisionMes

    // Actualizar inflación acumulada
    if (mes > 0) {
      inflacionAcum *= 1 + inputs.inflacionMensualSerie[mes] / 100
    }

    // Guardar valores del mes
    patrimonioNominalSerie.push(Math.round(patrimonio * 100) / 100)
    aportesAcumSerie.push(aportesAcum)
    inflacionAcumSerie.push(Math.round((inflacionAcum - 1) * 10000) / 100) // % con 2 decimales
  }

  // Calcular serie real
  const patrimonioRealSerie = toRealSeries(patrimonioNominalSerie, inputs.inflacionMensualSerie)

  // Cálculos finales
  const montoFinalNominal = patrimonioNominalSerie[patrimonioNominalSerie.length - 1]
  const montoFinalReal = patrimonioRealSerie[patrimonioRealSerie.length - 1]
  const rendimientoNominalPct = Math.round((montoFinalNominal / aportesAcum - 1) * 100 * 100) / 100
  const rendimientoRealPct = Math.round((montoFinalReal / inputs.montoInicial - 1) * 100 * 100) / 100
  const rendRealAcumPct = rendimientoRealPct

  return {
    patrimonioNominalSerie,
    patrimonioRealSerie,
    inflacionAcumSerie,
    aportesAcumSerie,
    rendRealAcumPct,
    resumen: {
      montoFinalNominal: Math.round(montoFinalNominal * 100) / 100,
      montoFinalReal: Math.round(montoFinalReal * 100) / 100,
      comisionesPagadas: Math.round(comisionesPagadas * 100) / 100,
      rendimientoNominalPct,
      rendimientoRealPct,
    },
  }
}

// Presets de ejemplo para diferentes escenarios
export function examplePreset(): { [key: string]: Partial<SimInputs> } {
  return {
    baja_inflacion: {
      montoInicial: 100000,
      aporteMensual: 10000,
      tasaNominalAnual: 45,
      capitalizacionesPorAnio: 12,
      inflacionMensualSerie: Array(12).fill(2), // 2% mensual = ~27% anual
      comisionAnualPct: 1,
      meses: 12,
      modoTasa: "TNA",
    },
    media_inflacion: {
      montoInicial: 100000,
      aporteMensual: 10000,
      tasaNominalAnual: 80,
      capitalizacionesPorAnio: 12,
      inflacionMensualSerie: Array(12).fill(5), // 5% mensual = ~80% anual
      comisionAnualPct: 1.5,
      meses: 12,
      modoTasa: "TNA",
    },
    alta_inflacion_con_shock: {
      montoInicial: 100000,
      aporteMensual: 15000,
      tasaNominalAnual: 120,
      capitalizacionesPorAnio: 12,
      inflacionMensualSerie: [8, 9, 7, 15, 12, 8, 9, 20, 10, 8, 9, 11], // shock en meses 4 y 8
      comisionAnualPct: 2,
      meses: 12,
      modoTasa: "TNA",
    },
  }
}
