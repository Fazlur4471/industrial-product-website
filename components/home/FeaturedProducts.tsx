import { getFeaturedProducts } from '@/lib/data'
import { ProductGrid } from '@/components/products/ProductGrid'

export async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <section className="py-20 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={featuredProducts}
          title="Featured Products"
          subtitle="Handpicked solutions for your industrial needs"
        />
      </div>
    </section>
  )
}
