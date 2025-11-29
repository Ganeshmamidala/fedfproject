# 📊 Database Information - PlacementHub

## How the Database Works

PlacementHub currently uses **localStorage** as a database for demo purposes. This is a browser-based storage system.

### ✅ What's Working:

**Both deployments have the SAME data structure:**
- ✅ 4 Default users (Admin, Student, Employer, Officer)
- ✅ 2 Sample jobs
- ✅ 1 Sample application
- ✅ Sample placements, interviews, messages, documents

### 🌐 Important: Domain-Specific Storage

**localStorage is domain-specific**, which means:
- Data on `ganeshmamidala.github.io/fedfproject/` stays there
- Data on `placementtracker11.netlify.app` stays there
- **They don't share data** (this is how browsers work for security)

### 🔄 How It Works:

1. **First Visit**: 
   - Browser checks localStorage
   - If empty → Creates default data
   - Saves to localStorage

2. **Subsequent Visits**:
   - Loads existing data from localStorage
   - Any changes you make are saved
   - Data persists in that browser/domain

3. **Different Domain/Browser**:
   - Starts fresh with default data
   - Each domain has its own database

### 📱 Demo Accounts (Work on BOTH sites):

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@placementhub.edu | admin123 |
| Student | student@placementhub.edu | student123 |
| Employer | employer@company.com | employer123 |
| Officer | officer@placementhub.edu | officer123 |

### 🔍 To Verify Data is Working:

1. Open the site (GitHub Pages or Netlify)
2. Press `F12` to open Developer Console
3. Look for these messages:
   ```
   🚀 PlacementHub starting...
   ✅ Loaded 4 users from localStorage
   ✅ Loaded existing PlacementHub data
   📊 Data initialized: users: 4, jobs: 2, applications: 1
   ✅ PlacementHub ready!
   ```

4. Login with any demo account
5. You should see:
   - Dashboard with stats
   - 2 available jobs
   - Applications, messages, etc.

### 🎯 Both Sites Work Identically:

**GitHub Pages**: https://ganeshmamidala.github.io/fedfproject/
- ✅ Same code
- ✅ Same default data
- ✅ Same functionality

**Netlify**: https://placementtracker11.netlify.app
- ✅ Same code
- ✅ Same default data
- ✅ Same functionality

**The only difference**: They have separate localStorage (separate databases).

### 🔄 Clear Data and Start Fresh:

If you want to reset the data:
1. Open browser console (F12)
2. Type: `localStorage.clear()`
3. Press Enter
4. Refresh the page
5. New default data will be created

### 💡 Why This Approach?

**Advantages:**
- ✅ No server needed
- ✅ Works offline
- ✅ Fast and responsive
- ✅ Free hosting
- ✅ Perfect for demos

**Limitations:**
- ❌ Data not shared across domains
- ❌ Data not shared across browsers
- ❌ Limited to ~5MB storage
- ❌ Data cleared if browser cache is cleared

### 🚀 Future: Real Database Integration

The MongoDB backend is ready (see `server/` folder). To use it:
1. Deploy backend to Render.com (see `QUICK_MONGODB_SETUP.md`)
2. Update frontend to use MongoDB API
3. Data will then be shared across all domains

---

**Current Status:** ✅ Both GitHub Pages and Netlify work perfectly with localStorage!

The database IS working - you just need to understand that each domain has its own data storage. This is normal and expected behavior! 🎉
