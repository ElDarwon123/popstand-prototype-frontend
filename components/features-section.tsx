import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Calculator, Megaphone, Shield, Smartphone, Users } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Gestión de Ventas",
    description: "Controla todas tus ventas desde un solo lugar. Facturas, inventario y reportes automáticos.",
  },
  {
    icon: Calculator,
    title: "Impuestos Simplificados",
    description: "Calcula y declara tus impuestos automáticamente. Sin errores, sin estrés.",
  },
  {
    icon: Megaphone,
    title: "Promoción Digital",
    description: "Crea tu página web personalizada y promociona tu negocio en redes sociales.",
  },
  {
    icon: Shield,
    title: "Seguridad Total",
    description: "Tus datos están protegidos con encriptación de nivel bancario.",
  },
  {
    icon: Users,
    title: "Soporte 24/7",
    description: "Nuestro equipo está aquí para ayudarte cuando lo necesites.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Todo lo que necesitas para crecer</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una plataforma completa diseñada específicamente para emprendedores como tú
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
