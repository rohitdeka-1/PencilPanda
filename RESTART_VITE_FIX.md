# ⚡ Quick Fix: Restart Vite Dev Server

## Problem
Vite doesn't automatically reload environment variables from `.env` files. You need to restart the dev server.

## Solution

### In your client terminal:

1. **Stop the current dev server:**
   - Press `Ctrl + C`

2. **Restart the dev server:**
   ```bash
   cd /home/rhd/Desktop/PencilPanda/client
   npm run dev
   ```

3. **Refresh your browser** or open `http://localhost:5173` again

## Why This Happens

- Vite loads environment variables **only on startup**
- Changes to `.env` files require a **full restart**
- Hot Module Replacement (HMR) doesn't reload env vars

## ✅ After Restart

The Google Sign-In should work properly with your client_id loaded.

---

**Note:** Make sure you've also added `http://localhost:5173` to the Authorized JavaScript Origins in Google Cloud Console (see `FIX_GOOGLE_ORIGIN_ERROR.md`).
