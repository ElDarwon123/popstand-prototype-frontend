"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Store, MapPin, Phone, Instagram, Facebook, Globe, Star, Heart, Share, MessageCircle } from "lucide-react"

interface BusinessShowcase {
  id: string
  name: string
  description: string
  category: string
  location: string
  rating: number
  reviews: number
  image: string
  logo: string
  isVerified: boolean
  acceptsDigitalPayments: boolean
  phone?: string
  instagram?: string
  facebook?: string
  website?: string
}

export function BusinessProfileShowcase() {
  // Datos de ejemplo de negocios en PopStand
  const businesses: BusinessShowcase[] = [
    {
      id: "1",
      name: "Artesanías del Cauca",
      description:
        "Hermosas artesanías tradicionales hechas a mano con técnicas ancestrales. Cada pieza cuenta una historia única de nuestra cultura.",
      category: "Artesanías",
      location: "Popayán, Cauca",
      rating: 4.8,
      reviews: 127,
      image: "/traditional-crafts-workshop.png",
      logo: "/placeholder-ibxxo.png",
      isVerified: true,
      acceptsDigitalPayments: true,
      phone: "+57 300 123 4567",
      instagram: "@artesaniascauca",
      facebook: "ArtesaniasCauca",
    },
    {
      id: "2",
      name: "Joyería Ancestral",
      description:
        "Joyería artesanal inspirada en diseños precolombinos. Trabajamos oro, plata y piedras preciosas de la región.",
      category: "Joyería",
      location: "Popayán, Cauca",
      rating: 4.9,
      reviews: 89,
      image: "/placeholder-s5hxn.png",
      logo: "/placeholder-e5xer.png",
      isVerified: true,
      acceptsDigitalPayments: true,
      instagram: "@joyeriaancestral",
      website: "www.joyeriaancestral.com",
    },
    {
      id: "3",
      name: "Textiles Tradicionales",
      description:
        "Tejidos a mano con técnicas tradicionales. Mochilas, mantas y accesorios únicos con diseños autóctonos.",
      category: "Textiles",
      location: "Popayán, Cauca",
      rating: 4.7,
      reviews: 156,
      image: "/placeholder-82o75.png",
      logo: "/textile-logo.png",
      isVerified: false,
      acceptsDigitalPayments: false,
      phone: "+57 311 987 6543",
      facebook: "TextilesTradicionales",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Descubre Negocios Únicos</h2>
        <p className="text-muted-foreground">Explora emprendimientos locales y encuentra productos auténticos</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <Card key={business.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Imagen de portada */}
            <div className="relative h-48 bg-muted">
              <img
                src={business.image || "/placeholder.svg"}
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                {business.isVerified && <Badge className="bg-blue-600 text-white">Verificado</Badge>}
                {business.acceptsDigitalPayments && <Badge variant="secondary">Pagos Digitales</Badge>}
              </div>
            </div>

            <CardContent className="p-4">
              {/* Header con logo y info básica */}
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={business.logo || "/placeholder.svg"} alt={business.name} />
                  <AvatarFallback>
                    <Store className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{business.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {business.location}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{business.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({business.reviews} reseñas)</span>
                    <Badge variant="outline" className="text-xs">
                      {business.category}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{business.description}</p>

              {/* Botones de contacto */}
              <div className="flex gap-2 mb-3">
                {business.phone && (
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Phone className="w-3 h-3 mr-1" />
                    Llamar
                  </Button>
                )}
                {business.instagram && (
                  <Button size="sm" variant="outline" className="bg-transparent">
                    <Instagram className="w-3 h-3" />
                  </Button>
                )}
                {business.facebook && (
                  <Button size="sm" variant="outline" className="bg-transparent">
                    <Facebook className="w-3 h-3" />
                  </Button>
                )}
                {business.website && (
                  <Button size="sm" variant="outline" className="bg-transparent">
                    <Globe className="w-3 h-3" />
                  </Button>
                )}
              </div>

              {/* Acciones */}
              <div className="flex justify-between items-center pt-2 border-t">
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="p-2">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="p-2">
                    <Share className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="p-2">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
                <Button size="sm">Ver Perfil</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to action para crear perfil */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <Store className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-xl font-bold mb-2">¿Tienes un emprendimiento?</h3>
          <p className="text-muted-foreground mb-4">Crea tu perfil en PopStand y conecta con más clientes</p>
          <Button size="lg">Crear Mi Perfil</Button>
        </CardContent>
      </Card>
    </div>
  )
}
