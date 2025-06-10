import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("category")
    const search = searchParams.get("search")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = (page - 1) * limit

    let query = `
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true
    `
    const params: any[] = []

    if (categoryId) {
      query += ` AND p.category_id = $${params.length + 1}`
      params.push(Number.parseInt(categoryId))
    }

    if (search) {
      query += ` AND (p.name ILIKE $${params.length + 1} OR p.description ILIKE $${params.length + 1})`
      params.push(`%${search}%`)
    }

    query += ` ORDER BY p.name LIMIT $${params.length + 1} OFFSET $${params.length + 2}`
    params.push(limit, offset)

    const products = await sql(query, params)

    // Get total count for pagination
    let countQuery = `SELECT COUNT(*) FROM products WHERE is_active = true`
    const countParams: any[] = []

    if (categoryId) {
      countQuery += ` AND category_id = $${countParams.length + 1}`
      countParams.push(Number.parseInt(categoryId))
    }

    if (search) {
      countQuery += ` AND (name ILIKE $${countParams.length + 1} OR description ILIKE $${countParams.length + 1})`
      countParams.push(`%${search}%`)
    }

    const totalResult = await sql(countQuery, countParams)
    const total = Number.parseInt(totalResult[0].count)

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Products API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
