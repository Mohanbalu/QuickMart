import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orders = await sql`
      SELECT o.*, s.name as store_name, s.address as store_address
      FROM orders o
      LEFT JOIN stores s ON o.store_id = s.id
      WHERE o.user_id = ${user.userId}
      ORDER BY o.created_at DESC
    `

    // Get order items for each order
    for (const order of orders) {
      const items = await sql`
        SELECT oi.*, p.name as product_name, p.image_url
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ${order.id}
      `
      order.items = items
    }

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Orders API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { storeId, items, orderType, deliveryAddress, paymentMethod, loyaltyPointsUsed = 0 } = await request.json()

    if (!storeId || !items || items.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Calculate total amount and loyalty points
    let totalAmount = 0
    let loyaltyPointsEarned = 0

    for (const item of items) {
      const product = await sql`
        SELECT price, loyalty_points_earned FROM products WHERE id = ${item.productId}
      `
      if (product.length === 0) {
        return NextResponse.json({ error: `Product ${item.productId} not found` }, { status: 400 })
      }
      totalAmount += product[0].price * item.quantity
      loyaltyPointsEarned += product[0].loyalty_points_earned * item.quantity
    }

    // Apply loyalty points discount (1 point = $0.01)
    const loyaltyDiscount = loyaltyPointsUsed * 0.01
    totalAmount = Math.max(0, totalAmount - loyaltyDiscount)

    // Create order
    const newOrder = await sql`
      INSERT INTO orders (
        user_id, store_id, total_amount, order_type, 
        delivery_address, payment_method, loyalty_points_used, loyalty_points_earned
      )
      VALUES (
        ${user.userId}, ${storeId}, ${totalAmount}, ${orderType},
        ${deliveryAddress || null}, ${paymentMethod || null}, 
        ${loyaltyPointsUsed}, ${loyaltyPointsEarned}
      )
      RETURNING *
    `

    const order = newOrder[0]

    // Create order items
    for (const item of items) {
      const product = await sql`
        SELECT price FROM products WHERE id = ${item.productId}
      `
      const unitPrice = product[0].price
      const totalPrice = unitPrice * item.quantity

      await sql`
        INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
        VALUES (${order.id}, ${item.productId}, ${item.quantity}, ${unitPrice}, ${totalPrice})
      `
    }

    // Update user loyalty points
    await sql`
      UPDATE users 
      SET loyalty_points = loyalty_points - ${loyaltyPointsUsed} + ${loyaltyPointsEarned}
      WHERE id = ${user.userId}
    `

    // Record loyalty transaction
    if (loyaltyPointsUsed > 0) {
      await sql`
        INSERT INTO loyalty_transactions (user_id, order_id, points_change, transaction_type, description)
        VALUES (${user.userId}, ${order.id}, ${-loyaltyPointsUsed}, 'redeemed', 'Points redeemed for order')
      `
    }

    if (loyaltyPointsEarned > 0) {
      await sql`
        INSERT INTO loyalty_transactions (user_id, order_id, points_change, transaction_type, description)
        VALUES (${user.userId}, ${order.id}, ${loyaltyPointsEarned}, 'earned', 'Points earned from purchase')
      `
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error("Create order error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
