import { getAllOrders } from '@/lib/data'
import OrdersClient from '@/components/admin/OrdersClient'

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage() {
  const orders = await getAllOrders()

  return <OrdersClient orders={orders} />
}
