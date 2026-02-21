import { createClient } from './supabase/server'
import type { AdminActivity, AdminDashboardData, Enquiry, Order, Product } from './types'

export async function getProducts() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data as Product
}

export async function getProductsByCategory(category: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('featured', { ascending: false })

  if (error) {
    console.error('Error fetching products by category:', error)
    return []
  }

  return data as Product[]
}

export async function getFeaturedProducts() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(6)

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return data as Product[]
}

export async function getAllEnquiries() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching enquiries:', error)
    return []
  }

  return data as Enquiry[]
}

export async function getAllOrders() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }

  return data as Order[]
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const supabase = await createClient()

  const [
    productsCountResult,
    ordersCountResult,
    enquiriesCountResult,
    pendingOrdersCountResult,
    newEnquiriesCountResult,
    recentProductsResult,
    recentOrdersResult,
    recentEnquiriesResult,
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('enquiries').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase
      .from('products')
      .select('id, name, category, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('orders')
      .select('id, name, product, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('enquiries')
      .select('id, name, productInterest, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const activities: AdminActivity[] = [
    ...((recentProductsResult.data ?? []).map((product) => ({
      id: product.id,
      type: 'product' as const,
      title: `Product added: ${product.name}`,
      subtitle: `${product.category} category`,
      created_at: product.created_at ?? new Date(0).toISOString(),
      href: '/admin/products',
    }))),
    ...((recentOrdersResult.data ?? []).map((order) => ({
      id: order.id,
      type: 'order' as const,
      title: `Order from ${order.name}`,
      subtitle: `${order.product}`,
      status: order.status,
      created_at: order.created_at ?? new Date(0).toISOString(),
      href: '/admin/orders',
    }))),
    ...((recentEnquiriesResult.data ?? []).map((enquiry) => ({
      id: enquiry.id,
      type: 'enquiry' as const,
      title: `Enquiry from ${enquiry.name}`,
      subtitle: `${enquiry.productInterest}`,
      status: enquiry.status,
      created_at: enquiry.created_at ?? new Date(0).toISOString(),
      href: '/admin/enquiries',
    }))),
  ]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10)

  return {
    totalProducts: productsCountResult.count ?? 0,
    totalOrders: ordersCountResult.count ?? 0,
    totalEnquiries: enquiriesCountResult.count ?? 0,
    pendingOrders: pendingOrdersCountResult.count ?? 0,
    newEnquiries: newEnquiriesCountResult.count ?? 0,
    recentActivity: activities,
  }
}

export async function createEnquiry(enquiry: Omit<Enquiry, 'id' | 'created_at'>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('enquiries')
    .insert([enquiry])
    .select()
    .single()

  if (error) {
    console.error('Error creating enquiry:', error)
    throw error
  }

  return data as Enquiry
}

export async function createOrder(order: Omit<Order, 'id' | 'created_at'>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single()

  if (error) {
    console.error('Error creating order:', error)
    throw error
  }

  return data as Order
}

export async function updateEnquiryStatus(id: string, status: 'new' | 'contacted' | 'closed') {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('enquiries')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating enquiry status:', error)
    throw error
  }

  return data as Enquiry
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

export async function updateProduct(id: string, product: Partial<Product>) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating product:', error)
    throw error
  }

  return data as Product
}
