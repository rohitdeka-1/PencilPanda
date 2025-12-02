import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const ContactUs = () => {
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
        
        <h1 className="text-4xl md:text-5xl engagement-regular text-[#3e0053] mb-8 text-center">
          Contact Us
        </h1>
        
        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10">
          <p className="text-gray-700 leading-relaxed mb-8 text-center">
            For support, order issues, or queries, feel free to reach out to us!
          </p>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#3e0053] mb-4 flex items-center gap-2">
                <span className="text-2xl">📧</span> Email
              </h3>
              <a href="mailto:support@pencilpanda.in" className="text-gray-700 hover:text-[#3e0053] transition-colors text-lg">
                support@pencilpanda.in
              </a>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#3e0053] mb-4 flex items-center gap-2">
                <span className="text-2xl">📞</span> Phone
              </h3>
              <a href="tel:8420514587" className="text-gray-700 hover:text-[#3e0053] transition-colors text-lg">
                +91 8420514587
              </a>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#3e0053] mb-4 flex items-center gap-2">
                <span className="text-2xl">📍</span> Address
              </h3>
              <p className="text-gray-700 text-lg">
                Pencil Panda<br />
                Near VIT Bhopal Campus<br />
                Bhopal, Madhya Pradesh – 466114<br />
                India
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-[#3e0053] mb-4 flex items-center gap-2">
                <span className="text-2xl">🕒</span> Working Hours
              </h3>
              <p className="text-gray-700 text-lg">
                Monday – Saturday<br />
                10:00 AM – 6:00 PM
              </p>
              <p className="text-sm text-gray-500 mt-2">
                (Closed on Sundays & Public Holidays)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
