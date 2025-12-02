import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';

const collectionsData = {
  all: {
    title: 'All Collections',
    products: [
      { id: 1, name: 'Cozy Blanket', price: '35.00', bgColor: 'bg-blue-100' },
      { id: 2, name: 'Pillow Set', price: '28.00', bgColor: 'bg-blue-200' },
      { id: 5, name: 'Keychain', price: '8.50', bgColor: 'bg-pink-100' },
      { id: 6, name: 'Phone Case', price: '15.00', bgColor: 'bg-purple-100' },
      { id: 9, name: 'Notebook Set', price: '18.00', bgColor: 'bg-yellow-100' },
      { id: 10, name: 'Pen Collection', price: '14.00', bgColor: 'bg-yellow-200' },
      { id: 13, name: 'Plush Toy', price: '25.00', bgColor: 'bg-pink-100' },
      { id: 14, name: 'Music Mobile', price: '32.00', bgColor: 'bg-pink-200' }
    ]
  },
  home: {
    title: 'Home Collection',
    products: [
      { id: 1, name: 'Cozy Blanket', price: '35.00', bgColor: 'bg-blue-100' },
      { id: 2, name: 'Pillow Set', price: '28.00', bgColor: 'bg-blue-200' },
      { id: 3, name: 'Wall Art', price: '45.00', bgColor: 'bg-blue-300' },
      { id: 4, name: 'Table Lamp', price: '52.00', bgColor: 'bg-cyan-100' }
    ]
  },
  accessories: {
    title: 'Accessories',
    products: [
      { id: 5, name: 'Keychain', price: '8.50', bgColor: 'bg-pink-100' },
      { id: 6, name: 'Phone Case', price: '15.00', bgColor: 'bg-purple-100' },
      { id: 7, name: 'Tote Bag', price: '22.00', bgColor: 'bg-yellow-100' },
      { id: 8, name: 'Pin Set', price: '12.00', bgColor: 'bg-green-100' }
    ]
  },
  stationery: {
    title: 'Stationery',
    products: [
      { id: 9, name: 'Notebook Set', price: '18.00', bgColor: 'bg-yellow-100' },
      { id: 10, name: 'Pen Collection', price: '14.00', bgColor: 'bg-yellow-200' },
      { id: 11, name: 'Sticker Pack', price: '6.50', bgColor: 'bg-yellow-300' },
      { id: 12, name: 'Washi Tape', price: '9.00', bgColor: 'bg-orange-100' }
    ]
  },
  toys: {
    title: 'Toys',
    products: [
      { id: 13, name: 'Plush Toy', price: '25.00', bgColor: 'bg-pink-100' },
      { id: 14, name: 'Music Mobile', price: '32.00', bgColor: 'bg-pink-200' },
      { id: 15, name: 'Rattle Set', price: '16.00', bgColor: 'bg-pink-300' },
      { id: 16, name: 'Teether', price: '11.00', bgColor: 'bg-purple-100' }
    ]
  }
};

const Collections = () => {
  const { category } = useParams();
  const collection = collectionsData[category] || collectionsData.all;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <Breadcrumb 
          items={
            category === 'all' || !category
              ? [{ label: collection.title }]
              : [
                  { label: 'Collections', link: '/collections/all' },
                  { label: collection.title }
                ]
          } 
        />
        
        <h1 className="text-3xl md:text-4xl font-bold text-[#3e0053] mb-8 text-center">
          {collection.title}
        </h1>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <p className="text-gray-600">
            {collection.products.length} products
          </p>
          <select className="px-4 py-2 border-2 border-purple-200 rounded-full focus:border-purple-400 focus:outline-none">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {collection.products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
