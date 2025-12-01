# 🧪 Testing Google Authentication

## ✅ Setup Complete

Both backend and frontend are now configured with Google OAuth credentials.

## 🚀 How to Test

### 1. Start the Backend Server

```bash
cd /home/rhd/Desktop/PencilPanda/server
npm run dev
```

The backend should start on `http://localhost:5000`

### 2. Start the Frontend Development Server

**In a new terminal:**

```bash
cd /home/rhd/Desktop/PencilPanda/client
npm run dev
```

The frontend should start on `http://localhost:5173`

### 3. Test Google Authentication

1. Open your browser and go to `http://localhost:5173`
2. Navigate to the Account/Login page
3. Click the **"Sign in with Google"** button
4. Choose your Google account
5. The app should:
   - Authenticate with Google
   - Send the token to the backend
   - Create/login to your Pencil Panda account
   - Redirect you to the home page or show success message

### 4. Test Traditional Login (JWT)

You can also test the traditional email/password authentication:

1. Click "Sign Up" tab
2. Fill in:
   - Full Name
   - Email
   - Phone Number
   - Password
3. Submit the form
4. Check your email for OTP
5. Verify your account

## 🔍 What to Check

### Backend Console
Watch for:
- ✅ `"Google Auth successful for [email]"` logs
- ✅ Database user creation/update messages
- ❌ Any errors or warnings

### Frontend Browser Console (F12)
Watch for:
- ✅ Successful API responses
- ✅ Token storage
- ❌ CORS errors
- ❌ Network request failures

### Network Tab (F12 → Network)
Check the `/api/auth/google` request:
- **Status**: Should be `200 OK`
- **Response**: Should contain user data and success message
- **Cookies**: Should include authentication tokens

## 🐛 Troubleshooting

### Google Sign-In Button Doesn't Appear
- Check browser console for Google SDK errors
- Verify `VITE_GOOGLE_CLIENT_ID` is set in `client/.env`
- Make sure the Google script is loading (check Network tab)

### "Invalid Token" Error
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `server/.env`
- Check if the Google Cloud Console project has the correct authorized origins:
  - `http://localhost:5173`
  - `http://localhost:5000`

### CORS Errors
- Backend should already be configured for `localhost:5173`
- Restart the backend server after any .env changes

### Database Connection Issues
- Check if MongoDB is running
- Verify `MONGO_URI` in `server/.env`

## 📊 Expected Flow

1. **User clicks "Sign in with Google"**
   - Frontend triggers Google Sign-In popup
   
2. **User selects Google account**
   - Google returns a JWT credential token
   
3. **Frontend sends credential to backend**
   - `POST /api/auth/google` with credential
   
4. **Backend validates token with Google**
   - Calls Google's tokeninfo API
   - Extracts user data (email, name, picture)
   
5. **Backend creates/updates user**
   - Checks if user exists by email or googleId
   - Links Google to existing account if email matches
   - Creates new user if doesn't exist
   
6. **Backend generates JWT tokens**
   - Access token (1 day)
   - Refresh token (15 days)
   - Stores in Redis
   
7. **Backend sends response**
   - Returns user data and success message
   - Sets cookies with tokens
   
8. **Frontend redirects/updates UI**
   - Shows welcome message
   - Redirects to home page
   - User is now logged in

## 🎯 Success Criteria

- ✅ Google Sign-In button appears on Account page
- ✅ Clicking button opens Google account picker
- ✅ Selecting account creates/logs in user
- ✅ User data appears in MongoDB
- ✅ Welcome/login email is sent
- ✅ User is redirected and logged in
- ✅ Traditional login still works

## 📝 Notes

- First-time Google users get a **welcome email**
- Returning Google users get a **login alert email**
- Google users are automatically verified (no OTP needed)
- You can link a Google account to an existing email/password account
- Both auth methods (JWT + Google) work independently

---

**Happy Testing! 🐼✏️**

If you encounter any issues, check the console logs and network tab for detailed error messages.
