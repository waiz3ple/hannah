import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { FileText, Shield, AlertCircle } from "lucide-react";

export function TermsOfService() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing or using FreshEdit's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services. The materials contained in this website and service are protected by applicable copyright and trademark law.`
    },
    {
      title: "2. Service Description",
      content: `FreshEdit provides professional photo editing services to individual clients. Our services include but are not limited to: photo retouching, color correction, blemish removal, background adjustments, skin smoothing, body contouring, and other enhancement services as described in our package offerings. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.`
    },
    {
      title: "3. User Accounts",
      content: `To use our services, you must create an account and provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access or use of your account. FreshEdit is not liable for any loss or damage arising from your failure to comply with these security obligations.`
    },
    {
      title: "4. Photo Upload and Ownership",
      content: `By uploading photos to FreshEdit, you represent and warrant that you own or have the necessary rights, licenses, consents, and permissions to use and authorize us to use all copyright, trademark, trade secret, and other proprietary rights in your photos. You retain all ownership rights to your original photos. You grant FreshEdit a limited, non-exclusive license to access, use, store, copy, modify, and create derivative works of your photos solely for the purpose of providing our editing services.`
    },
    {
      title: "5. Prohibited Content",
      content: `You agree not to upload or submit photos that: (a) violate any law or regulation; (b) infringe upon the intellectual property or privacy rights of others; (c) contain explicit sexual content, violence, or illegal activities; (d) contain malware, viruses, or harmful code; (e) impersonate any person or entity; or (f) are deceptive, fraudulent, or misleading. FreshEdit reserves the right to refuse service and remove any content that violates these terms.`
    },
    {
      title: "6. Payment and Pricing",
      content: `All fees are stated in U.S. dollars and are non-refundable except as required by law or as explicitly stated in our refund policy. Payment is due at the time of order placement. We reserve the right to change our pricing at any time, but price changes will not affect orders already placed. You are responsible for all taxes associated with your purchase. If payment fails or is declined, we reserve the right to cancel your order.`
    },
    {
      title: "7. Turnaround Times",
      content: `Turnaround times (Standard, Express, Rush) are estimates and not guarantees. While we strive to meet these timelines, actual delivery may vary based on order volume, complexity, and unforeseen circumstances. FreshEdit is not liable for delays in delivery. Rush and Express fees are charged for priority processing and are non-refundable regardless of actual delivery time.`
    },
    {
      title: "8. Revisions and Satisfaction",
      content: `Revision allowances vary by package tier as described on our Pricing page. Professional packages include 2 rounds of revisions, Premium packages include unlimited revisions. Revisions must be requested within 14 days of receiving edited photos. We aim for 100% customer satisfaction, but artistic interpretation may vary. If you are not satisfied with the final edited photos, please contact us to discuss resolution options.`
    },
    {
      title: "9. Privacy and Data Security",
      content: `We take your privacy seriously. Your photos and personal information are protected according to our Privacy Policy. We implement reasonable security measures to protect your data, but cannot guarantee absolute security. You acknowledge that internet transmission is never completely secure, and you provide information at your own risk. We will never sell your photos or personal information to third parties.`
    },
    {
      title: "10. Gallery and Marketing Use",
      content: `Your edited photos will NEVER be used in our public gallery or marketing materials without your explicit written consent. If you choose to allow your photos to be featured, you grant FreshEdit a perpetual, worldwide, royalty-free license to display, reproduce, and distribute those photos for promotional purposes. You may revoke this permission at any time by contacting us.`
    },
    {
      title: "11. Event and Studio Photography",
      content: `For event and studio photography services, clients acknowledge that photographers will capture images at agreed-upon locations and times. Access codes provided for event photos are confidential and should not be shared. Photos from events and studio sessions are subject to the same editing, privacy, and usage terms outlined in this agreement. Payment is required before downloading or receiving final edited photos.`
    },
    {
      title: "12. Intellectual Property",
      content: `All edited photos, website content, logos, designs, and materials created by FreshEdit are protected by copyright and other intellectual property laws. The FreshEdit name, logo, and branding are trademarks of FreshEdit. You may not use our intellectual property without prior written permission. The editing techniques, processes, and final edited images created by FreshEdit are our intellectual property.`
    },
    {
      title: "13. Limitation of Liability",
      content: `FreshEdit's total liability for any claims arising from our services is limited to the amount you paid for the specific service. We are not liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangibles. Some jurisdictions do not allow limitations on implied warranties or liability, so these limitations may not apply to you.`
    },
    {
      title: "14. Indemnification",
      content: `You agree to indemnify, defend, and hold harmless FreshEdit and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including attorney fees) arising from: (a) your use of our services; (b) your violation of these Terms; (c) your violation of any rights of another party; or (d) any content you upload or submit.`
    },
    {
      title: "15. Termination",
      content: `We reserve the right to terminate or suspend your account and access to our services immediately, without prior notice, for any reason, including breach of these Terms. Upon termination, your right to use our services will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.`
    },
    {
      title: "16. Dispute Resolution",
      content: `Any disputes arising from these Terms or our services will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You waive your right to participate in class action lawsuits. The arbitration will take place in [Your State/County], and the arbitrator's decision will be final and binding.`
    },
    {
      title: "17. Governing Law",
      content: `These Terms are governed by and construed in accordance with the laws of the United States and the State of [Your State], without regard to conflict of law principles. You consent to the exclusive jurisdiction of courts located in [Your State] for any disputes not subject to arbitration.`
    },
    {
      title: "18. Changes to Terms",
      content: `FreshEdit reserves the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the new Terms on our website and updating the "Last Updated" date. Your continued use of our services after changes are posted constitutes acceptance of the modified Terms. We encourage you to review these Terms periodically.`
    },
    {
      title: "19. Severability",
      content: `If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the Terms will otherwise remain in full force and effect. The failure of FreshEdit to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision.`
    },
    {
      title: "20. Contact Information",
      content: `If you have any questions about these Terms of Service, please contact us at: Email: legal@freshedit.com | Address: FreshEdit Inc., [Your Business Address] | Phone: [Your Phone Number]. We will respond to inquiries within 2-3 business days.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
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
            <FileText className="size-16 text-purple-600 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-6">
            Terms of{" "}
            <span className="text-purple-600">
              Service
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            Please read these terms carefully before using our services
          </p>
          <Badge className="bg-purple-100 text-purple-700">
            Last Updated: March 2, 2026
          </Badge>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="mb-12 border-purple-200 bg-purple-50">
            <CardHeader>
              <div className="flex items-start gap-4">
                <AlertCircle className="size-6 text-purple-600 shrink-0 mt-1" />
                <div>
                  <CardTitle className="text-purple-900">Important Notice</CardTitle>
                  <CardContent className="p-0 mt-3">
                    <p className="text-sm text-purple-800 leading-relaxed">
                      By using FreshEdit's services, you agree to these Terms of Service. These terms constitute a legally binding agreement between you and FreshEdit. Please read them carefully. If you do not agree to these terms, please do not use our services.
                    </p>
                  </CardContent>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-900">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Agreement Confirmation */}
        <motion.div
          className="mt-16 text-center bg-white rounded-2xl p-12 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Shield className="size-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Questions About Our Terms?</h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            If you have any questions or concerns about our Terms of Service, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Contact Us
            </a>
            <a
              href="/help"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
            >
              Visit Help Center
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
