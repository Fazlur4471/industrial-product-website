'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Package, FileText, ShoppingCart, Menu, X, LayoutDashboard, LogOut } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Enquiries', href: '/admin/enquiries', icon: FileText },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/login')
      router.refresh()
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-sidebar-primary text-sidebar-primary-foreground rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 z-40 md:z-0 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-sidebar-accent rounded flex items-center justify-center">
              <span className="text-sidebar-accent-foreground font-bold text-sm">ME</span>
            </div>
            <span className="font-bold text-sidebar-foreground">Maharaja Electronics</span>
          </Link>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive =
                item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-sidebar-border px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent disabled:opacity-60"
          >
            <LogOut size={16} />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
          <p className="text-xs text-sidebar-foreground/60">Admin Panel v1.0</p>
        </div>
      </aside>
    </>
  )
}
