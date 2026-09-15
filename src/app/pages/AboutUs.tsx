import { Award, Building2, Camera, Heart, Instagram, Mail, Sparkles, Star, Target, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { useAuth } from "../contexts/AuthContext";
import { useAuthModal } from "../contexts/AuthModalContext";
import { getLocalImage, getLocalVideo } from "../utils/localImageLibrary";

export function AboutUs() {
  const [showCeoModal, setShowCeoModal] = useState(false);
  const { openAuthModal } = useAuthModal();
  const { user } = useAuth();
  const ceoImage = getLocalImage(27);
  const ceoVideo = getLocalVideo(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
          >
            <Building2 className="size-16 text-purple-600 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-6">
            About{" "}
            <span className="text-purple-600">
              FreshEdit
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our story, meet our visionary CEO, and learn about the passion that drives us to make every photo perfect.
          </p>
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >


          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <Card className="border-2 border-purple-100">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Heart className="size-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Born from Passion</h3>
                      <p className="text-gray-600">
                        FreshEdit was founded in 2020 with a simple yet powerful vision: to help every woman feel confident and beautiful through professionally edited photography. What started as a small passion project in Lagos has grown into Nigeria's premier photo editing service, trusted by thousands of women across the country.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-100">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-pink-100 rounded-lg">
                      <Target className="size-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                      <p className="text-gray-600">
                        We believe that every photo deserves to shine. Our mission is to provide professional-grade photo editing services that are accessible, affordable, and delivered with exceptional quality. We're not just editing photos—we're helping women capture their best moments and present their most confident selves to the world.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Award className="size-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Award-Winning Excellence</h3>
                      <p className="text-gray-600">
                        In just four years, FreshEdit has become the most trusted name in photo editing across Nigeria. We've served over 50,000 satisfied customers, edited more than 500,000 photos, and earned recognition as the "Best Digital Editing Service 2024" by the Nigerian Photography Association.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center bg-purple-50 border-purple-200">
                  <CardContent className="pt-6 pb-6">
                    <Users className="size-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-purple-900 mb-1">50K+</p>
                    <p className="text-sm text-gray-600">Happy Customers</p>
                  </CardContent>
                </Card>
                <Card className="text-center bg-pink-50 border-pink-200">
                  <CardContent className="pt-6 pb-6">
                    <Sparkles className="size-8 text-pink-600 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-pink-900 mb-1">500K+</p>
                    <p className="text-sm text-gray-600">Photos Edited</p>
                  </CardContent>
                </Card>
                <Card className="text-center bg-pink-50 border-pink-200">
                  <CardContent className="pt-6 pb-6">
                    <Award className="size-8 text-pink-600 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-pink-900 mb-1">4 Years</p>
                    <p className="text-sm text-gray-600">Of Excellence</p>
                  </CardContent>
                </Card>
                <Card className="text-center bg-purple-50 border-purple-200">
                  <CardContent className="pt-6 pb-6">
                    <Star className="size-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-purple-900 mb-1">4.9/5</p>
                    <p className="text-sm text-gray-600">Customer Rating</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                <CardContent className="pt-6">
                  <blockquote className="text-center">
                    <p className="text-lg italic text-gray-700 mb-4">
                      "At FreshEdit, we don't just edit photos. We bring out the beauty that's already there, helping every woman see herself the way the world sees her—absolutely stunning."
                    </p>
                    <footer className="text-sm font-semibold text-purple-900">
                      — Amirat Okonkwo, Founder & CEO
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Meet Our CEO Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Meet Our <span className="text-purple-600">Visionary Leader</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The inspiring woman behind FreshEdit's success story
            </p>
          </div>

          <Card className="overflow-hidden shadow-xl border-2 border-purple-100">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* CEO Image */}
              <motion.div
                className="lg:col-span-2 relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-full min-h-[400px] bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
                  {ceoVideo ? (
                    <video
                      src={ceoVideo}
                      poster={ceoImage}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={ceoImage}
                      alt="Amirat Okonkwo - CEO of FreshEdit"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
              </motion.div>

              {/* CEO Info */}
              <div className="lg:col-span-3 p-8 lg:p-12">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Badge className="bg-pink-100 text-pink-800 mb-4">Meet Our Visionary Leader</Badge>
                  <h3 className="text-3xl font-bold mb-2">Amirat Okonkwo</h3>
                  <p className="text-lg text-purple-600 font-semibold mb-6">Founder & Chief Executive Officer</p>

                  <div className="space-y-4 text-gray-700 mb-8">
                    <p className="leading-relaxed">
                      Amirat Okonkwo is a visionary entrepreneur, award-winning photographer, and passionate advocate for women's empowerment through visual storytelling. With over 12 years of experience in professional photography and digital editing, she founded FreshEdit to democratize access to high-quality photo editing services.
                    </p>

                    <p className="leading-relaxed">
                      A graduate of the University of Lagos with a degree in Visual Arts and Digital Media, Amirat combines technical excellence with artistic vision. Her work has been featured in Vogue, Genevieve Magazine, and numerous international photography exhibitions.
                    </p>

                    <p className="leading-relaxed">
                      Under her leadership, FreshEdit has grown from a one-person startup to a team of 25+ talented editors, serving customers across Nigeria and beyond. Her mission extends beyond business—she's committed to training the next generation of African photographers and editors through FreshEdit's scholarship program.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    <Badge variant="outline" className="text-purple-700 border-purple-300">Forbes 30 Under 30</Badge>
                    <Badge variant="outline" className="text-purple-700 border-purple-300">TEDx Speaker</Badge>
                    <Badge variant="outline" className="text-purple-700 border-purple-300">YPO Member</Badge>
                    <Badge variant="outline" className="text-purple-700 border-purple-300">Photography Award Winner</Badge>
                  </div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
                      onClick={() => setShowCeoModal(true)}
                    >
                      <Users className="mr-2 size-5" />
                      Read Full Biography
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Our Values */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-purple-600">Core Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at FreshEdit
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Heart className="size-8 text-purple-600" />,
                title: "Customer First",
                description: "Every decision we make starts with one question: How does this benefit our customers? Your satisfaction, confidence, and happiness are our top priorities."
              },
              {
                icon: <Award className="size-8 text-pink-600" />,
                title: "Excellence Always",
                description: "We never compromise on quality. Every photo receives meticulous attention from our expert editors who are passionate about perfection."
              },
              {
                icon: <Target className="size-8 text-purple-600" />,
                title: "Innovation Daily",
                description: "We constantly evolve our techniques, technology, and services to stay ahead and deliver cutting-edge editing solutions."
              },
              {
                icon: <Users className="size-8 text-pink-600" />,
                title: "Empowerment",
                description: "We believe in lifting others as we climb. Through training, mentorship, and opportunity, we empower the next generation."
              },
              {
                icon: <Sparkles className="size-8 text-purple-600" />,
                title: "Accessibility",
                description: "Professional-grade editing shouldn't be a luxury. We make it affordable and accessible for every woman who wants to look her best."
              },
              {
                icon: <Star className="size-8 text-pink-600" />,
                title: "Integrity",
                description: "Honesty, transparency, and ethical practices in every interaction. We build trust through consistent, reliable service."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-2 border-purple-100">
                  <CardHeader>
                    <div className="mb-4 p-3 bg-purple-50 rounded-lg w-fit">
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl text-purple-900 mb-3">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0 shadow-xl">
            <CardContent className="pt-12 pb-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Photos?</h3>
              <p className="text-xl mb-8 text-purple-50 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust FreshEdit to make their photos shine
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {!user && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100" onClick={openAuthModal}>
                      Get Started Now
                    </Button>
                  </motion.div>
                )}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="border-white bg-white text-purple-600 hover:bg-white/90 font-semibold" onClick={() => window.location.href = '/contact'}>
                    Contact Us
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CEO Modal */}
        <Dialog open={showCeoModal} onOpenChange={setShowCeoModal}>
          <DialogContent className="max-w-[95vw] lg:max-w-6xl h-[85vh] overflow-hidden p-0">
            <div className="h-full overflow-y-auto overflow-x-hidden px-8 py-8 scrollbar-hide scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
            <DialogHeader>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row items-center gap-6 mb-6 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  src={ceoImage}
                  alt="Amirat Okonkwo"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl ring-4 ring-purple-200"
                />
                <div className="text-center md:text-left">
                  <DialogTitle className="text-4xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 font-bold">Amirat Okonkwo</DialogTitle>
                  <DialogDescription className="text-xl text-purple-700 font-bold">
                    Founder & CEO, FreshEdit
                  </DialogDescription>
                  <p className="text-sm text-gray-600 mt-2">Visionary Leader | Forbes 30 Under 30 | Photography Pioneer</p>
                </div>
              </motion.div>
            </DialogHeader>

            <div className="space-y-8 mt-8">
              {/* Professional Background */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-3 text-purple-700">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="size-6 text-purple-600" />
                  </div>
                  Professional Background
                </h4>
                <div className="space-y-4 text-gray-700 leading-relaxed text-base bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-purple-600 first-letter:mr-1 first-letter:float-left">
                    Amirat Okonkwo discovered her passion for photography at age 15 when she borrowed her father's camera to document her sister's wedding. That single day sparked a lifelong love affair with visual storytelling that would eventually revolutionize photo editing in Nigeria.
                  </p>
                  <p>
                    After earning her degree in Visual Arts and Digital Media from the University of Lagos in 2012, Amirat worked as a senior editor at several prestigious photography studios in Lagos and London. During this time, she noticed a glaring gap in the market: professional photo editing was either prohibitively expensive or disappointingly low-quality, leaving everyday women without access to the services they deserved.
                  </p>
                  <p>
                    In 2020, armed with ₦500,000 in savings and an unwavering belief in her vision, Amirat launched FreshEdit from her one-bedroom apartment in Lekki. Her unique approach—combining professional-grade editing with affordable pricing and lightning-fast turnaround times—immediately resonated with customers.
                  </p>
                </div>
              </motion.div>

              {/* Achievements & Recognition */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-3 text-purple-700">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Star className="size-6 text-purple-600" />
                  </div>
                  Achievements & Recognition
                </h4>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Achievement 1 */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group"
                  >
                    <Card className="bg-white border-2 border-purple-200 shadow-md hover:shadow-2xl transition-all h-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                      <CardContent className="pt-6 pb-5 text-center">
                        <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Star className="size-7 text-white" fill="white" />
                        </div>
                        <h5 className="font-bold text-gray-900 mb-1 text-sm">Forbes Africa</h5>
                        <p className="text-xs text-purple-600 font-semibold mb-2">30 Under 30</p>
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">2023</span>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Achievement 2 */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group"
                  >
                    <Card className="bg-white border-2 border-pink-200 shadow-md hover:shadow-2xl transition-all h-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-pink-600"></div>
                      <CardContent className="pt-6 pb-5 text-center">
                        <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Award className="size-7 text-white" />
                        </div>
                        <h5 className="font-bold text-gray-900 mb-1 text-sm">Best Digital Service</h5>
                        <p className="text-xs text-pink-600 font-semibold mb-2">Nigerian Business Awards</p>
                        <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">2024</span>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Achievement 3 */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group"
                  >
                    <Card className="bg-white border-2 border-purple-200 shadow-md hover:shadow-2xl transition-all h-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      <CardContent className="pt-6 pb-5 text-center">
                        <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Users className="size-7 text-white" />
                        </div>
                        <h5 className="font-bold text-gray-900 mb-1 text-sm">Women Entrepreneur</h5>
                        <p className="text-xs text-purple-600 font-semibold mb-2">She Leads Africa</p>
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">2023</span>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Achievement 4 */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group"
                  >
                    <Card className="bg-white border-2 border-pink-200 shadow-md hover:shadow-2xl transition-all h-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                      <CardContent className="pt-6 pb-5 text-center">
                        <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Star className="size-7 text-white" fill="white" />
                        </div>
                        <h5 className="font-bold text-gray-900 mb-1 text-sm">TEDx Speaker</h5>
                        <p className="text-xs text-pink-600 font-semibold mb-2">Visual Empowerment</p>
                        <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">2022</span>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Achievement 5 */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group"
                  >
                    <Card className="bg-white border-2 border-purple-200 shadow-md hover:shadow-2xl transition-all h-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                      <CardContent className="pt-6 pb-5 text-center">
                        <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Camera className="size-7 text-white" />
                        </div>
                        <h5 className="font-bold text-gray-900 mb-1 text-sm">Photography Exhibit</h5>
                        <p className="text-xs text-purple-600 font-semibold mb-2">New York International</p>
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">2021</span>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Achievement 6 */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group"
                  >
                    <Card className="bg-white border-2 border-pink-200 shadow-md hover:shadow-2xl transition-all h-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-600 to-purple-600"></div>
                      <CardContent className="pt-6 pb-5 text-center">
                        <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Award className="size-7 text-white" />
                        </div>
                        <h5 className="font-bold text-gray-900 mb-1 text-sm">Vogue Feature</h5>
                        <p className="text-xs text-pink-600 font-semibold mb-2">African Entrepreneurs</p>
                        <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">2023</span>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Achievement 7 */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group"
                  >
                    <Card className="bg-white border-2 border-purple-200 shadow-md hover:shadow-2xl transition-all h-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      <CardContent className="pt-6 pb-5 text-center">
                        <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Users className="size-7 text-white" />
                        </div>
                        <h5 className="font-bold text-gray-900 mb-1 text-sm">YPO Member</h5>
                        <p className="text-xs text-purple-600 font-semibold mb-2">Young Presidents' Org</p>
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">2024</span>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Achievement 8 */}
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="group"
                  >
                    <Card className="bg-white border-2 border-pink-200 shadow-md hover:shadow-2xl transition-all h-full overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                      <CardContent className="pt-6 pb-5 text-center">
                        <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Star className="size-7 text-white" fill="white" />
                        </div>
                        <h5 className="font-bold text-gray-900 mb-1 text-sm">Magazine Cover</h5>
                        <p className="text-xs text-pink-600 font-semibold mb-2">Genevieve Magazine</p>
                        <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">2024</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>

              {/* Vision & Philosophy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-3 text-purple-700">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Heart className="size-6 text-purple-600" />
                  </div>
                  Vision & Philosophy
                </h4>
                <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 border-2 border-purple-200 shadow-xl">
                  <CardContent className="pt-6 pb-6">
                    <blockquote className="italic text-gray-800 space-y-5 text-base leading-relaxed">
                      <p className="relative pl-6 border-l-4 border-purple-400">
                        "Every woman deserves to feel beautiful, confident, and proud of how she presents herself to the world. Photography captures moments, but editing brings out the truth—the beauty that's always been there, just waiting to be seen."
                      </p>
                      <p className="relative pl-6 border-l-4 border-pink-400">
                        "When I started FreshEdit, I wasn't just building a business. I was creating a movement—a space where quality meets accessibility, where technology serves humanity, and where every customer feels valued, seen, and beautiful."
                      </p>
                      <p className="relative pl-6 border-l-4 border-purple-400">
                        "My vision for FreshEdit extends far beyond photo editing. I want to build Africa's largest creative technology company, empowering millions of women across the continent to tell their stories, share their beauty, and step into their power with confidence."
                      </p>
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Community Impact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-3 text-purple-700">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="size-6 text-purple-600" />
                  </div>
                  Community Impact
                </h4>
                <div className="space-y-4 text-gray-700 leading-relaxed text-base bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <p>
                    Beyond running FreshEdit, Amirat is deeply committed to giving back to her community. She established the <strong className="text-purple-600">FreshEdit Scholarship Fund</strong> in 2022, which has provided free photography and editing training to over 200 young women from underserved communities across Nigeria.
                  </p>
                  <p>
                    She also mentors aspiring entrepreneurs through her involvement with <strong className="text-purple-600">She Leads Africa</strong>, <strong className="text-purple-600">Tony Elumelu Foundation</strong>, and <strong className="text-purple-600">Women in Tech Africa</strong>. Her message is simple but powerful: "If I can do it, so can you."
                  </p>
                  <p>
                    In her rare moments of free time, Amirat enjoys landscape photography, traveling to capture Africa's natural beauty, and spending time with her family in Enugu. She's also an avid reader, with a particular love for biographies of trailblazing women entrepreneurs.
                  </p>
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="pt-6"
              >
                <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-2xl">
                  <CardContent className="pt-8 pb-8 text-center">
                    <p className="text-xl font-semibold mb-6">
                      Want to connect with Amirat or learn more about FreshEdit's mission?
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="secondary"
                          size="lg"
                          className="shadow-lg"
                          onClick={() => window.location.href = 'mailto:amirat@freshedit.com?subject=Inquiry for CEO Amirat Okonkwo'}
                        >
                          <Mail className="mr-2 size-5" />
                          Email CEO
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="secondary"
                          size="lg"
                          className="shadow-lg"
                          onClick={() => window.open('https://instagram.com/freshedit', '_blank')}
                        >
                          <Instagram className="mr-2 size-5" />
                          Follow on Instagram
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
