import { useEffect, useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Star, Check, X, Clock } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { seedReviews, type Review } from "../../../data/seedData";

export function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // TODO: Replace with actual API call
      // Using centralized seed data for consistency
      setTimeout(() => {
        setReviews(seedReviews);
        setLoading(false);
      }, 400);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  const updateReviewStatus = async (reviewId: string, status: "Approved" | "Rejected") => {
    try {
      // TODO: Implement API call
      setReviews(
        reviews.map((review) =>
          review.id === reviewId ? { ...review, status } : review
        )
      );
      toast.success(`Review ${status.toLowerCase()} successfully`);
    } catch (error) {
      console.error("Error updating review status:", error);
      toast.error("Failed to update review status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === "all") return true;
    return review.status.toLowerCase() === filter;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter((r) => r.status === "Pending").length,
    approved: reviews.filter((r) => r.status === "Approved").length,
    rejected: reviews.filter((r) => r.status === "Rejected").length,
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Reviews Management</h1>
          <p className="text-gray-600">
            Moderate customer reviews and testimonials
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card
            className={`cursor-pointer ${filter === "all" ? "border-purple-500 border-2" : ""}`}
            onClick={() => setFilter("all")}
          >
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Reviews</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer ${filter === "pending" ? "border-purple-500 border-2" : ""}`}
            onClick={() => setFilter("pending")}
          >
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer ${filter === "approved" ? "border-purple-500 border-2" : ""}`}
            onClick={() => setFilter("approved")}
          >
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer ${filter === "rejected" ? "border-purple-500 border-2" : ""}`}
            onClick={() => setFilter("rejected")}
          >
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                <p className="text-sm text-gray-600">Rejected</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">
                          {review.customerName}
                        </CardTitle>
                        <Badge className={getStatusColor(review.status)}>
                          {review.status}
                        </Badge>
                        {review.allowGallery && (
                          <Badge variant="outline" className="bg-purple-50 text-purple-600">
                            Gallery Permission
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Order: {review.orderId}</span>
                        <span>{review.submittedDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-5 ${
                            i < review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  {review.status === "Pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => updateReviewStatus(review.id, "Approved")}
                      >
                        <Check className="size-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateReviewStatus(review.id, "Rejected")}
                      >
                        <X className="size-4 mr-2" />
                        Reject
                      </Button>
                      <Button size="sm" variant="outline">
                        <Clock className="size-4 mr-2" />
                        View Order
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {filteredReviews.length === 0 && (
            <Card>
              <CardContent className="text-center py-12 text-gray-500">
                No {filter !== "all" ? filter : ""} reviews found
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}