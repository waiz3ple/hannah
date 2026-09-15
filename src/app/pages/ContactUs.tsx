import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Mail, MapPin, Phone, Clock, Send, MessageCircle, Instagram, Facebook, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Message sent successfully! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="size-6 text-purple-600" />,
      title: "Email Us",
      details: ["support@freshedit.com", "sales@freshedit.com"],
      description: "We respond within 24 hours"
    },
    {
      icon: <Phone className="size-6 text-pink-500" />,
      title: "Call Us",
      details: ["+1 (555) 123-4567"],
      description: "Mon-Fri, 9AM-6PM EST"
    },
    {
      icon: <MapPin className="size-6 text-purple-600" />,
      title: "Visit Us",
      details: ["123 Creative Boulevard", "Suite 456, New York, NY 10001"],
      description: "By appointment only"
    },
    {
      icon: <Clock className="size-6 text-pink-500" />,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 6PM EST", "Saturday: 10AM - 4PM EST", "Sunday: Closed"],
      description: "Available for urgent requests"
    }
  ];

  const faqs = [
    {
      question: "What's your average response time?",
      answer: "We respond to all inquiries within 24 hours during business days."
    },
    {
      question: "Can I call for urgent requests?",
      answer: "Yes! Call us during business hours for immediate assistance with urgent orders."
    },
    {
      question: "Do you offer consultations?",
      answer: "Absolutely! We offer free consultations to discuss your editing needs."
    }
  ];

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
            <MessageCircle className="size-16 text-purple-600 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-6">
            Get In{" "}
            <span className="text-purple-600">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="jane@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={8}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="resize-none"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 size-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-xs text-gray-600 text-center">
                    By submitting this form, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-50 rounded-lg">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{info.title}</CardTitle>
                        <div className="space-y-1">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-sm font-medium text-gray-900">
                              {detail}
                            </p>
                          ))}
                          <p className="text-xs text-gray-600 mt-2">{info.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card className="bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg">Follow Us</CardTitle>
                  <CardContent className="p-0 mt-4">
                    <div className="flex gap-4">
                      <motion.a
                        href="#"
                        className="p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Instagram className="size-5 text-purple-600" />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Facebook className="size-5 text-purple-600" />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="p-3 bg-white rounded-lg hover:bg-purple-100 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Twitter className="size-5 text-purple-600" />
                      </motion.a>
                    </div>
                  </CardContent>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Quick FAQs */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Quick Questions?</h2>
            <p className="text-gray-600">Here are some common questions we receive</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-900">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <Badge className="bg-purple-600 mb-4">Our Location</Badge>
            <h3 className="text-2xl font-bold mb-2">Visit Our Studio</h3>
            <p className="text-gray-600">
              We're located in the heart of New York City. Schedule an appointment to meet with our team!
            </p>
          </div>
          <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="size-12 text-purple-600 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Interactive Map</p>
              <p className="text-sm text-gray-500">123 Creative Boulevard, Suite 456</p>
              <p className="text-sm text-gray-500">New York, NY 10001</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
