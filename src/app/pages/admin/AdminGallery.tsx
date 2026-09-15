import { useEffect, useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../../components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog";
import { Trash2, Eye, Grid, List, Search, Upload, Plus, ImageIcon, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { seedGalleryPhotos, type GalleryPhoto } from "../../../data/seedData";

export function AdminGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState<GalleryPhoto | null>(null);
  
  // Upload form state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [customerName, setCustomerName] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    fetchGalleryPhotos();
  }, []);

  const fetchGalleryPhotos = async () => {
    try {
      // TODO: Replace with actual API call
      // Using centralized seed data for consistency
      setTimeout(() => {
        setPhotos(seedGalleryPhotos);
        setLoading(false);
      }, 400);
    } catch (error) {
      console.error("Error fetching gallery photos:", error);
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile || !customerName || !category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setUploading(true);

    try {
      // TODO: Implement actual upload to Supabase Storage
      // For now, simulate upload with the preview URL
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newPhoto: GalleryPhoto = {
        id: Date.now().toString(),
        imageUrl: imagePreview,
        customerName,
        orderId: `ORD-${new Date().getFullYear()}-${String(photos.length + 1).padStart(3, '0')}`,
        uploadDate: new Date().toISOString().split('T')[0],
        category,
        featured,
      };

      setPhotos([newPhoto, ...photos]);
      toast.success("Photo uploaded successfully!");
      
      // Reset form
      setImageFile(null);
      setImagePreview("");
      setCustomerName("");
      setCategory("");
      setFeatured(false);
      setUploadDialogOpen(false);
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Failed to upload photo. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const toggleFeatured = async (photoId: string) => {
    try {
      // TODO: Implement API call
      setPhotos(
        photos.map((photo) =>
          photo.id === photoId ? { ...photo, featured: !photo.featured } : photo
        )
      );
      toast.success("Photo status updated!");
    } catch (error) {
      console.error("Error toggling featured status:", error);
      toast.error("Failed to update photo status");
    }
  };

  const confirmDelete = (photo: GalleryPhoto) => {
    setPhotoToDelete(photo);
    setDeleteDialogOpen(true);
  };

  const deletePhoto = async () => {
    if (!photoToDelete) return;

    try {
      // TODO: Implement API call
      setPhotos(photos.filter((photo) => photo.id !== photoToDelete.id));
      toast.success("Photo removed from gallery");
      setDeleteDialogOpen(false);
      setPhotoToDelete(null);
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast.error("Failed to remove photo");
    }
  };

  const filteredPhotos = photos.filter(
    (photo) =>
      photo.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gallery Management</h1>
            <p className="text-gray-600">
              Manage photos displayed in the public gallery
            </p>
          </div>
          <div className="flex gap-3">
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="size-4 mr-2" />
                  Upload Photo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Upload Photo to Gallery</DialogTitle>
                  <DialogDescription>
                    Add a new photo to the public gallery. Fill in the details below.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpload}>
                  <div className="space-y-4 py-4">
                    {/* Image Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="image">Photo *</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                        {imagePreview ? (
                          <div className="space-y-4">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="max-h-48 mx-auto rounded"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setImageFile(null);
                                setImagePreview("");
                              }}
                            >
                              Change Image
                            </Button>
                          </div>
                        ) : (
                          <label htmlFor="image" className="cursor-pointer">
                            <ImageIcon className="size-12 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, JPEG up to 10MB
                            </p>
                            <input
                              id="image"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Customer Name */}
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Customer Name *</Label>
                      <Input
                        id="customerName"
                        placeholder="Enter customer name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={category} onValueChange={setCategory} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Portrait">Portrait</SelectItem>
                          <SelectItem value="Fashion">Fashion</SelectItem>
                          <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                          <SelectItem value="Event">Event</SelectItem>
                          <SelectItem value="Studio">Studio</SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Featured Toggle */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <Label htmlFor="featured" className="cursor-pointer">
                        Mark as Featured
                      </Label>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setUploadDialogOpen(false)}
                      disabled={uploading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="size-4 mr-2" />
                          Upload Photo
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            
            {/* View Mode Toggle */}
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === "list"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <List className="size-4" />
                List
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === "grid"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Grid className="size-4" />
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold">{photos.length}</p>
                <p className="text-sm text-gray-600">Total Photos</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {photos.filter((p) => p.featured).length}
                </p>
                <p className="text-sm text-gray-600">Featured Photos</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {new Set(photos.map((p) => p.category)).size}
                </p>
                <p className="text-sm text-gray-600">Categories</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search by name, order ID, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Gallery */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative aspect-square">
                    <img
                      src={photo.imageUrl}
                      alt={photo.customerName}
                      className="w-full h-full object-cover"
                    />
                    {photo.featured && (
                      <Badge className="absolute top-2 right-2 bg-purple-600">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2 mb-4">
                      <p className="font-semibold">{photo.customerName}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline">{photo.category}</Badge>
                        <span>{photo.orderId}</span>
                      </div>
                      <p className="text-xs text-gray-500">{photo.uploadDate}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={photo.featured ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => toggleFeatured(photo.id)}
                      >
                        {photo.featured ? "Unfeature" : "Feature"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(photo.imageUrl, "_blank")}
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => confirmDelete(photo)}
                      >
                        <Trash2 className="size-4 text-red-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold text-sm">Preview</th>
                      <th className="text-left p-3 font-semibold text-sm">Customer</th>
                      <th className="text-left p-3 font-semibold text-sm">Order ID</th>
                      <th className="text-left p-3 font-semibold text-sm">Category</th>
                      <th className="text-left p-3 font-semibold text-sm">Date</th>
                      <th className="text-left p-3 font-semibold text-sm">Status</th>
                      <th className="text-left p-3 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPhotos.map((photo, index) => (
                      <motion.tr
                        key={photo.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3">
                          <img
                            src={photo.imageUrl}
                            alt={photo.customerName}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="p-3 font-medium">{photo.customerName}</td>
                        <td className="p-3 font-mono text-sm">{photo.orderId}</td>
                        <td className="p-3">
                          <Badge variant="outline">{photo.category}</Badge>
                        </td>
                        <td className="p-3 text-sm text-gray-600">{photo.uploadDate}</td>
                        <td className="p-3">
                          {photo.featured ? (
                            <Badge className="bg-purple-600">Featured</Badge>
                          ) : (
                            <span className="text-gray-500">Standard</span>
                          )}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleFeatured(photo.id)}
                            >
                              {photo.featured ? "Unfeature" : "Feature"}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => confirmDelete(photo)}
                            >
                              <Trash2 className="size-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredPhotos.length === 0 && (
          <Card>
            <CardContent className="text-center py-12 text-gray-500">
              No photos found matching your search
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="size-6 text-red-600" />
                </div>
                <AlertDialogTitle className="text-xl">Delete Photo</AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-base">
                Are you sure you want to remove{" "}
                <span className="font-semibold text-gray-900">
                  {photoToDelete?.customerName}'s
                </span>{" "}
                photo from the gallery? This action cannot be undone and the photo will no longer be visible to the public.
              </AlertDialogDescription>
            </AlertDialogHeader>
            {photoToDelete && (
              <div className="my-4">
                <img
                  src={photoToDelete.imageUrl}
                  alt={photoToDelete.customerName}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setPhotoToDelete(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={deletePhoto}
                className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              >
                <Trash2 className="size-4 mr-2" />
                Delete Photo
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}