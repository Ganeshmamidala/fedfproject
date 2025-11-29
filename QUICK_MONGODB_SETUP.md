# MongoDB Atlas + Render Deployment - Quick Start

## 🚀 Quick Deployment Steps (15 minutes)

### Step 1: MongoDB Atlas Setup (5 min)

1. **Create Account**: https://www.mongodb.com/cloud/atlas
   - Click "Try Free"
   - Sign up with Google/GitHub

2. **Create FREE Cluster**:
   - Click "Build a Database"
   - Choose **FREE M0** tier
   - Select AWS region close to you
   - Cluster name: `placementhub`
   - Click "Create"

3. **Create Database User**:
   - Go to "Database Access" (left menu)
   - Click "ADD NEW DATABASE USER"
   - Authentication Method: Password
   - Username: `placementadmin`
   - Password: Click "Autogenerate Secure Password" → **COPY THIS PASSWORD!**
   - Database User Privileges: "Atlas admin"
   - Click "Add User"

4. **Allow Network Access**:
   - Go to "Network Access" (left menu)
   - Click "ADD IP ADDRESS"
   - Click "ALLOW ACCESS FROM ANYWHERE"
   - Click "Confirm"

5. **Get Connection String**:
   - Go to "Database" (left menu)
   - Click "Connect" button on your cluster
   - Click "Drivers"
   - Select: Node.js
   - Copy the connection string:
   ```
   mongodb+srv://placementadmin:<password>@placementhub.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with the password you copied
   - **SAVE THIS CONNECTION STRING!**

### Step 2: Deploy Backend to Render (5 min)

1. **Create Render Account**: https://render.com
   - Sign up with GitHub

2. **New Web Service**:
   - Click "New +" → "Web Service"
   - Click "Connect a repository"
   - Authorize Render to access your GitHub
   - Select: `Ganeshmamidala/fedfproject`

3. **Configure Service**:
   ```
   Name: placementhub-api
   Region: Choose closest to you
   Branch: main
   Root Directory: (leave empty)
   Runtime: Node
   Build Command: npm install
   Start Command: npm run server
   Instance Type: Free
   ```

4. **Environment Variables**:
   Click "Advanced" → Add these variables:
   
   ```
   MONGODB_URI = (paste your MongoDB connection string from Step 1)
   JWT_SECRET = 8kL9mN2pQ5rT7vX1zA3bC6dE9fH2jK5m
   PORT = 5000
   NODE_ENV = production
   FRONTEND_URL = https://ganeshmamidala.github.io/fedfproject
   ```

5. **Create Web Service**:
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - Copy your API URL: `https://placementhub-api.onrender.com`
   - **SAVE THIS URL!**

### Step 3: Update Frontend (2 min)

Now I need your:
1. **MongoDB Connection String** (from Step 1.5)
2. **Render API URL** (from Step 2.5)

Share these with me and I'll:
- Update the frontend to use MongoDB
- Deploy to GitHub Pages
- Test the integration

---

## 📝 What to Share:

```
MongoDB URI: mongodb+srv://placementadmin:YOUR_PASSWORD@placementhub.xxxxx.mongodb.net/?retryWrites=true&w=majority

Render URL: https://placementhub-api.onrender.com
```

## ✅ After Deployment

Your app will have:
- ✅ Global database (MongoDB Atlas)
- ✅ All users share the same data
- ✅ Data persists forever
- ✅ Backend API (Render.com)
- ✅ Frontend (GitHub Pages)

## 🔐 Default Login Accounts

After deployment, these accounts will be created automatically:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@placementhub.edu | admin123 |
| Student | student@placementhub.edu | student123 |
| Employer | employer@company.com | employer123 |
| Officer | officer@placementhub.edu | officer123 |

## 🆓 All Services Are FREE!

- MongoDB Atlas: 512MB (enough for 1000+ users)
- Render.com: 750 hours/month free tier
- GitHub Pages: Unlimited

---

**Ready?** Complete Steps 1 & 2, then share the connection string and API URL with me!
