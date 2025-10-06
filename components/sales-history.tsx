"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Receipt, Eye, Download } from "lucide-react"

interface Sale {
  id: string
  timestamp: string
  items: number
  total: number
  iva: number
  paymentMethod: string
  location: string
}

export function SalesHistory() {
  // Datos de ejemplo - en producción vendrían de una base de datos
  const todaySales: Sale[] = [
    {
      id: "001",
      timestamp: "15:30",
      items: 3,
      total: 125000,
      iva: 19950,
      paymentMethod: "QR",
      location: "Parque Bolívar",
    },
    {
      id: "002",
      timestamp: "14:15",
      items: 1,
      total: 35000,
      iva: 5588,
      paymentMethod: "Efectivo",
      location: "Pueblito Patojo",
    },
    {
      id: "003",
      timestamp: "13:45",
      items: 2,
      total: 80000,
      iva: 12773,
      paymentMethod: "Tarjeta",
      location: "Parque Caldas",
    },
    {
      id: "004",
      timestamp: "12:20",
      items: 4,
      total: 180000,
      iva: 28739,
      paymentMethod: "QR",
      location: "Banco de la Republica",
    },
  ]

  const totalToday = todaySales.reduce((sum, sale) => sum + sale.total, 0)
  const totalIVAToday = todaySales.reduce((sum, sale) => sum + sale.iva, 0)

  return (
    <div className="space-y-6">
      {/* Resumen del día */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ventas Hoy</p>
                <p className="text-2xl font-bold">{todaySales.length}</p>
              </div>
              <Receipt className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vendido</p>
                <p className="text-2xl font-bold">${totalToday.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">IVA: ${totalIVAToday.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Promedio/Venta</p>
                <p className="text-2xl font-bold">${Math.round(totalToday / todaySales.length).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historial detallado */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Historial de Ventas - Hoy</CardTitle>
              <CardDescription>{todaySales.length} ventas registradas</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaySales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-mono">{sale.timestamp}</span>
                  </div>
                  <div>
                    <p className="font-medium">Venta #{sale.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {sale.items} producto{sale.items !== 1 ? "s" : ""} • {sale.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="text-xs">
                    {sale.paymentMethod}
                  </Badge>
                  <div className="text-right">
                    <p className="font-bold">${sale.total.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">IVA: ${sale.iva.toLocaleString()}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
