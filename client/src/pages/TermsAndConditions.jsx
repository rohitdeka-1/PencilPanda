import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 font-semibold transition-colors"
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
        
        <h1 className="text-4xl md:text-5xl engagement-regular text-purple-700 mb-8 text-center">
          Terms & Conditions
        </h1>
        
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Welcome to Pencil Panda. By accessing our website, placing an order, or using any Pencil Panda service, you agree to the following Terms & Conditions.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">1.1 Use of Website</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>You agree not to misuse the website for unlawful, harmful, or unauthorized purposes.</li>
              <li>All images, product descriptions, logos, and designs are the property of Pencil Panda.</li>
              <li>You may not copy, reproduce, or distribute any content without written permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">1.2 Eligibility</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>You must be at least 12 years old to place an order.</li>
              <li>If under 12, orders must be supervised by a parent/guardian.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">1.3 Product Information & Pricing</h2>
            <p className="text-gray-700 mb-3">We try our best to provide accurate product details, images, and pricing. However:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Prices may change without notice due to supplier/freight changes</li>
              <li>Orders may be cancelled if pricing is incorrect or stock is unavailable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">1.4 Order Acceptance</h2>
            <p className="text-gray-700 mb-3">Your order is confirmed only after:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Successful payment</li>
              <li>Stock availability verification</li>
              <li>Fraud prevention check</li>
            </ul>
            <p className="text-gray-700 mt-4 mb-3">We reserve the right to cancel orders in case of:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Payment failure</li>
              <li>Suspicious activity</li>
              <li>Invalid address</li>
              <li>Stock issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">1.5 Limitation of Liability</h2>
            <p className="text-gray-700 mb-3">Pencil Panda is not responsible for:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Damages caused by misuse of products</li>
              <li>Courier delays, weather issues, or natural disasters</li>
              <li>Website downtime or technical errors</li>
              <li>Delays caused by logistic partners</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">1.6 Governing Law</h2>
            <p className="text-gray-700">
              These Terms follow Indian Laws under the Indian Contract Act, 1872.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
