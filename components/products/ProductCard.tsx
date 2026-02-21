'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/types'
import { ArrowRight } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.images?.[0] || '/images/steel-plate.jpg'

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Link href={`/${product.slug}`}>
        <div className="rounded-xl overflow-hidden bg-card border border-border hover:border-accent transition-colors cursor-pointer h-full flex flex-col">
          {/* Image Container */}
          <div className="relative h-48 bg-secondary overflow-hidden">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
            {product.featured && (
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                Featured
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground flex-grow mb-4 line-clamp-2">
              {product.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-end pt-4 border-t border-border">
              <div className="text-accent hover:translate-x-1 transition-transform">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
