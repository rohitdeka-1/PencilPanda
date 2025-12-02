import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const PrivacyPolicy = () => {
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
          Privacy Policy
        </h1>
        
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10 space-y-6">
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            Pencil Panda values your privacy and is committed to protecting your personal data.
          </p>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">2.1 Information We Collect</h2>
            <p className="text-sm md:text-base text-gray-700 mb-3">When you use our website, we collect:</p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
              <li>Name, phone number, email, shipping address</li>
              <li>Order details & transaction ID</li>
              <li>IP address, device info, browsing behaviour</li>
              <li>Data shared via WhatsApp/chat support</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">2.2 How We Use Your Data</h2>
            <p className="text-sm md:text-base text-gray-700 mb-3">Your information is used to:</p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
              <li>Process and deliver orders</li>
              <li>Improve website experience</li>
              <li>Communicate regarding orders or offers</li>
              <li>Prevent fraud</li>
              <li>Improve customer service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">2.3 Data Protection</h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
              <li>We use secure servers and encryption.</li>
              <li>Payment details are processed only by trusted gateways like PhonePe, Razorpay, etc.</li>
              <li>We do not store debit/credit card/payment information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">2.4 Sharing of Information</h2>
            <p className="text-sm md:text-base text-gray-700 mb-3">Your information may be shared only with:</p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
              <li>Courier & shipping partners</li>
              <li>Payment processors</li>
              <li>Legal authorities (if required)</li>
            </ul>
            <p className="text-sm md:text-base text-gray-700 mt-4 font-semibold">We never sell your data.</p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">2.5 Your Rights</h2>
            <p className="text-sm md:text-base text-gray-700 mb-3">You can:</p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 ml-4">
              <li>Request deletion of your personal data</li>
              <li>Update your account details</li>
              <li>Opt-out of marketing messages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-[#3e0053] mb-3">Contact Information</h2>
            <p className="text-sm md:text-base text-gray-700 mb-2">
              For any privacy-related concerns or inquiries, please contact us:
            </p>
            <ul className="list-none space-y-2 text-sm md:text-base text-gray-700 ml-4">
              <li><strong>Email:</strong> support@pencilpanda.com</li>
              <li><strong>Phone:</strong> +91 84205 14587</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
