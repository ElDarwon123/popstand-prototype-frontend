"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  BarChart3,
  PieChart,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  Eye,
  Edit,
  Building2,
  MapPin,
  Mail,
} from "lucide-react"

// Datos simulados para el dashboard
const mockData = {
  totalUsers: 1247,
  formalUsers: 423,
  informalUsers: 824,
  dianCompliant: 298,
  paymentIntegrated: 756,
  monthlyGrowth: 12.5,
  recentUsers: [
    {
      id: 1,
      name: "María González",
      email: "maria@email.com",
      role: "entrepreneur",
      status: "formal",
      dianStatus: "compliant",
      paymentStatus: "integrated",
      joinDate: "2024-01-15",
      business: "Artesanías María",
      location: "Popayán, Cauca",
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      email: "carlos@email.com",
      role: "entrepreneur",
      status: "informal",
      dianStatus: "pending",
      paymentStatus: "not_integrated",
      joinDate: "2024-01-10",
      business: "Comidas Rápidas Carlos",
      location: "Popayán, Cauca",
    },
    {
      id: 3,
      name: "Ana Martínez",
      email: "ana@email.com",
      role: "organizer",
      status: "formal",
      dianStatus: "compliant",
      paymentStatus: "integrated",
      joinDate: "2024-01-08",
      business: "Eventos del Cauca",
      location: "Popayán, Cauca",
    },
  ],
  businessMetrics: {
    totalBusinesses: 892,
    activeBusinesses: 734,
    pendingApproval: 45,
    suspended: 13,
    categories: [
      { name: "Comida", count: 234, percentage: 26.2 },
      { name: "Artesanías", count: 189, percentage: 21.2 },
      { name: "Ropa", count: 156, percentage: 17.5 },
      { name: "Tecnología", count: 98, percentage: 11.0 },
      { name: "Otros", count: 215, percentage: 24.1 },
    ],
  },
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredUsers = mockData.recentUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.business.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesFilter
  })

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{mockData.monthlyGrowth}% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Formales</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.formalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {((mockData.formalUsers / mockData.totalUsers) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Informales</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.informalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {((mockData.informalUsers / mockData.totalUsers) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cumplimiento DIAN</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.dianCompliant}</div>
            <p className="text-xs text-muted-foreground">
              {((mockData.dianCompliant / mockData.formalUsers) * 100).toFixed(1)}% de formales
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de analíticas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Usuarios</CardTitle>
            <CardDescription>Formales vs Informales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Formales</span>
                </div>
                <span className="text-sm font-medium">{mockData.formalUsers}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(mockData.formalUsers / mockData.totalUsers) * 100}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm">Informales</span>
                </div>
                <span className="text-sm font-medium">{mockData.informalUsers}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${(mockData.informalUsers / mockData.totalUsers) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estado de Pagos</CardTitle>
            <CardDescription>Integración de métodos de pago</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Integrados</span>
                </div>
                <span className="text-sm font-medium">{mockData.paymentIntegrated}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm">No integrados</span>
                </div>
                <span className="text-sm font-medium">{mockData.totalUsers - mockData.paymentIntegrated}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            Todos
          </Button>
          <Button
            variant={statusFilter === "formal" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("formal")}
          >
            Formales
          </Button>
          <Button
            variant={statusFilter === "informal" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("informal")}
          >
            Informales
          </Button>
        </div>
      </div>

      {/* Lista de usuarios */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{user.name}</h3>
                    <Badge variant={user.status === "formal" ? "default" : "secondary"}>
                      {user.status === "formal" ? "Formal" : "Informal"}
                    </Badge>
                    <Badge variant={user.role === "entrepreneur" ? "outline" : "default"}>
                      {user.role === "entrepreneur" ? "Emprendedor" : "Organizador"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {user.business}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {user.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Registro: {new Date(user.joinDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <span className="text-xs">DIAN:</span>
                      {user.dianStatus === "compliant" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                      )}
                      <span className="text-xs">{user.dianStatus === "compliant" ? "Cumple" : "Pendiente"}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-xs">Pagos:</span>
                      {user.paymentStatus === "integrated" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className="text-xs">
                        {user.paymentStatus === "integrated" ? "Integrado" : "No integrado"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderBusinesses = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Negocios</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.businessMetrics.totalBusinesses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.businessMetrics.activeBusinesses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.businessMetrics.pendingApproval}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspendidos</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.businessMetrics.suspended}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribución por Categorías</CardTitle>
          <CardDescription>Negocios registrados por categoría</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.businessMetrics.categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                  <span className="text-sm font-medium">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tendencias de Formalización</CardTitle>
            <CardDescription>Usuarios que han formalizado su negocio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold text-green-600">
                {((mockData.formalUsers / mockData.totalUsers) * 100).toFixed(1)}%
              </div>
              <p className="text-sm text-muted-foreground">De formalización en la plataforma</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Meta mensual: 35%</span>
                  <span className="text-green-600">+1.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "34%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cumplimiento Tributario</CardTitle>
            <CardDescription>Estado de obligaciones con la DIAN</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{mockData.dianCompliant}</div>
                  <p className="text-xs text-muted-foreground">Al día</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {mockData.formalUsers - mockData.dianCompliant}
                  </div>
                  <p className="text-xs text-muted-foreground">Pendientes</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tasa de cumplimiento</span>
                  <span>{((mockData.dianCompliant / mockData.formalUsers) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(mockData.dianCompliant / mockData.formalUsers) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Métricas de Adopción</CardTitle>
          <CardDescription>Uso de funcionalidades de la plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{mockData.paymentIntegrated}</div>
              <p className="text-sm text-muted-foreground">Pagos digitales integrados</p>
              <div className="text-xs text-green-600 mt-1">
                {((mockData.paymentIntegrated / mockData.totalUsers) * 100).toFixed(1)}% del total
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold">567</div>
              <p className="text-sm text-muted-foreground">Perfiles completados</p>
              <div className="text-xs text-blue-600 mt-1">45.5% del total</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold">234</div>
              <p className="text-sm text-muted-foreground">Participando en eventos</p>
              <div className="text-xs text-purple-600 mt-1">18.8% del total</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestión y analíticas de la plataforma PopStand</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            onClick={() => setActiveTab("overview")}
            className="mb-2"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Resumen
          </Button>
          <Button
            variant={activeTab === "users" ? "default" : "ghost"}
            onClick={() => setActiveTab("users")}
            className="mb-2"
          >
            <Users className="h-4 w-4 mr-2" />
            Usuarios
          </Button>
          <Button
            variant={activeTab === "businesses" ? "default" : "ghost"}
            onClick={() => setActiveTab("businesses")}
            className="mb-2"
          >
            <Building2 className="h-4 w-4 mr-2" />
            Negocios
          </Button>
          <Button
            variant={activeTab === "analytics" ? "default" : "ghost"}
            onClick={() => setActiveTab("analytics")}
            className="mb-2"
          >
            <PieChart className="h-4 w-4 mr-2" />
            Analíticas
          </Button>
        </div>

        {/* Content */}
        {activeTab === "overview" && renderOverview()}
        {activeTab === "users" && renderUsers()}
        {activeTab === "businesses" && renderBusinesses()}
        {activeTab === "analytics" && renderAnalytics()}
      </div>
    </div>
  )
}
