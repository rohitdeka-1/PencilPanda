import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap">
      <Link 
        to="/" 
        className="flex items-center gap-1 text-gray-600 hover:text-[#630090] transition-colors duration-300 hover:scale-105 transform"
      >
        <Home size={16} />
        <span>Home</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight size={16} className="text-gray-400" />
          {item.link ? (
            <Link 
              to={item.link}
              className="text-gray-600 hover:text-[#630090] transition-colors duration-300 hover:scale-105 transform inline-block"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#310053] font-semibold">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
