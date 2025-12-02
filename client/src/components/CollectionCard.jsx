import { Link } from 'react-router-dom';

const CollectionCard = ({ image, title, link, bgColor = 'bg-gradient-to-br from-[#84e4e2] to-[#b8f0ef]' }) => {
  return (
    <Link to={link} className="block group">
      <div className={`${bgColor} rounded-2xl overflow-hidden hover:shadow-lg transition-shadow relative`}>
        <div className="aspect-square flex items-center justify-center p-3">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover rounded-xl" />
          ) : (
            <div className="w-full h-full bg-white rounded-xl"></div>
          )}
        </div>
      </div>
      <h3 className="text-center mt-2 text-base font-semibold text-[#310053] group-hover:text-[#630090]">
        {title}
      </h3>
    </Link>
  );
};

export default CollectionCard;
