"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, Target, DollarSign, Percent } from "lucide-react"

export function PricingTools() {
  const [cost, setCost] = useState("")
  const [margin, setMargin] = useState("50")
  const [competition, setCompetition] = useState("")

  const calculateSuggestedPrice = () => {
    const costValue = Number.parseFloat(cost)
    const marginValue = Number.parseFloat(margin)

    if (isNaN(costValue) || isNaN(marginValue)) return 0

    const basePrice = costValue / (1 - marginValue / 100)
    return basePrice * 1.19 // Agregar IVA
  }

  const calculateProfit = () => {
    const costValue = Number.parseFloat(cost)
    const suggestedPrice = calculateSuggestedPrice()

    if (isNaN(costValue) || suggestedPrice === 0) return 0

    return suggestedPrice - costValue
  }

  const competitionAnalysis = () => {
    const suggested = calculateSuggestedPrice()
    const competitionPrice = Number.parseFloat(competition)

    if (isNaN(competitionPrice) || suggested === 0) return null

    const difference = ((suggested - competitionPrice) / competitionPrice) * 100

    return {
      difference: Math.abs(difference),
      isHigher: suggested > competitionPrice,
      competitive: Math.abs(difference) <= 15, // Dentro del 15% es competitivo
    }
  }

  const analysis = competitionAnalysis()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Herramienta de Precios Estratégicos
          </CardTitle>
          <CardDescription>Calcula precios competitivos basados en costos y márgenes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cost">Costo del Producto</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cost"
                  type="number"
                  placeholder="Costo de producción"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="margin">Margen de Ganancia (%)</Label>
              <div className="relative">
                <Percent className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="margin"
                  type="number"
                  placeholder="50"
                  value={margin}
                  onChange={(e) => setMargin(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="competition">Precio de Competencia (Opcional)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="competition"
                type="number"
                placeholder="Precio de productos similares"
                value={competition}
                onChange={(e) => setCompetition(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {cost && margin && (
            <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Costo</Label>
                  <p className="text-lg font-semibold">${Number.parseFloat(cost).toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Ganancia</Label>
                  <p className="text-lg font-semibold text-green-600">
                    ${Math.round(calculateProfit()).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Margen</Label>
                  <p className="text-lg font-semibold text-blue-600">{margin}%</p>
                </div>
              </div>

              <Separator />

              <div className="text-center">
                <Label className="text-sm text-muted-foreground">Precio Sugerido (con IVA)</Label>
                <p className="text-3xl font-bold text-green-600">
                  ${Math.round(calculateSuggestedPrice()).toLocaleString()}
                </p>
              </div>

              {analysis && (
                <div className="mt-4">
                  <Label className="text-sm font-medium">Análisis Competitivo</Label>
                  <div
                    className={`p-3 rounded-lg mt-2 ${
                      analysis.competitive
                        ? "bg-green-50 border border-green-200"
                        : "bg-yellow-50 border border-yellow-200"
                    }`}
                  >
                    <p className={`text-sm font-medium ${analysis.competitive ? "text-green-800" : "text-yellow-800"}`}>
                      {analysis.competitive ? "Precio Competitivo" : "Revisar Precio"}
                    </p>
                    <p className={`text-xs ${analysis.competitive ? "text-green-600" : "text-yellow-600"}`}>
                      Tu precio es {analysis.difference.toFixed(1)}% {analysis.isHigher ? "mayor" : "menor"} que la
                      competencia
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Consejos de precios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Consejos de Precios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Margen Recomendado</p>
              <p className="text-xs text-blue-600">Para artesanías: 40-60% | Para productos únicos: 60-80%</p>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm font-medium text-purple-800">Precios Psicológicos</p>
              <p className="text-xs text-purple-600">
                Usa precios terminados en 9 o 5 (ej: $24.900 en lugar de $25.000)
              </p>
            </div>
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm font-medium text-orange-800">Considera el Contexto</p>
              <p className="text-xs text-orange-600">Los precios pueden variar según la feria, ubicación y temporada</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
