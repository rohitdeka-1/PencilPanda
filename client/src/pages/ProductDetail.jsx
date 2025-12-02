import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Share2, Truck, Package, Shield, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const productData = {
  1: {
    name: 'Ricejagger',
    price: '22.50',
    description: 'Meet Ricejagger, a charming plush companion designed to bring comfort and joy to children. With its soft, huggable design and adorable features, this toy is perfect for playtime cuddles and bedtime comfort.',
    images: [
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&h=600&fit=crop'
    ],
    brand: 'Noodoll',
    type: 'Plush Toy',
    sku: 'T99668',
    color: 'Midnight Blue',
    inStock: true,
    stockCount: 32,
    features: [
      'Ultra-soft premium plush material',
      'Safe and non-toxic materials',
      'Machine washable for easy care',
      'Perfect size for little hands',
      'Adorable and unique design'
    ],
    fullDescription: `Ricejagger is more than just a toy - it's a companion for your child's adventures. Crafted with the highest quality materials, this plush toy features a unique design that captures children's imagination. The soft, cuddly texture makes it perfect for hugging, while its durable construction ensures it can withstand years of play.

Each Ricejagger is carefully designed with attention to detail, from its star-shaped eyes to its lightning bolt belly. The midnight blue color with contrasting white accents creates a visually appealing toy that children will love.

Safe for children of all ages, Ricejagger meets all international safety standards and is made from non-toxic materials. The toy is also machine washable, making it easy for parents to keep clean and fresh.`,
    specifications: {
      'Material': 'Premium Plush Polyester',
      'Dimensions': '8" x 6" x 4"',
      'Weight': '200g',
      'Age Range': '0+ months',
      'Care': 'Machine washable',
      'Origin': 'Designed in UK'
    }
  },
  2: {
    name: 'Coding Robot Kit',
    price: '45.00',
    description: 'An interactive coding robot kit that teaches children the basics of programming through fun activities.',
    images: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop'
    ],
    brand: 'TechKids',
    type: 'Educational Toy',
    sku: 'TK1234',
    color: 'Multi-color',
    inStock: true,
    stockCount: 15,
    features: [
      'Beginner-friendly coding interface',
      'Interactive LED displays',
      'Bluetooth connectivity',
      'Rechargeable battery included',
      'Comprehensive learning guide'
    ],
    fullDescription: 'Introduce your child to the world of coding with this amazing robot kit. Features hands-on learning experiences that make programming fun and accessible.',
    specifications: {
      'Material': 'ABS Plastic',
      'Dimensions': '10" x 8" x 6"',
      'Weight': '500g',
      'Age Range': '6+ years',
      'Battery': 'Rechargeable Li-ion',
      'Connectivity': 'Bluetooth 5.0'
    }
  }
};

const recommendedProducts = [
  { id: 3, name: 'Ricewool', price: '25.00', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop' },
  { id: 4, name: 'Ricekating', price: '25.00', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&h=400&fit=crop' },
  { id: 5, name: 'Ricebird', price: '11.50', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop' },
  { id: 6, name: 'Ricetwinkle', price: '25.00', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop' }
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = productData[id] || productData[1];
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(true);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        {/* Main Product Section */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="relative mb-4 bg-gradient-to-br from-[#84e4e2] to-[#b8f0ef] rounded-3xl overflow-hidden">
              <div className="aspect-square flex items-center justify-center p-6">
                <img 
                  src={product.images[currentImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={() => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#310053]" />
                  </button>
                  <button 
                    onClick={() => setCurrentImage((prev) => (prev + 1) % product.images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-[#310053]" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`aspect-square bg-gradient-to-br from-[#84e4e2] to-[#b8f0ef] rounded-xl overflow-hidden ${
                    currentImage === index ? 'ring-2 ring-[#630090]' : 'opacity-60 hover:opacity-100'
                  } transition-all`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-[#310053] mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-[#310053]">by</span>
              <a href="#" className="text-sm text-[#630090] hover:underline font-medium">{product.brand}</a>
            </div>

            <div className="mb-4">
              <p className="text-sm text-[#310053]">
                Type: <span className="text-[#630090] font-medium">{product.type}</span>
              </p>
              <p className="text-sm text-[#310053]">
                SKU: <span className="font-medium">{product.sku}</span>
              </p>
            </div>

            <p className="text-4xl font-bold text-[#310053] mb-4">
              ₹{product.price}
            </p>

            {product.color && (
              <div className="mb-4">
                <p className="text-sm text-[#310053] mb-2">Color - {product.color}</p>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-blue-900 ring-2 ring-[#630090] ring-offset-2"></button>
                </div>
              </div>
            )}

            {product.inStock && (
              <p className="text-green-600 font-medium mb-6">
                In stock - {product.stockCount} in stock, ready to ship
              </p>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#310053] mb-2">Quantity</label>
              <select 
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#630090] focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <button className="w-full bg-white hover:bg-gray-50 text-[#310053] border-2 border-[#310053] py-3 rounded-full font-semibold mb-3 transition-colors">
              Add to Cart
            </button>
            
            <button className="w-full bg-[#630090] hover:bg-[#4a006b] text-white py-3 rounded-full font-semibold mb-6 transition-colors">
              Buy with Shop Pay
            </button>

            <button 
              onClick={handleShare}
              className="flex items-center justify-center gap-2 text-[#630090] hover:text-[#4a006b] transition-colors mb-6"
            >
              <Share2 className="w-5 h-5" />
              <span className="font-medium">Share</span>
            </button>

            {/* Shipping & Delivery Accordion */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={() => setShippingOpen(!shippingOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#310053]" />
                  <span className="font-semibold text-[#310053]">Shipping & Delivery</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#310053] transition-transform ${shippingOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {shippingOpen && (
                <div className="mt-4 space-y-3 text-sm text-[#310053]">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Free Shipping</p>
                      <p className="text-gray-600">On orders over ₹50</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Fast Delivery</p>
                      <p className="text-gray-600">2-5 business days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">Easy Returns</p>
                      <p className="text-gray-600">30-day return policy</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mb-12 border-t border-gray-200 pt-8">
          <button
            onClick={() => setDescriptionOpen(!descriptionOpen)}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h2 className="text-2xl font-bold text-[#310053]">Product Description</h2>
            <ChevronDown className={`w-6 h-6 text-[#310053] transition-transform ${descriptionOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {descriptionOpen && (
            <div className="space-y-6">
              <p className="text-[#310053] leading-relaxed whitespace-pre-line">
                {product.fullDescription}
              </p>

              <div>
                <h3 className="font-semibold text-[#310053] mb-3 text-lg">Key Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[#630090] mt-1 font-bold">✓</span>
                      <span className="text-[#310053]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-[#310053] mb-3 text-lg">Specifications:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="font-medium text-[#310053] min-w-[120px]">{key}:</span>
                      <span className="text-[#310053]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* You May Also Like Section */}
        <section>
          <h2 className="text-2xl md:text-3xl engagement-regular text-[#310053] mb-6 text-center">
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
