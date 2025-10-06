"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/ps-black.png" alt="PopStand" width={40} height={40} className="dark:hidden" />
            <Image src="/images/ps-white.png" alt="PopStand" width={40} height={40} className="hidden dark:block" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/nosotros" className="text-foreground hover:text-accent transition-colors font-medium">
              Nosotros
            </Link>
            <Link href="/inicio" className="text-foreground hover:text-accent transition-colors font-medium">
              Inicio
            </Link>
            <Link href="/eventos" className="text-foreground hover:text-accent transition-colors font-medium">
              Eventos
            </Link>
            <Link href="/organizador" className="text-foreground hover:text-accent transition-colors font-medium">
              Organizadores
            </Link>
            <Link href="/admin" className="text-foreground hover:text-accent transition-colors font-medium">
              Admin
            </Link>
            <Link href="/contacto" className="text-foreground hover:text-accent transition-colors font-medium">
              Contacto
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/crear-cuenta">Crear cuenta</Link>
            </Button>
            <Button asChild>
              <Link href="/iniciar-sesion">Iniciar Sesión</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                href="/nosotros"
                className="text-foreground hover:text-accent transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                href="/inicio"
                className="text-foreground hover:text-accent transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/eventos"
                className="text-foreground hover:text-accent transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Eventos
              </Link>
              <Link
                href="/organizador"
                className="text-foreground hover:text-accent transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Organizadores
              </Link>
              <Link
                href="/admin"
                className="text-foreground hover:text-accent transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <Link
                href="/contacto"
                className="text-foreground hover:text-accent transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="ghost" asChild>
                  <Link href="/crear-cuenta" onClick={() => setIsMenuOpen(false)}>
                    Crear cuenta
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/iniciar-sesion" onClick={() => setIsMenuOpen(false)}>
                    Iniciar Sesión
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
