"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, Gift, DollarSign, ShoppingBag } from "lucide-react"

interface LoyaltyReward {
  id: number
  name: string
  description: string
  points_required: number
  reward_type: string
  reward_value: number
  is_active: boolean
}

interface LoyaltyTransaction {
  id: number
  points_change: number
  transaction_type: string
  description: string
  created_at: string
}

export default function LoyaltyPage() {
  const [currentPoints, setCurrentPoints] = useState(150)
  const [rewards, setRewards] = useState<LoyaltyReward[]>([])
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLoyaltyData()
  }, [])

  const fetchLoyaltyData = async () => {
    try {
      // Simulate API call - in real app, this would require authentication
      setRewards([
        {
          id: 1,
          name: "Free Coffee",
          description: "Get a free medium coffee",
          points_required: 50,
          reward_type: "free_item",
          reward_value: 2.99,
          is_active: true,
        },
        {
          id: 2,
          name: "Free Snack",
          description: "Choose any snack under $3",
          points_required: 75,
          reward_type: "free_item",
          reward_value: 3.0,
          is_active: true,
        },
        {
          id: 3,
          name: "Free Energy Drink",
          description: "Get any energy drink free",
          points_required: 80,
          reward_type: "free_item",
          reward_value: 3.99,
          is_active: true,
        },
        {
          id: 4,
          name: "$5 Off Purchase",
          description: "$5 off your next purchase of $20 or more",
          points_required: 100,
          reward_type: "discount",
          reward_value: 5.0,
          is_active: true,
        },
        {
          id: 5,
          name: "$10 Cashback",
          description: "$10 cashback to your account",
          points_required: 200,
          reward_type: "cashback",
          reward_value: 10.0,
          is_active: true,
        },
      ])

      setTransactions([
        {
          id: 1,
          points_change: 5,
          transaction_type: "earned",
          description: "Purchase at Downtown store",
          created_at: "2024-01-15T10:30:00Z",
        },
        {
          id: 2,
          points_change: 8,
          transaction_type: "earned",
          description: "Purchase at Uptown store",
          created_at: "2024-01-14T15:45:00Z",
        },
        {
          id: 3,
          points_change: -50,
          transaction_type: "redeemed",
          description: "Free Coffee reward",
          created_at: "2024-01-13T09:15:00Z",
        },
        {
          id: 4,
          points_change: 12,
          transaction_type: "earned",
          description: "Purchase at Midtown store",
          created_at: "2024-01-12T18:20:00Z",
        },
        {
          id: 5,
          points_change: 6,
          transaction_type: "earned",
          description: "Purchase at East Side store",
          created_at: "2024-01-11T12:10:00Z",
        },
      ])
    } catch (error) {
      console.error("Error fetching loyalty data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getRewardIcon = (rewardType: string) => {
    switch (rewardType) {
      case "free_item":
        return <Gift className="w-6 h-6" />
      case "discount":
        return <DollarSign className="w-6 h-6" />
      case "cashback":
        return <ShoppingBag className="w-6 h-6" />
      default:
        return <Star className="w-6 h-6" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getNextReward = () => {
    const availableRewards = rewards.filter((reward) => reward.points_required > currentPoints)
    return availableRewards.sort((a, b) => a.points_required - b.points_required)[0]
  }

  const nextReward = getNextReward()
  const progressToNext = nextReward ? (currentPoints / nextReward.points_required) * 100 : 100

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your rewards...</p>
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
            <h1 className="text-2xl font-bold text-red-600">QuickMart Rewards</h1>
            <Button onClick={() => window.history.back()} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Points Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                Your Loyalty Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-red-600 mb-2">{currentPoints}</div>
                <p className="text-gray-600">Available Points</p>
              </div>

              {nextReward && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to {nextReward.name}</span>
                    <span>
                      {currentPoints}/{nextReward.points_required} points
                    </span>
                  </div>
                  <Progress value={progressToNext} className="h-2" />
                  <p className="text-sm text-gray-600 text-center">
                    {nextReward.points_required - currentPoints} more points to unlock!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Points Earned This Month</span>
                <span className="font-semibold">31</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rewards Redeemed</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-semibold">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tier Status</span>
                <Badge variant="secondary">Silver</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Rewards */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Available Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward) => (
                <Card
                  key={reward.id}
                  className={`${currentPoints >= reward.points_required ? "border-green-500 bg-green-50" : "border-gray-200"}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`p-2 rounded-lg ${currentPoints >= reward.points_required ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}
                      >
                        {getRewardIcon(reward.reward_type)}
                      </div>
                      <Badge variant={currentPoints >= reward.points_required ? "default" : "secondary"}>
                        {reward.points_required} pts
                      </Badge>
                    </div>
                    <h4 className="font-semibold mb-2">{reward.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                    <Button size="sm" className="w-full" disabled={currentPoints < reward.points_required}>
                      {currentPoints >= reward.points_required ? "Redeem Now" : "Not Enough Points"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-full mr-4 ${transaction.transaction_type === "earned" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                    >
                      {transaction.transaction_type === "earned" ? (
                        <Star className="w-4 h-4" />
                      ) : (
                        <Gift className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{formatDate(transaction.created_at)}</p>
                    </div>
                  </div>
                  <div
                    className={`font-semibold ${transaction.transaction_type === "earned" ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.transaction_type === "earned" ? "+" : ""}
                    {transaction.points_change} pts
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
