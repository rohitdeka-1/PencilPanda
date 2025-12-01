import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Learning Made Fun',
    subtitle: 'for your little ones!',
    description: 'Educational toys and books that inspire creativity',
    buttonText: 'Shop Educational Toys',
    bgImage: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1200&h=600&fit=crop',
    buttonColor: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
  },
  {
    id: 2,
    title: 'Tech Books for',
    subtitle: 'Young Minds!',
    description: 'Explore coding, science & technology in fun ways',
    buttonText: 'Discover Books',
    bgImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop',
    buttonColor: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
  },
  {
    id: 3,
    title: 'Smart Gifts',
    subtitle: 'Smart Kids!',
    description: 'Perfect educational gifts for every occasion',
    buttonText: 'Browse All',
    bgImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200&h=600&fit=crop',
    buttonColor: 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <div className={`relative ${!slide.bgImage && slide.bgColor} h-[300px] md:h-[400px] lg:h-[450px] flex items-center justify-center overflow-hidden`}>
              {/* Background Image */}
              {slide.bgImage && (
                <>
                  <img 
                    src={slide.bgImage} 
                    alt={slide.title} 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/40"></div>
                </>
              )}
              
              {/* Content */}
              <div className="relative z-10 max-w-md mx-auto text-center px-4 py-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl engagement-regular text-white mb-2 drop-shadow-lg">
                  {slide.title}
                </h2>
                <h3 className="text-4xl md:text-5xl lg:text-6xl engagement-regular text-white/90 mb-4 drop-shadow-lg">
                  {slide.subtitle}
                </h3>
                <p className="text-white/90 text-lg md:text-xl mb-6 drop-shadow-md">
                  {slide.description}
                </p>
                <button className={`${slide.buttonColor} text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors shadow-lg`}>
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-xl transition-all hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6 text-purple-700" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-xl transition-all hover:scale-110"
      >
        <ChevronRight className="w-6 h-6 text-purple-700" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
