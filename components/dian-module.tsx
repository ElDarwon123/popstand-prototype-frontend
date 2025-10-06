"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Calculator,
  Download,
  ExternalLink,
  Clock,
  DollarSign,
  Percent,
  Info,
  BookOpen,
  Shield,
} from "lucide-react"

interface TaxReminder {
  id: string
  type: "IVA" | "RENTA" | "RUT" | "FACTURACION"
  title: string
  description: string
  dueDate: string
  status: "pending" | "completed" | "overdue"
  priority: "high" | "medium" | "low"
}

export function DIANModule() {
  const [monthlyIncome, setMonthlyIncome] = useState("")
  const [bimonthlyIVA, setBimonthlyIVA] = useState("")
  const [activeTab, setActiveTab] = useState<"reminders" | "calculator" | "guides" | "status">("reminders")

  // Recordatorios tributarios
  const taxReminders: TaxReminder[] = [
    {
      id: "1",
      type: "IVA",
      title: "Declaración IVA Bimestral",
      description: "Período noviembre-diciembre 2024",
      dueDate: "2025-01-17",
      status: "pending",
      priority: "high",
    },
    {
      id: "2",
      type: "RENTA",
      title: "Declaración de Renta 2024",
      description: "Personas naturales obligadas a declarar",
      dueDate: "2025-08-21",
      status: "pending",
      priority: "medium",
    },
    {
      id: "3",
      type: "RUT",
      title: "Actualización RUT",
      description: "Verificar información actualizada",
      dueDate: "2025-03-15",
      status: "completed",
      priority: "low",
    },
    {
      id: "4",
      type: "FACTURACION",
      title: "Facturación Electrónica",
      description: "Implementar sistema de facturación",
      dueDate: "2025-02-01",
      status: "pending",
      priority: "high",
    },
  ]

  const calculateIVAObligation = () => {
    const income = Number.parseFloat(monthlyIncome)
    if (isNaN(income)) return null

    const annualIncome = income * 12
    const uvtValue = 47065 // Valor UVT 2024
    const threshold = uvtValue * 1400 // 1.400 UVT

    return {
      annualIncome,
      threshold,
      isObligated: annualIncome >= threshold,
      monthsToThreshold: annualIncome < threshold ? Math.ceil((threshold - annualIncome) / income) : 0,
    }
  }

  const calculateBimonthlyIVA = () => {
    const iva = Number.parseFloat(bimonthlyIVA)
    if (isNaN(iva)) return null

    return {
      bimonthlyIVA: iva,
      annualIVA: iva * 6,
      nextPayment: iva,
      dueDate: "17 de enero, 2025",
    }
  }

  const ivaObligation = calculateIVAObligation()
  const ivaCalculation = calculateBimonthlyIVA()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50 border-green-200"
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "overdue":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Módulo DIAN</h2>
          <p className="text-muted-foreground">Gestión tributaria automatizada para tu emprendimiento</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <Shield className="w-4 h-4 mr-1" />
          Cumplimiento 100%
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reminders">Recordatorios</TabsTrigger>
          <TabsTrigger value="calculator">Calculadora</TabsTrigger>
          <TabsTrigger value="guides">Guías</TabsTrigger>
          <TabsTrigger value="status">Mi Estado</TabsTrigger>
        </TabsList>

        {/* Tab Recordatorios */}
        <TabsContent value="reminders" className="space-y-6">
          <div className="grid gap-4">
            {taxReminders.map((reminder) => (
              <Card key={reminder.id} className={`border ${getStatusColor(reminder.status)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-background rounded-lg">
                        {reminder.type === "IVA" && <Percent className="w-5 h-5" />}
                        {reminder.type === "RENTA" && <DollarSign className="w-5 h-5" />}
                        {reminder.type === "RUT" && <FileText className="w-5 h-5" />}
                        {reminder.type === "FACTURACION" && <Calculator className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{reminder.title}</h3>
                          <Badge variant="outline" className={getPriorityColor(reminder.priority)}>
                            {reminder.priority === "high" ? "Alta" : reminder.priority === "medium" ? "Media" : "Baja"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{reminder.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Vence: {new Date(reminder.dueDate).toLocaleDateString("es-CO")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {Math.ceil(
                              (new Date(reminder.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                            )}{" "}
                            días
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {reminder.status === "completed" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Button size="sm" variant="outline" className="bg-transparent">
                          {reminder.status === "overdue" ? "Resolver" : "Completar"}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Próximas Fechas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                  <div>
                    <p className="font-medium">Declaración IVA Enero-Febrero</p>
                    <p className="text-sm text-muted-foreground">Vence 17 de marzo, 2025</p>
                  </div>
                  <Badge variant="outline">En 45 días</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                  <div>
                    <p className="font-medium">Renovación Cámara de Comercio</p>
                    <p className="text-sm text-muted-foreground">Vence 31 de marzo, 2025</p>
                  </div>
                  <Badge variant="outline">En 59 días</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Calculadora Tributaria */}
        <TabsContent value="calculator" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Calculadora de Obligaciones
                </CardTitle>
                <CardDescription>Determina si debes declarar impuestos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Ingresos Mensuales Promedio</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="monthlyIncome"
                      type="number"
                      placeholder="Ej: 3000000"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {ivaObligation && (
                  <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Ingresos Anuales</Label>
                        <p className="text-lg font-semibold">${ivaObligation.annualIncome.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Umbral (1.400 UVT)</Label>
                        <p className="text-lg font-semibold">${ivaObligation.threshold.toLocaleString()}</p>
                      </div>
                    </div>

                    <Separator />

                    <Alert
                      className={
                        ivaObligation.isObligated ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"
                      }
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>
                        {ivaObligation.isObligated ? "Obligado a Declarar" : "No Obligado a Declarar"}
                      </AlertTitle>
                      <AlertDescription>
                        {ivaObligation.isObligated
                          ? "Debes declarar IVA bimestral y renta anual"
                          : `Te faltan ${ivaObligation.monthsToThreshold} meses para alcanzar el umbral`}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="w-5 h-5" />
                  Simulador IVA Bimestral
                </CardTitle>
                <CardDescription>Calcula tu declaración de IVA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bimonthlyIVA">IVA Recaudado (Bimestre)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="bimonthlyIVA"
                      type="number"
                      placeholder="Ej: 500000"
                      value={bimonthlyIVA}
                      onChange={(e) => setBimonthlyIVA(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {ivaCalculation && (
                  <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">IVA Bimestral</Label>
                        <p className="text-lg font-semibold">${ivaCalculation.bimonthlyIVA.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">IVA Anual Proyectado</Label>
                        <p className="text-lg font-semibold">${ivaCalculation.annualIVA.toLocaleString()}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="text-center">
                      <Label className="text-sm text-muted-foreground">Próximo Pago</Label>
                      <p className="text-2xl font-bold text-green-600">
                        ${ivaCalculation.nextPayment.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Vence: {ivaCalculation.dueDate}</p>
                    </div>

                    <Button className="w-full bg-transparent" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Generar Formulario 300
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Guías */}
        <TabsContent value="guides" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Guías Paso a Paso
                </CardTitle>
                <CardDescription>Aprende a cumplir con tus obligaciones tributarias</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Cómo inscribirse en el RUT
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Percent className="w-4 h-4 mr-2" />
                  Declaración de IVA paso a paso
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Declaración de Renta para emprendedores
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calculator className="w-4 h-4 mr-2" />
                  Facturación electrónica obligatoria
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Información Importante
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Régimen Simplificado</p>
                  <p className="text-xs text-blue-600">
                    Si tus ingresos son menores a 1.400 UVT, puedes acogerte al régimen simplificado
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">Facturación Electrónica</p>
                  <p className="text-xs text-yellow-600">Obligatoria para todos los responsables de IVA desde 2024</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Beneficios Tributarios</p>
                  <p className="text-xs text-green-600">
                    Los emprendedores pueden acceder a descuentos especiales en impuestos
                  </p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm font-medium text-purple-800">Asesoría Gratuita</p>
                  <p className="text-xs text-purple-600">La DIAN ofrece asesoría gratuita para nuevos contribuyentes</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enlaces Útiles DIAN</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-3">
                <Button variant="outline" className="bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Portal DIAN
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  MUISCA
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Facturación Electrónica
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Consulta RUT
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Calendario Tributario
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ayuda DIAN
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Mi Estado */}
        <TabsContent value="status" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Estado de Cumplimiento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">RUT Actualizado</span>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Declaraciones IVA al Día</span>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Facturación Electrónica</span>
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Declaración Renta 2024</span>
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                </div>

                <Separator />

                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                  <p className="text-sm text-muted-foreground">Cumplimiento General</p>
                  <Progress value={85} className="mt-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumen Tributario 2024</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">IVA Pagado</Label>
                    <p className="text-xl font-bold">$2,340,000</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Declaraciones</Label>
                    <p className="text-xl font-bold">5/6</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Ingresos Declarados</Label>
                    <p className="text-xl font-bold">$29,400,000</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Multas</Label>
                    <p className="text-xl font-bold text-green-600">$0</p>
                  </div>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Certificado Tributario
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones Personalizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Acción Requerida</AlertTitle>
                  <AlertDescription>
                    Debes implementar facturación electrónica antes del 1 de febrero de 2025
                  </AlertDescription>
                </Alert>
                <Alert className="border-blue-200 bg-blue-50">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Oportunidad</AlertTitle>
                  <AlertDescription>Puedes acceder a descuentos tributarios por ser emprendedor joven</AlertDescription>
                </Alert>
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Buen Trabajo</AlertTitle>
                  <AlertDescription>Mantienes un excelente historial de cumplimiento tributario</AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
