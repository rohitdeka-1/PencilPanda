import { Link } from 'react-router-dom';

const CollectionCard = ({ image, title, link, bgColor = 'bg-gray-100' }) => {
  return (
    <Link to={link} className="block group">
      <div className={`${bgColor} rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow relative`}>
        <div className="aspect-square flex items-center justify-center p-4">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover rounded-2xl" />
          ) : (
            <div className="w-full h-full bg-white/50 rounded-2xl"></div>
          )}
        </div>
      </div>
      <h3 className="text-center mt-3 text-lg font-semibold text-cyan-500 group-hover:text-cyan-600">
        {title}
      </h3>
    </Link>
  );
};

export default CollectionCard;
