import { Search, User, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../a1ssets/logo.png';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#fefef8]  shadow-md backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Pencil Panda" className="h-10 md:h-12 w-auto" />
          <span className="text-2xl md:text-3xl engagement-regular text-purple-700">
            Pencil Panda
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <Search className="w-5 h-5 md:w-6 md:h-6 text-purple-700" />
          </button>
          <Link to="/account" className="p-2 hover:bg-white/50 rounded-lg transition-colors">
            <User className="w-5 h-5 md:w-6 md:h-6 text-purple-700" />
          </Link>
          <Link to="/cart" className="p-2 hover:bg-white/50 rounded-lg relative transition-colors">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-purple-700" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
