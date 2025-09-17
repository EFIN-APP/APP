"use client"

import { useState, useEffect } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { Alert, AlertDescription } from "./ui/alert"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Calculator, TrendingUp, Info, ToggleLeft, ToggleRight } from "lucide-react"

interface ChartDataPoint {
  period: number
  value: number
  interest: number
}

export function TVMSimulator() {
  const [presentValue, setPresentValue] = useState<string>("1000")
  const [interestRate, setInterestRate] = useState<string>("5")
  const [periods, setPeriods] = useState<string>("10")
  const [isMonthly, setIsMonthly] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [showExplanation, setShowExplanation] = useState(false)

  const validateInputs = (): string[] => {
    const validationErrors: string[] = []

    const pv = Number.parseFloat(presentValue)
    const rate = Number.parseFloat(interestRate)
    const n = Number.parseFloat(periods)

    if (isNaN(pv) || pv <= 0) {
      validationErrors.push("Present value must be a positive number")
    }
    if (isNaN(rate) || rate < 0) {
      validationErrors.push("Interest rate must be a non-negative number")
    }
    if (isNaN(n) || n <= 0 || !Number.isInteger(n)) {
      validationErrors.push("Number of periods must be a positive whole number")
    }
    if (rate > 100) {
      validationErrors.push("Interest rate seems unusually high (>100%)")
    }

    return validationErrors
  }

  const calculateTVM = () => {
    const validationErrors = validateInputs()
    setErrors(validationErrors)

    if (validationErrors.length > 0) {
      setResult(null)
      setChartData([])
      return
    }

    const pv = Number.parseFloat(presentValue)
    const annualRate = Number.parseFloat(interestRate) / 100
    const n = Number.parseInt(periods)

    // Adjust for monthly vs annual compounding
    const rate = isMonthly ? annualRate / 12 : annualRate
    const totalPeriods = isMonthly ? n * 12 : n

    // Calculate future value: FV = PV × (1 + r)^n
    const futureValue = pv * Math.pow(1 + rate, totalPeriods)
    setResult(futureValue)

    // Generate chart data
    const data: ChartDataPoint[] = []
    const displayPeriods = Math.min(totalPeriods, 50) // Limit chart points for performance
    const step = totalPeriods / displayPeriods

    for (let i = 0; i <= displayPeriods; i++) {
      const currentPeriod = Math.floor(i * step)
      const currentValue = pv * Math.pow(1 + rate, currentPeriod)
      const interestEarned = currentValue - pv

      data.push({
        period: isMonthly ? Math.floor(currentPeriod / 12) : currentPeriod,
        value: currentValue,
        interest: interestEarned,
      })
    }

    setChartData(data)
  }

  // Auto-calculate when inputs change (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (presentValue && interestRate && periods) {
        calculateTVM()
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [presentValue, interestRate, periods, isMonthly])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <Card className="p-3 bg-white shadow-lg border">
          <p className="text-sm font-medium text-efin-navy">
            {isMonthly ? "Year" : "Period"} {label}
          </p>
          <p className="text-sm text-efin-blue">
            Value:{" "}
            <span className="font-semibold">${data.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </p>
          <p className="text-sm text-green-600">
            Interest:{" "}
            <span className="font-semibold">
              ${data.interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </p>
        </Card>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-efin-blue rounded-full flex items-center justify-center">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Time Value of Money Calculator</h3>
            <p className="text-efin-turquoise text-sm">See how your money grows over time</p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="presentValue" className="text-white text-sm font-medium">
              Present Value ($)
            </Label>
            <Input
              id="presentValue"
              type="number"
              value={presentValue}
              onChange={(e) => setPresentValue(e.target.value)}
              placeholder="1000"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate" className="text-white text-sm font-medium">
              Interest Rate (%)
            </Label>
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="5"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="periods" className="text-white text-sm font-medium">
              Number of {isMonthly ? "Years" : "Periods"}
            </Label>
            <Input
              id="periods"
              type="number"
              value={periods}
              onChange={(e) => setPeriods(e.target.value)}
              placeholder="10"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white text-sm font-medium">Compounding</Label>
            <Button
              variant="ghost"
              onClick={() => setIsMonthly(!isMonthly)}
              className="w-full justify-start text-white hover:bg-white/10 border border-white/20"
            >
              {isMonthly ? (
                <ToggleRight className="h-4 w-4 mr-2 text-efin-turquoise" />
              ) : (
                <ToggleLeft className="h-4 w-4 mr-2" />
              )}
              {isMonthly ? "Monthly" : "Annual"}
            </Button>
          </div>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <Alert className="mb-4 bg-red-500/10 border-red-500/20">
            <AlertDescription className="text-red-300">
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Calculate Button */}
        <Button
          onClick={calculateTVM}
          disabled={errors.length > 0}
          className="w-full bg-efin-blue hover:bg-efin-blue/90 text-white font-semibold py-3 rounded-xl mb-6"
        >
          <Calculator className="h-4 w-4 mr-2" />
          Calculate Future Value
        </Button>

        {/* Result */}
        {result !== null && (
          <Card className="p-4 bg-efin-turquoise/10 border-efin-turquoise/30 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-efin-turquoise text-sm font-medium">Future Value</p>
                <p className="text-2xl font-bold text-white">
                  ${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-efin-turquoise text-xs">
                  Growth: $
                  {(result - Number.parseFloat(presentValue)).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-efin-turquoise hover:bg-efin-turquoise/10"
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>

            {showExplanation && (
              <div className="mt-4 pt-4 border-t border-efin-turquoise/20">
                <p className="text-white text-sm">
                  <strong>Formula:</strong> FV = PV × (1 + r)^n
                </p>
                <p className="text-efin-turquoise text-xs mt-1">
                  ${presentValue} × (1 + {(Number.parseFloat(interestRate) / 100 / (isMonthly ? 12 : 1)).toFixed(6)})^
                  {isMonthly ? Number.parseInt(periods) * 12 : periods} = ${result.toFixed(2)}
                </p>
              </div>
            )}
          </Card>
        )}
      </Card>

      {/* Chart */}
      {chartData.length > 0 && (
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-efin-turquoise" />
            <h4 className="text-white font-semibold">Growth Over Time</h4>
          </div>

          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="period"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#2DE2E6", fontSize: 12 }}
                  label={{
                    value: isMonthly ? "Years" : "Periods",
                    position: "insideBottom",
                    offset: -5,
                    style: { textAnchor: "middle", fill: "#2DE2E6" },
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#2DE2E6", fontSize: 12 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2DE2E6"
                  strokeWidth={3}
                  dot={{ fill: "#246BFD", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#246BFD" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="text-efin-turquoise border-efin-turquoise/50">
              Principal: ${Number.parseFloat(presentValue).toLocaleString()}
            </Badge>
            {result && (
              <Badge variant="outline" className="text-green-400 border-green-400/50">
                Interest: $
                {(result - Number.parseFloat(presentValue)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </Badge>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
