export type ProductCategory = 'trading' | 'manufacturing'

export interface Product {
  id: string
  slug: string
  name: string
  category: ProductCategory
  description: string
  longDescription: string
  images: string[]
  specs: {
    [key: string]: string | number
  }
  inStock: boolean
  featured: boolean
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
  status: 'new' | 'contacted' | 'closed'
  created_at: string
}

export interface Order {
  id: string
  customerName: string
  email: string
  phone: string
  company: string
  product: string
  quantity: number
  deliveryAddress: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  created_at: string
}
