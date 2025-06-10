import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, ShoppingCart, Gift, Zap } from "lucide-react"
import Link from "next/link"

async function getPromotions() {
  try {
    const res = await fetch("/api/promotions", {
      cache: "no-store",
    })
    if (!res.ok) throw new Error("Failed to fetch")
    return res.json()
  } catch {
    return { promotions: [] }
  }
}

async function getCategories() {
  try {
    const res = await fetch("/api/categories", {
      cache: "no-store",
    })
    if (!res.ok) throw new Error("Failed to fetch")
    return res.json()
  } catch {
    return { categories: [] }
  }
}

function PromotionCard({ promotion }: { promotion: any }) {
  return (
    <Card className="min-w-[300px] bg-gradient-to-r from-red-500 to-pink-500 text-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="bg-white/20 text-white">
            {promotion.promo_type === "sweepstakes"
              ? "Sweepstakes"
              : promotion.promo_type === "tie-in"
                ? "Special Offer"
                : "Discount"}
          </Badge>
          {promotion.discount_percentage && (
            <span className="text-2xl font-bold">{promotion.discount_percentage}% OFF</span>
          )}
        </div>
        <CardTitle className="text-xl">{promotion.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-white/90 mb-4">{promotion.description}</p>
        <Button variant="secondary" className="bg-white text-red-500 hover:bg-white/90">
          Learn More
        </Button>
      </CardContent>
    </Card>
  )
}

function CategoryCard({ category }: { category: any }) {
  return (
    <Link href={`/products?category=${category.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
          <p className="text-gray-600 text-sm">{category.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default async function HomePage() {
  const [{ promotions }, { categories }] = await Promise.all([getPromotions(), getCategories()])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-red-600">QuickMart</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/stores" className="text-gray-700 hover:text-red-600 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Find Stores
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-red-600 flex items-center">
                <ShoppingCart className="w-4 h-4 mr-1" />
                Shop
              </Link>
              <Link href="/loyalty" className="text-gray-700 hover:text-red-600 flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Rewards
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-red-600">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Your Neighborhood Store, Reimagined</h2>
          <p className="text-xl md:text-2xl mb-8 text-red-100">
            Fast delivery, great rewards, and everything you need in one app
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
              <Zap className="w-5 h-5 mr-2" />
              Order for Delivery
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              <MapPin className="w-5 h-5 mr-2" />
              Find Nearby Store
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Promotions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Featured Promotions</h3>
            <Link href="/promotions">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {promotions.map((promotion: any) => (
              <PromotionCard key={promotion.id} promotion={promotion} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Shop by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((category: any) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose QuickMart?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 text-center">
                <Zap className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Lightning Fast Delivery</h4>
                <p className="text-gray-600">Get your essentials delivered in 30 minutes or less</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8 text-center">
                <Gift className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Loyalty Rewards</h4>
                <p className="text-gray-600">Earn points with every purchase and redeem for free items</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8 text-center">
                <ShoppingCart className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-2">Mobile Checkout</h4>
                <p className="text-gray-600">Skip the line with our QR code mobile checkout</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">QuickMart</h5>
              <p className="text-gray-400">Your neighborhood convenience store, reimagined for the digital age.</p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/stores" className="hover:text-white">
                    Find Stores
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-white">
                    Shop Online
                  </Link>
                </li>
                <li>
                  <Link href="/loyalty" className="hover:text-white">
                    Rewards Program
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Connect</h5>
              <p className="text-gray-400">Follow us for the latest deals and updates</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 QuickMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
