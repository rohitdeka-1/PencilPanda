import { Link } from 'react-router-dom';
import { Instagram, Youtube, MessageCircle } from 'lucide-react';
import logo from '../a1ssets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#ccf5f5]  mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg p-2">
            <img src={logo} alt="Pencil Panda" className="w-full h-full object-contain" />
            {/* <span className="text-3xl"></span> */}
          </div>
          <div className="text-center md:text-left">
            <p className="text-3xl engagement-regular text-purple-700">
              Pencil Panda
            </p>
            <p className="text-sm text-gray-600 mt-1">Educational Fun for Little Minds</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <div>
            <h4 className="font-bold text-purple-900 mb-3">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/collections/all" className="text-gray-700 hover:text-purple-600 transition-colors">All Products</Link></li>
              <li><Link to="/collections/toys" className="text-gray-700 hover:text-purple-600 transition-colors">Educational Toys</Link></li>
              <li><Link to="/collections/books" className="text-gray-700 hover:text-purple-600 transition-colors">Tech Books</Link></li>
              <li><Link to="/collections/accessories" className="text-gray-700 hover:text-purple-600 transition-colors">Learning Tools</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-purple-900 mb-3">About</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors">Our Story</Link></li>
              <li><Link to="/contact-us" className="text-gray-700 hover:text-purple-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-purple-900 mb-3">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-gray-700 hover:text-purple-600 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/refund" className="text-gray-700 hover:text-purple-600 transition-colors">Refund Policy</Link></li>
              <li><Link to="/faq" className="text-gray-700 hover:text-purple-600 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-purple-900 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-700 hover:text-purple-600 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-700 hover:text-purple-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/shipping" className="text-gray-700 hover:text-purple-600 transition-colors">Shipping Info</Link></li>
              <li><Link to="/refund" className="text-gray-700 hover:text-purple-600 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-purple-900 mb-3">Follow Us</h4>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/918420514587" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={24} strokeWidth={1.5} />
              </a>
              <a 
                href="https://instagram.com/pencilpandaofficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} strokeWidth={1.5} />
              </a>
              
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 pt-6 border-t border-purple-200">
          <p>&copy; 2025 Pencil Panda. All rights reserved. Making learning fun for kids! 🐼✏️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;