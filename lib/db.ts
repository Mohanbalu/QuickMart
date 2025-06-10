import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL || "")

export { sql }

export interface DatabaseUser {
  id: number
  email: string
  password_hash: string
  first_name: string
  last_name: string
  phone?: string
  loyalty_points: number
  role: string
  created_at: Date
  updated_at: Date
}

export interface DatabaseStore {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
  phone?: string
  hours_open: string
  hours_close: string
  is_active: boolean
  created_at: Date
}

export interface DatabaseProduct {
  id: number
  name: string
  description?: string
  price: number
  category_id: number
  image_url?: string
  barcode?: string
  stock_quantity: number
  is_active: boolean
  loyalty_points_earned: number
  created_at: Date
  updated_at: Date
}

export interface DatabaseOrder {
  id: number
  user_id: number
  store_id: number
  total_amount: number
  status: string
  order_type: string
  delivery_address?: string
  payment_method?: string
  loyalty_points_used: number
  loyalty_points_earned: number
  created_at: Date
  updated_at: Date
}

export interface DatabaseCategory {
  id: number
  name: string
  description?: string
  image_url?: string
  is_active: boolean
  created_at: Date
}

export interface DatabasePromotion {
  id: number
  title: string
  description?: string
  image_url?: string
  promo_type: string
  discount_percentage?: number
  start_date: Date
  end_date: Date
  is_active: boolean
  created_at: Date
}
