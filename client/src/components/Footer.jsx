import { Link } from 'react-router-dom';
import { Instagram, Youtube, MessageCircle } from 'lucide-react';
import logo from '../a1ssets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Pencil Panda" className="w-12 h-12 object-contain" />
              <div>
                <p className="text-xl font-bold text-[#3e0053]">
                  Pencil Panda
                </p>
                <p className="text-xs text-gray-600">Educational Excellence</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Making learning fun and accessible for every child across India.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://wa.me/918420514587" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg hover:bg-green-50 border border-gray-200 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} className="text-green-600" />
              </a>
              <a 
                href="https://instagram.com/pencilpandaofficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg hover:bg-pink-50 border border-gray-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-pink-600" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[#3e0053] mb-4 text-sm uppercase tracking-wide">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/collections/all" className="text-gray-700 hover:text-[#3e0053] transition-colors">All Products</Link></li>
              <li><Link to="/collections/toys" className="text-gray-700 hover:text-[#3e0053] transition-colors">Educational Toys</Link></li>
              <li><Link to="/collections/books" className="text-gray-700 hover:text-[#3e0053] transition-colors">Tech Books</Link></li>
              <li><Link to="/collections/accessories" className="text-gray-700 hover:text-[#3e0053] transition-colors">Learning Tools</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#3e0053] mb-4 text-sm uppercase tracking-wide">About</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-[#3e0053] transition-colors">Our Story</Link></li>
              <li><Link to="/contact-us" className="text-gray-600 hover:text-[#3e0053] transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#3e0053] mb-4 text-sm uppercase tracking-wide">Help</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shipping" className="text-gray-600 hover:text-[#3e0053] transition-colors">Shipping Policy</Link></li>
              <li><Link to="/refund" className="text-gray-600 hover:text-[#3e0053] transition-colors">Refund Policy</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-[#3e0053] transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#3e0053] mb-4 text-sm uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/terms" className="text-gray-600 hover:text-[#3e0053] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-[#3e0053] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-[#3e0053] mb-3">Contact Us</h4>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Email:</span> support@pencilpanda.com
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> +91 84205 14587
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#3e0053] mb-3">Business Hours</h4>
              <p className="text-gray-600 mb-1">Monday - Saturday: 10:00 AM - 7:00 PM IST</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 pt-6 border-t border-gray-200">
          <p className="mb-2">&copy; 2025 Pencil Panda. All rights reserved.</p>
          <p className="text-xs text-gray-500">Making learning fun and accessible for every child 🐼✏️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;