import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image src="/images/ps-black.png" alt="PopStand" width={32} height={32} className="dark:hidden" />
              <Image src="/images/ps-white.png" alt="PopStand" width={32} height={32} className="hidden dark:block" />
              <span className="ml-2 text-lg font-semibold">PopStand</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              La plataforma todo-en-uno para emprendedores que quieren crecer sin complicaciones.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Producto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/precios" className="text-muted-foreground hover:text-accent transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-muted-foreground hover:text-accent transition-colors">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/nosotros" className="text-muted-foreground hover:text-accent transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-accent transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Soporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ayuda" className="text-muted-foreground hover:text-accent transition-colors">
                  Centro de Ayuda
                </Link>
              </li>
              <li>
                <Link href="/documentacion" className="text-muted-foreground hover:text-accent transition-colors">
                  Documentación
                </Link>
              </li>
              <li>
                <Link href="/estado" className="text-muted-foreground hover:text-accent transition-colors">
                  Estado del Sistema
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2025 PopStand. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacidad" className="text-muted-foreground hover:text-accent text-sm transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-muted-foreground hover:text-accent text-sm transition-colors">
              Términos
            </Link>
            <Link href="/cookies" className="text-muted-foreground hover:text-accent text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
