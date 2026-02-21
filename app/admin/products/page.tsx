import { getProducts } from '@/lib/data'
import ProductsClient from '@/components/admin/ProductsClient'

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
  const products = await getProducts()

  return <ProductsClient products={products} />
}
