import HeroCarousel from '../components/HeroCarousel';
import CollectionCard from '../components/CollectionCard';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import FeaturedProductBanner from '../components/FeaturedProductBanner';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const collections = [
  { id: 1, title: 'Educational Toys', link: '/collections/toys', bgColor: 'bg-gradient-to-br from-[#ffefec] to-[#ffd9d4]', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop' },
  { id: 2, title: 'Tech Books', link: '/collections/books', bgColor: 'bg-gradient-to-br from-[#004a85] to-[#0066b3]', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop' },
  { id: 3, title: 'STEM Kits', link: '/collections/stem', bgColor: 'bg-gradient-to-br from-[#84e4e2] to-[#b8f0ef]', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop' },
  { id: 4, title: 'Learning Tools', link: '/collections/tools', bgColor: 'bg-gradient-to-br from-[#c6898d] to-[#d4a1a5]', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=400&fit=crop' }
];

const featuredProducts = [
  { id: 1, name: 'Coding Robot Kit', price: '45.00', bgColor: 'bg-gradient-to-br from-[#84e4e2] to-[#b8f0ef]', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop' },
  { id: 2, name: 'Math Learning Blocks', price: '28.00', bgColor: 'bg-gradient-to-br from-[#ffefec] to-[#ffd9d4]', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop' },
  { id: 3, name: 'Science Explorer Set', price: '35.00', bgColor: 'bg-gradient-to-br from-[#c6898d] to-[#d4a1a5]', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=400&fit=crop' },
  { id: 4, name: 'Junior Tech Book Bundle', price: '32.00', bgColor: 'bg-gradient-to-br from-[#004a85] to-[#0066b3]', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=400&fit=crop' }
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroCarousel />

      <section className="px-4 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          
          <h2 className="text-2xl md:text-3xl engagement-regular text-[#310053] text-center">
            Shop our collections
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} {...collection} />
          ))}
        </div>
      </section>

      <Banner 
        text="🎉 Special Offer: Get 20% off on all educational books this week!" 
        buttonText="Shop Now"
        bgImage="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200&h=300&fit=crop"
      />

      {/* Featured Product Banners */}
      <section className="px-4 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Music Mobile Banner */}
          <div className="rounded-3xl overflow-hidden shadow-lg">
            {/* Image Section */}
            <div className="bg-gradient-to-br from-[#84e4e2] to-[#a8ebea] p-8 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop" 
                alt="Music mobile" 
                className="w-full max-w-[250px] h-auto object-contain"
              />
            </div>
            {/* Price Section - Darker shade */}
            <div className="bg-gradient-to-br from-[#6dd4d2] to-[#84e4e2] p-6 text-center">
              <h3 className="text-xl md:text-2xl font-semibold text-[#310053] mb-2">
                Music mobile
              </h3>
              <p className="text-4xl md:text-5xl font-bold text-[#310053] mb-4">
                $25.00
              </p>
              <button className="bg-[#630090] hover:bg-[#4a006b] text-white px-8 py-3 rounded-full font-semibold transition-colors">
                Pre-order now!
              </button>
            </div>
          </div>

          {/* Noodoll Night Lights Banner */}
          <div className="rounded-3xl overflow-hidden shadow-lg">
            {/* Image Section */}
            <div className="bg-gradient-to-br from-[#ffefec] to-[#ffe0db] p-8 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop" 
                alt="Noodoll night lights" 
                className="w-full max-w-[250px] h-auto object-contain"
              />
            </div>
            {/* Price Section - Darker shade */}
            <div className="bg-gradient-to-br from-[#ffd9d4] to-[#ffc8bf] p-6 text-center">
              <h3 className="text-xl md:text-2xl font-semibold text-[#310053] mb-2">
                New Noodoll night lights
              </h3>
              <p className="text-4xl md:text-5xl font-bold text-[#310053] mb-4">
                $13.50
              </p>
              <button className="bg-[#630090] hover:bg-[#4a006b] text-white px-8 py-3 rounded-full font-semibold transition-colors">
                Shop now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl engagement-regular text-[#310053] mb-6 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <div className="px-4 py-8 max-w-7xl mx-auto">
        <div className="bg-[#ccf5f5] rounded-2xl p-6 md:p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">🐼</span>
            </div>
            <h3 className="text-xl md:text-2xl engagement-regular text-[#310053] mb-3">
              Join the Pencil Panda Family!
            </h3>
            <p className="text-[#310053] mb-6">
              Get parenting tips, educational content & exclusive offers for your kids
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-full border-2 border-[#310053] focus:border-[#630090] focus:outline-none"
              />
              <button className="bg-[#630090] hover:bg-[#4a006b] text-white px-6 py-2.5 rounded-full font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
