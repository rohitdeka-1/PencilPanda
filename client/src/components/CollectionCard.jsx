import { Link } from 'react-router-dom';

const CollectionCard = ({ image, title, link, bgColor = 'bg-gradient-to-br from-[#84e4e2] to-[#b8f0ef]' }) => {
  return (
    <Link to={link} className="block group">
      <div className={`${bgColor} rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 relative transform hover:-translate-y-1 hover:rotate-1`}>
        <div className="aspect-square flex items-center justify-center p-3">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2" />
          ) : (
            <div className="w-full h-full bg-white rounded-xl"></div>
          )}
        </div>
      </div>
      <h3 className="text-center mt-2 text-base font-semibold text-[#310053] group-hover:text-[#630090] transition-all duration-300 group-hover:scale-105">
        {title}
      </h3>
    </Link>
  );
};

export default CollectionCard;
