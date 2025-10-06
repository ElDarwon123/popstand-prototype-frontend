import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center ps-gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance ps-hero-text">
                Lleva tu emprendimiento al siguiente nivel, sin complicaciones
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                PopStand une todo lo que necesitas: Ventas, impuestos y promoción en una sola app. Di adiós a los
                errores, las planillas desordenadas y el estrés de declarar.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/crear-cuenta">Comenzar Gratis</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
                <Link href="/demo">Ver Demo</Link>
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Configuración en 5 minutos</span>
              </div>
            </div>
          </div>

          {/* Logo/Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src="/images/ps-black-logo.png"
                alt="PopStand Logo"
                width={400}
                height={400}
                className="dark:hidden opacity-20"
                priority
              />
              <Image
                src="/images/ps-white-logo.png"
                alt="PopStand Logo"
                width={400}
                height={400}
                className="hidden dark:block opacity-20"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
