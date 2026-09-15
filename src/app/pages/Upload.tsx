import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Input } from "../components/ui/input";
import { Upload as UploadIcon, X, CheckCircle, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

export function Upload() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPackage, setSelectedPackage] = useState<string>("professional");
  const [selectedUrgency, setSelectedUrgency] = useState<string>("standard");
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Check if package was passed from Pricing page
  useEffect(() => {
    if (location.state?.selectedPackage) {
      setSelectedPackage(location.state.selectedPackage);
    }
  }, [location.state]);

  const packages = [
    { id: "starter", name: "Starter", photos: 10, price: 49 },
    { id: "professional", name: "Professional", photos: 30, price: 129 },
    { id: "premium", name: "Premium", photos: 100, price: 299 },
  ];

  const urgencyOptions = [
    { id: "standard", name: "Standard (5-7 days)", extra: 0 },
    { id: "express", name: "Express (3-4 days)", extra: 35 },
    { id: "rush", name: "Rush (24-48 hours)", extra: 70 },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    const selectedPkg = packages.find((p) => p.id === selectedPackage);
    const maxFiles = selectedPkg?.photos || 10;

    if (files.length + droppedFiles.length > maxFiles) {
      toast.error(`Your package allows up to ${maxFiles} photos`);
      return;
    }

    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const selectedPkg = packages.find((p) => p.id === selectedPackage);
      const maxFiles = selectedPkg?.photos || 10;

      if (files.length + selectedFiles.length > maxFiles) {
        toast.error(`Your package allows up to ${maxFiles} photos`);
        return;
      }

      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    const pkg = packages.find((p) => p.id === selectedPackage);
    const urgency = urgencyOptions.find((u) => u.id === selectedUrgency);
    return (pkg?.price || 0) + (urgency?.extra || 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error("Please upload at least one photo");
      return;
    }

    // Simulate order creation
    const orderId = Math.random().toString(36).substring(7);
    toast.success("Order placed successfully!");
    
    // Navigate to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Upload Your{" "}
            <span className="text-purple-600">
              Photos
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Select your package, upload photos, and choose delivery speed
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Package Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Choose Your Package</CardTitle>
              <CardDescription>Select the package that fits your needs</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
                <div className="space-y-3">
                  {packages.map((pkg) => (
                    <Label
                      key={pkg.id}
                      htmlFor={pkg.id}
                      className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={pkg.id} id={pkg.id} />
                        <div>
                          <div className="font-semibold">{pkg.name}</div>
                          <div className="text-sm text-gray-600">Up to {pkg.photos} photos</div>
                        </div>
                      </div>
                      <div className="font-bold text-lg">${pkg.price}</div>
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Urgency Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Choose Delivery Speed</CardTitle>
              <CardDescription>How quickly do you need your photos?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedUrgency} onValueChange={setSelectedUrgency}>
                <div className="space-y-3">
                  {urgencyOptions.map((option) => (
                    <Label
                      key={option.id}
                      htmlFor={option.id}
                      className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <div>
                          <div className="font-semibold">{option.name}</div>
                        </div>
                      </div>
                      <div className="font-bold text-lg">
                        {option.extra === 0 ? "Included" : `+$${option.extra}`}
                      </div>
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Step 3: Upload Your Photos</CardTitle>
              <CardDescription>
                Drag and drop or click to select files ({files.length}/
                {packages.find((p) => p.id === selectedPackage)?.photos} uploaded)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Drop Zone */}
              <motion.div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive
                    ? "border-pink-500 bg-pink-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                animate={dragActive ? { scale: 1.02, borderColor: "#ec4899" } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={dragActive ? { y: [0, -10, 0], rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5, repeat: dragActive ? Infinity : 0 }}
                >
                  <UploadIcon className="size-16 text-gray-400 mx-auto mb-4" />
                </motion.div>
                <p className="text-lg font-semibold mb-2">
                  Drop your photos here or click to browse
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Supports JPG, PNG, and RAW files
                </p>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button type="button" variant="outline" asChild>
                      <span>Select Files</span>
                    </Button>
                  </motion.div>
                </Label>
              </motion.div>

              {/* File List */}
              <AnimatePresence mode="popLayout">
                {files.length > 0 && (
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <h3 className="font-semibold text-sm">Uploaded Files:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {files.map((file, index) => (
                        <motion.div
                          key={index}
                          className="relative group border rounded-lg p-3 flex items-center gap-2 hover:bg-gray-50"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ delay: index * 0.05 }}
                          layout
                        >
                          <ImageIcon className="size-8 text-gray-400 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-gray-600">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <motion.button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X className="size-3" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Package:</span>
                  <span className="font-semibold">
                    {packages.find((p) => p.id === selectedPackage)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Photos:</span>
                  <span className="font-semibold">{files.length} uploaded</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Delivery:</span>
                  <span className="font-semibold">
                    {urgencyOptions.find((u) => u.id === selectedUrgency)?.name}
                  </span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-purple-600">${calculateTotal()}</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <CheckCircle className="mr-2 size-5" />
                Place Order - ${calculateTotal()}
              </Button>

              <p className="text-xs text-center text-gray-600">
                By placing an order, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}