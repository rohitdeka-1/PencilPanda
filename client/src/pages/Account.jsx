import { useState } from 'react';

const Account = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8 text-center">
          My Account
        </h1>

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 rounded-full font-semibold transition-colors ${
                activeTab === 'login'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-3 rounded-full font-semibold transition-colors ${
                activeTab === 'signup'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          {activeTab === 'login' ? (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              <div className="text-right">
                <a href="#" className="text-sm text-purple-600 hover:text-purple-700">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold transition-colors"
              >
                Login
              </button>
            </form>
          ) : (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-purple-400 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold transition-colors"
              >
                Sign Up
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>or continue with</p>
            <div className="flex gap-4 mt-4">
              <button className="flex-1 py-3 border-2 border-gray-200 rounded-full hover:bg-gray-50 font-medium">
                Google
              </button>
              <button className="flex-1 py-3 border-2 border-gray-200 rounded-full hover:bg-gray-50 font-medium">
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
