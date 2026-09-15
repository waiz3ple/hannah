import { AlertTriangle, Calendar, CheckCircle, ChevronLeft, ChevronRight, Copy, Image, Plus, Trash2, Upload, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { seedEvents, type EventCode } from "../../../data/seedData";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { LazyImage } from "../../components/LazyImage";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";
import { getLocalImage } from "../../utils/localImageLibrary";

export function AdminEvents() {
  const [eventCodes, setEventCodes] = useState<EventCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    eventName: "",
    eventType: "Event" as "Event" | "Studio",
    eventDate: "",
    location: "",
  });

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<EventCode | null>(null);

  // View photos state
  const [viewPhotosEvent, setViewPhotosEvent] = useState<EventCode | null>(null);

  // Pagination state for photo viewer
  const [currentPage, setCurrentPage] = useState(1);
  const PHOTOS_PER_PAGE = 24; // Load 24 photos at a time

  // Upload photos state
  const [uploadingEventId, setUploadingEventId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useState<HTMLInputElement | null>(null)[0];

  useEffect(() => {
    fetchEventCodes();
  }, []);

  const fetchEventCodes = async () => {
    try {
      // TODO: Replace with actual API call
      // Using centralized seed data for consistency
      setTimeout(() => {
        setEventCodes(seedEvents);
        setLoading(false);
      }, 400); // Reduced from 800ms
    } catch (error) {
      console.error("Error fetching event codes:", error);
      setLoading(false);
    }
  };

  const generateCode = () => {
    const prefix = newEvent.eventType === "Event" ? "EVENT" : "STUDIO";
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}2024${random}`;
  };

  const handleCreateEvent = async () => {
    if (!newEvent.eventName || !newEvent.eventDate || !newEvent.location) {
      toast.error("Please fill in all fields");
      return;
    }

    const code = generateCode();

    try {
      // TODO: Implement API call
      const newEventCode: EventCode = {
        id: String(eventCodes.length + 1),
        code,
        eventName: newEvent.eventName,
        eventType: newEvent.eventType,
        eventDate: newEvent.eventDate,
        location: newEvent.location,
        photoCount: 0,
        customerCount: 0,
        status: "Active",
        createdDate: new Date().toISOString().split("T")[0],
      };

      setEventCodes([newEventCode, ...eventCodes]);
      setNewEvent({
        eventName: "",
        eventType: "Event",
        eventDate: "",
        location: "",
      });
      setShowCreateForm(false);
      toast.success(`Event code created: ${code}`);
    } catch (error) {
      console.error("Error creating event code:", error);
      toast.error("Failed to create event code");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Code copied to clipboard!");
  };

  const confirmDelete = (event: EventCode) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  const deleteEventCode = async () => {
    if (!eventToDelete) return;

    try {
      // TODO: Implement API call
      setEventCodes(eventCodes.filter((event) => event.id !== eventToDelete.id));
      toast.success("Event code deleted successfully");
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    } catch (error) {
      console.error("Error deleting event code:", error);
      toast.error("Failed to delete event code");
    }
  };

  const updateStatus = async (eventId: string, status: "Active" | "Completed" | "Expired") => {
    try {
      // TODO: Implement API call
      setEventCodes(
        eventCodes.map((event) =>
          event.id === eventId ? { ...event, status } : event
        )
      );
      toast.success("Event status updated");
    } catch (error) {
      console.error("Error updating event status:", error);
      toast.error("Failed to update event status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "Event" ? "bg-purple-100 text-purple-800" : "bg-pink-100 text-pink-800";
  };

  // Calculate pagination for photo viewer
  const getTotalPages = (photoCount: number) => Math.ceil(photoCount / PHOTOS_PER_PAGE);

  const getCurrentPhotos = (photoCount: number) => {
    const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
    const endIndex = Math.min(startIndex + PHOTOS_PER_PAGE, photoCount);
    return { startIndex, endIndex, count: endIndex - startIndex };
  };

  // Reset page when opening a new event
  const handleViewPhotos = (event: EventCode) => {
    setViewPhotosEvent(event);
    setCurrentPage(1);
  };

  const handleUploadClick = (eventId: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.zip';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        if (!file.name.endsWith('.zip')) {
          toast.error('Please select a ZIP file');
          return;
        }
        setSelectedFile(file);
        handleUploadPhotos(eventId, file);
      }
    };
    input.click();
  };

  const handleUploadPhotos = async (eventId: string, file: File) => {
    setUploadingEventId(eventId);

    try {
      const formData = new FormData();
      formData.append('zipFile', file);
      formData.append('eventId', eventId);

      const projectId = 'zzkqzcgoexxwlvxvspqq';
      const publicAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6a3F6Y2dvZXh4d2x2eHZzcHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNzc3OTUsImV4cCI6MjA3Nzc1Mzc5NX0.gdcjV9ZgS1m-B1r7XCQQSNqOmr7Hx1UOrGzJRnE7jd4';

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a88c82e1/upload-event-photos`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Upload failed');
      }

      const result = await response.json();

      // Update the event photo count
      setEventCodes(eventCodes.map(event =>
        event.id === eventId
          ? { ...event, photoCount: event.photoCount + result.photoCount }
          : event
      ));

      toast.success(`Successfully uploaded ${result.photoCount} photos!`);
      setSelectedFile(null);
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload photos');
    } finally {
      setUploadingEventId(null);
    }
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Events & Studio Management</h1>
            <p className="text-gray-600">
              Manage event codes for on-site photography sessions
            </p>
          </div>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <Plus className="size-4 mr-2" />
            Create Event Code
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold">{eventCodes.length}</p>
                </div>
                <Calendar className="size-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Codes</p>
                  <p className="text-2xl font-bold text-green-600">
                    {eventCodes.filter((e) => e.status === "Active").length}
                  </p>
                </div>
                <CheckCircle className="size-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Photos</p>
                  <p className="text-2xl font-bold">
                    {eventCodes.reduce((acc, e) => acc + e.photoCount, 0)}
                  </p>
                </div>
                <Users className="size-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Customers</p>
                  <p className="text-2xl font-bold">
                    {eventCodes.reduce((acc, e) => acc + e.customerCount, 0)}
                  </p>
                </div>
                <Users className="size-8 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create Event Form */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-purple-500 border-2">
              <CardHeader>
                <CardTitle>Create New Event Code</CardTitle>
                <CardDescription>
                  Generate a unique code for customers to access event photos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Event Name</Label>
                    <Input
                      placeholder="e.g., Johnson Wedding"
                      value={newEvent.eventName}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, eventName: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label>Event Type</Label>
                    <Select
                      value={newEvent.eventType}
                      onValueChange={(value: "Event" | "Studio") =>
                        setNewEvent({ ...newEvent, eventType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Event">Event Photography</SelectItem>
                        <SelectItem value="Studio">Studio Session</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Event Date</Label>
                    <Input
                      type="date"
                      value={newEvent.eventDate}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, eventDate: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label>Location</Label>
                    <Input
                      placeholder="e.g., Lagos Oriental Hotel"
                      value={newEvent.location}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, location: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleCreateEvent}
                  >
                    Generate Code
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Event Codes List */}
        <div className="space-y-4">
          {eventCodes.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">{event.eventName}</CardTitle>
                        <Badge className={getTypeColor(event.eventType)}>
                          {event.eventType}
                        </Badge>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                      <CardDescription>{event.location}</CardDescription>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="bg-gray-100 px-4 py-2 rounded font-mono font-bold text-purple-600">
                        {event.code}
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => copyToClipboard(event.code)}
                      >
                        <Copy className="size-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Event Date</p>
                      <p className="font-semibold">{event.eventDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Photos</p>
                      <p className="font-semibold">{event.photoCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Customers</p>
                      <p className="font-semibold">{event.customerCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Created</p>
                      <p className="font-semibold">{event.createdDate}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Select
                      value={event.status}
                      onValueChange={(value: "Active" | "Completed" | "Expired") =>
                        updateStatus(event.id, value)
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUploadClick(event.id)}
                      disabled={uploadingEventId === event.id}
                    >
                      {uploadingEventId === event.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="size-4 mr-2" />
                          Upload Photos
                        </>
                      )}
                    </Button>

                    <Button variant="outline" size="sm" onClick={() => handleViewPhotos(event)}>
                      View Photos
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => confirmDelete(event)}
                    >
                      <Trash2 className="size-4 text-red-600" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View Photos Modal */}
        <Dialog open={!!viewPhotosEvent} onOpenChange={(open) => !open && setViewPhotosEvent(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-2xl mb-2">
                    {viewPhotosEvent?.eventName} - Photos
                  </DialogTitle>
                  <p className="text-sm text-gray-600">
                    {viewPhotosEvent?.photoCount} photos • {viewPhotosEvent?.eventDate}
                  </p>
                </div>
                <Badge className={viewPhotosEvent ? getStatusColor(viewPhotosEvent.status) : ""}>
                  {viewPhotosEvent?.status}
                </Badge>
              </div>
            </DialogHeader>

            <div className="mt-6">
              {viewPhotosEvent?.photoCount === 0 ? (
                <div className="text-center py-12">
                  <Image className="size-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No Photos Yet</h3>
                  <p className="text-gray-500">Photos will appear here once they are uploaded</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {(() => {
                      const { startIndex, endIndex } = getCurrentPhotos(viewPhotosEvent?.photoCount || 0);
                      return Array.from({ length: endIndex - startIndex }).map((_, idx) => {
                        const index = startIndex + idx;
                        const previewImage = getLocalImage(index + 6);

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.02 }}
                            className="relative rounded-lg overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                          >
                            <LazyImage
                              src={previewImage}
                              alt={`Event photo ${index + 1}`}
                              className="rounded-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = getLocalImage(0);
                              }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                                  Photo {index + 1}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      });
                    })()}
                  </div>

                  {/* Pagination Controls */}
                  {viewPhotosEvent && getTotalPages(viewPhotosEvent.photoCount) > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Showing {getCurrentPhotos(viewPhotosEvent.photoCount).startIndex + 1}-
                        {getCurrentPhotos(viewPhotosEvent.photoCount).endIndex} of {viewPhotosEvent.photoCount} photos
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="size-4 mr-1" />
                          Previous
                        </Button>
                        <div className="text-sm text-gray-600">
                          Page {currentPage} of {getTotalPages(viewPhotosEvent.photoCount)}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.min(getTotalPages(viewPhotosEvent.photoCount), prev + 1))}
                          disabled={currentPage === getTotalPages(viewPhotosEvent.photoCount)}
                        >
                          Next
                          <ChevronRight className="size-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="mt-6 pt-6 border-t flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Event Code: <span className="font-mono font-bold text-purple-600">{viewPhotosEvent?.code}</span>
              </div>
              <Button
                variant="outline"
                onClick={() => setViewPhotosEvent(null)}
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="size-6 text-red-600" />
                </div>
                <AlertDialogTitle className="text-xl">Delete Event Code</AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-base">
                Are you sure you want to delete the event code{" "}
                <span className="font-semibold text-gray-900 font-mono">
                  {eventToDelete?.code}
                </span>{" "}
                for{" "}
                <span className="font-semibold text-gray-900">
                  {eventToDelete?.eventName}
                </span>
                ? This action cannot be undone and customers will no longer be able to access their photos using this code.
              </AlertDialogDescription>
            </AlertDialogHeader>
            {eventToDelete && (
              <div className="my-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Event Type</p>
                    <p className="font-semibold">{eventToDelete.eventType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className="font-semibold">{eventToDelete.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Photos</p>
                    <p className="font-semibold">{eventToDelete.photoCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Customers</p>
                    <p className="font-semibold">{eventToDelete.customerCount}</p>
                  </div>
                </div>
              </div>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setEventToDelete(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={deleteEventCode}
                className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
              >
                <Trash2 className="size-4 mr-2" />
                Delete Event Code
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}
