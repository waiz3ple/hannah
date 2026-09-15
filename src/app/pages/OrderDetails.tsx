import {
    AlertTriangle,
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    Download,
    Image as ImageIcon,
    MessageCircle,
    Package,
    RefreshCw,
    Star,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";
import { getLocalImages } from "../utils/localImageLibrary";

export function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [allowGallery, setAllowGallery] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  // Dialog states
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [revisionDialogOpen, setRevisionDialogOpen] = useState(false);
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);

  // Contact Support form state
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubject, setContactSubject] = useState("");

  // Revision Request form state
  const [revisionDetails, setRevisionDetails] = useState("");
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);

  // Report Issue form state
  const [issueType, setIssueType] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  // Mock order data
  const order = {
    id: id || "ord_abc123",
    package: "Professional",
    photos: 25,
    status: "completed",
    progress: 100,
    createdAt: "2026-02-28",
    completedAt: "2026-03-01",
    urgency: "Express",
    price: 164,
    canReview: true,
    hasReviewed: false,
    editedPhotos: getLocalImages(6, 20),
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (review.trim() === "") {
      toast.error("Please write a review");
      return;
    }

    // Simulate review submission
    toast.success("Thank you for your review!");

    if (allowGallery) {
      toast.success("Your photos will be added to our public gallery!");
    }

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
      "in-progress": { label: "In Progress", className: "bg-blue-100 text-blue-800" },
      completed: { label: "Completed", className: "bg-green-100 text-green-800" },
    };

    const variant = variants[status] || variants.pending;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <Link to="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 size-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Order Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                Order{" "}
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  #{order.id}
                </span>
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                {getStatusBadge(order.status)}
                <Badge className="bg-purple-100 text-purple-800">{order.urgency}</Badge>
              </div>
            </div>
            {order.status === "completed" && (
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <Download className="mr-2 size-5" />
                Download All Photos
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle>Order Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Package className="size-5 text-pink-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Package</p>
                      <p className="font-semibold">{order.package}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ImageIcon className="size-5 text-purple-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Photos</p>
                      <p className="font-semibold">{order.photos} photos</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="size-5 text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Created</p>
                      <p className="font-semibold">{order.createdAt}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="size-5 text-green-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Completed</p>
                      <p className="font-semibold">{order.completedAt || "In progress"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="size-5 text-orange-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Delivery Speed</p>
                      <p className="font-semibold">{order.urgency}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            {order.status !== "completed" && (
              <Card>
                <CardHeader>
                  <CardTitle>Editing Progress</CardTitle>
                  <CardDescription>Track the progress of your photo editing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={order.progress} className="h-3" />
                  <p className="text-sm text-gray-600">
                    {Math.floor((order.progress / 100) * order.photos)} of {order.photos} photos
                    completed
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Edited Photos Preview */}
            {order.status === "completed" && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Edited Photos</CardTitle>
                  <CardDescription>Preview your stunning edited photos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {order.editedPhotos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer rounded-lg overflow-hidden aspect-square"
                      >
                        <ImageWithFallback
                          src={photo}
                          alt={`Edited photo ${index + 1}`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Download className="size-8 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Review Form */}
            {order.canReview && !order.hasReviewed && order.status === "completed" && (
              <Card>
                <CardHeader>
                  <CardTitle>Leave a Review</CardTitle>
                  <CardDescription>
                    Share your experience and help us improve our service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitReview} className="space-y-6">
                    {/* Rating */}
                    <div>
                      <Label className="mb-3 block">Rate your experience</Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`size-10 ${
                                star <= (hoveredStar || rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Review Text */}
                    <div>
                      <Label htmlFor="review" className="mb-2 block">
                        Your review
                      </Label>
                      <Textarea
                        id="review"
                        placeholder="Tell us about your experience with FreshEdit..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        rows={5}
                      />
                    </div>

                    {/* Gallery Permission */}
                    <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg border border-pink-200">
                      <div className="flex-1 pr-4">
                        <Label htmlFor="gallery-permission" className="cursor-pointer">
                          <span className="font-semibold">Add to Public Gallery</span>
                          <p className="text-sm text-gray-600 mt-1">
                            Allow us to showcase your edited photos in our public gallery to inspire
                            others
                          </p>
                        </Label>
                      </div>
                      <Switch
                        id="gallery-permission"
                        checked={allowGallery}
                        onCheckedChange={setAllowGallery}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    >
                      Submit Review
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{order.package} Package</span>
                    <span className="font-semibold">
                      ${order.package === "Professional" ? 129 : 49}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{order.urgency} Delivery</span>
                    <span className="font-semibold">
                      +${order.urgency === "Express" ? 35 : 0}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total Paid</span>
                      <span className="text-pink-600">${order.price}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setContactDialogOpen(true)}
                >
                  <MessageCircle className="size-4 mr-2" />
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setRevisionDialogOpen(true)}
                >
                  <RefreshCw className="size-4 mr-2" />
                  Request Revision
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setIssueDialogOpen(true)}
                >
                  <AlertTriangle className="size-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Support Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Support</DialogTitle>
            <DialogDescription>
              We're here to help! Please provide the details of your issue.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter a subject"
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              onClick={() => {
                toast.success("Your message has been sent!");
                setContactDialogOpen(false);
              }}
            >
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revision Request Dialog */}
      <Dialog open={revisionDialogOpen} onOpenChange={setRevisionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Revision</DialogTitle>
            <DialogDescription>
              Please specify the details of the revision you need.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="details">Revision Details</Label>
              <Textarea
                id="details"
                placeholder="Enter revision details"
                value={revisionDetails}
                onChange={(e) => setRevisionDetails(e.target.value)}
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photos">Select Photos to Revise</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {order.editedPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer rounded-lg overflow-hidden aspect-square"
                  >
                    <ImageWithFallback
                      src={photo}
                      alt={`Edited photo ${index + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-black/50 transition-opacity flex items-center justify-center ${
                      selectedPhotos.includes(index) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      <Checkbox
                        id={`photo-${index}`}
                        checked={selectedPhotos.includes(index)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedPhotos([...selectedPhotos, index]);
                          } else {
                            setSelectedPhotos(selectedPhotos.filter((i) => i !== index));
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              onClick={() => {
                toast.success("Your revision request has been sent!");
                setRevisionDialogOpen(false);
              }}
            >
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Issue Dialog */}
      <Dialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Report Issue</DialogTitle>
            <DialogDescription>
              Please describe the issue you're facing with your order.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Issue Type</Label>
              <Select
                value={issueType}
                onValueChange={(value) => setIssueType(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quality">Photo Quality</SelectItem>
                  <SelectItem value="delivery">Delivery Delay</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Issue Description</Label>
              <Textarea
                id="description"
                placeholder="Enter issue description"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              onClick={() => {
                toast.success("Your issue has been reported!");
                setIssueDialogOpen(false);
              }}
            >
              Report Issue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
