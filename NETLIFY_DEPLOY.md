# Netlify Deployment Guide for PlacementHub

## Quick Deploy to Netlify

### Method 1: Deploy via Netlify CLI (Fastest)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Method 2: Deploy via Netlify Website

1. **Go to Netlify**
   - Visit https://www.netlify.com
   - Sign up or login with your GitHub account

2. **Import Repository**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub
   - Select the `fedfproject` repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

4. **Done!**
   - Your site will be live in 1-2 minutes
   - You'll get a URL like: `https://your-site-name.netlify.app`

### Method 3: Drag & Drop Deploy

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Go to Netlify**
   - Visit https://app.netlify.com/drop
   - Drag the `dist` folder to the drop zone
   - Wait for deployment to complete

## Custom Domain (Optional)

1. Go to your site settings in Netlify
2. Click "Domain settings"
3. Add your custom domain
4. Follow DNS configuration instructions

## Environment Variables (If needed)

1. In Netlify dashboard, go to Site settings
2. Click "Environment variables"
3. Add any required variables

## Automatic Deploys

Once connected to GitHub, Netlify will automatically deploy when you push to the main branch!

## Your Site URLs

- **GitHub Pages**: https://ganeshmamidala.github.io/fedfproject/
- **Netlify**: Will be generated after first deploy (e.g., https://placementhub-ganesh.netlify.app)

---

**Note**: The `netlify.toml` file is already configured in your repository with the correct build settings.
