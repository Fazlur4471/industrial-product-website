import { getAllEnquiries } from '@/lib/data'
import EnquiriesClient from '@/components/admin/EnquiriesClient'

export const dynamic = 'force-dynamic'

export default async function AdminEnquiriesPage() {
  const enquiries = await getAllEnquiries()

  return <EnquiriesClient enquiries={enquiries} />
}
