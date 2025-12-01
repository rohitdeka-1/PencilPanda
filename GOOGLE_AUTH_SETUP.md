# Pencil Panda - Setup Guide

## Google OAuth Setup Instructions

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Configure the OAuth consent screen if prompted:
   - Application name: **Pencil Panda**
   - User support email: your email
   - Developer contact: your email
6. For **Application type**, select **Web application**
7. Add **Authorized JavaScript origins**:
   - `http://localhost:5173` (development)
   - `https://yourdomain.com` (production)
8. Add **Authorized redirect URIs**:
   - `http://localhost:5173` (development)
   - `https://yourdomain.com` (production)
9. Click **Create**
10. Copy the **Client ID** and **Client Secret**

### 2. Backend Environment Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your credentials:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret_here
   REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
   UPSTASH_REDIS_URL=your_upstash_redis_url_here
   
   # Google OAuth - paste your credentials here
   GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   
   FRONT_END=http://localhost:5173
   PORT=5000
   NODE_ENV=development
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Environment Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your Google Client ID:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### 4. Testing Authentication

#### Google OAuth Flow:
1. Open `http://localhost:5173/account`
2. Click "Continue with Google"
3. Select your Google account
4. Grant permissions
5. You'll be logged in automatically

#### Local JWT Flow:
1. Open `http://localhost:5173/account`
2. Click "Sign Up" tab
3. Fill in: Name, Email, Phone, Password
4. Click "Sign Up"
5. Check your email for OTP (if email service is configured)
6. Verify OTP to complete registration

## Authentication Features

### Supported Methods:
- ✅ **Google OAuth** (One-click sign-in)
- ✅ **JWT Custom Auth** (Email/Password with OTP verification)

### Security Features:
- Password hashing with bcrypt
- HTTP-only cookies for tokens
- Access token (1 day) + Refresh token (15 days)
- Rate limiting on auth endpoints
- OTP verification for email signup
- Redis-backed token storage

## API Endpoints

### Auth Routes:
- `POST /api/auth/signup` - Register with email/password
- `POST /api/auth/verify-otp` - Verify email OTP
- `POST /api/auth/resend-otp` - Resend OTP
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/google` - **Google OAuth authentication**
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `PUT /api/auth/change-password` - Change password (protected)

## Database Schema Updates

The User model now supports both auth methods:

```javascript
{
  name: String,
  email: String (unique),
  password: String (optional for Google users),
  googleId: String (unique, sparse),
  authProvider: "local" | "google",
  profilePicture: String,
  userPhone: String (optional for Google users),
  isVerified: Boolean (auto-true for Google),
  // ... other fields
}
```

## Troubleshooting

### Google Sign-In Not Working:
1. Check that `VITE_GOOGLE_CLIENT_ID` is correctly set in client `.env`
2. Verify authorized origins in Google Cloud Console
3. Make sure the Google Sign-In script is loaded in `index.html`
4. Check browser console for errors

### Backend Errors:
1. Verify MongoDB connection
2. Check Redis connection (Upstash)
3. Ensure all environment variables are set
4. Check server logs for detailed errors

### Email Not Sending:
1. Configure email service in `server/src/services/mailer.services.js`
2. Add email provider credentials to `.env`

## Production Deployment

### Backend:
1. Set `NODE_ENV=production`
2. Update `FRONT_END` to your production domain
3. Add production domain to Google OAuth authorized origins
4. Use strong secrets for JWT tokens

### Frontend:
1. Update `VITE_API_URL` to your production backend URL
2. Use production Google Client ID if different
3. Build: `npm run build`
4. Deploy `dist/` folder to your hosting

## Support

For issues or questions:
- Email: support@pencilpanda.in
- Phone: +91 8420514587
