import HeroCarousel from '../components/HeroCarousel';
import CollectionCard from '../components/CollectionCard';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const collections = [
  { id: 1, title: 'Educational Toys', link: '/collections/toys', bgColor: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-300 via-pink-300 to-purple-400', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop' },
  { id: 2, title: 'Tech Books', link: '/collections/books', bgColor: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300 via-cyan-300 to-blue-400', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop' },
  { id: 3, title: 'STEM Kits', link: '/collections/stem', bgColor: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-300 via-teal-300 to-green-400', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop' },
  { id: 4, title: 'Learning Tools', link: '/collections/tools', bgColor: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-300 via-yellow-300 to-orange-400', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=400&fit=crop' }
];

const featuredProducts = [
  { id: 1, name: 'Coding Robot Kit', price: '45.00', bgColor: 'bg-gradient-to-br from-blue-200 to-cyan-100', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop' },
  { id: 2, name: 'Math Learning Blocks', price: '28.00', bgColor: 'bg-gradient-to-br from-pink-200 to-purple-100', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop' },
  { id: 3, name: 'Science Explorer Set', price: '35.00', bgColor: 'bg-gradient-to-br from-green-200 to-teal-100', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=400&fit=crop' },
  { id: 4, name: 'Junior Tech Book Bundle', price: '32.00', bgColor: 'bg-gradient-to-br from-orange-200 to-yellow-100', image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=400&fit=crop' }
];

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroCarousel />

      <section className="px-4 py-8 md:py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          
          <h2 className="text-3xl md:text-4xl engagement-regular text-purple-700 text-center">
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

      <section className="px-4 py-8 md:py-12 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl engagement-regular text-purple-700 mb-6 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <div className="px-4 py-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 rounded-3xl p-6 md:p-8 text-center shadow-xl">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl">🐼</span>
            </div>
            <h3 className="text-2xl md:text-3xl engagement-regular text-purple-700 mb-3">
              Join the Pencil Panda Family!
            </h3>
            <p className="text-gray-700 mb-6">
              Get parenting tips, educational content & exclusive offers for your kids
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border-2 border-purple-300 focus:border-purple-500 focus:outline-none shadow-sm"
              />
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
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
