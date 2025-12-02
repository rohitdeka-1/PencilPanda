import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, price, image, bgColor = 'bg-gradient-to-br from-[#84e4e2] to-[#b8f0ef]' }) => {
  return (
    <Link to={`/product/${id}`} className="block group">
      <div className={`${bgColor} rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105`}>
        <div className="aspect-square flex items-center justify-center p-4">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-110" />
          ) : (
            <div className="w-full h-full bg-white rounded-xl"></div>
          )}
        </div>
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-sm md:text-base font-medium text-[#310053] mb-1 group-hover:text-[#630090] transition-colors">{name}</h3>
        <p className="text-xl font-bold text-[#310053] group-hover:scale-110 inline-block transition-transform duration-300">₹{price}</p>
      </div>
    </Link>
  );
};


export default ProductCard;
