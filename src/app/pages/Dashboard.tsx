import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { Clock, Download, Eye, Package, Star } from "lucide-react";

export function Dashboard() {
  // Mock orders data
  const orders = [
    {
      id: "ord_abc123",
      package: "Professional",
      photos: 25,
      status: "completed",
      progress: 100,
      createdAt: "2026-02-28",
      completedAt: "2026-03-01",
      urgency: "Express",
      canReview: true,
      hasReviewed: false,
    },
    {
      id: "ord_def456",
      package: "Premium",
      photos: 45,
      status: "in-progress",
      progress: 65,
      createdAt: "2026-03-01",
      completedAt: null,
      urgency: "Standard",
      canReview: false,
      hasReviewed: false,
    },
    {
      id: "ord_ghi789",
      package: "Starter",
      photos: 8,
      status: "completed",
      progress: 100,
      createdAt: "2026-02-20",
      completedAt: "2026-02-25",
      urgency: "Standard",
      canReview: true,
      hasReviewed: true,
    },
    {
      id: "ord_jkl012",
      package: "Professional",
      photos: 30,
      status: "pending",
      progress: 10,
      createdAt: "2026-03-02",
      completedAt: null,
      urgency: "Rush",
      canReview: false,
      hasReviewed: false,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
      "in-progress": { label: "In Progress", className: "bg-blue-100 text-blue-800" },
      completed: { label: "Completed", className: "bg-green-100 text-green-800" },
    };

    const variant = variants[status] || variants.pending;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const getUrgencyBadge = (urgency: string) => {
    const variants: Record<string, string> = {
      Standard: "bg-gray-100 text-gray-800",
      Express: "bg-orange-100 text-orange-800",
      Rush: "bg-red-100 text-red-800",
    };

    return <Badge className={variants[urgency] || variants.Standard}>{urgency}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Orders
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">Track your photo editing orders and download completed work</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl sm:text-3xl font-bold">{orders.length}</p>
                </div>
                <Package className="size-10 text-pink-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl sm:text-3xl font-bold">
                    {orders.filter((o) => o.status === "in-progress").length}
                  </p>
                </div>
                <Clock className="size-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Completed</p>
                  <p className="text-2xl sm:text-3xl font-bold">
                    {orders.filter((o) => o.status === "completed").length}
                  </p>
                </div>
                <Download className="size-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Photos Edited</p>
                  <p className="text-2xl sm:text-3xl font-bold">
                    {orders.reduce((sum, order) => sum + order.photos, 0)}
                  </p>
                </div>
                <Eye className="size-10 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      Order #{order.id}
                      {getStatusBadge(order.status)}
                      {getUrgencyBadge(order.urgency)}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {order.package} Package • {order.photos} photos • Created on {order.createdAt}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/order/${order.id}`}>
                      <Button variant="outline">
                        <Eye className="mr-2 size-4" />
                        View Details
                      </Button>
                    </Link>
                    {order.status === "completed" && (
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                        <Download className="mr-2 size-4" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Bar */}
                {order.status !== "completed" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold">{order.progress}%</span>
                    </div>
                    <Progress value={order.progress} className="h-2" />
                    <p className="text-sm text-gray-600">
                      {order.status === "pending"
                        ? "Your order is being prepared..."
                        : `${Math.floor((order.progress / 100) * order.photos)} of ${order.photos} photos edited`}
                    </p>
                  </div>
                )}

                {/* Completion Info */}
                {order.status === "completed" && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Download className="size-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-green-900">
                          Your photos are ready!
                        </p>
                        <p className="text-sm text-green-700">
                          Completed on {order.completedAt}. Your edited photos are ready to download.
                        </p>
                      </div>
                    </div>

                    {/* Review Section */}
                    {order.canReview && !order.hasReviewed && (
                      <div className="mt-4 pt-4 border-t border-green-200">
                        <Link to={`/order/${order.id}`}>
                          <Button variant="outline" size="sm" className="w-full md:w-auto">
                            <Star className="mr-2 size-4" />
                            Leave a Review
                          </Button>
                        </Link>
                      </div>
                    )}

                    {order.hasReviewed && (
                      <div className="mt-4 pt-4 border-t border-green-200">
                        <p className="text-sm text-green-700 flex items-center gap-2">
                          <Star className="size-4 fill-green-600 text-green-600" />
                          Thank you for your review!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <Card className="text-center py-16">
            <CardContent>
              <Package className="size-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6">
                Upload your photos to get started with professional editing
              </p>
              <Link to="/upload">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  Upload Photos
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}