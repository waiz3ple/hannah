import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle } from "lucide-react";

export function PrivacyPolicy() {
  const sections = [
    {
      icon: <AlertCircle className="size-6 text-purple-600" />,
      title: "1. Introduction",
      content: `At FreshEdit, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our photo editing services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access our services.`
    },
    {
      icon: <Database className="size-6 text-purple-600" />,
      title: "2. Information We Collect",
      content: `We collect several types of information:\n\n• Personal Information: Name, email address, phone number, billing address, and payment information when you create an account or place an order.\n\n• Photos and Images: All photos you upload for editing, including metadata (EXIF data, timestamps, location data if present).\n\n• Usage Data: Information about how you interact with our services, including IP address, browser type, device information, pages visited, and time spent on our website.\n\n• Cookies and Tracking: We use cookies and similar tracking technologies to enhance your experience and analyze website traffic.`
    },
    {
      icon: <UserCheck className="size-6 text-purple-600" />,
      title: "3. How We Use Your Information",
      content: `We use your information for the following purposes:\n\n• Service Delivery: To process your orders, edit your photos, and deliver finished products.\n\n• Account Management: To create and maintain your account, verify your identity, and communicate with you.\n\n• Payment Processing: To process transactions and send billing information.\n\n• Customer Support: To respond to your inquiries, provide technical support, and resolve issues.\n\n• Service Improvement: To analyze usage patterns, improve our services, and develop new features.\n\n• Marketing: To send promotional emails about new services, special offers, and updates (you can opt out at any time).\n\n• Legal Compliance: To comply with legal obligations and protect our rights.`
    },
    {
      icon: <Lock className="size-6 text-purple-600" />,
      title: "4. How We Protect Your Information",
      content: `We implement industry-standard security measures to protect your information:\n\n• Encryption: All data transmission is encrypted using SSL/TLS technology.\n\n• Secure Storage: Photos and personal data are stored on secure servers with restricted access.\n\n• Access Controls: Only authorized personnel have access to your information, and they are bound by confidentiality agreements.\n\n• Regular Audits: We conduct regular security audits and vulnerability assessments.\n\n• Payment Security: We use PCI-DSS compliant payment processors. We do not store complete credit card information on our servers.\n\nHowever, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`
    },
    {
      icon: <Eye className="size-6 text-purple-600" />,
      title: "5. Photo Privacy and Usage",
      content: `Your photos are private and confidential:\n\n• Limited Access: Only you and our professional editing team can view your photos.\n\n• No Public Display: Your photos will NEVER be displayed in our gallery, used for marketing, or shared with third parties without your explicit written consent.\n\n• Consent Required: If you choose to allow us to feature your photos, we will obtain separate written permission specifying how and where they will be used.\n\n• Storage Duration: Edited photos are stored securely for 90 days for re-download purposes, after which they are permanently deleted unless you request extended storage.\n\n• Deletion Rights: You can request deletion of your photos at any time by contacting us.`
    },
    {
      icon: <Database className="size-6 text-purple-600" />,
      title: "6. Information Sharing and Disclosure",
      content: `We do not sell your personal information. We may share your information only in these limited circumstances:\n\n• Service Providers: With trusted third-party vendors who assist in operating our services (payment processors, cloud storage providers, email services). These providers are contractually obligated to protect your information.\n\n• Legal Requirements: When required by law, court order, or government regulation.\n\n• Business Transfers: If FreshEdit is acquired or merged with another company, your information may be transferred as part of that transaction.\n\n• Protection of Rights: To protect the rights, property, or safety of FreshEdit, our users, or the public.\n\n• With Your Consent: When you explicitly authorize us to share your information.`
    },
    {
      icon: <UserCheck className="size-6 text-purple-600" />,
      title: "7. Your Privacy Rights",
      content: `Depending on your location, you have the following rights:\n\n• Access: Request access to the personal information we hold about you.\n\n• Correction: Request correction of inaccurate or incomplete information.\n\n• Deletion: Request deletion of your personal information (right to be forgotten).\n\n• Portability: Request a copy of your data in a portable format.\n\n• Opt-Out: Unsubscribe from marketing communications at any time.\n\n• Objection: Object to certain types of data processing.\n\n• Withdraw Consent: Withdraw previously given consent.\n\nTo exercise these rights, contact us at privacy@freshedit.com. We will respond within 30 days.`
    },
    {
      icon: <Lock className="size-6 text-purple-600" />,
      title: "8. Cookies and Tracking Technologies",
      content: `We use cookies and similar technologies:\n\n• Essential Cookies: Required for the website to function properly (authentication, security).\n\n• Analytics Cookies: Help us understand how visitors use our website (Google Analytics).\n\n• Marketing Cookies: Used to deliver relevant advertisements.\n\nYou can control cookies through your browser settings. Disabling cookies may limit some website functionality. For more information about cookies, visit www.allaboutcookies.org.`
    },
    {
      icon: <UserCheck className="size-6 text-purple-600" />,
      title: "9. Children's Privacy",
      content: `FreshEdit's services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately, and we will delete such information from our systems.`
    },
    {
      icon: <Database className="size-6 text-purple-600" />,
      title: "10. International Data Transfers",
      content: `Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. By using our services, you consent to the transfer of your information to the United States and other countries where we operate. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.`
    },
    {
      icon: <Shield className="size-6 text-purple-600" />,
      title: "11. Data Retention",
      content: `We retain your information for different periods:\n\n• Account Information: Retained while your account is active and for 3 years after account closure.\n\n• Original Photos: Deleted immediately after editing is complete (unless you request otherwise).\n\n• Edited Photos: Stored for 90 days, then permanently deleted.\n\n• Transaction Records: Retained for 7 years for accounting and legal purposes.\n\n• Marketing Preferences: Retained until you opt out or request deletion.`
    },
    {
      icon: <AlertCircle className="size-6 text-purple-600" />,
      title: "12. Third-Party Links",
      content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit. This Privacy Policy applies only to FreshEdit's services.`
    },
    {
      icon: <Lock className="size-6 text-purple-600" />,
      title: "13. California Privacy Rights (CCPA)",
      content: `California residents have additional rights under the California Consumer Privacy Act (CCPA):\n\n• Right to Know: What personal information we collect, use, and share.\n\n• Right to Delete: Request deletion of your personal information.\n\n• Right to Opt-Out: Opt out of the sale of personal information (we do not sell personal information).\n\n• Non-Discrimination: We will not discriminate against you for exercising your privacy rights.\n\nTo exercise these rights, email privacy@freshedit.com with "CCPA Request" in the subject line.`
    },
    {
      icon: <Shield className="size-6 text-purple-600" />,
      title: "14. GDPR Compliance (European Users)",
      content: `For users in the European Economic Area (EEA), we comply with the General Data Protection Regulation (GDPR):\n\n• Legal Basis: We process your data based on consent, contract performance, legal obligations, and legitimate interests.\n\n• Data Protection Officer: Contact our DPO at dpo@freshedit.com.\n\n• EU Rights: You have the right to lodge a complaint with your local data protection authority.\n\n• Data Transfers: We use standard contractual clauses for international transfers.`
    },
    {
      icon: <AlertCircle className="size-6 text-purple-600" />,
      title: "15. Security Breach Notification",
      content: `In the event of a data breach that affects your personal information, we will notify you within 72 hours via email and provide details about the breach, affected data, and steps we are taking to address the issue. We will also notify relevant authorities as required by law.`
    },
    {
      icon: <Database className="size-6 text-purple-600" />,
      title: "16. Changes to This Privacy Policy",
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:\n\n• Posting the updated policy on our website\n• Updating the "Last Updated" date\n• Sending an email notification for significant changes\n\nYour continued use of our services after changes are posted constitutes acceptance of the updated policy.`
    },
    {
      icon: <UserCheck className="size-6 text-purple-600" />,
      title: "17. Contact Us",
      content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:\n\nEmail: privacy@freshedit.com\nAddress: FreshEdit Inc., [Your Business Address]\nPhone: [Your Phone Number]\nData Protection Officer: dpo@freshedit.com\n\nWe will respond to your inquiry within 30 days.`
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
            <Shield className="size-16 text-purple-600 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-6">
            Privacy{" "}
            <span className="text-purple-600">
              Policy
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
            Your privacy is our priority. Learn how we protect and handle your data.
          </p>
          <Badge className="bg-purple-100 text-purple-700">
            Last Updated: March 2, 2026
          </Badge>
        </motion.div>

        {/* Privacy Commitment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="mb-12 border-purple-200 bg-purple-50">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Lock className="size-6 text-purple-600 shrink-0 mt-1" />
                <div>
                  <CardTitle className="text-purple-900">Our Privacy Commitment</CardTitle>
                  <CardContent className="p-0 mt-3">
                    <p className="text-sm text-purple-800 leading-relaxed">
                      At FreshEdit, we understand that your photos are personal and private. We are committed to protecting your privacy and handling your information with the highest level of care and security. We will NEVER sell your personal information or share your photos without your explicit permission.
                    </p>
                  </CardContent>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.03, duration: 0.5 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-50 rounded-lg shrink-0">
                      {section.icon}
                    </div>
                    <CardTitle className="text-xl text-purple-900">{section.title}</CardTitle>
                  </div>
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

        {/* Contact Section */}
        <motion.div
          className="mt-16 text-center bg-white rounded-2xl p-12 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Shield className="size-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            We're here to help. If you have any questions or concerns about our privacy practices, please reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              Contact Us
            </a>
            <a
              href="mailto:privacy@freshedit.com"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
            >
              Email Privacy Team
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
