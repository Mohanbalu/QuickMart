import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const radius = searchParams.get("radius") || "10" // Default 10km radius

    let stores

    if (lat && lng) {
      // Calculate distance using Haversine formula
      stores = await sql`
        SELECT 
          id, name, address, latitude, longitude, phone, 
          hours_open, hours_close, is_active,
          (
            6371 * acos(
              cos(radians(${Number.parseFloat(lat)})) * 
              cos(radians(latitude)) * 
              cos(radians(longitude) - radians(${Number.parseFloat(lng)})) + 
              sin(radians(${Number.parseFloat(lat)})) * 
              sin(radians(latitude))
            )
          ) AS distance
        FROM stores 
        WHERE is_active = true
        HAVING distance < ${Number.parseFloat(radius)}
        ORDER BY distance
      `
    } else {
      // Return all active stores
      stores = await sql`
        SELECT id, name, address, latitude, longitude, phone, 
               hours_open, hours_close, is_active
        FROM stores 
        WHERE is_active = true
        ORDER BY name
      `
    }

    return NextResponse.json({ stores })
  } catch (error) {
    console.error("Stores API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, address, latitude, longitude, phone, hoursOpen, hoursClose } = await request.json()

    if (!name || !address || !latitude || !longitude) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newStore = await sql`
      INSERT INTO stores (name, address, latitude, longitude, phone, hours_open, hours_close)
      VALUES (${name}, ${address}, ${latitude}, ${longitude}, ${phone || null}, ${hoursOpen || "06:00:00"}, ${hoursClose || "23:00:00"})
      RETURNING *
    `

    return NextResponse.json({ store: newStore[0] })
  } catch (error) {
    console.error("Create store error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
