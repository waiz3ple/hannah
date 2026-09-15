import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { HelpCircle, Camera, Upload, CreditCard, Package, Clock, Shield, Mail } from "lucide-react";
import { useState } from "react";

export function HelpCenter() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories = [
    { icon: <Upload className="size-6 text-purple-600" />, title: "Getting Started", count: 5 },
    { icon: <Package className="size-6 text-pink-500" />, title: "Packages & Pricing", count: 6 },
    { icon: <Camera className="size-6 text-purple-600" />, title: "Photo Quality", count: 4 },
    { icon: <Clock className="size-6 text-pink-500" />, title: "Turnaround Time", count: 3 },
    { icon: <CreditCard className="size-6 text-purple-600" />, title: "Payment & Billing", count: 4 },
    { icon: <Shield className="size-6 text-pink-500" />, title: "Privacy & Security", count: 3 },
  ];

  const faqs = [
    {
      category: "Getting Started",
      question: "How do I upload my photos?",
      answer: "Simply create an account, select your desired package from the Pricing page, and you'll be directed to the upload page. You can drag and drop your photos or click to browse. We accept JPG, PNG, and RAW files."
    },
    {
      category: "Getting Started",
      question: "What file formats do you accept?",
      answer: "We accept JPG, PNG, and RAW files (.CR2, .NEF, .ARW, etc.). For best results, we recommend uploading high-resolution images. The higher the source quality, the better your edited photos will look!"
    },
    {
      category: "Getting Started",
      question: "Do I need to create an account?",
      answer: "Yes, an account is required to upload photos and track your orders. This ensures the security and privacy of your photos. Creating an account only takes a minute!"
    },
    {
      category: "Packages & Pricing",
      question: "What's included in each package?",
      answer: "Each package includes professional photo editing with different photo limits: Starter (10 photos, $49), Professional (30 photos, $129), and Premium (100 photos, $299). All packages include basic retouching, color correction, and high-resolution delivery."
    },
    {
      category: "Packages & Pricing",
      question: "Can I upgrade my package after ordering?",
      answer: "Yes! If you need to edit more photos than your current package allows, you can upgrade to a higher tier package at any time before we start processing. Contact us at support@freshedit.com."
    },
    {
      category: "Packages & Pricing",
      question: "What if I need more photos than my package allows?",
      answer: "You can purchase additional photo edits at a prorated rate, or upgrade to a higher tier package. We're flexible and want to meet your needs!"
    },
    {
      category: "Packages & Pricing",
      question: "Do you offer refunds?",
      answer: "We offer a 100% satisfaction guarantee. If you're not happy with the edited photos, we'll revise them until you love them. Refunds are available before editing begins."
    },
    {
      category: "Photo Quality",
      question: "What kind of editing do you provide?",
      answer: "Our professional editors provide retouching, color correction, blemish removal, skin smoothing, background adjustments, body contouring, and more. Premium packages include magazine-quality editing and creative enhancements."
    },
    {
      category: "Photo Quality",
      question: "Will my photos look natural?",
      answer: "Absolutely! Our editing philosophy is to enhance your natural beauty, not create an artificial look. We focus on bringing out your best features while maintaining authenticity."
    },
    {
      category: "Photo Quality",
      question: "Can I request specific edits?",
      answer: "Yes! You can include special instructions when uploading your photos. Professional and Premium packages include revision rounds so you can request adjustments."
    },
    {
      category: "Turnaround Time",
      question: "How long does editing take?",
      answer: "Standard turnaround is 5-7 business days. Express (3-4 days) and Rush (24-48 hours) options are available for additional fees. Rush orders are perfect for urgent needs!"
    },
    {
      category: "Turnaround Time",
      question: "Do you work on weekends?",
      answer: "Business days are Monday-Friday. Orders placed on weekends will begin processing on the next business day. Rush orders receive priority processing, even on weekends!"
    },
    {
      category: "Turnaround Time",
      question: "Will I be notified when my photos are ready?",
      answer: "Yes! You'll receive email notifications at each stage: when we receive your order, when editing begins, and when your photos are ready for download."
    },
    {
      category: "Payment & Billing",
      question: "When do I pay?",
      answer: "Payment is processed securely when you submit your order and upload your photos. We use industry-standard encryption to protect your payment information."
    },
    {
      category: "Payment & Billing",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) and debit cards. All transactions are processed securely through our payment provider."
    },
    {
      category: "Payment & Billing",
      question: "Can I get an invoice?",
      answer: "Yes! You'll receive an email receipt immediately after payment, and you can download invoices from your Dashboard at any time."
    },
    {
      category: "Privacy & Security",
      question: "Are my photos secure?",
      answer: "Absolutely! We use bank-level encryption to protect your photos. Your images are stored securely and are never shared without your explicit permission. We take your privacy seriously."
    },
    {
      category: "Privacy & Security",
      question: "Who can see my photos?",
      answer: "Only you and our professional editing team. Your photos will never appear in our gallery or be used for marketing without your written consent."
    },
    {
      category: "Privacy & Security",
      question: "Do you keep my photos after editing?",
      answer: "We securely store your edited photos for 90 days so you can re-download them. After 90 days, photos are permanently deleted from our servers unless you request extended storage."
    },
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
            <HelpCircle className="size-16 text-purple-600 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-6">
            How Can We{" "}
            <span className="text-purple-600">
              Help You?
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions, learn about our services, and get the support you need
          </p>
        </motion.div>

        {/* Quick Categories */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>{category.count} articles</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Quick answers to questions you may have</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.03 }}
              >
                <Card
                  className={`cursor-pointer transition-all ${
                    openFaq === index ? "border-purple-500 shadow-md" : "hover:border-gray-300"
                  }`}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Badge className="mb-2 bg-purple-100 text-purple-700 hover:bg-purple-100">
                          {faq.category}
                        </Badge>
                        <CardTitle className="text-lg font-semibold">{faq.question}</CardTitle>
                      </div>
                      <motion.div
                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <HelpCircle className="size-5 text-gray-400 shrink-0" />
                      </motion.div>
                    </div>
                  </CardHeader>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? "auto" : 0,
                      opacity: openFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          className="mt-16 text-center bg-white rounded-2xl p-12 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Mail className="size-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@freshedit.com"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
            >
              Email Us
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}