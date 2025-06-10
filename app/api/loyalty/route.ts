import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's current points
    const userResult = await sql`
      SELECT loyalty_points FROM users WHERE id = ${user.userId}
    `

    if (userResult.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const currentPoints = userResult[0].loyalty_points

    // Get available rewards
    const rewards = await sql`
      SELECT * FROM loyalty_rewards 
      WHERE is_active = true 
      ORDER BY points_required ASC
    `

    // Get recent transactions
    const transactions = await sql`
      SELECT * FROM loyalty_transactions 
      WHERE user_id = ${user.userId}
      ORDER BY created_at DESC
      LIMIT 10
    `

    return NextResponse.json({
      currentPoints,
      rewards,
      transactions,
    })
  } catch (error) {
    console.error("Loyalty API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
