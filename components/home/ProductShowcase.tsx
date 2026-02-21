'use client'

import { useEffect, useState } from 'react'
import { ProductGrid } from '@/components/products/ProductGrid'
import type { Product } from '@/lib/types'

export function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data.slice(0, 6))
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {products.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-10 text-center">
          <h2 className="text-2xl font-bold text-foreground">Products Coming Soon</h2>
          <p className="mt-2 text-muted-foreground">
            No products are published yet. Add products from the admin panel to display them here.
          </p>
        </div>
      ) : (
        <ProductGrid
          products={products}
          title="Featured Products"
          subtitle="Explore our premium industrial solutions"
        />
      )}
    </div>
  )
}
