'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock3, MessageSquare, Package, ShoppingCart } from 'lucide-react'
import type { AdminDashboardData } from '@/lib/types'

interface Props {
  dashboardData: AdminDashboardData
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function getStatusClass(status?: string) {
  if (!status) return 'text-muted-foreground'
  if (status === 'pending' || status === 'new') return 'text-amber-400'
  if (status === 'processing' || status === 'contacted') return 'text-blue-400'
  if (status === 'shipped' || status === 'delivered' || status === 'closed') return 'text-green-400'
  return 'text-muted-foreground'
}

export default function DashboardClient({ dashboardData }: Props) {
  const stats = [
    {
      label: 'Total Products',
      value: dashboardData.totalProducts,
      hint: 'Live from products table',
      icon: Package,
      color: 'text-blue-400',
      href: '/admin/products',
    },
    {
      label: 'Total Enquiries',
      value: dashboardData.totalEnquiries,
      hint: `${dashboardData.newEnquiries} new`,
      icon: MessageSquare,
      color: 'text-green-400',
      href: '/admin/enquiries',
    },
    {
      label: 'Total Orders',
      value: dashboardData.totalOrders,
      hint: `${dashboardData.pendingOrders} pending`,
      icon: ShoppingCart,
      color: 'text-amber-400',
      href: '/admin/orders',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Live operational snapshot from Supabase.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href} className="block">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{stat.hint}</p>
                  </div>
                  <Icon size={30} className={stat.color} />
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h2 className="mb-4 text-xl font-bold text-foreground">Recent Activity</h2>
          {dashboardData.recentActivity.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent activity yet.</p>
          ) : (
            <div className="space-y-3">
              {dashboardData.recentActivity.map((activity) => (
                <Link
                  key={`${activity.type}-${activity.id}`}
                  href={activity.href}
                  className="flex items-start justify-between rounded-lg border border-border px-3 py-3 transition-colors hover:bg-secondary/30"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
                    {activity.status ? (
                      <p className={`mt-1 text-xs font-semibold capitalize ${getStatusClass(activity.status)}`}>
                        {activity.status}
                      </p>
                    ) : null}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock3 size={12} />
                    {formatDate(activity.created_at)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h2 className="mb-4 text-xl font-bold text-foreground">Quick Actions</h2>
          <div className="space-y-2">
            <Link
              href="/admin/products"
              className="block rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Manage Products
            </Link>
            <Link
              href="/admin/enquiries"
              className="block rounded-lg bg-secondary px-4 py-2 text-center text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
            >
              Manage Enquiries
            </Link>
            <Link
              href="/admin/orders"
              className="block rounded-lg bg-secondary px-4 py-2 text-center text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
            >
              Manage Orders
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
