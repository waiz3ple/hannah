import { Link } from "react-router";
import { Camera, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Camera className="size-8 text-pink-500" />
              <span className="text-xl font-bold text-gray-900">
                FreshEdit
              </span>
            </Link>
            <p className="text-sm text-gray-600">
              Professional photo editing services for beautiful, confident women.
            </p>
            <Link 
              to="/admin" 
              className="inline-block mt-4 px-3 py-1.5 text-xs font-semibold bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Admin Panel
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-pink-500 transition-colors">Home</Link></li>
              <li><Link to="/pricing" className="hover:text-pink-500 transition-colors">Pricing</Link></li>
              <li><Link to="/gallery" className="hover:text-pink-500 transition-colors">Gallery</Link></li>
              <li><Link to="/upload" className="hover:text-pink-500 transition-colors">Upload Photos</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/help" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-pink-500 transition-colors">Help Center</Link></li>
              <li><Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-pink-500 transition-colors">About Us</Link></li>
              <li><Link to="/terms" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-pink-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-pink-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-pink-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                <Instagram className="size-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                <Facebook className="size-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">
                <Twitter className="size-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2026 FreshEdit. All rights reserved.</p>
          <p className="mt-2">
            Built by{" "}
            <a 
              href="https://yourtech.company" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-pink-500 font-semibold transition-colors"
            >
              Your Tech Company
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}