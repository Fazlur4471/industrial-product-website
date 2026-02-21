export type ProductCategory = 'trading' | 'manufacturing'
export type EnquiryStatus = 'new' | 'contacted' | 'closed'
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered'

export interface Product {
  id: string
  slug: string
  name: string
  category: ProductCategory
  price: number
  description: string
  longDescription: string
  images: string[]
  specs: {
    [key: string]: string | number
  }
  inStock: boolean
  featured?: boolean
  created_at?: string
  updated_at?: string
}

export interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  company: string
  productInterest: string
  message: string
  status: EnquiryStatus
  created_at: string
}

export interface Order {
  id: string
  name: string
  email: string
  phone: string
  company: string
  product: string
  quantity: number
  deliveryAddress: string
  status: OrderStatus
  created_at: string
}

export type AdminActivityType = 'product' | 'order' | 'enquiry'

export interface AdminActivity {
  id: string
  type: AdminActivityType
  title: string
  subtitle: string
  status?: string
  created_at: string
  href: string
}

export interface AdminDashboardData {
  totalProducts: number
  totalOrders: number
  totalEnquiries: number
  pendingOrders: number
  newEnquiries: number
  recentActivity: AdminActivity[]
}
