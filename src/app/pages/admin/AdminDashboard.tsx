import { useEffect, useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Package
} from "lucide-react";
import { motion } from "motion/react";
import { calculateDashboardStats } from "../../../data/seedData";

interface DashboardStats {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  totalRevenue: number;
  totalUsers: number;
  pendingReviews: number;
  galleryPhotos: number;
  activeEvents: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    activeOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    pendingReviews: 0,
    galleryPhotos: 0,
    activeEvents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // TODO: Replace with actual API call
      // Using centralized seed data for consistency
      setTimeout(() => {
        setStats(calculateDashboardStats());
        setLoading(false);
      }, 500); // Reduced from 1000ms to 500ms
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-100",
      description: `${stats.activeOrders} active orders`,
    },
    {
      title: "Total Revenue",
      value: `₦${(stats.totalRevenue / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-100",
      description: "All time earnings",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-100",
      description: "Registered customers",
    },
    {
      title: "Completed Orders",
      value: stats.completedOrders,
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      description: "Successfully delivered",
    },
    {
      title: "Active Orders",
      value: stats.activeOrders,
      icon: Clock,
      color: "text-orange-600",
      bg: "bg-orange-100",
      description: "In progress",
    },
    {
      title: "Pending Reviews",
      value: stats.pendingReviews,
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-100",
      description: "Awaiting moderation",
    },
    {
      title: "Gallery Photos",
      value: stats.galleryPhotos,
      icon: Package,
      color: "text-pink-600",
      bg: "bg-pink-100",
      description: "Public showcase",
    },
    {
      title: "Active Events",
      value: stats.activeEvents,
      icon: TrendingUp,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
      description: "Event/Studio sessions",
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div>
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="size-12 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                  <div className="h-3 w-32 bg-gray-200 rounded animate-pulse mt-3" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions Skeleton */}
          <Card>
            <CardHeader>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="size-8 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with FreshEdit today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`${stat.bg} p-2 rounded-lg`}>
                      <Icon className={`size-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <CardDescription className="text-xs">
                      {stat.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.a
              href="/admin/orders"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
            >
              <ShoppingBag className="size-8 text-purple-600 mb-2" />
              <h3 className="font-semibold mb-1">Manage Orders</h3>
              <p className="text-sm text-gray-600">
                View and update order statuses
              </p>
            </motion.a>

            <motion.a
              href="/admin/reviews"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
            >
              <AlertCircle className="size-8 text-red-600 mb-2" />
              <h3 className="font-semibold mb-1">Review Moderation</h3>
              <p className="text-sm text-gray-600">
                {stats.pendingReviews} pending reviews
              </p>
            </motion.a>

            <motion.a
              href="/admin/events"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-4 border rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
            >
              <TrendingUp className="size-8 text-indigo-600 mb-2" />
              <h3 className="font-semibold mb-1">Event Management</h3>
              <p className="text-sm text-gray-600">
                Manage event codes and sessions
              </p>
            </motion.a>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}