'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Trash2, CheckCircle, Clock, XCircle } from 'lucide-react'
import type { Enquiry } from '@/lib/types'

interface Props {
  enquiries: Enquiry[]
}

export default function EnquiriesClient({ enquiries }: Props) {
  const router = useRouter()
  const [items, setItems] = useState(enquiries)
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

  const handleStatusChange = async (id: string, status: Enquiry['status']) => {
    setBusy(id, true)
    setError('')

    try {
      const response = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      const body = (await response.json().catch(() => null)) as Enquiry | { error?: string } | null
      if (!response.ok) {
        const errorMessage = body && typeof body === 'object' && 'error' in body ? body.error : undefined
        throw new Error(errorMessage || 'Failed to update status')
      }

      if (!body || !('id' in body)) {
        throw new Error('Unexpected enquiry response')
      }

      setItems((prev) => prev.map((item) => (item.id === id ? body : item)))
      router.refresh()
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : 'Failed to update enquiry')
    } finally {
      setBusy(id, false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this enquiry? This action cannot be undone.')) return

    setBusy(id, true)
    setError('')

    try {
      const response = await fetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' })
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(body?.error || 'Failed to delete enquiry')
      }

      setItems((prev) => prev.filter((item) => item.id !== id))
      router.refresh()
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete enquiry')
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
        <h1 className="text-3xl font-bold text-foreground">Enquiries</h1>
        <p className="text-muted-foreground mt-1">Manage customer enquiries</p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      {items.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No enquiries yet</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Product
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
                {items.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {formatDate(enquiry.created_at)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {enquiry.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      <a
                        href={`mailto:${enquiry.email}`}
                        className="hover:text-foreground transition-colors"
                      >
                        {enquiry.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {enquiry.productInterest}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {enquiry.status === 'new' && (
                          <Clock size={16} className="text-yellow-500" />
                        )}
                        {enquiry.status === 'contacted' && (
                          <CheckCircle size={16} className="text-blue-500" />
                        )}
                        {enquiry.status === 'closed' && (
                          <XCircle size={16} className="text-green-500" />
                        )}
                        <select
                          value={enquiry.status}
                          disabled={busyById[enquiry.id] === true}
                          onChange={(event) =>
                            handleStatusChange(enquiry.id, event.target.value as Enquiry['status'])
                          }
                          className="rounded-md border border-border bg-secondary px-2 py-1 text-xs capitalize text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                          <option value="new">new</option>
                          <option value="contacted">contacted</option>
                          <option value="closed">closed</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleDelete(enquiry.id)}
                        disabled={busyById[enquiry.id] === true}
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-secondary rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
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
