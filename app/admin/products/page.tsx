import { getProducts } from '@/lib/data'
import { motion } from 'framer-motion'
import { Edit2, Trash2, Plus } from 'lucide-react'

export default async function AdminProductsPage() {
  const productList = await getProducts()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog</p>
        </div>
        <button className="flex items-center gap-2 bg-accent text-accent-foreground font-semibold px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Product Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {productList.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground capitalize">
                    {product.category}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.inStock
                          ? 'bg-accent/20 text-accent'
                          : 'bg-destructive/20 text-destructive'
                      }`}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-secondary rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}
