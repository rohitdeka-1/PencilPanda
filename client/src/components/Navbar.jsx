import { Search, User, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../a1ssets/logo.png';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2 md:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Pencil Panda" className="h-8 md:h-9 w-auto " />
          <span className="text-xl md:text-2xl engagement-regular text-[#310053] group-hover:text-[#630090] transition-colors">
            Pencil Panda
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110">
            <Search className="w-5 h-5 text-[#310053]" />
          </button>
          <Link to="/account" className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110">
            <User className="w-5 h-5 text-[#310053]" />
          </Link>
          <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-lg relative transition-all duration-300 hover:scale-110">
            <ShoppingCart className="w-5 h-5 text-[#310053]" />
            <span className="absolute -top-1 -right-1 bg-[#630090] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
