"use client"

import { Navigation } from "@/components/navigation"
import { BusinessProfileShowcase } from "@/components/business-profile-showcase"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BusinessProfileShowcase />
      </div>
    </div>
  )
}
