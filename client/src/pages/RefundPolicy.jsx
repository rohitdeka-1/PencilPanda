import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const RefundPolicy = () => {
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
          Refund & Replacement Policy
        </h1>
        
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-6">
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            We follow a strict refund policy, suitable for dropshipping.
          </p>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">4.1 Refund Policy</h2>
            <p className="text-sm md:text-base text-gray-700 mb-3"><strong>Refunds are provided only if:</strong></p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
              <li>You received a damaged product</li>
              <li>You received the wrong product</li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 mt-4 mb-3"><strong>Refunds are NOT provided for:</strong></p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
              <li>Change of mind</li>
              <li>Customer dislike of product color/size</li>
              <li>Delay by courier</li>
              <li>Incorrect address provided</li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 mt-4 font-semibold">
              Approved refunds will be credited to your original payment method within 7 working days.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">4.2 Return Window</h2>
            <p className="text-sm md:text-base text-gray-700">
              Returns will be acceptable within 7 days of delivery. Please ensure you raise a return request within this period.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">4.3 Mandatory Unboxing Video</h2>
            <p className="text-sm md:text-base text-gray-700 mb-3">To claim refund/replacement:</p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
              <li>You MUST provide a full unboxing video</li>
              <li>Video must show package, label, and product</li>
              <li>No cuts/editing allowed</li>
            </ul>
            <p className="text-sm md:text-base mt-4 font-semibold text-red-600">
              Without this video → no replacement/refund.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">4.4 Replacement & Exchange</h2>
            <p className="text-sm md:text-base text-gray-700">
              If approved, your order will be exchanged and the replacement will be delivered within 7 working days of claim approval.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">4.5 Non-Returnable Items</h2>
            <p className="text-sm md:text-base text-gray-700 mb-3">For hygiene & safety reasons, the following cannot be returned:</p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
              <li>Stationery items</li>
              <li>Personalized products</li>
              <li>Gift hampers</li>
              <li>Used or opened items</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">5. Warranty Policy</h2>
            <p className="text-sm md:text-base text-gray-700">
              Since Pencil Panda sells stationery and non-electronic items:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4 mt-3">
              <li>We do not provide manufacturer warranty.</li>
              <li>If a product is damaged/defective on arrival, it will be replaced based on our refund policy.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
