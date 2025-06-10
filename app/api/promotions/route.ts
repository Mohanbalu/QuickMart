import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const promotions = await sql`
      SELECT *
      FROM promotions 
      WHERE is_active = true 
        AND start_date <= CURRENT_TIMESTAMP 
        AND end_date >= CURRENT_TIMESTAMP
      ORDER BY created_at DESC
    `

    return NextResponse.json({ promotions })
  } catch (error) {
    console.error("Promotions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
