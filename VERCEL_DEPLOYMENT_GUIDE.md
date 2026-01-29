# Vercel Deployment Guide for Politix

## 🚀 Quick Fix for Authentication Error

The "Server error" on Vercel is typically caused by missing or incorrect NextAuth configuration. Follow these steps:

## 📋 Required Environment Variables

In your Vercel project dashboard, go to **Settings → Environment Variables** and add:

### Required Variables
```
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-super-secret-key-here
DATABASE_URL=file:./db/custom.db
```

### Generate NEXTAUTH_SECRET
Run this command locally to generate a secure secret:
```bash
openssl rand -base64 32
```

## 🔧 Configuration Files

### 1. vercel.json (Already created)
This file is already in your project root with proper Next.js configuration.

### 2. Environment Setup
Make sure these are set in Vercel:

1. **NEXTAUTH_URL** - Must be your exact Vercel URL
2. **NEXTAUTH_SECRET** - Required for JWT signing
3. **NODE_ENV** - Should be automatically set to "production"

## 🛠️ Deployment Steps

### Step 1: Update Environment Variables
1. Go to your Vercel project
2. Navigate to **Settings → Environment Variables**
3. Add the three required variables above
4. Redeploy the application

### Step 2: Verify Configuration
After deployment, test these endpoints:
- `https://your-app.vercel.app/api/auth/test` - Should return environment status
- `https://your-app.vercel.app/api/auth/signin` - Should show NextAuth configuration

### Step 3: Test Authentication
1. Go to `https://your-app.vercel.app/auth/signin`
2. Try logging in with demo credentials:
   - Email: `demo@campaign.com`
   - Password: `demo123`
3. Should redirect to dashboard successfully

## 🐛 Common Issues & Solutions

### Issue 1: "Server error" on login
**Cause**: Missing NEXTAUTH_SECRET or incorrect NEXTAUTH_URL
**Solution**: 
- Ensure NEXTAUTH_SECRET is set and at least 32 characters
- Ensure NEXTAUTH_URL matches your exact Vercel URL (no trailing slash)

### Issue 2: "Invalid callback URL"
**Cause**: NEXTAUTH_URL doesn't match the deployment URL
**Solution**: 
- Set NEXTAUTH_URL to exactly `https://your-app-name.vercel.app`
- Don't include `/api/auth/callback` in the URL

### Issue 3: "Database connection failed"
**Cause**: SQLite database issues on serverless
**Solution**: 
- The demo uses in-memory authentication, so database errors won't affect login
- For production, consider using Vercel Postgres or other serverless databases

## 🔍 Debugging Steps

### 1. Check Environment Variables
Visit: `https://your-app.vercel.app/api/auth/test`
Should return:
```json
{
  "message": "Auth API is working",
  "env": {
    "NEXTAUTH_URL": "set",
    "NEXTAUTH_SECRET": "set",
    "NODE_ENV": "production"
  }
}
```

### 2. Check NextAuth Configuration
Visit: `https://your-app.vercel.app/api/auth/providers`
Should show your configured providers.

### 3. Check Vercel Logs
1. Go to your Vercel project
2. Click on the **Functions** tab
3. Look for errors in `/api/auth/[...nextauth]`

## 🚀 Alternative: Use Vercel's Built-in Auth

If issues persist, consider using Vercel's built-in authentication:

```typescript
// In your auth configuration
const handler = NextAuth({
  // ... existing config
  debug: process.env.NODE_ENV === 'development',
})
```

## 📱 Testing the Fix

### Before Deployment (Local)
```bash
# Test locally with production-like settings
NEXTAUTH_URL=http://localhost:3000 NEXTAUTH_SECRET=your-secret bun run dev
```

### After Deployment
1. Clear browser cache
2. Test incognito/private browsing
3. Check browser console for errors
4. Verify Vercel function logs

## 🎯 Quick Fix Summary

**Most likely cause**: Missing NEXTAUTH_SECRET

**Fastest fix**:
1. Add NEXTAUTH_SECRET to Vercel environment variables
2. Add NEXTAUTH_URL with your Vercel URL
3. Redeploy from Vercel dashboard
4. Test authentication

## 📞 If Issues Persist

1. Check Vercel function logs for specific error messages
2. Ensure your Vercel plan supports serverless functions
3. Try redeploying with a fresh build
4. Contact Vercel support if it's a platform issue

---

## 🔐 Security Notes

- Never commit secrets to git
- Use different secrets for development and production
- Rotate secrets periodically
- Monitor authentication logs for unusual activity

---

**Your Politix app should work perfectly on Vercel after following these steps!** 🎉