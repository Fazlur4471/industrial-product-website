import { getAllEnquiries } from '@/lib/data'
import { motion } from 'framer-motion'
import { Trash2, CheckCircle, Clock, XCircle } from 'lucide-react'
import type { Enquiry } from '@/lib/types'

export default async function AdminEnquiriesPage() {
  const enquiries = await getAllEnquiries()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
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

      {enquiries.length === 0 ? (
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
                {enquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {formatDate(enquiry.timestamp)}
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
                        {enquiry.status === 'new' && <Clock size={16} className="text-yellow-500" />}
                        {enquiry.status === 'contacted' && <CheckCircle size={16} className="text-blue-500" />}
                        {enquiry.status === 'closed' && <XCircle size={16} className="text-green-500" />}
                        <span className="capitalize text-xs font-semibold">{enquiry.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
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
