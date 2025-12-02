import { Search, User, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../a1ssets/logo.png';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Pencil Panda Logo" className="h-10 md:h-12 w-auto" />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold text-[#310053]">
              Pencil Panda
            </span>
            <span className="text-xs text-gray-500 hidden md:block">Educational Toys & Books</span>
          </div>
        </Link>

        <div className="flex items-center gap-3 md:gap-4">
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors" aria-label="Search">
            <Search className="w-5 h-5 text-[#310053]" />
          </button>
          <Link to="/account" className="p-2 hover:bg-gray-50 rounded-lg transition-colors" aria-label="Account">
            <User className="w-5 h-5 text-[#310053]" />
          </Link>
          <Link to="/cart" className="p-2 hover:bg-gray-50 rounded-lg relative transition-colors" aria-label="Shopping Cart">
            <ShoppingCart className="w-5 h-5 text-[#310053]" />
            <span className="absolute -top-1 -right-1 bg-[#630090] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
