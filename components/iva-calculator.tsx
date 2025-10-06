"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, DollarSign, Copy, Check, Info } from "lucide-react"

export function IVACalculator() {
  const [basePrice, setBasePrice] = useState("")
  const [priceWithIVA, setPriceWithIVA] = useState("")
  const [ivaAmount, setIvaAmount] = useState(0)
  const [copied, setCopied] = useState(false)
  const [calculationMode, setCalculationMode] = useState<"add" | "remove">("add")

  const IVA_RATE = 0.19 // 19% IVA en Colombia

  // Calcular cuando se ingresa precio base (agregar IVA)
  const calculateWithIVA = (base: number) => {
    const iva = base * IVA_RATE
    const total = base + iva
    setIvaAmount(iva)
    setPriceWithIVA(total.toString())
  }

  // Calcular cuando se ingresa precio con IVA (remover IVA)
  const calculateWithoutIVA = (total: number) => {
    const base = total / (1 + IVA_RATE)
    const iva = total - base
    setIvaAmount(iva)
    setBasePrice(base.toString())
  }

  useEffect(() => {
    if (calculationMode === "add" && basePrice) {
      const base = Number.parseFloat(basePrice)
      if (!isNaN(base)) {
        calculateWithIVA(base)
      }
    }
  }, [basePrice, calculationMode])

  useEffect(() => {
    if (calculationMode === "remove" && priceWithIVA) {
      const total = Number.parseFloat(priceWithIVA)
      if (!isNaN(total)) {
        calculateWithoutIVA(total)
      }
    }
  }, [priceWithIVA, calculationMode])

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setBasePrice("")
    setPriceWithIVA("")
    setIvaAmount(0)
  }

  // Precios sugeridos comunes para artesanías
  const suggestedPrices = [
    { label: "Pequeña", base: 15000 },
    { label: "Mediana", base: 35000 },
    { label: "Grande", base: 65000 },
    { label: "Premium", base: 120000 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Calculadora de Precios con IVA
          </CardTitle>
          <CardDescription>Calcula automáticamente el IVA (19%) para tus productos</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={calculationMode} onValueChange={(value) => setCalculationMode(value as "add" | "remove")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="add">Agregar IVA</TabsTrigger>
              <TabsTrigger value="remove">Quitar IVA</TabsTrigger>
            </TabsList>

            <TabsContent value="add" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="basePrice">Precio Base (sin IVA)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="basePrice"
                    type="number"
                    placeholder="Ingresa el precio sin IVA"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {basePrice && !isNaN(Number.parseFloat(basePrice)) && (
                <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Precio Base</Label>
                      <p className="text-lg font-semibold">${Number.parseFloat(basePrice).toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">IVA (19%)</Label>
                      <p className="text-lg font-semibold text-orange-600">
                        +${Math.round(ivaAmount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm text-muted-foreground">Precio Final</Label>
                      <p className="text-2xl font-bold text-green-600">
                        ${Math.round(Number.parseFloat(priceWithIVA)).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(Math.round(Number.parseFloat(priceWithIVA)).toString())}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="remove" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="priceWithIVA">Precio con IVA incluido</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="priceWithIVA"
                    type="number"
                    placeholder="Ingresa el precio con IVA"
                    value={priceWithIVA}
                    onChange={(e) => setPriceWithIVA(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {priceWithIVA && !isNaN(Number.parseFloat(priceWithIVA)) && (
                <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Precio Base</Label>
                      <p className="text-lg font-semibold">
                        ${Math.round(Number.parseFloat(basePrice)).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">IVA (19%)</Label>
                      <p className="text-lg font-semibold text-orange-600">${Math.round(ivaAmount).toLocaleString()}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm text-muted-foreground">Precio Total</Label>
                      <p className="text-2xl font-bold text-green-600">
                        ${Math.round(Number.parseFloat(priceWithIVA)).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(Math.round(Number.parseFloat(basePrice)).toString())}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={clearAll} className="bg-transparent">
              Limpiar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Precios sugeridos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Precios Sugeridos</CardTitle>
          <CardDescription>Rangos comunes para artesanías y productos artesanales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {suggestedPrices.map((price, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start bg-transparent"
                onClick={() => {
                  setCalculationMode("add")
                  setBasePrice(price.base.toString())
                }}
              >
                <Badge variant="secondary" className="mb-2">
                  {price.label}
                </Badge>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">Base</p>
                  <p className="font-semibold">${price.base.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    +IVA: ${Math.round(price.base * 1.19).toLocaleString()}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Información sobre IVA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="w-5 h-5" />
            Información sobre IVA en Colombia
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-800">Tarifa General</p>
            <p className="text-xs text-blue-600">El IVA general en Colombia es del 19% sobre el precio base</p>
          </div>
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-medium text-yellow-800">Obligación Tributaria</p>
            <p className="text-xs text-yellow-600">
              Debes declarar IVA si tus ingresos superan 1.400 UVT (~$65.891.000)
            </p>
          </div>
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-800">Facturación</p>
            <p className="text-xs text-green-600">PopStand te ayuda a generar facturas electrónicas válidas</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
