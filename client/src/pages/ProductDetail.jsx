import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductReviews from '../components/ProductReviews';
import ProductCard from '../components/ProductCard';

const productData = {
  1: {
    name: 'Music mobile',
    price: '25.00',
    description: 'Adorable music mobile perfect for nurseries. Features soft plush design and gentle melodies.',
    images: [
      { id: 1, bgColor: 'bg-pink-100' },
      { id: 2, bgColor: 'bg-pink-200' },
      { id: 3, bgColor: 'bg-pink-300' }
    ],
    features: ['Soft plush material', 'Plays gentle melodies', 'Easy to hang', 'Safe for babies']
  },
  2: {
    name: 'Noodoll night lights',
    price: '13.50',
    description: 'Cute and functional night light to brighten up any room with a soft glow.',
    images: [
      { id: 1, bgColor: 'bg-cyan-100' },
      { id: 2, bgColor: 'bg-cyan-200' }
    ],
    features: ['Soft ambient lighting', 'Energy efficient LED', 'Adorable design', 'Perfect for kids rooms']
  }
};

const recommendedProducts = [
  { 
    id: 3, 
    name: 'Educational Puzzle Set', 
    price: '19.99', 
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop',
    category: 'toys' 
  },
  { 
    id: 4, 
    name: 'Learning Alphabet Blocks', 
    price: '15.99', 
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop',
    category: 'toys' 
  },
  { 
    id: 5, 
    name: 'Kids Drawing Book', 
    price: '8.99', 
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
    category: 'books' 
  },
  { 
    id: 6, 
    name: 'Colorful Crayons Set', 
    price: '12.50', 
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop',
    category: 'accessories' 
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = productData[id] || productData[1];
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="relative mb-4">
              <div className={`${product.images[currentImage].bgColor} rounded-3xl aspect-square flex items-center justify-center`}>
                <div className="w-4/5 h-4/5 bg-white/50 rounded-2xl"></div>
              </div>
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => setCurrentImage((prev) => (prev + 1) % product.images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentImage(index)}
                  className={`flex-shrink-0 w-20 h-20 ${img.bgColor} rounded-xl ${
                    currentImage === index ? 'ring-2 ring-purple-600' : ''
                  }`}
                >
                  <div className="w-full h-full bg-white/30 rounded-xl"></div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
              {product.name}
            </h1>
            <p className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
              ₹{product.price}
            </p>
            <p className="text-gray-700 mb-6 text-base md:text-lg">
              {product.description}
            </p>

            <div className="mb-6">
              <h3 className="font-semibold text-purple-900 mb-3">Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-purple-900 mb-2">Quantity:</label>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full font-semibold"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-full text-lg font-semibold mb-3 transition-colors">
              Pre-order now!
            </button>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-full text-lg font-semibold transition-colors">
              Add to cart
            </button>
          </div>
        </div>

        {/* Product Reviews */}
        <ProductReviews productId={id} />

        {/* Recommended Products */}
        <section className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl engagement-regular text-purple-700 mb-6 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        <section className="mt-12 md:mt-16 bg-cyan-100 rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-4 text-center">
            New Noodoll night lights
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-purple-900 text-center mb-6">
            ₹13.50
          </p>
          <div className="text-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors">
              Shop now
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
