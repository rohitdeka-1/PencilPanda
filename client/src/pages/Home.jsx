import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import CollectionCard from '../components/CollectionCard';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import FeaturedProductBanner from '../components/FeaturedProductBanner';
import { ChevronLeft, ChevronRight, Truck, Shield, HeadphonesIcon, Award } from 'lucide-react';

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

      {/* Trust Badges Section */}
      <section className="bg-white py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center gap-3 p-2">
              <Truck className="w-7 h-7 text-[#630090] flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-sm text-[#310053]">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders over ₹500</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-2">
              <Shield className="w-7 h-7 text-[#630090] flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-sm text-[#310053]">Safe & Secure</p>
                <p className="text-xs text-gray-600">100% Safe Products</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-2">
              <HeadphonesIcon className="w-7 h-7 text-[#630090] flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-sm text-[#310053]">24/7 Support</p>
                <p className="text-xs text-gray-600">Dedicated support</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-2">
              <Award className="w-7 h-7 text-[#630090] flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-sm text-[#310053]">Quality Assured</p>
                <p className="text-xs text-gray-600">Premium products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:py-16 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#310053] mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collections of educational toys, books, and learning tools designed to inspire young minds
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} {...collection} />
          ))}
        </div>
      </section>

      {/* Featured Product Banners */}
      <section className="px-4 py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#310053] mb-3">
              Featured Products
            </h2>
            <p className="text-gray-600">
              Handpicked favorites that kids and parents love
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Music Mobile Banner */}
          <Link to="/product/2" className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 block">
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
                    25.00
              </p>
              <button className="bg-[#630090] hover:bg-[#4a006b] text-white px-8 py-3 rounded-full font-semibold transition-colors">
                Pre-order now!
              </button>
            </div>
          </Link>

          {/* Noodoll Night Lights Banner */}
          <Link to="/product/1" className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 block">
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
          </Link>
        </div>
        </div>
      </section>

      <section className="px-4 py-12 md:py-16 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#310053] mb-3">
            More Featured Products
          </h2>
          <p className="text-gray-600">
            Explore our bestselling educational products
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 py-8 md:py-12 bg-gradient-to-br from-[#84e4e2] to-[#b8f0ef]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#630090] to-[#84e4e2] rounded-full flex items-center justify-center">
              <span className="text-3xl">🐼</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-[#310053] mb-2">
              Join the Pencil Panda Community
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              Subscribe to get exclusive offers, parenting tips, and early access to new educational products
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-full border-2 border-gray-200 focus:border-[#630090] focus:outline-none text-sm"
              />
              <button className="bg-[#630090] hover:bg-[#4a006b] text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-md hover:shadow-lg">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews/Social Proof Section */}
      <section className="px-4 py-12 md:py-16 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#310053] mb-3">
            Loved by Parents & Kids
          </h2>
          <p className="text-gray-600">
            Join thousands of happy families across India
          </p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 min-w-[240px] max-w-[280px] md:min-w-0 md:max-w-none snap-start flex-shrink-0">
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
            <p className="text-gray-700 mb-4 text-sm">
              "My daughter absolutely loves the educational toys! The quality is excellent and delivery was super fast."
            </p>
            <p className="font-semibold text-[#310053] text-sm">- Priya Sharma, Mumbai</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 min-w-[240px] max-w-[280px] md:min-w-0 md:max-w-none snap-start flex-shrink-0">
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
            <p className="text-gray-700 mb-4 text-sm">
              "Best place to buy learning materials for kids. The customer service is outstanding and products are genuine."
            </p>
            <p className="font-semibold text-[#310053] text-sm">- Rajesh Kumar, Delhi</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 min-w-[240px] max-w-[280px] md:min-w-0 md:max-w-none snap-start flex-shrink-0">
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
            <p className="text-gray-700 mb-4 text-sm">
              "High-quality products at reasonable prices. My kids have learned so much through their educational toys!"
            </p>
            <p className="font-semibold text-[#310053] text-sm">- Sneha Reddy, Bangalore</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
