import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#3e0053] hover:text-[#3e0053] mb-6 font-semibold transition-colors"
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
        
        <h1 className="text-3xl md:text-4xl engagement-regular text-[#3e0053] mb-8 text-center">
          Shipping Policy
        </h1>
        
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-6">
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            We deliver Pan-India using Shiprocket's trusted courier partners.
          </p>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">3.1 Order Processing Time</h2>
            <p className="text-sm md:text-base text-gray-700">Orders are processed within 1–2 business days.</p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">3.2 Delivery Time (Shiprocket)</h2>
            <p className="text-sm md:text-base text-gray-700 mb-3">
              <strong>Standard Delivery:</strong> Orders will be delivered within 7 working days from the date of dispatch.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
              <li><strong>Metro Cities:</strong> 5–7 working days</li>
              <li><strong>Other Cities:</strong> 7–10 working days</li>
              <li><strong>Remote/Interior Areas:</strong> 7–12 working days</li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 mt-4">Delays may occur during festivals or due to courier issues.</p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">3.3 Shipping Partners</h2>
            <p className="text-sm md:text-base text-gray-700 mb-3">Shiprocket may allocate any partner such as:</p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
              <li>Delhivery</li>
              <li>BlueDart</li>
              <li>Ekart</li>
              <li>Shadowfax</li>
              <li>DTDC</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">3.4 Tracking</h2>
            <p className="text-sm md:text-base text-gray-700">
              A tracking link/SMS will be sent once the order is dispatched.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">3.5 Delays</h2>
            <p className="text-sm md:text-base text-gray-700 mb-3">We are not liable for delays caused by:</p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
              <li>Weather, strikes</li>
              <li>Courier partner issues</li>
              <li>Incorrect delivery address</li>
              <li>High-traffic festive seasons</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
