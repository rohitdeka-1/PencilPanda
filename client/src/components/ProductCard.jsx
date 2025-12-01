import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, price, image, bgColor = 'bg-pink-100' }) => {
  return (
    <Link to={`/product/${id}`} className="block group">
      <div className={`${bgColor} rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow`}>
        <div className="aspect-square flex items-center justify-center p-6">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover rounded-2xl" />
          ) : (
            <div className="w-full h-full bg-white/50 rounded-2xl"></div>
          )}
        </div>
      </div>
      <div className="mt-3 text-center">
        <h3 className="text-sm md:text-base font-medium text-gray-700 mb-1">{name}</h3>
        <p className="text-2xl font-bold text-purple-900">₹{price}</p>
      </div>
    </Link>
  );
};


export default ProductCard;
