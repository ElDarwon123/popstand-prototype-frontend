import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-border bg-card">
          <CardContent className="p-12 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground">
                ¿Listo para transformar tu negocio?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Únete y sé de los emprendedores que ya están creciendo con PopStand. Comienza tu prueba gratuita hoy
                mismo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/crear-cuenta">Comenzar Prueba Gratuita</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
                <Link href="/contacto">Hablar con Ventas</Link>
              </Button>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>✓ 60 días gratis • ✓ Sin compromiso • ✓ Cancela cuando quieras</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
