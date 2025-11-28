# 📊 How to View Database Statistics

## Method 1: Using Browser Console (Quick & Easy)

### Open Browser Console:
1. Open your app at http://localhost:5173/
2. Press **F12** or **Right Click → Inspect**
3. Go to the **Console** tab

### Run These Commands:

#### 1️⃣ View Complete Database Statistics
```javascript
// Import and run the stats function
import { getDatabaseStats } from './src/lib/supabase.js';
getDatabaseStats();
```

**Output:**
```
═══════════════════════════════════════════
📊 DATABASE STATISTICS
═══════════════════════════════════════════
👥 Total Registered Users: 6
📝 New Registrations: 2
✅ Currently Signed In: 1

📋 Users by Role:
   👨‍💼 Admins: 1
   🎓 Students: 3
   🏢 Employers: 1
   👔 Placement Officers: 1

🔐 Current Session:
   Name: John Doe
   Email: john@example.com
   Role: student
═══════════════════════════════════════════
```

#### 2️⃣ List All Registered Users
```javascript
import { listAllUsers } from './src/lib/supabase.js';
listAllUsers();
```

**Output:**
```
═══════════════════════════════════════════
📋 ALL REGISTERED USERS
═══════════════════════════════════════════

🔹 User 1:
   Name: System Administrator
   Email: admin@placementhub.edu
   Role: admin
   Type: Default

🆕 User 5:
   Name: John Doe
   Email: john@example.com
   Role: student
   Type: New Registration
═══════════════════════════════════════════
```

#### 3️⃣ View Users (Simple List)
```javascript
import { viewMockUsers } from './src/lib/supabase.js';
viewMockUsers();
```

#### 4️⃣ Export Users to JSON
```javascript
import { exportUsers } from './src/lib/supabase.js';
exportUsers();
```

---

## Method 2: Using Visual Dashboard Component

### Add to Your Admin View:

1. Open `src/views/admin/AnalyticsView.jsx`

2. Import the component:
```javascript
import DatabaseStats from '../../components/Admin/DatabaseStats';
```

3. Add to your view:
```javascript
<div className="p-6">
  <DatabaseStats />
</div>
```

### Features:
- ✅ Real-time user count
- ✅ New registration tracking
- ✅ Currently signed-in users
- ✅ Users grouped by role
- ✅ Current session details
- ✅ Expandable user list
- ✅ Export to JSON file
- ✅ Auto-refresh button

---

## Method 3: Using localStorage Directly

### View Stored Data:

1. Open Browser Console (F12)
2. Go to **Application** tab
3. Expand **Local Storage**
4. Select your domain (localhost:5173)

### Check These Keys:

#### `mock-users` - All registered users
```javascript
JSON.parse(localStorage.getItem('mock-users'))
```

#### `mock-session` - Current logged-in user
```javascript
JSON.parse(localStorage.getItem('mock-session'))
```

---

## Quick Statistics Commands

### Get Total User Count:
```javascript
JSON.parse(localStorage.getItem('mock-users')).length
```

### Check if Someone is Logged In:
```javascript
localStorage.getItem('mock-session') !== null
```

### Count by Role:
```javascript
const users = JSON.parse(localStorage.getItem('mock-users'));
console.log({
  students: users.filter(u => u.role === 'student').length,
  employers: users.filter(u => u.role === 'employer').length,
  officers: users.filter(u => u.role === 'placement_officer').length,
  admins: users.filter(u => u.role === 'admin').length
});
```

### Get Current User Details:
```javascript
const session = JSON.parse(localStorage.getItem('mock-session'));
console.log(session.user.user_metadata);
```

---

## Database Statistics API

### Available Functions:

| Function | Description | Return |
|----------|-------------|--------|
| `getDatabaseStats()` | Complete statistics with formatted output | Object with all stats |
| `listAllUsers()` | Detailed list of all users | Array of users |
| `viewMockUsers()` | Simple user list | Array of users |
| `exportUsers()` | Export data as JSON | Export object |
| `resetMockData()` | Reset to default users | void |

---

## Example Output Structure

```javascript
{
  totalUsers: 6,           // Total registered
  defaultUsers: 4,         // Default system users
  newRegistrations: 2,     // New signups
  currentlySignedIn: 1,    // Active sessions
  byRole: {
    admin: 1,
    student: 3,
    employer: 1,
    placement_officer: 1
  },
  currentUser: {
    email: "john@example.com",
    full_name: "John Doe",
    role: "student"
  }
}
```

---

## Tips

1. **Auto-refresh**: Call `getDatabaseStats()` after any signup/login
2. **Export regularly**: Use `exportUsers()` to backup your data
3. **Monitor activity**: Check `currentlySignedIn` to see active users
4. **Track growth**: Compare `newRegistrations` over time

---

## Reset Database (If Needed)

```javascript
import { resetMockData } from './src/lib/supabase.js';
resetMockData();
```

⚠️ **Warning:** This will delete all new registrations and reset to default users!

---

## Next Steps

- [ ] Add the DatabaseStats component to your admin dashboard
- [ ] Set up automatic statistics logging
- [ ] Create user activity reports
- [ ] Export user data for analysis
