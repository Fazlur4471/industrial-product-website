'use client'

import { useEffect, useState } from 'react'
import { ProductGrid } from '@/components/products/ProductGrid'
import type { Product } from '@/lib/types'

export default function ManufacturingPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data.filter((p: Product) => p.category === 'manufacturing'))
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="text-center text-muted-foreground">Loading services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ProductGrid
          products={products}
          title="Manufacturing Services"
          subtitle="Expert manufacturing solutions tailored to your specifications"
        />
      </div>
    </div>
  )
}
