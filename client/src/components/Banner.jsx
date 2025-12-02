const Banner = ({ text, buttonText, bgImage, bgColor = 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400', onButtonClick }) => {
  return (
    <div className={`relative ${!bgImage && bgColor} h-[100px] md:h-[150px] flex items-center shadow-md overflow-hidden`}>
      {/* Background Image */}
      {bgImage && (
        <>
          <img 
            src={bgImage} 
            alt="Banner" 
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/50"></div>
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-between gap-4 w-full max-w-7xl mx-auto px-4">
        <p className="text-base md:text-xl font-semibold text-white flex-1 text-center md:text-left drop-shadow-lg">
          {text}
        </p>
        {buttonText && (
          <button 
            onClick={onButtonClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full text-sm md:text-base font-semibold whitespace-nowrap transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
