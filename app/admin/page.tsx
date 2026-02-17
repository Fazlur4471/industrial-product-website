'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, MessageSquare, ShoppingCart, TrendingUp } from 'lucide-react'
import { products } from '@/lib/constants'

export default function AdminDashboard() {
  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'text-blue-400',
      href: '/admin/products',
    },
    {
      label: 'Enquiries',
      value: '0',
      icon: MessageSquare,
      color: 'text-green-400',
      href: '/admin/enquiries',
    },
    {
      label: 'Orders',
      value: '0',
      icon: ShoppingCart,
      color: 'text-amber-400',
      href: '/admin/orders',
    },
    {
      label: 'Revenue',
      value: '$0',
      icon: TrendingUp,
      color: 'text-purple-400',
      href: '#',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to Fast-Map Admin Portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-accent hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} opacity-80`}>
                    <Icon size={32} />
                  </div>
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Activities</h2>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">No recent activities</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link
              href="/admin/products"
              className="block px-4 py-2 text-sm font-medium text-accent-foreground bg-accent rounded-lg hover:bg-accent/90 transition-colors text-center"
            >
              Manage Products
            </Link>
            <Link
              href="/admin/enquiries"
              className="block px-4 py-2 text-sm font-medium text-foreground bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-center"
            >
              View Enquiries
            </Link>
            <Link
              href="/admin/orders"
              className="block px-4 py-2 text-sm font-medium text-foreground bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-center"
            >
              View Orders
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
