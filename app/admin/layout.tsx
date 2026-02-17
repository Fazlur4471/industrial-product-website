import { Sidebar } from '@/components/admin/Sidebar'

export const metadata = {
  title: 'Admin Dashboard - Fast-Map',
  description: 'Manage products, enquiries, and orders',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 md:ml-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
