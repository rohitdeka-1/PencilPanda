import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Home } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What age group are your products suitable for?",
      answer: "Our educational products are designed for children aged 3-12 years. Each product listing includes specific age recommendations to help you choose the perfect items for your child's developmental stage."
    },
    {
      question: "Do you offer Cash on Delivery (COD)?",
      answer: "Yes! We offer Cash on Delivery for all orders across India. You can also pay online using UPI, Credit/Debit Cards, Net Banking, or Digital Wallets for a seamless checkout experience."
    },
    {
      question: "How long does delivery take?",
      answer: "We ship through Shiprocket for reliable delivery. Most orders are delivered within 5-7 business days for metro cities and 7-10 business days for other locations. You'll receive tracking details via SMS and email once your order ships."
    },
    {
      question: "What is your refund and return policy?",
      answer: "We have a strict quality policy. Returns are only accepted if the product is damaged or defective. You MUST record an unboxing video as proof. Refunds are processed within 7-10 business days after we receive and verify the returned item. Please refer to our Refund Policy page for complete details."
    },
    {
      question: "Are your products safe for children?",
      answer: "Absolutely! All our products meet international safety standards and are made from non-toxic, child-safe materials. We carefully curate every item to ensure they're safe, durable, and educational for young learners."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes! We offer complimentary gift wrapping for orders. Simply select the gift wrap option during checkout, and we'll present your order beautifully - perfect for birthdays, festivals, or special occasions."
    },
    {
      question: "Can I track my order?",
      answer: "Yes! Once your order is shipped, you'll receive a tracking number via SMS and email. You can use this to track your package in real-time through our shipping partner Shiprocket's website."
    },
    {
      question: "What if I receive a damaged or wrong product?",
      answer: "We're sorry if that happens! Please record an unboxing video and contact us immediately at support@pencilpanda.in or call 8420514587 within 24 hours of delivery. We'll arrange a replacement or refund after verification."
    },
    {
      question: "Do you have a physical store?",
      answer: "Currently, we operate exclusively online to bring you the best prices and widest selection. Our office is located in Bhopal, Madhya Pradesh. You can contact us anytime for assistance."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach us via:\n• Email: support@pencilpanda.in\n• Phone/WhatsApp: 8420514587\n• Our support team is available Monday to Saturday, 10 AM - 6 PM IST\nWe typically respond to emails within 24 hours."
    },
    {
      question: "Do you offer bulk or school orders?",
      answer: "Yes! We offer special pricing for bulk orders and institutional purchases. Please contact us at support@pencilpanda.in with your requirements, and our team will provide you with a customized quote."
    },
    {
      question: "Are the products you sell authentic and of good quality?",
      answer: "Yes! We source all our products from trusted manufacturers and verified suppliers. Each item is quality-checked before shipping to ensure your child receives only the best educational materials."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#3e0053] hover:text-[#3e0053] mb-6 font-semibold transition-colors"
        >
          <Home size={20} />
          <span>Back to Home</span>
        </Link>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl engagement-regular text-[#3e0053] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg">
            Got questions? We've got answers! 🐼✏️
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="text-[#3e0053] flex-shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 border-t border-purple-100">
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-lg p-8">
          <h3 className="text-2xl engagement-regular text-[#3e0053] mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-700 mb-4">
            Our friendly team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@pencilpanda.in"
              className="px-6 py-3 bg-white text-[#3e0053] font-semibold rounded-lg hover:shadow-lg transition-shadow"
            >
              Email Us
            </a>
            <a
              href="https://wa.me/918420514587"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
