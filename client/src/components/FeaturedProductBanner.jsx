import { Link } from 'react-router-dom';

const FeaturedProductBanner = ({ 
  title, 
  price, 
  buttonText = 'Shop now', 
  image, 
  productId = 1,
  bgColor = 'bg-gradient-to-br from-[#84e4e2] to-[#b8f0ef]',
  layout = 'left' // 'left' or 'right'
}) => {
  return (
    <div className={`rounded-3xl overflow-hidden shadow-lg ${bgColor} grid md:grid-cols-2 gap-4 items-center p-6 md:p-8`}>
      {layout === 'left' ? (
        <>
          {/* Image on Left */}
          <div className="flex items-center justify-center">
            <img 
              src={image} 
              alt={title} 
              className="w-full max-w-[300px] h-auto object-contain"
            />
          </div>
          
          {/* Content on Right */}
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-semibold text-[#310053] mb-3">
              {title}
            </h3>
            <p className="text-4xl md:text-5xl font-bold text-[#310053] mb-6">
              ${price}
            </p>
            <Link 
              to={`/product/${productId}`}
              className="inline-block bg-[#630090] hover:bg-[#4a006b] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              {buttonText}
            </Link>
          </div>
        </>
      ) : (
        <>
          {/* Content on Left */}
          <div className="text-center md:text-right order-2 md:order-1">
            <h3 className="text-xl md:text-2xl font-semibold text-[#310053] mb-3">
              {title}
            </h3>
            <p className="text-4xl md:text-5xl font-bold text-[#310053] mb-6">
              ${price}
            </p>
            <Link 
              to={`/product/${productId}`}
              className="inline-block bg-[#630090] hover:bg-[#4a006b] text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              {buttonText}
            </Link>
          </div>
          
          {/* Image on Right */}
          <div className="flex items-center justify-center order-1 md:order-2">
            <img 
              src={image} 
              alt={title} 
              className="w-full max-w-[300px] h-auto object-contain"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedProductBanner;
