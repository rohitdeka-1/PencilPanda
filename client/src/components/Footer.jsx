import { Link } from 'react-router-dom';
import logo from '../a1ssets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-100 via-pink-100  mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
          <div className="w-24 h-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-200 via-pink-200 to-purple-300 rounded-full flex items-center justify-center shadow-lg p-2">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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
              <li><Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors">Contact</Link></li>
              <li><Link to="/blog" className="text-gray-700 hover:text-purple-600 transition-colors">Parenting Tips</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-purple-900 mb-3">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-gray-700 hover:text-purple-600 transition-colors">Shipping</Link></li>
              <li><Link to="/returns" className="text-gray-700 hover:text-purple-600 transition-colors">Returns</Link></li>
              <li><Link to="/faq" className="text-gray-700 hover:text-purple-600 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-purple-900 mb-3">Follow Us</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Instagram</a></li>
              <li><a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Facebook</a></li>
              <li><a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Pinterest</a></li>
            </ul>
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