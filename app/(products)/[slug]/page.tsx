'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ImageGallery } from '@/components/products/ImageGallery'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import type { Product } from '@/lib/types'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!slug) return

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${slug}`)

        if (!response.ok) {
          setError(true)
          return
        }

        const data = await response.json()
        setProduct(data)

        // Fetch all products for related items
        const allResponse = await fetch('/api/products')
        const allData = await allResponse.json()

        const related = allData
          .filter(
            (p: Product) =>
              p.category === data.category && p.id !== data.id
          )
          .slice(0, 3)

        setRelatedProducts(related)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link
          href="/"
          className="text-accent underline"
        >
          Go back home
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/${product.category}`} className="capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

          <ImageGallery
            images={product.images}
            productName={product.name}
          />

          <div className="flex flex-col">

            <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-4">
              {product.category}
            </span>

            <h1 className="text-4xl font-bold mb-4">
              {product.name}
            </h1>

            <p className="text-muted-foreground mb-6">
              {product.longDescription}
            </p>

            <div className="mb-8 pb-8 border-b border-border">
              <div className="text-4xl font-bold text-accent">
                ${(product as any).price.toLocaleString()}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold mb-4">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="bg-secondary rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">{key}</p>
                    <p className="font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8 flex items-center gap-2">
              {product.inStock ? (
                <>
                  <Check className="w-5 h-5 text-accent" />
                  <span className="font-semibold">In Stock</span>
                </>
              ) : (
                <span className="text-muted-foreground">
                  Out of Stock
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Link
                href="/enquiry"
                className="bg-accent text-accent-foreground font-semibold px-6 py-3 rounded-lg text-center"
              >
                Request Enquiry
              </Link>
              <Link
                href="/order"
                className="bg-secondary font-semibold px-6 py-3 rounded-lg text-center"
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="text-3xl font-bold mb-8">
              Related Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/${relatedProduct.slug}`}
                  className="border rounded-lg p-4 hover:border-accent transition"
                >
                  <h3 className="font-semibold">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-accent font-bold mt-2">
                    ${(relatedProduct as any).price.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
