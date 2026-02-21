import DashboardClient from '@/components/admin/DashboardClient'
import { getAdminDashboardData } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const dashboardData = await getAdminDashboardData()

  return <DashboardClient dashboardData={dashboardData} />
}
