# MongoDB Atlas Deployment Guide

## Step 1: Create MongoDB Atlas Account (FREE)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** and sign up
3. Choose **FREE M0 Cluster** (512MB storage - perfect for your project)
4. Select a cloud provider region close to you

## Step 2: Set Up Database

1. **Create Cluster**: Click "Build a Database" → Choose FREE tier
2. **Database Access**: 
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Username: `placementadmin`
   - Password: Generate a secure password (SAVE THIS!)
   - Database User Privileges: Select "Read and write to any database"
   - Click "Add User"

3. **Network Access**:
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

4. **Get Connection String**:
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Driver: Node.js
   - Copy the connection string (looks like):
     ```
     mongodb+srv://placementadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password

## Step 3: Deploy Backend to Render (FREE)

### Option A: Deploy to Render.com (Recommended - Free)

1. Go to https://render.com and sign up with GitHub
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `Ganeshmamidala/fedfproject`
4. Configure:
   - **Name**: `placementhub-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run server`
   - **Instance Type**: Free

5. Add Environment Variables:
   - Click "Advanced" → "Add Environment Variable"
   - `MONGODB_URI`: (paste your MongoDB Atlas connection string)
   - `JWT_SECRET`: (generate random string: `openssl rand -base64 32`)
   - `PORT`: `5000`
   - `NODE_ENV`: `production`

6. Click "Create Web Service"
7. Wait for deployment (takes 2-3 minutes)
8. Copy your backend URL: `https://placementhub-api.onrender.com`

### Option B: Deploy to Railway.app (Alternative - Free)

1. Go to https://railway.app and sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select: `Ganeshmamidala/fedfproject`
4. Add Environment Variables:
   - `MONGODB_URI`: (your MongoDB connection string)
   - `JWT_SECRET`: (random secret key)
   - `PORT`: `5000`
5. Copy your backend URL

## Step 4: Update Frontend Configuration

I'll automatically update your frontend to use the deployed backend API.

**You need to provide:**
1. Your MongoDB Atlas connection string
2. Your deployed backend URL (after step 3)

Then I'll update:
- Environment variables
- API configuration
- Deploy to GitHub Pages

## Step 5: Test Everything

After deployment:
1. Visit your GitHub Pages: https://ganeshmamidala.github.io/fedfproject/
2. Try logging in with default admin account
3. Data will now be stored in MongoDB Atlas (shared globally!)

## Default Admin Accounts

These will be automatically created on first server start:
- **Admin**: admin@placementhub.edu / admin123
- **Student**: student@placementhub.edu / student123
- **Employer**: employer@company.com / employer123
- **Officer**: officer@placementhub.edu / officer123

## What You Need to Share With Me:

1. **MongoDB Connection String** (from Step 2)
2. **Backend URL** (from Step 3 after deployment)

Then I'll complete the integration!
