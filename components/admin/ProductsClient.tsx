'use client'

import { type FormEvent, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Pencil, Plus, Trash2, X } from 'lucide-react'
import type { Product } from '@/lib/types'

interface Props {
  products: Product[]
}

type ProductFormState = {
  name: string
  slug: string
  category: Product['category']
  price: string
  description: string
  longDescription: string
  imagesText: string
  specsText: string
  inStock: boolean
  featured: boolean
}

const defaultFormState: ProductFormState = {
  name: '',
  slug: '',
  category: 'trading',
  price: '',
  description: '',
  longDescription: '',
  imagesText: '',
  specsText: '{}',
  inStock: true,
  featured: false,
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function productToForm(product: Product): ProductFormState {
  return {
    name: product.name,
    slug: product.slug,
    category: product.category,
    price: product.price.toString(),
    description: product.description,
    longDescription: product.longDescription,
    imagesText: product.images.join('\n'),
    specsText: JSON.stringify(product.specs ?? {}, null, 2),
    inStock: product.inStock,
    featured: product.featured === true,
  }
}

export default function ProductsClient({ products }: Props) {
  const router = useRouter()
  const [items, setItems] = useState(products)
  const [formState, setFormState] = useState<ProductFormState>(defaultFormState)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const headingText = useMemo(
    () => (editingId ? 'Edit Product' : 'Create Product'),
    [editingId]
  )

  const resetForm = () => {
    setFormState(defaultFormState)
    setEditingId(null)
    setError('')
    setIsFormOpen(false)
  }

  const handleOpenCreate = () => {
    setFormState(defaultFormState)
    setEditingId(null)
    setError('')
    setIsFormOpen(true)
  }

  const handleOpenEdit = (product: Product) => {
    setFormState(productToForm(product))
    setEditingId(product.id)
    setError('')
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product? This action cannot be undone.')) return

    setDeletingId(id)
    setError('')

    try {
      const response = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(payload?.error || 'Failed to delete product')
      }

      setItems((prev) => prev.filter((product) => product.id !== id))
      router.refresh()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete product')
    } finally {
      setDeletingId(null)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    const parsedPrice = Number(formState.price)
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setError('Price must be a valid number.')
      setIsSubmitting(false)
      return
    }

    let specsObject: Record<string, string | number> = {}
    try {
      const parsedSpecs = JSON.parse(formState.specsText || '{}') as unknown
      if (typeof parsedSpecs !== 'object' || !parsedSpecs || Array.isArray(parsedSpecs)) {
        throw new Error('invalid specs')
      }
      specsObject = parsedSpecs as Record<string, string | number>
    } catch {
      setError('Specs must be valid JSON object format.')
      setIsSubmitting(false)
      return
    }

    const images = formState.imagesText
      .split(/\r?\n|,/)
      .map((value) => value.trim())
      .filter(Boolean)

    const payload = {
      name: formState.name.trim(),
      slug: slugify(formState.slug || formState.name),
      category: formState.category,
      price: parsedPrice,
      description: formState.description.trim(),
      longDescription: formState.longDescription.trim() || formState.description.trim(),
      images,
      specs: specsObject,
      inStock: formState.inStock,
      featured: formState.featured,
    }

    try {
      const response = await fetch(
        editingId ? `/api/admin/products/${editingId}` : '/api/admin/products',
        {
          method: editingId ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      const body = (await response.json().catch(() => null)) as Product | { error?: string } | null

      if (!response.ok) {
        const errorMessage = body && typeof body === 'object' && 'error' in body ? body.error : undefined
        throw new Error(errorMessage || 'Failed to save product')
      }

      if (!body || !('id' in body)) {
        throw new Error('Unexpected product response')
      }

      setItems((prev) =>
        editingId
          ? prev.map((item) => (item.id === body.id ? body : item))
          : [body, ...prev]
      )
      resetForm()
      router.refresh()
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to save product')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground">Products</h1>
        <p className="text-muted-foreground mt-1">Manage products</p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Total products: <span className="font-semibold text-foreground">{items.length}</span>
        </p>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {isFormOpen ? (
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">{headingText}</h2>
            <button
              onClick={resetForm}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Name</label>
                <input
                  required
                  value={formState.name}
                  onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Slug</label>
                <input
                  value={formState.slug}
                  onChange={(event) => setFormState((prev) => ({ ...prev, slug: event.target.value }))}
                  placeholder="auto-generated if empty"
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Category</label>
                <select
                  value={formState.category}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, category: event.target.value as Product['category'] }))
                  }
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="trading">Trading</option>
                  <option value="manufacturing">Manufacturing</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Price</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={formState.price}
                  onChange={(event) => setFormState((prev) => ({ ...prev, price: event.target.value }))}
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Description</label>
              <textarea
                required
                rows={2}
                value={formState.description}
                onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))}
                className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Long Description</label>
              <textarea
                rows={3}
                value={formState.longDescription}
                onChange={(event) => setFormState((prev) => ({ ...prev, longDescription: event.target.value }))}
                className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">
                  Images (comma or new line)
                </label>
                <textarea
                  rows={4}
                  value={formState.imagesText}
                  onChange={(event) => setFormState((prev) => ({ ...prev, imagesText: event.target.value }))}
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Specs JSON</label>
                <textarea
                  rows={4}
                  value={formState.specsText}
                  onChange={(event) => setFormState((prev) => ({ ...prev, specsText: event.target.value }))}
                  className="w-full rounded-lg border border-border bg-secondary px-3 py-2 font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-5">
              <label className="inline-flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={formState.inStock}
                  onChange={(event) => setFormState((prev) => ({ ...prev, inStock: event.target.checked }))}
                />
                In stock
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={formState.featured}
                  onChange={(event) => setFormState((prev) => ({ ...prev, featured: event.target.checked }))}
                />
                Featured
              </label>
            </div>

            {error ? (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </div>
            ) : null}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-60"
              >
                {isSubmitting ? 'Saving...' : editingId ? 'Update Product' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="rounded-xl border border-border bg-card p-6">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No products found.</p>
        ) : (
          items.map((product) => (
            <div key={product.id} className="flex items-start justify-between gap-3 border-b border-border py-4 last:border-none">
              <div>
                <p className="font-semibold text-foreground">{product.name}</p>
                <p className="text-sm capitalize text-muted-foreground">{product.category}</p>
                <p className="text-sm text-muted-foreground">Slug: {product.slug}</p>
                <p className="text-sm text-foreground">${product.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(product)}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  title="Edit product"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                  className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-red-400 disabled:opacity-60"
                  title="Delete product"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  )
}
