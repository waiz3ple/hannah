import { Award, Camera, CheckCircle, ChevronRight, Clock, Heart, Shield, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useAuthModal } from "../contexts/AuthModalContext";
import { getLocalImage, localImagePool } from "../utils/localImageLibrary";

const HERO_IMAGE_COUNT = 4;
const HERO_ROTATION_INTERVAL_MS = 8000;

function getRandomHeroImages() {
  const fallbackImages = Array.from({ length: HERO_IMAGE_COUNT }, (_, index) => getLocalImage(index));

  if (localImagePool.length < HERO_IMAGE_COUNT) {
    return fallbackImages;
  }

  const shuffledImages = [...localImagePool];
  for (let index = shuffledImages.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledImages[index], shuffledImages[randomIndex]] = [shuffledImages[randomIndex], shuffledImages[index]];
  }

  return shuffledImages.slice(0, HERO_IMAGE_COUNT);
}

export function Home() {
  const { openAuthModal } = useAuthModal();
  const [heroImages, setHeroImages] = useState<string[]>(() => getRandomHeroImages());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroImages(getRandomHeroImages());
    }, HERO_ROTATION_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openAuthModal();
  };

  const features = [
    {
      icon: <Camera className="size-6 text-pink-500" />,
      title: "Professional Editing",
      description: "Expert retouching and color correction by skilled professionals",
    },
    {
      icon: <Clock className="size-6 text-purple-500" />,
      title: "Fast Turnaround",
      description: "Choose your urgency level and get your photos back on time",
    },
    {
      icon: <Shield className="size-6 text-pink-500" />,
      title: "Secure & Private",
      description: "Your photos are safe with us, with optional gallery sharing",
    },
    {
      icon: <Award className="size-6 text-purple-500" />,
      title: "Premium Quality",
      description: "High-resolution edits that make you look absolutely stunning",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "FreshEdit transformed my photos! The quality is incredible and the turnaround was so fast. Highly recommend!",
      image: getLocalImage(2),
    },
    {
      name: "Emily Chen",
      rating: 5,
      text: "I love how my photos turned out! The attention to detail is amazing. Will definitely use FreshEdit again.",
      image: getLocalImage(10),
    },
    {
      name: "Jessica Martinez",
      rating: 5,
      text: "Professional service with stunning results. The pricing is fair and the process is so easy to follow!",
      image: getLocalImage(18),
    },
  ];

  const stats = [
    { value: "50K+", label: "Photos Edited" },
    { value: "10K+", label: "Happy Clients" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "24h", label: "Express Delivery" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >


              <motion.h1
                className="text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Look Absolutely{" "}
                <span className="text-purple-600">
                  Stunning
                </span>{" "}
                in Every Photo
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Upload your photos, choose your package, and let our expert editors make you shine.
                Professional retouching delivered fast.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleUploadClick}
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-lg px-8 h-14"
                  >
                    Upload Your Photos
                    <ChevronRight className="ml-2 size-5" />
                  </Button>
                </motion.div>
                <Link to="/gallery">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                      View Gallery
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-4 gap-4 pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  >
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    whileHover={{ scale: 1.05, rotate: -2, transition: { duration: 0.3 } }}
                  >
                    <ImageWithFallback
                      src={heroImages[0]}
                      alt="Portrait 1"
                      className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.3 } }}
                  >
                    <ImageWithFallback
                      src={heroImages[1]}
                      alt="Portrait 2"
                      className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                    />
                  </motion.div>
                </div>
                <div className="space-y-4 mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    whileHover={{ scale: 1.05, rotate: 2, transition: { duration: 0.3 } }}
                  >
                    <ImageWithFallback
                      src={heroImages[2]}
                      alt="Portrait 3"
                      className="rounded-2xl shadow-2xl w-full h-80 object-cover"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    whileHover={{ scale: 1.05, rotate: -2, transition: { duration: 0.3 } }}
                  >
                    <ImageWithFallback
                      src={heroImages[3]}
                      alt="Portrait 4"
                      className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Event & Studio Photography */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Camera className="size-4 text-purple-600" />
              <span className="text-sm font-medium">Two Ways to Capture Your Moments</span>
            </motion.div>
            <h2 className="text-4xl font-bold mb-4">Our Photography Services</h2>
            <p className="text-xl text-gray-600">Professional photo editing or on-location photography</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Upload & Edit Service */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all">
                <CardHeader className="text-center pb-6">
                  <motion.div
                    className="mx-auto bg-purple-100 rounded-full p-6 w-fit mb-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Sparkles className="size-10 text-purple-600" />
                  </motion.div>
                  <CardTitle className="text-3xl mb-3">Upload & Edit</CardTitle>
                  <CardDescription className="text-lg">
                    Upload your photos and let our experts transform them
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {[
                      "Choose from 3 package tiers",
                      "Professional retouching & color correction",
                      "Track your order progress",
                      "Fast turnaround options",
                      "Download high-resolution edits"
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <CheckCircle className="size-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Link to="/pricing">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-lg">
                        View Pricing & Upload
                        <ChevronRight className="ml-2 size-5" />
                      </Button>
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Event & Studio Service */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 border-pink-200 hover:border-pink-400 hover:shadow-2xl transition-all bg-gradient-to-br from-pink-50/50 to-purple-50/50">
                <CardHeader className="text-center pb-6">
                  <motion.div
                    className="mx-auto bg-pink-100 rounded-full p-6 w-fit mb-4"
                    whileHover={{ rotate: -360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Camera className="size-10 text-pink-600" />
                  </motion.div>
                  <CardTitle className="text-3xl mb-3">Event & Studio</CardTitle>
                  <CardDescription className="text-lg">
                    We come to you, or visit our professional studio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {[
                      "Professional event coverage",
                      "In-studio portrait sessions",
                      "Instant access with unique code",
                      "No upload needed",
                      "Purchase all photos at once"
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <CheckCircle className="size-5 text-pink-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Link to="/event-access">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="w-full bg-pink-600 hover:bg-pink-700 h-12 text-lg">
                        Access Event Photos
                        <ChevronRight className="ml-2 size-5" />
                      </Button>
                    </motion.div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <Card className="border-2 border-purple-200 bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                  <div className="bg-purple-100 rounded-full p-4 flex-shrink-0">
                    <Heart className="size-8 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">Looking for Event Photography?</h3>
                    <p className="text-gray-600">
                      Book our photographers for your next event or visit our studio for a professional photo session.
                      Get your unique access code and view your photos instantly.
                    </p>
                  </div>
                  <Link to="/event-access">
                    <Button variant="outline" className="border-purple-300 hover:bg-purple-50">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get your photos edited in 3 simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                number: 1,
                title: "Upload Photos",
                description: "Select your package tier and upload your photos. Choose your urgency level for delivery."
              },
              {
                number: 2,
                title: "We Edit",
                description: "Our expert editors work their magic on your photos. Track progress in your dashboard."
              },
              {
                number: 3,
                title: "Download & Review",
                description: "Download your stunning edited photos and leave a review. Share your photos with the community!"
              }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                className="text-center space-y-4"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center size-20 rounded-full bg-purple-600 text-white text-3xl font-bold"
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.5 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {step.number}
                </motion.div>
                <h3 className="text-2xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 space-y-4"
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="flex gap-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.15 + 0.3 + i * 0.1, type: "spring" }}
                    >
                      <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3 pt-4">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="size-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">Verified Client</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            Ready to Look Amazing?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Upload your photos today and experience the FreshEdit difference
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleUploadClick}
              size="lg"
              variant="secondary"
              className="text-lg px-8 h-14"
            >
              Get Started Now
              <ChevronRight className="ml-2 size-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
