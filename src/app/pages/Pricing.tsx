import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Check, Star, Zap, Clock, Sparkles } from "lucide-react";
import { useAuthModal } from "../contexts/AuthModalContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export function Pricing() {
  const { openAuthModal } = useAuthModal();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSelectPackage = (packageName: string) => {
    // Check if user is already logged in
    if (user) {
      // User is logged in, go directly to upload page
      navigate("/upload", { state: { selectedPackage: packageName.toLowerCase() } });
    } else {
      // User is not logged in, show auth modal
      openAuthModal();
    }
  };

  const packages = [
    {
      name: "Starter",
      price: "₦49,000",
      photos: "Up to 10 photos",
      turnaround: {
        standard: "5-7 days - Included",
        express: "3-4 days - +₦15,000",
        rush: "24-48 hours - +₦30,000",
      },
      features: [
        "Basic retouching",
        "Color correction",
        "Blemish removal",
        "Brightness adjustment",
        "High-resolution delivery",
        "Email support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "₦129,000",
      photos: "Up to 30 photos",
      turnaround: {
        standard: "5-7 days - Included",
        express: "3-4 days - +₦35,000",
        rush: "24-48 hours - +₦70,000",
      },
      features: [
        "Advanced retouching",
        "Professional color grading",
        "Skin smoothing & enhancement",
        "Background adjustments",
        "Body contouring",
        "High-resolution delivery",
        "Priority email support",
        "2 rounds of revisions",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "₦299,000",
      photos: "Up to 100 photos",
      turnaround: {
        standard: "5-7 days - Included",
        express: "3-4 days - +₦75,000",
        rush: "24-48 hours - +₦150,000",
      },
      features: [
        "Expert-level retouching",
        "Magazine-quality editing",
        "Advanced skin retouching",
        "Creative background changes",
        "Body sculpting & enhancement",
        "Makeup enhancement",
        "High-resolution delivery",
        "VIP support (phone & email)",
        "Unlimited revisions",
        "Express processing available",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Badge className="mb-4 bg-purple-600">
              Flexible Pricing
            </Badge>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Choose Your Perfect{" "}
            <span className="text-purple-600">
              Package
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Select the package that fits your needs and choose your delivery speed. 
            All packages include professional editing and high-resolution files.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <Card
                className={`relative h-full ${
                  pkg.popular
                    ? "border-pink-500 border-2 shadow-2xl"
                    : "border-gray-200"
                }`}
              >
                {pkg.popular && (
                  <motion.div 
                    className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                  >
                    <Badge className="bg-purple-600 text-white px-3 py-0.5 text-xs">
                      <Star className="size-3 mr-1 inline" />
                      Most Popular
                    </Badge>
                  </motion.div>
                )}

                <CardHeader className="text-center pb-4 pt-6">
                  <CardTitle className="text-xl md:text-2xl mb-1">{pkg.name}</CardTitle>
                  <motion.div 
                    className="mb-2"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.4, type: "spring", stiffness: 150 }}
                  >
                    <span className="text-3xl md:text-4xl font-bold">{pkg.price}</span>
                  </motion.div>
                  <CardDescription className="text-base font-semibold text-gray-900">
                    {pkg.photos}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 px-4 md:px-6">
                  {/* Turnaround Options */}
                  <motion.div 
                    className="bg-gray-50 rounded-lg p-3 space-y-1.5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    <div className="font-semibold text-sm mb-2 flex items-center gap-2">
                      <Clock className="size-3.5 text-pink-500" />
                      Turnaround Options
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Standard</span>
                        <span className="font-medium text-right">5-7 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Express</span>
                        <span className="font-medium text-orange-600 text-right">3-4 days +₦{pkg.name === "Starter" ? "15K" : pkg.name === "Professional" ? "35K" : "75K"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Rush</span>
                        <span className="font-medium text-red-600 text-right">1-2 days +₦{pkg.name === "Starter" ? "30K" : pkg.name === "Professional" ? "70K" : "150K"}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Features */}
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <motion.li 
                        key={idx} 
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + 0.6 + idx * 0.05 }}
                      >
                        <Check className="size-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4">
                  <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      className={pkg.popular ? "w-full bg-purple-600 hover:bg-purple-700" : "w-full"}
                      variant={pkg.popular ? "default" : "outline"}
                      size="default"
                      onClick={() => handleSelectPackage(pkg.name)}
                    >
                      Select {pkg.name}
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Urgency Explanation */}
        <motion.div 
          className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <Zap className="size-12 text-pink-500 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">Choose Your Delivery Speed</h2>
            <p className="text-gray-600">
              Need your photos faster? Select express or rush processing when uploading your photos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Clock className="size-8 text-blue-500 mx-auto mb-3" />,
                title: "Standard",
                duration: "5-7 business days",
                pricing: "Included",
                bg: "bg-gray-50",
                border: ""
              },
              {
                icon: <Zap className="size-8 text-orange-500 mx-auto mb-3" />,
                title: "Express",
                duration: "3-4 business days",
                pricing: "Additional fee applies",
                bg: "bg-orange-50",
                border: "border-2 border-orange-200"
              },
              {
                icon: <Zap className="size-8 text-red-500 mx-auto mb-3" />,
                title: "Rush",
                duration: "24-48 hours",
                pricing: "Premium fee applies",
                bg: "bg-red-50",
                border: "border-2 border-red-200"
              }
            ].map((option, index) => (
              <motion.div 
                key={option.title}
                className={`text-center p-6 ${option.bg} rounded-xl ${option.border}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 120 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                {option.icon}
                <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm">{option.duration}</p>
                <p className={`font-semibold mt-2 ${
                  option.title === "Standard" ? "text-green-600" :
                  option.title === "Express" ? "text-orange-600" : "text-red-600"
                }`}>{option.pricing}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div 
          className="max-w-3xl mx-auto mt-16 bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: "What if I need more photos than my package allows?",
                answer: "You can purchase additional photo edits at a prorated rate or upgrade to a higher tier package."
              },
              {
                question: "Can I request revisions?",
                answer: "Yes! Professional and Premium packages include revisions. We want you to love your photos!"
              },
              {
                question: "How do I pay?",
                answer: "Payment is processed securely when you upload your photos. We accept all major credit cards."
              },
              {
                question: "What file formats do you accept?",
                answer: "We accept JPG, PNG, and RAW files. Higher resolution source files result in better edited photos!"
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}