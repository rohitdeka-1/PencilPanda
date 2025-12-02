import { useState, useEffect } from 'react';
import { authAPI } from '../api/auth';

const Account = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Initialize Google Sign-In
    if (window.google && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      try {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });
      } catch (err) {
        console.error('Google Sign-In initialization error:', err);
        setError('Google Sign-In is temporarily unavailable. Please use email login.');
      }
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    try {
      setLoading(true);
      setError('');
      const result = await authAPI.googleAuth(response.credential);
      
      if (result._id) {
        setSuccess('Successfully logged in with Google!');
        // Store user data or redirect
        console.log('User:', result);
        // You can redirect or update global state here
      } else {
        setError(result.message || 'Google authentication failed');
      }
    } catch (err) {
      setError('Failed to authenticate with Google');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    try {
      if (!window.google) {
        setError('Google Sign-In is not available. Please refresh the page or use email login.');
        return;
      }
      
      // Clear any previous errors
      setError('');
      
      // Prompt for account selection
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Handle cases where the prompt couldn't be shown
          console.log('Google prompt not shown:', notification.getNotDisplayedReason());
          
          // Provide helpful error messages
          const reason = notification.getNotDisplayedReason();
          if (reason === 'suppressed_by_user') {
            setError('Please enable popups for Google Sign-In or sign in using email.');
          } else if (reason === 'opt_out_or_no_session') {
            setError('Please sign into your Google account first, then try again. Or use email login.');
          } else {
            setError('Google Sign-In unavailable. Please try email login or check your browser settings (allow third-party cookies).');
          }
        }
      });
    } catch (err) {
      console.error('Google Sign-In error:', err);
      setError('Unable to start Google Sign-In. Please use email login instead.');
    }
  };

  const handleLocalAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const result = activeTab === 'login' 
        ? await authAPI.login(data)
        : await authAPI.signup(data);
      
      if (result._id || result.email) {
        setSuccess(result.message || 'Success!');
        console.log('User:', result);
      } else {
        setError(result.message || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-md mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#3e0053] mb-8 text-center">
          My Account
        </h1>

        <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-3 rounded-full font-semibold transition-colors ${
                activeTab === 'login'
                  ? 'bg-[#630090] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-3 rounded-full font-semibold transition-colors ${
                activeTab === 'signup'
                  ? 'bg-[#630090] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          {activeTab === 'login' ? (
            <form className="space-y-4" onSubmit={handleLocalAuth}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-[#630090] focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-[#630090] focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              <div className="text-right">
                <a href="#" className="text-sm text-[#630090] hover:text-[#4a006b]">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#630090] hover:bg-[#4a006b] text-white py-3 rounded-full font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleLocalAuth}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-[#630090] focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-[#630090] focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="userPhone"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-[#630090] focus:outline-none"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-[#630090] focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#630090] hover:bg-[#4a006b] text-white py-3 rounded-full font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Sign Up'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>or continue with</p>
            <div className="mt-4">
              <button 
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-3 border-2 border-gray-200 rounded-full hover:bg-gray-50 font-medium flex items-center justify-center gap-3 disabled:opacity-50 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.35 1.37 8.26 2.49l6.05-6.06C34.95 3.03 29.8 1 24 1 14.84 1 6.85 6.6 3.11 14.73l7.03 5.46C11.93 14.13 17.49 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.5 24c0-1.6-.14-2.8-.45-4.03H24v7.63h12.62c-.54 3.04-2.37 6.02-6.06 7.78l9.26 7.18C44.68 37.1 46.5 31.12 46.5 24z"/>
                  <path fill="#4A90E2" d="M10.14 29.19A14.96 14.96 0 0 1 9 24c0-1.68.29-3.3.82-4.78L3 13.76C1.03 17.2 0 20.98 0 24c0 3.02 1.03 6.8 3 10.24l7.14-5.05z"/>
                  <path fill="#FBBC05" d="M24 46.5c6.1 0 11.2-2.03 15.02-5.51l-7.15-5.55c-2.21 1.5-5.04 2.43-7.87 2.43-6.44 0-11.89-4.34-13.83-10.16L3.11 33.27C6.85 41.4 14.84 46.5 24 46.5z"/>
                </svg>
                <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
