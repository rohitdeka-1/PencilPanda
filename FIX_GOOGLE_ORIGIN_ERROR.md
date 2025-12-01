# 🔧 Fix: "The given origin is not allowed for the given client ID"

## ❌ Problem
Google is blocking the authentication because `http://localhost:5173` is not authorized in your OAuth client configuration.

## ✅ Solution - Add Authorized Origins in Google Cloud Console

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/apis/credentials
2. Make sure you're logged into the correct Google account
3. Select your project (or the project where you created the OAuth credentials)

### Step 2: Find Your OAuth 2.0 Client ID
1. Look for **OAuth 2.0 Client IDs** section
2. Find the client ID: `922062691603-frqfvpa0cja642sgl56vp110rt559he5.apps.googleusercontent.com`
3. Click on it to edit

### Step 3: Add Authorized JavaScript Origins
In the **"Authorized JavaScript origins"** section, add:

```
http://localhost:5173
http://localhost:5000
```

Click **"+ ADD URI"** for each one.

### Step 4: Add Authorized Redirect URIs (Optional but Recommended)
In the **"Authorized redirect URIs"** section, add:

```
http://localhost:5173
http://localhost:5000
http://localhost:5173/auth/callback
```

### Step 5: Save Changes
1. Scroll down and click **"SAVE"**
2. Wait a few seconds for changes to propagate (usually instant)

### Step 6: Test Again
1. **Restart your frontend dev server** (important!)
   ```bash
   # In the client terminal, press Ctrl+C to stop
   # Then restart:
   cd /home/rhd/Desktop/PencilPanda/client
   npm run dev
   ```

2. Clear browser cache or open in **Incognito/Private mode**
3. Go to `http://localhost:5173`
4. Click **"Sign in with Google"**
5. Should work now! ✅

## 📸 Visual Guide

### What to Add in Google Cloud Console:

**Authorized JavaScript origins:**
```
http://localhost:5173  ← Your frontend (Vite dev server)
http://localhost:5000  ← Your backend (Express server)
```

**Authorized redirect URIs:**
```
http://localhost:5173
http://localhost:5000
http://localhost:5173/auth/callback
```

## 🔍 Quick Check

After adding the origins, verify:
- ✅ `http://localhost:5173` is in **Authorized JavaScript origins**
- ✅ `http://localhost:5000` is in **Authorized JavaScript origins**
- ✅ You clicked **SAVE**
- ✅ You **restarted** the frontend dev server
- ✅ You tested in a fresh browser tab or incognito mode

## 🎯 Expected Result

After fixing:
1. No more "origin not allowed" errors
2. Google Sign-In popup should open
3. You can select your Google account
4. Authentication should complete successfully

## 🆘 Still Not Working?

### Issue: Changes not taking effect
**Solution:** 
- Wait 1-2 minutes for Google to propagate changes
- Clear browser cache completely
- Use Incognito/Private browsing mode
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Wrong credentials
**Solution:**
- Double-check you're editing the correct OAuth client ID
- Verify the Client ID matches: `922062691603-frqfvpa0cja642sgl56vp110rt559he5`

### Issue: Can't find the credentials
**Solution:**
1. Go to https://console.cloud.google.com/
2. Make sure you're in the correct project
3. Navigate to: **APIs & Services** → **Credentials**
4. Look for your OAuth 2.0 Client ID in the list

---

**Need more help?** Check `GOOGLE_AUTH_SETUP.md` for complete setup instructions.
