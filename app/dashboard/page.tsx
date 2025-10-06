"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  DollarSign,
  Package,
  Settings,
  Calculator,
  QrCode,
  FileText,
  MapPin,
  AlertTriangle,
  Receipt,
  PieChart,
  Target,
} from "lucide-react"
import { SalesRegister } from "@/components/sales-register"
import { SalesHistory } from "@/components/sales-history"
import { IVACalculator } from "@/components/iva-calculator"
import { PricingTools } from "@/components/pricing-tools"
import { BusinessProfileEditor } from "@/components/business-profile-editor"
import { DIANModule } from "@/components/dian-module"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header personalizable */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard PopStand</h1>
            <p className="text-muted-foreground">Gestiona tu emprendimiento de manera integral</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Personalizar
            </Button>
            <Badge variant="secondary" className="px-3 py-1">
              Plan Pro
            </Badge>
          </div>
        </div>

        {/* Tabs principales para organizar funcionalidades */}
        <Tabs defaultValue="resumen" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
            <TabsTrigger value="ventas">Ventas</TabsTrigger>
            <TabsTrigger value="precios">Precios</TabsTrigger>
            <TabsTrigger value="tributario">DIAN</TabsTrigger>
            <TabsTrigger value="eventos">Eventos</TabsTrigger>
            <TabsTrigger value="perfil">Mi Negocio</TabsTrigger>
          </TabsList>

          {/* Tab Resumen */}
          <TabsContent value="resumen" className="space-y-6">
            {/* Métricas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ventas del Mes</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,450,000</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+20.1%</span> vs mes anterior
                  </p>
                  <div className="text-xs text-muted-foreground mt-1">IVA recaudado: $392,000</div>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Productos Vendidos</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">347</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">+23</span> esta semana
                  </p>
                  <div className="text-xs text-muted-foreground mt-1">Stock bajo: 3 productos</div>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ferias Participadas</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-blue-600">2</span> próximas este mes
                  </p>
                  <div className="text-xs text-muted-foreground mt-1">Mejor feria: Plaza de Bolívar</div>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cumplimiento DIAN</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <p className="text-xs text-muted-foreground">Próxima declaración: 15 días</p>
                  <div className="text-xs text-muted-foreground mt-1">IVA bimestral al día</div>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos y análisis */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Ventas por Feria
                    </CardTitle>
                    <CardDescription>Rendimiento en diferentes eventos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Plaza de Bolívar", sales: 850000, percentage: 85 },
                        { name: "Parque Caldas", sales: 620000, percentage: 62 },
                        { name: "Centro Comercial", sales: 480000, percentage: 48 },
                        { name: "Feria Gastronómica", sales: 320000, percentage: 32 },
                      ].map((feria, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{feria.name}</span>
                            <span className="text-muted-foreground">${feria.sales.toLocaleString()}</span>
                          </div>
                          <Progress value={feria.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Productos Más Vendidos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { product: "Artesanías de Barro", sold: 89, revenue: 445000 },
                        { product: "Joyería Artesanal", sold: 67, revenue: 670000 },
                        { product: "Textiles Tradicionales", sold: 45, revenue: 360000 },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                              <Package className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium">{item.product}</p>
                              <p className="text-sm text-muted-foreground">{item.sold} vendidos</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${item.revenue.toLocaleString()}</p>
                            <Badge variant="secondary">Top {index + 1}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar con herramientas rápidas */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Herramientas Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculadora IVA
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <QrCode className="w-4 h-4 mr-2" />
                      Generar QR Pago
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Receipt className="w-4 h-4 mr-2" />
                      Nueva Venta
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <MapPin className="w-4 h-4 mr-2" />
                      Buscar Ferias
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Recordatorios DIAN
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm font-medium text-yellow-800">Declaración IVA</p>
                        <p className="text-xs text-yellow-600">Vence en 15 días</p>
                      </div>
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-medium text-green-800">RUT actualizado</p>
                        <p className="text-xs text-green-600">Todo al día</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Metas del Mes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Ventas</span>
                          <span>$2.4M / $3M</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Productos</span>
                          <span>347 / 400</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tab Ventas - Sistema de caja registradora completo */}
          <TabsContent value="ventas" className="space-y-6">
            <SalesRegister />
            <SalesHistory />
          </TabsContent>

          {/* Tab Precios - Calculadora IVA y herramientas de precios */}
          <TabsContent value="precios" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <IVACalculator />
              <PricingTools />
            </div>
          </TabsContent>

          {/* Tab Mi Negocio - Editor de perfil personalizable */}
          <TabsContent value="perfil" className="space-y-6">
            <BusinessProfileEditor />
          </TabsContent>

          {/* Tab DIAN - Módulo tributario completo */}
          <TabsContent value="tributario" className="space-y-6">
            <DIANModule />
          </TabsContent>

          {/* Tab Eventos - Mapa de Ferias y Eventos */}
          <TabsContent value="eventos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mapa de Ferias y Eventos</CardTitle>
                <CardDescription>Próximamente - Encuentra y participa en eventos</CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
