import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const initialCartItems = [
  { id: 1, name: 'Music mobile', price: 25.00, quantity: 1, bgColor: 'bg-pink-100' },
  { id: 2, name: 'Rainbow plush', price: 18.00, quantity: 2, bgColor: 'bg-purple-100' }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">Your Cart</h1>
          <p className="text-gray-600 mb-8">Your cart is empty</p>
          <Link to="/" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8">Your Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-2xl">
                <div className={`${item.bgColor} w-24 h-24 rounded-xl flex-shrink-0`}>
                  <div className="w-full h-full bg-white/30 rounded-xl"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-purple-900 mb-1">{item.name}</h3>
                  <p className="text-purple-900 font-bold mb-2">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-white hover:bg-gray-100 rounded-full font-semibold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-white hover:bg-gray-100 rounded-full font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 hover:bg-red-100 rounded-lg h-fit"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-purple-50 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-purple-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Shipping</span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-purple-200 pt-3 flex justify-between">
                  <span className="font-bold text-purple-900 text-lg">Total</span>
                  <span className="font-bold text-purple-900 text-lg">${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold mb-3 transition-colors">
                Checkout
              </button>
              <Link to="/" className="block text-center text-purple-600 hover:text-purple-700 font-medium">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
