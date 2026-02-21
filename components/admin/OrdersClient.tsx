'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import type { Order } from '@/lib/types'

interface Props {
  orders: Order[]
}

export default function OrdersClient({ orders }: Props) {
  const router = useRouter()
  const [items, setItems] = useState(orders)
  const [busyById, setBusyById] = useState<Record<string, boolean>>({})
  const [error, setError] = useState('')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const setBusy = (id: string, busy: boolean) => {
    setBusyById((prev) => ({ ...prev, [id]: busy }))
  }

  const handleStatusChange = async (id: string, status: Order['status']) => {
    setBusy(id, true)
    setError('')

    try {
      const response = await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      const body = (await response.json().catch(() => null)) as Order | { error?: string } | null
      if (!response.ok) {
        const errorMessage = body && typeof body === 'object' && 'error' in body ? body.error : undefined
        throw new Error(errorMessage || 'Failed to update status')
      }

      if (!body || !('id' in body)) {
        throw new Error('Unexpected order response')
      }

      setItems((prev) => prev.map((item) => (item.id === id ? body : item)))
      router.refresh()
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : 'Failed to update order')
    } finally {
      setBusy(id, false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this order? This action cannot be undone.')) return

    setBusy(id, true)
    setError('')

    try {
      const response = await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(body?.error || 'Failed to delete order')
      }

      setItems((prev) => prev.filter((item) => item.id !== id))
      router.refresh()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete order')
    } finally {
      setBusy(id, false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage customer orders</p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      {items.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No orders yet</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-4 text-sm text-muted-foreground">{formatDate(order.created_at)}</td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-foreground">{order.name}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-foreground">{order.product}</p>
                      <p className="text-xs text-muted-foreground">Qty: {order.quantity}</p>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={order.status}
                        disabled={busyById[order.id] === true}
                        onChange={(event) => handleStatusChange(order.id, event.target.value as Order['status'])}
                        className="rounded-md border border-border bg-secondary px-2 py-1 text-xs capitalize text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="pending">pending</option>
                        <option value="processing">processing</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleDelete(order.id)}
                        disabled={busyById[order.id] === true}
                        className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-red-400 disabled:opacity-60"
                        title="Delete order"
                      >
                        <Trash2 size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  )
}
