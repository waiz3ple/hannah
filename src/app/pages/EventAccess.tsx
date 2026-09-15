import { Camera, CheckCircle, Download, Lock, Sparkles, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { getLocalImages } from "../utils/localImageLibrary";

export function EventAccess() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [eventPhotos, setEventPhotos] = useState<any[]>([]);
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [enlargedPhoto, setEnlargedPhoto] = useState<string | null>(null);

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call to verify code and fetch photos
    setTimeout(() => {
      if (code.trim()) {
        // Mock event data
        setEventDetails({
          name: "Spring Fashion Gala 2026",
          date: "March 1, 2026",
          location: "FreshEdit Studio",
          photoCount: 24,
          price: "$89"
        });

        const photoUrls = getLocalImages(24, 12);

        const mockPhotos = photoUrls.map((url, i) => ({
          id: i + 1,
          url: url,
          thumbnail: url
        }));

        setEventPhotos(mockPhotos);
        setHasAccess(true);
        toast.success("Event photos loaded successfully!");
      } else {
        toast.error("Please enter a valid code");
      }
      setLoading(false);
    }, 1000);
  };

  const handlePurchase = () => {
    toast.success("Redirecting to payment...");
    // In real implementation, integrate with payment system
  };

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2 border-purple-100 shadow-2xl">
                <CardHeader className="text-center pb-8 space-y-4">
                  <motion.div
                    className="mx-auto bg-purple-100 rounded-full p-6 w-fit"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
                  >
                    <Camera className="size-12 text-purple-600" />
                  </motion.div>
                  <CardTitle className="text-4xl font-bold">Event & Studio Photos</CardTitle>
                  <CardDescription className="text-lg">
                    Enter the code from your event or studio session to access your photos
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <form onSubmit={handleCodeSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="event-code" className="text-base font-semibold">
                        Access Code
                      </Label>
                      <Input
                        id="event-code"
                        type="text"
                        placeholder="Enter your event code (e.g., EVENT-2026-ABC123)"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        className="h-14 text-lg text-center tracking-wider font-mono bg-gray-50 border-2 focus:border-purple-400 rounded-xl"
                        required
                      />
                      <p className="text-sm text-gray-500 text-center">
                        You received this code at your event or studio session
                      </p>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-lg"
                      disabled={loading}
                    >
                      {loading ? "Verifying..." : "Access My Photos"}
                      <Sparkles className="ml-2 size-5" />
                    </Button>
                  </form>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Camera className="size-5 text-purple-600" />
                      How It Works
                    </h3>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="bg-purple-100 rounded-full size-8 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Attend Your Event or Studio Session</p>
                          <p className="text-sm text-gray-600">We capture beautiful moments at events or in our studio</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-purple-100 rounded-full size-8 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Receive Your Access Code</p>
                          <p className="text-sm text-gray-600">Get your unique code at the event or via email</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="bg-purple-100 rounded-full size-8 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 font-bold text-sm">3</span>
                        </div>
                        <div>
                          <p className="font-medium">View & Purchase</p>
                          <p className="text-sm text-gray-600">Preview your photos and purchase the full collection</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Service Types */}
            <motion.div
              className="grid md:grid-cols-2 gap-6 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="border-pink-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="size-6 text-pink-500" />
                    Event Photography
                  </CardTitle>
                  <CardDescription>
                    We come to your events - parties, weddings, gatherings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-pink-500 mt-0.5 flex-shrink-0" />
                      Professional event coverage
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-pink-500 mt-0.5 flex-shrink-0" />
                      Candid and posed shots
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-pink-500 mt-0.5 flex-shrink-0" />
                      Instant access codes provided
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="size-6 text-purple-500" />
                    Studio Sessions
                  </CardTitle>
                  <CardDescription>
                    Visit our professional studio for portrait sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      Professional lighting & setup
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      Personalized photo sessions
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      Immediate preview available
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => setHasAccess(false)}
            className="mb-4"
          >
            ← Enter Different Code
          </Button>

          <Card className="border-2 border-purple-200 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">{eventDetails.name}</CardTitle>
                  <CardDescription className="text-base">
                    {eventDetails.date} • {eventDetails.location}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600">{eventDetails.price}</div>
                  <div className="text-sm text-gray-600">{eventDetails.photoCount} photos</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Get all your professionally captured photos in high resolution
                </p>
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={handlePurchase}
                >
                  <Download className="mr-2 size-4" />
                  Purchase All Photos
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {eventPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative aspect-square rounded-xl overflow-hidden shadow-lg group cursor-pointer"
              onClick={() => {
                // Only allow clicking on preview photos (first 3)
                if (index < 3) {
                  setEnlargedPhoto(photo.url);
                }
              }}
            >
              <ImageWithFallback
                src={photo.url}
                alt={`Event photo ${photo.id}`}
                className="w-full h-full object-cover"
              />

              {/* Watermark Overlay - Always Visible */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-8" style={{ transform: 'rotate(-45deg)' }}>
                  <div className="text-white/40 font-bold text-2xl md:text-3xl lg:text-4xl whitespace-nowrap tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                    FRESHEDIT
                  </div>
                  <div className="text-white/40 font-bold text-2xl md:text-3xl lg:text-4xl whitespace-nowrap tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                    FRESHEDIT
                  </div>
                  <div className="text-white/40 font-bold text-2xl md:text-3xl lg:text-4xl whitespace-nowrap tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                    FRESHEDIT
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Lock className="size-8 text-white" />
              </div>
              {index < 3 && (
                <div className="absolute top-2 right-2">
                  <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    Preview
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Enlarged Photo Modal */}
        {enlargedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 overflow-auto"
            onClick={() => setEnlargedPhoto(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 right-4 text-white hover:bg-white/20 size-12 z-10"
              onClick={() => setEnlargedPhoto(null)}
            >
              <X className="size-8" />
            </Button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative min-h-screen flex items-start justify-center p-4 py-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <ImageWithFallback
                  src={enlargedPhoto}
                  alt="Enlarged preview"
                  className="w-auto max-w-none rounded-lg shadow-2xl"
                  style={{ maxHeight: 'none' }}
                />

                {/* Large Watermark Overlay for Enlarged Photo */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden rounded-lg">
                  <div className="absolute inset-0 flex flex-col items-center justify-evenly" style={{ transform: 'rotate(-45deg)' }}>
                    <div className="text-white/30 font-bold text-6xl md:text-7xl lg:text-8xl whitespace-nowrap tracking-wider" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.4)' }}>
                      FRESHEDIT
                    </div>
                    <div className="text-white/30 font-bold text-6xl md:text-7xl lg:text-8xl whitespace-nowrap tracking-wider" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.4)' }}>
                      FRESHEDIT
                    </div>
                    <div className="text-white/30 font-bold text-6xl md:text-7xl lg:text-8xl whitespace-nowrap tracking-wider" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.4)' }}>
                      FRESHEDIT
                    </div>
                    <div className="text-white/30 font-bold text-6xl md:text-7xl lg:text-8xl whitespace-nowrap tracking-wider" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.4)' }}>
                      FRESHEDIT
                    </div>
                    <div className="text-white/30 font-bold text-6xl md:text-7xl lg:text-8xl whitespace-nowrap tracking-wider" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.4)' }}>
                      FRESHEDIT
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-8 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm mt-4 mx-auto w-fit">
                  Preview Photo - Purchase to unlock all photos
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="max-w-2xl mx-auto border-purple-200 bg-purple-50/50">
            <CardContent className="pt-6">
              <Lock className="size-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Unlock Your Memories</h3>
              <p className="text-gray-600 mb-6">
                Purchase now to download all {eventDetails.photoCount} high-resolution photos
              </p>
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700"
                onClick={handlePurchase}
              >
                <Download className="mr-2 size-5" />
                Purchase for {eventDetails.price}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
