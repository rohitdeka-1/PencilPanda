import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Learning Made Fun',
    subtitle: 'for your little ones!',
    description: 'Educational toys and books that inspire creativity',
    buttonText: 'Shop Educational Toys',
    bgImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200&h=600&fit=crop',
    buttonColor: 'bg-[#630090] hover:bg-[#4a006b]'
  },
  {
    id: 2,
    title: 'Tech Books for',
    subtitle: 'Young Minds!',
    description: 'Explore coding, science & technology in fun ways',
    buttonText: 'Discover Books',
    bgImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=600&fit=crop',
    buttonColor: 'bg-[#630090] hover:bg-[#4a006b]'
  },
  {
    id: 3,
    title: 'Smart Gifts',
    subtitle: 'Smart Kids!',
    description: 'Perfect educational gifts for every occasion',
    buttonText: 'Browse All',
    bgImage: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200&h=600&fit=crop',
    buttonColor: 'bg-[#630090] hover:bg-[#4a006b]'
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
            <div className={`relative ${!slide.bgImage && slide.bgColor} h-[250px] md:h-[320px] lg:h-[380px] flex items-center justify-center overflow-hidden`}>
              {/* Background Image */}
              {slide.bgImage && (
                <>
                  <img 
                    src={slide.bgImage} 
                    alt={slide.title} 
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  {/* Dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/60"></div>
                </>
              )}
              
              {/* Content */}
              <div className="relative z-10 max-w-md mx-auto text-center px-4 py-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl engagement-regular text-white mb-2 drop-shadow-lg">
                  {slide.title}
                </h2>
                <h3 className="text-3xl md:text-4xl lg:text-5xl engagement-regular text-white/90 mb-3 drop-shadow-lg">
                  {slide.subtitle}
                </h3>
                <p className="text-white/90 text-base md:text-lg mb-5 drop-shadow-md">
                  {slide.description}
                </p>
                <button className={`${slide.buttonColor} text-white px-6 py-2.5 rounded-full text-base font-semibold transition-colors shadow-lg`}>
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-lg transition-all"
      >
        <ChevronLeft className="w-5 h-5 text-[#310053]" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-lg transition-all"
      >
        <ChevronRight className="w-5 h-5 text-[#310053]" />
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
