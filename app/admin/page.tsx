"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, Package, ShoppingCart, Users, TrendingUp, DollarSign, Star, Gift } from "lucide-react"

interface DashboardStats {
  totalStores: number
  totalProducts: number
  totalOrders: number
  totalUsers: number
  totalRevenue: number
  loyaltyMembers: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStores: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    loyaltyMembers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // Simulate API calls for dashboard stats
      setStats({
        totalStores: 5,
        totalProducts: 156,
        totalOrders: 1247,
        totalUsers: 3892,
        totalRevenue: 45678.9,
        loyaltyMembers: 2341,
      })
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-red-600">QuickMart Admin Dashboard</h1>
            <Button onClick={() => window.history.back()} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Store className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Stores</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStores}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Products</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Loyalty Members</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.loyaltyMembers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="stores" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="stores">Stores</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="stores">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Store Management</span>
                  <Button>Add New Store</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "QuickMart Downtown", address: "123 Main St, Downtown", status: "Active" },
                    { name: "QuickMart Uptown", address: "456 Broadway, Uptown", status: "Active" },
                    { name: "QuickMart Midtown", address: "789 5th Ave, Midtown", status: "Active" },
                    { name: "QuickMart East Side", address: "321 Park Ave, East Side", status: "Active" },
                    { name: "QuickMart West Side", address: "654 Columbus Ave, West Side", status: "Maintenance" },
                  ].map((store, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{store.name}</h4>
                        <p className="text-sm text-gray-600">{store.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={store.status === "Active" ? "default" : "secondary"}>{store.status}</Badge>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Product Management</span>
                  <Button>Add New Product</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Coca-Cola 20oz", category: "Beverages", price: 2.49, stock: 100 },
                    { name: "Doritos Nacho Cheese", category: "Snacks", price: 3.49, stock: 75 },
                    { name: "Red Bull Energy Drink", category: "Beverages", price: 3.99, stock: 50 },
                    { name: "7-Select Sandwich", category: "Food", price: 5.99, stock: 25 },
                    { name: "Hand Sanitizer", category: "Personal Care", price: 1.99, stock: 100 },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.category}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">${product.price}</span>
                        <Badge variant={product.stock < 30 ? "destructive" : "default"}>Stock: {product.stock}</Badge>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "#1247", customer: "John Doe", total: 15.47, status: "Delivered", time: "2 hours ago" },
                    { id: "#1246", customer: "Jane Smith", total: 23.99, status: "In Transit", time: "3 hours ago" },
                    { id: "#1245", customer: "Mike Johnson", total: 8.97, status: "Preparing", time: "4 hours ago" },
                    { id: "#1244", customer: "Sarah Wilson", total: 31.45, status: "Delivered", time: "5 hours ago" },
                    { id: "#1243", customer: "Tom Brown", total: 12.5, status: "Cancelled", time: "6 hours ago" },
                  ].map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{order.id}</h4>
                        <p className="text-sm text-gray-600">
                          {order.customer} • {order.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">${order.total}</span>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "In Transit"
                                ? "secondary"
                                : order.status === "Preparing"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="promotions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Promotional Campaigns</span>
                  <Button>Create Promotion</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Summer Energy Boost",
                      type: "Discount",
                      discount: "33% OFF",
                      status: "Active",
                      ends: "30 days",
                    },
                    {
                      title: "Movie Night Combo",
                      type: "Tie-in",
                      discount: "15% OFF",
                      status: "Active",
                      ends: "14 days",
                    },
                    {
                      title: "Win a Year of Free Coffee",
                      type: "Sweepstakes",
                      discount: "Prize",
                      status: "Active",
                      ends: "60 days",
                    },
                    {
                      title: "Back to School Special",
                      type: "Discount",
                      discount: "20% OFF",
                      status: "Active",
                      ends: "21 days",
                    },
                  ].map((promo, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{promo.title}</h4>
                        <p className="text-sm text-gray-600">
                          {promo.type} • Ends in {promo.ends}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-red-600">{promo.discount}</span>
                        <Badge variant="default">{promo.status}</Badge>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Sales Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Today</span>
                      <span className="font-semibold">$1,247.50</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>This Week</span>
                      <span className="font-semibold">$8,932.75</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>This Month</span>
                      <span className="font-semibold">$34,567.25</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>This Year</span>
                      <span className="font-semibold">$456,789.50</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    Loyalty Program
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Active Members</span>
                      <span className="font-semibold">2,341</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Points Redeemed Today</span>
                      <span className="font-semibold">15,670</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Points per User</span>
                      <span className="font-semibold">127</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Top Reward</span>
                      <span className="font-semibold">Free Coffee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
