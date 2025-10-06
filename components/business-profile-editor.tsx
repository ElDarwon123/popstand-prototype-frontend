"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Store,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Globe,
  Camera,
  Palette,
  Save,
  Eye,
  QrCode,
} from "lucide-react"

interface BusinessProfile {
  businessName: string
  description: string
  category: string
  location: string
  phone: string
  email: string
  instagram: string
  facebook: string
  website: string
  isPublic: boolean
  acceptsDigitalPayments: boolean
  theme: string
  logo: string
  coverImage: string
}

export function BusinessProfileEditor() {
  const [profile, setProfile] = useState<BusinessProfile>({
    businessName: "Artesanías Popayán",
    description:
      "Creamos hermosas artesanías tradicionales del Cauca con técnicas ancestrales. Cada pieza es única y cuenta una historia de nuestra cultura.",
    category: "artesanias",
    location: "Popayán, Cauca",
    phone: "+57 300 123 4567",
    email: "contacto@artesaniaspopayan.com",
    instagram: "@artesaniaspopayan",
    facebook: "ArtesaniasPopayan",
    website: "www.artesaniaspopayan.com",
    isPublic: true,
    acceptsDigitalPayments: true,
    theme: "traditional",
    logo: "",
    coverImage: "",
  })

  const [activeTab, setActiveTab] = useState<"info" | "design" | "preview">("info")

  const categories = [
    { value: "artesanias", label: "Artesanías" },
    { value: "joyeria", label: "Joyería" },
    { value: "textiles", label: "Textiles" },
    { value: "ceramica", label: "Cerámica" },
    { value: "madera", label: "Madera" },
    { value: "gastronomia", label: "Gastronomía" },
    { value: "otros", label: "Otros" },
  ]

  const themes = [
    { value: "traditional", label: "Tradicional", colors: "bg-amber-100 border-amber-300" },
    { value: "modern", label: "Moderno", colors: "bg-slate-100 border-slate-300" },
    { value: "colorful", label: "Colorido", colors: "bg-rainbow-100 border-rainbow-300" },
    { value: "elegant", label: "Elegante", colors: "bg-purple-100 border-purple-300" },
    { value: "natural", label: "Natural", colors: "bg-green-100 border-green-300" },
  ]

  const updateProfile = (field: keyof BusinessProfile, value: string | boolean) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const generateQRCode = () => {
    // En producción, esto generaría un QR real
    alert("QR generado para tu perfil de negocio!")
  }

  const saveProfile = () => {
    // En producción, esto guardaría en la base de datos
    console.log("Perfil guardado:", profile)
    alert("Perfil guardado exitosamente!")
  }

  return (
    <div className="space-y-6">
      {/* Navegación de tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === "info" ? "default" : "outline"}
          onClick={() => setActiveTab("info")}
          className="bg-transparent"
        >
          <User className="w-4 h-4 mr-2" />
          Información
        </Button>
        <Button
          variant={activeTab === "design" ? "default" : "outline"}
          onClick={() => setActiveTab("design")}
          className="bg-transparent"
        >
          <Palette className="w-4 h-4 mr-2" />
          Diseño
        </Button>
        <Button
          variant={activeTab === "preview" ? "default" : "outline"}
          onClick={() => setActiveTab("preview")}
          className="bg-transparent"
        >
          <Eye className="w-4 h-4 mr-2" />
          Vista Previa
        </Button>
      </div>

      {/* Tab Información Básica */}
      {activeTab === "info" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Información del Negocio
              </CardTitle>
              <CardDescription>Datos básicos que aparecerán en tu perfil público</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Nombre del Negocio *</Label>
                <Input
                  id="businessName"
                  value={profile.businessName}
                  onChange={(e) => updateProfile("businessName", e.target.value)}
                  placeholder="Ej: Artesanías del Cauca"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={profile.description}
                  onChange={(e) => updateProfile("description", e.target.value)}
                  placeholder="Describe tu negocio, productos y lo que te hace único..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">{profile.description.length}/500 caracteres</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select value={profile.category} onValueChange={(value) => updateProfile("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Ubicación</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => updateProfile("location", e.target.value)}
                    placeholder="Ciudad, Departamento"
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>Formas en que los clientes pueden contactarte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => updateProfile("phone", e.target.value)}
                    placeholder="+57 300 123 4567"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfile("email", e.target.value)}
                    placeholder="contacto@tunegocio.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="instagram"
                    value={profile.instagram}
                    onChange={(e) => updateProfile("instagram", e.target.value)}
                    placeholder="@tunegocio"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="facebook"
                    value={profile.facebook}
                    onChange={(e) => updateProfile("facebook", e.target.value)}
                    placeholder="TuNegocio"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Sitio Web</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => updateProfile("website", e.target.value)}
                    placeholder="www.tunegocio.com"
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab Diseño */}
      {activeTab === "design" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Personalización Visual
              </CardTitle>
              <CardDescription>Personaliza la apariencia de tu perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Tema del Perfil</Label>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => (
                    <Button
                      key={theme.value}
                      variant={profile.theme === theme.value ? "default" : "outline"}
                      className={`h-auto p-4 flex flex-col items-center gap-2 bg-transparent ${
                        profile.theme === theme.value ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => updateProfile("theme", theme.value)}
                    >
                      <div className={`w-8 h-8 rounded-full ${theme.colors}`}></div>
                      <span className="text-sm">{theme.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Imágenes</Label>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Logo del Negocio</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Camera className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Arrastra tu logo aquí o haz clic para seleccionar</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Seleccionar Archivo
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Imagen de Portada</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Camera className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Imagen que represente tu negocio (1200x400px recomendado)
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Seleccionar Archivo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración de Visibilidad</CardTitle>
              <CardDescription>Controla cómo aparece tu negocio en PopStand</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Perfil Público</Label>
                  <p className="text-sm text-muted-foreground">Tu negocio aparecerá en búsquedas y mapas</p>
                </div>
                <Switch checked={profile.isPublic} onCheckedChange={(checked) => updateProfile("isPublic", checked)} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Acepta Pagos Digitales</Label>
                  <p className="text-sm text-muted-foreground">Muestra que aceptas QR, tarjetas, etc.</p>
                </div>
                <Switch
                  checked={profile.acceptsDigitalPayments}
                  onCheckedChange={(checked) => updateProfile("acceptsDigitalPayments", checked)}
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Herramientas de Promoción</Label>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent" onClick={generateQRCode}>
                    <QrCode className="w-4 h-4 mr-2" />
                    Generar QR de mi Perfil
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Instagram className="w-4 h-4 mr-2" />
                    Compartir en Instagram
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Facebook className="w-4 h-4 mr-2" />
                    Compartir en Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab Vista Previa */}
      {activeTab === "preview" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Vista Previa del Perfil
            </CardTitle>
            <CardDescription>Así verán tu perfil los clientes en PopStand</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-md mx-auto border rounded-lg overflow-hidden bg-background">
              {/* Imagen de portada simulada */}
              <div className="h-32 bg-gradient-to-r from-amber-200 to-orange-200 flex items-center justify-center">
                <Camera className="w-8 h-8 text-amber-600" />
              </div>

              {/* Información del perfil */}
              <div className="p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <Store className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{profile.businessName}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {profile.location}
                    </p>
                    <div className="flex gap-1 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {categories.find((c) => c.value === profile.category)?.label}
                      </Badge>
                      {profile.acceptsDigitalPayments && (
                        <Badge variant="outline" className="text-xs">
                          Pagos Digitales
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{profile.description}</p>

                <div className="flex gap-2">
                  {profile.phone && (
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Phone className="w-3 h-3 mr-1" />
                      Llamar
                    </Button>
                  )}
                  {profile.instagram && (
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Instagram className="w-3 h-3 mr-1" />
                      Instagram
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Botones de acción */}
      <div className="flex justify-between">
        <Button variant="outline" className="bg-transparent">
          Cancelar
        </Button>
        <Button onClick={saveProfile}>
          <Save className="w-4 h-4 mr-2" />
          Guardar Perfil
        </Button>
      </div>
    </div>
  )
}
