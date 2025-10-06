"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Receipt, Plus, Minus, Trash2, QrCode, CreditCard, Banknote, Calculator } from "lucide-react"

interface SaleItem {
  id: string
  name: string
  price: number
  quantity: number
  hasIVA: boolean
}

export function SalesRegister() {
  const [currentSale, setCurrentSale] = useState<SaleItem[]>([])
  const [productName, setProductName] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [hasIVA, setHasIVA] = useState(true)

  // Productos frecuentes para acceso rápido
  const frequentProducts = [
    { name: "Artesanía Pequeña", price: 15000, hasIVA: true },
    { name: "Artesanía Mediana", price: 35000, hasIVA: true },
    { name: "Artesanía Grande", price: 65000, hasIVA: true },
    { name: "Joyería", price: 25000, hasIVA: true },
  ]

  const addProduct = (name: string, price: number, hasIVA: boolean) => {
    const newItem: SaleItem = {
      id: Date.now().toString(),
      name,
      price,
      quantity: 1,
      hasIVA,
    }
    setCurrentSale([...currentSale, newItem])
  }

  const addCustomProduct = () => {
    if (productName && productPrice) {
      addProduct(productName, Number.parseFloat(productPrice), hasIVA)
      setProductName("")
      setProductPrice("")
    }
  }

  const updateQuantity = (id: string, change: number) => {
    setCurrentSale(
      currentSale.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)),
    )
  }

  const removeItem = (id: string) => {
    setCurrentSale(currentSale.filter((item) => item.id !== id))
  }

  const calculateSubtotal = () => {
    return currentSale.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateIVA = () => {
    return currentSale.reduce((total, item) => {
      if (item.hasIVA) {
        const ivaPerUnit = item.price - (item.price / 1.19)
        return total + (ivaPerUnit * item.quantity)
      }
      return total
    }, 0)
  }

  const calculateTotal = () => {
    const valueSubtotal = calculateSubtotal();
    const valueIVA = calculateIVA();
    return (valueSubtotal + valueIVA).toLocaleString()
  }

  const processSale = () => {
    if (currentSale.length > 0) {
      // Aquí se procesaría la venta
      console.log("Venta procesada:", {
        items: currentSale,
        subtotal: calculateSubtotal(),
        iva: calculateIVA(),
        total: calculateTotal(),
      })
      setCurrentSale([])
      alert("Venta procesada exitosamente!")
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Panel de productos y caja registradora */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Caja Registradora Digital
            </CardTitle>
            <CardDescription>Registra productos y procesa ventas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Productos frecuentes */}
            <div>
              <Label className="text-sm font-medium">Productos Frecuentes</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {frequentProducts.map((product, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-3 text-left bg-transparent"
                    onClick={() => addProduct(product.name, product.price, product.hasIVA)}
                  >
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">${product.price.toLocaleString()}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Agregar producto personalizado */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Producto Personalizado</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Nombre del producto"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Precio"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasIVA"
                  checked={hasIVA}
                  onChange={(e) => setHasIVA(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="hasIVA" className="text-sm">
                  Incluye IVA (19%)
                </Label>
              </div>
              <Button onClick={addCustomProduct} className="w-full bg-transparent" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Producto
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ticket de venta actual */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Venta Actual</CardTitle>
            <CardDescription>
              {currentSale.length} producto{currentSale.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {currentSale.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No hay productos en la venta actual</p>
              ) : (
                currentSale.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        ${item.price.toLocaleString()} {item.hasIVA && "(IVA incl.)"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 ml-2"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {currentSale.length > 0 && (
              <>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>IVA (19%):</span>
                    <span>${calculateIVA().toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline" className="bg-transparent">
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Pago
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Tarjeta
                  </Button>
                </div>

                <Button onClick={processSale} className="w-full mt-2" size="lg">
                  <Banknote className="w-4 h-4 mr-2" />
                  Procesar Venta
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Calculadora rápida de IVA */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculadora IVA Rápida
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="text-xs text-muted-foreground">Precio sin IVA</Label>
                <p className="font-medium">${Math.round(calculateSubtotal() / 1.19).toLocaleString()}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Solo IVA</Label>
                <p className="font-medium text-green-600">${Math.round(calculateIVA()).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
