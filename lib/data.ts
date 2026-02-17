import { createClient } from './supabase/server'
import type { Product, Enquiry, Order } from './types'

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
